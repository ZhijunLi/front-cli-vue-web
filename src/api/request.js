import axios from 'axios'
import { Toast } from 'vant'
import { Notify } from 'vant';

import store from '@/store/index'
import { getToken } from '@/utils/auth'


// axios文档： http://www.axios-js.com/zh-cn/docs/
// create an axios instance
const request =  function(args){


  const _request = axios.create({
    timeout: 20000
  })

  // request interceptor
  _request.interceptors.request.use(
      config => {
        if (typeof args.url.auth === 'undefined'){
          args.url.auth = true
        }

        if (args.url.auth && store.getters.token) {
           config.headers['token'] = getToken()
        }

        return config
      },
      error => {
        // do something with request error
        console.log('api请求失败',error) // for debug
        return Promise.reject(error)
      }
  )

  _request.interceptors.response.use(
      response => {
        return onResponseSuccess(response)
      },
      error => {
        return onResponseError(error)
      }
  )

  if(typeof args.data === 'undefined'){
    args.data = {}
  }


  if(args.url.method === 'post' || args.url.method === 'put') {
    return _request({
      url: args.url.full_url,
      method: args.url.method,
      data: args.data
    })
  }else if(args.url.method === 'get' || args.url.method === 'delete') {
    return _request({
      url: args.url.full_url,
      method: args.url.method,
      params: args.data
    })
  } else {
    console.error('不支持的请求方法'+args.url.method, args.url.full_url)
  }

}


function onResponseSuccess(response){
  const res = response.data
  // if the custom code is not 0, it is judged as an error.
  if (res.code !== 0) {

    Toast({
      type: 'fail',
      message: res.message || 'Error',
      duration: 1000
    })
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res.data
  }


}

function onResponseError(error){

  // 请求超时
  if (error.code === "ECONNABORTED"){
    Notify({ type: 'danger', message: '网络请求超时，请检查网络', duration: 5000 })
    return Promise.reject(error)
  }

  // 服务器出错
  if (typeof error.response === 'undefined') {
    Notify({ type: 'danger', message: '服务器出错', duration: 5000 })
    return Promise.reject(error)
  }

  // 登录过期
  if (typeof error.response.data !== 'undefined' && typeof error.response.data.code !== 'undefined' && [1003, 1004, 1005].indexOf(error.response.data.code) > -1) {
    // MessageBox.confirm('您的登录已过期，您可以取消继续留在这个页面，或者重新登录', '温馨提示', {
    //   confirmButtonText: '重新登录',
    //   cancelButtonText: '取消',
    //   type: 'warning'
    // }).then(() => {
    //   store.dispatch('user/resetToken').then(() => {
    //     location.reload()
    //   })
    // })

    // store.dispatch('user/setToken','')
    return Promise.reject(error)
  }

  // 404 不弹出错误，业务层对应显示空视图
  if (typeof error.response.data !== 'undefined' && typeof error.response.data.code !== 'undefined' && error.response.data.code === 404) {
    return Promise.reject(error)
  }

  // 其他业务逻辑错误
  let errMsg = error.message
  if (typeof error.response.data !== 'undefined' && typeof error.response.data.message !== 'undefined' ){
    errMsg = error.response.data.message
  }

  Toast({
    type: 'fail',
    message:error.response.data.message,
    duration: 1000
  });
  return Promise.reject(error.response.data)
}




export default request
