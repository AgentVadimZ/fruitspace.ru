import {aboutLocale} from "./loc/about";
import {globalLocale} from "./loc/global";
import {profileLocale} from "./loc/profile";
import {productGDLocale} from "./loc/product/gd";
import {indexLocale} from "./loc";
import {orderGDPSLocale} from "./loc/order/gd";


const translationList = {
    ...aboutLocale,
    ...profileLocale,
    ...productGDLocale,
    ...indexLocale,
    ...orderGDPSLocale
}

export default function useLocale(router) {
    let ts = translationList[router.pathname]

    return {
        locale: router.locale,
        path: router.pathname,
        translations: ts===undefined?{}:ts,

        get: listGet
    }
}

export function useGlobalLocale(router) {
    return {
        locale: router.locale,
        path: router.pathname,
        translations: globalLocale,

        get: listGet
    }
}

function listGet(val) {
    let ts = this.translations[val]
    if (ts===undefined) return "???"
    ts = ts[this.locale]
    return ts===undefined?"???":ts
}