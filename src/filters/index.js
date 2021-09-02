import {rmbFormat} from "@/utils/utils";

export function defaultVal(val, replaceStr){
    if(typeof val === 'undefined' || val === null){
        return replaceStr
    }
    return val
}

export function rmb(val){
    return rmbFormat(val, 2)
}