import {aboutLocale} from "./loc/about";
import {partnerLocale} from "./loc/about";
import {teamLocale} from "./loc/about"
import {globalLocale} from "./loc/global";
import {profileLocale} from "./loc/profile";
import {productGDLocale} from "./loc/product/gd";
import {productMCLocale} from "./loc/product/mc";
import {indexLocale} from "./loc";
import {orderGDPSLocale} from "./loc/order/gd";
import {storeLocale} from "./loc/manage/store";
import {gdManageLocale} from "./loc/manage/gd";
import {gdpsUserManageLocale} from "./loc/userzone/gdps";
import {topLocale} from "./loc/top";
import {NextRouter} from "next/router";

const translationList = {
    ...aboutLocale,
    ...partnerLocale,
    ...teamLocale,
    ...profileLocale,
    ...productGDLocale,
    ...productMCLocale,
    ...indexLocale,
    ...orderGDPSLocale,
    ...storeLocale,

    ...gdManageLocale,

    ...gdpsUserManageLocale,

    ...topLocale
}

export default function useLocale(router: NextRouter) {
    let ts = translationList[router.pathname]

    return {
        locale: "ru",
        path: router.pathname,
        translations: ts===undefined?{}:ts,

        get: listGet
    }
}

export function useGlobalLocale(router: NextRouter) {
    return {
        locale: "ru",
        path: router.pathname,
        translations: globalLocale,

        get: listGet
    }
}

function listGet(val: string|number) {
    let ts = this.translations[val]
    if (ts===undefined) return "???"
    ts = ts[this.locale]
    return ts===undefined?"???":ts
}