import apiUrl from "@/api";
import request from "@/api/request";
import wx from 'weixin-js-sdk'

export const jsApiList = [
    'updateAppMessageShareData',
    'updateTimelineShareData',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'onVoicePlayEnd',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'translateVoice',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard',
]

export function getWxJssdkSign(param)
{
    console.log('getWxJssdkSign', param)
    if(typeof param.url === 'undefined' && param.url === ''){
        return
    }
    return new Promise((resolve, reject)=>{
        param.jsApiList = JSON.stringify( param.jsApiList)
        request({
            url: apiUrl.wechat.get_jssdk_sign,
            data: param
        }).then((data)=>{
            wx.config(data);
            wx.ready(() => {
                console.log('wx.ready');
                resolve(wx);
            });
            wx.error((res)=>{
                // todo: 首次进入注册页面会获取签名失败
                console.log('wx err', res);
                reject(res)
            });
        }).catch(err=>{
            reject(err)
            console.log(err)
        })
    })
}
