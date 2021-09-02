import store from '@/store'
// import router from "@/router";

import api from '@/api'
import request from "@/api/request";

const login = ()=>{
    return new Promise((resolve,reject)=>{
        request({
            url: api.user.info,
        }).then(data=>{
            store.dispatch('user/setUser', data)
            console.log(data)
            resolve(data)
        }).catch(err=>{
            // router.push("/app/forbidden")
            console.log('这家伙没登录', err.response)
            reject('这家伙没登录')
        })
    })
}

export default {
    login
}
