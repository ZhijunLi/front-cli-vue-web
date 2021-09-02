import store from "@/store"
import user from "@/utils/user"


const ERROR_INIT_MSG = 'Js SDK环境不支持'
export function callApp(methodName = '', params={}){
    console.log(methodName, params )

    return new Promise((resolve, reject) => {
        let data = {}
        // if (typeof window.webkit !== 'undefined'){
        if (window[methodName]){
            // iOS
            // data = window.webkit[methodName].postMessage(params);
            data = JSON.stringify(window[methodName]);
            data = JSON.parse(data)
            resolve(data)
        } else if (typeof window.jsBridge !== 'undefined'){
            // android
            data = window.jsBridge[methodName](JSON.stringify(params));
            console.log(methodName, params, typeof window.data)
            data = JSON.parse(data)
            resolve(data)
        }else{
            console.warn(ERROR_INIT_MSG)
            reject(ERROR_INIT_MSG)
        }
    })
}

/**
 * 使用方式
 * this.$app_sdk.method_name(params).then(data=>{})
 */
const appSDK = {
    // todo: 20210805 待下一个android版本开启
    // onAppBack: () => { return callApp("onAppBack") },
    onAppBack: () => { return callApp("onAppBack") },
    getUserInfo: () => { return callApp("getUserInfo") },
    // todo: 20210805 待下一个android版本开启
    getAppToken: () => {
        return callApp("getAppToken").catch(()=>{
            return new Promise((resolve) => {
                if (process.env.NODE_ENV === "development") {
                    // resolve({token: '136ff50bc8d3a4c5e96d728224bec507ae2'})
                }
                // reject(err)
                resolve({token:''})
            })
        })
    },
    gotoTeamPage: (team_id) => { return callApp("onTeamPage", { team_id: team_id }) },
    gotoMathRecord: (pk_id) => { return callApp("onMathRecordPage", { pk_id: pk_id}) },
}

export default appSDK



export function getDataFromApp(fn_name, params={}) {
    // iOS
    if (typeof window.webkit !== 'undefined'){
        if(fn_name === 'onBack') {
            window.webkit.messageHandlers[fn_name].postMessage("");
            return false
        }
        if(fn_name === 'getToken'){
            const data = JSON.parse((JSON.stringify(window.getUserInfo)))
            store.dispatch("user/setToken", data.token)
            user.login()
        }
        // 跳转战队页面
        if(fn_name === 'gotoTeamPage') {
            window.webkit.messageHandlers[fn_name].postMessage(params.team_id);
        }
        // 跳转战绩页面
        if(fn_name === 'gotoMathRecord') {
            window.webkit.messageHandlers[fn_name].postMessage(params.pk_id);
        }
    }

    // Android
    if (typeof window.jsBridge !== 'undefined'){
        // 返回
        if(fn_name === 'onBack') {
            window.jsBridge.onBack();
            return false
        }
        if(fn_name === 'getToken'){
            const client_data = window.jsBridge.getToken();
            const data = JSON.parse(client_data)
            store.dispatch("user/setToken", data.token)
            user.login()
        }
        // 跳转战队页面
        if(fn_name === 'gotoTeamPage') {
            window.jsBridge.gotoTeamPage(params.team_id);
        }
        // 跳转战绩页面
        if(fn_name === 'gotoMathRecord') {
            window.jsBridge.gotoMathRecord(params.pk_id);
        }

    }

    // 测试用数据
    if (process.env.NODE_ENV === "development"){
        if(fn_name === 'getToken'){
            // 土豪账户
            const data = {
                token: '20c2a0274648c94e223197306a26c15c5',
            }

            // 穷鬼账户
            // const data = {
            //     token: '3f53b6192d9b842bf918617b9a055f48b',
            // }
            store.dispatch("user/setToken", data.token)
            user.login()
        }


    }

}
