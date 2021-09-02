/**
 * 是否是手机号
 * @param mobile
 * @returns {boolean}
 */
export function isMobile(mobile){
    return /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(mobile)
}


export function isHan(name){
    return /^[\u4e00-\u9fa5]{0,}$/.test(name)
}

export function isPersonName(name){
    console.log(name, name.length)
    if(name.length>5){
        return false
    }
    return /^[\u4e00-\u9fa5]{0,}$/.test(name)
}
