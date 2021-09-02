import setting from '@/settings'
const index = {
    user:{
        info: {url: '/app/app_config', method: 'post'},
    }
}


/**
 * 将 api url 和 store host 合并
 * @param apiUrl
 * @returns {{}}
 */
const mergeUrl = (apiUrl) => {
    let newUrl = {};
    let num = 0
    for (let k in apiUrl) {
        let newOb = {
            [k]: {}
        };
        for (let i in apiUrl[k]) {
            if(typeof apiUrl[k][i].host === 'undefined'){
                // 默认api host
                newOb[k][i] = {
                    full_url: setting.app_api_host + apiUrl[k][i].url,
                    method: apiUrl[k][i].method
                }
            }else{
                newOb[k][i] = {
                    full_url: apiUrl[k][i].host + apiUrl[k][i].url,
                    method: apiUrl[k][i].method
                }
            }
            num+=1;
        }
        newUrl[k] = newOb[k];
    }

    console.log('合计个'+num+'接口',newUrl)
    return newUrl;

};

export default mergeUrl(index)


