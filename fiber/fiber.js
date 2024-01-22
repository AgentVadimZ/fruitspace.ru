/* FruitSpace API v1.3 */

import {useCookies} from "react-cookie";
import {useRecoilState} from "recoil";
import {serverGDAtom, userAtom} from "./fiber.model.js";
import {parseCookies} from "./cockie_parser";
import {useEffect, useState} from "react";

const DISCORD_AUTH = "https://discord.com/oauth2/authorize?client_id=1119240313605734410&response_type=code&scope=identify%20guilds%20guilds.join&state="


class api {
    base_url = "https://api.fruitspace.one/v2/"
    authorization = ""

    constructor() {
        this.qid = Math.random()
    }

    registerProvider = (obj, override, bloop=null) => {
        this[override] = bloop||new obj(this)
    }

    doForm = async (endpoint, method = "GET", body = null) => {
        return fetch(this.base_url + endpoint,
            {method: method, body: body, headers: {"Authorization": this.authorization}}
        ).then(r => r.json()).catch(e => ({status: "error", message: e.message, code: "conn"}))
    }

    do = async (endpoint, method = "GET", body = null) => {
        return fetch(this.base_url + endpoint,
            {
                method: method,
                body: body ? JSON.stringify(body) : null,
                headers: {"Authorization": this.authorization, "Content-Type": "application/json"}
            }
        ).then(r => r.json()).catch(e => ({status: "error", message: e.message, code: "conn"}))
    }
}

// region API


const useLoader = (loader) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    useEffect(() => {
        loader().then((resp) => {
            setLoading(false)
            setData(resp)
        })
    })

    return {loading, data}
}

const useFiberAPI = (cookie = "token") => {
    const [cookies, setCookie, delCookie] = useCookies([cookie])
    let sapi = new api();
    sapi.authorization = cookies[cookie]

    let xauth = new auth(sapi);
    xauth.logout = () => delCookie(cookie, {path: '/'})
    xauth.setCookieToken = (token) => setCookie(cookie, token,
        {path: "/", expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30)), secure: true})

    sapi.registerProvider(auth, "auth", xauth)
    sapi.registerProvider(user, "user")
    sapi.registerProvider(payments, "payments")
    sapi.registerProvider(ufetch, "fetch")
    sapi.registerProvider(servers, "servers")
    sapi.registerProvider(gdps_manage, "gdps_manage")
    sapi.registerProvider(gdps_users, "gdps_users")
    sapi.registerProvider(particles, "particles")
    return sapi
}

const serverFiberAPI = (ctx, cookie = "token") => {
    const cookies = ctx ? parseCookies(ctx.req) : {}
    let sapi = new api()
    sapi.authorization = cookies[cookie] || ""
    sapi.registerProvider(auth, "auth")
    sapi.registerProvider(user, "user")
    sapi.registerProvider(payments, "payments")
    sapi.registerProvider(ufetch, "fetch")
    sapi.registerProvider(servers, "servers")
    sapi.registerProvider(gdps_manage, "gdps_manage")
    sapi.registerProvider(gdps_users, "gdps_users")
    return sapi
}
// endregion

// region  Auth API
class auth {
    constructor(apix) {
        this._api = apix
    }

    logout = () => {
    }
    login = async (uname, password, hcaptcha, totp = "") => {
        return await this._api.do("auth/login", "POST", {
            uname: uname,
            password: password,
            hCaptchaToken: hcaptcha,
            totp: totp
        })
    }
    register = async (uname, name, surname, email, password, hcaptcha, lang) => {
        return await this._api.do("auth/register", "POST", {
            uname: uname,
            name: name,
            surname: surname,
            email: email,
            password: password,
            hCaptchaToken: hcaptcha,
            lang: lang
        })
    }
    recover = async (email, hcaptcha, lang) => {
        return await this._api.do("auth/recover", "POST", {
            email: email,
            hCaptchaToken: hcaptcha,
            lang: lang
        })
    }
    discord = (shallow = false) => {
        window.location.href = DISCORD_AUTH + (
            this._api.authorization && !shallow
                ? this._api.authorization : "")
    }
}

// endregion

// region User API
class user {
    constructor(apix) {
        this._api = apix
    }

    sso = async () => {
        return await this._api.do("user", "GET")
    }
    useUser = () => {
        return useRecoilState(userAtom)
    }
    updateName = async (name, surname) => {
        return await this._api.do("user", "PATCH", {
            name: name,
            surname: surname
        })
    }
    updatePassword = async (password, new_password) => {
        return await this._api.do("user", "PATCH", {
            password: password,
            new_password: new_password
        })
    }
    updateTOTP = async (totp) => {
        return await this._api.do("user", "PATCH", {
            totp: totp
        })
    }
    resetAvatar = async () => {
        let datax = new FormData()
        datax.append("reset", "reset")
        return await this._api.doForm("user/avatar", "POST", datax)
    }
    updateAvatar = async (avatar_file) => {
        let datax = new FormData()
        datax.append("profile_pic", avatar_file)
        return await this._api.doForm("user/avatar", "POST", datax)
    }
}

// endregion

// region Payments API
class payments {
    constructor(apix) {
        this._api = apix
    }

    new = async (amount, merchant) => {
        return await this._api.do("payments", "POST", {amount: amount, merchant: merchant})
    }
    get = async () => {
        return await this._api.do("payments", "GET")
    }
}

//endregion

// region Fetch API
class ufetch {
    constructor(apix) {
        this._api = apix
    }

    stats = async () => {
        return await this._api.do("fetch/stats", "GET")
    }

    gdpsTariffs = async () => {
        return await this._api.do("fetch/gd/tariffs", "GET")
    }
    gdpsTop = async (page = 0) => {
        return await this._api.do(`fetch/gd/top?offset=${page}`, "GET")
    }
    gdpsGet = async (srvid) => {
        return await this._api.do(`fetch/gd/info/${srvid}`, "GET")
    }
}


// endregion

// region Servers API
class servers {
    constructor(apix) {
        this._api = apix
    }

    list = async () => {
        return await this._api.do("servers", "GET")
    }
    createGDPS = async (name, tariff, duration, promocode, srvid = "") => {
        return await this._api.do("servers/gd", "POST", {
            name: name, tariff: tariff, duration: duration, promocode: promocode, srvid: srvid
        })
    }
    useGDPS = () => {
        return useRecoilState(serverGDAtom)
    }
}
//endregion

// region GDPS Manage API
class gdps_manage {
    constructor(apix) {
        this._api = apix
    }
    delete = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}`, "DELETE")
    }
    get = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}`, "GET")
    }
    dbreset = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}/dbreset`, "GET")
    }
    updateChests = async (srvid, chests) => {
        return await this._api.do(`servers/gd/${srvid}/chests`, "POST", chests)
    }
    getLogs = async (srvid, type, page = 0) => {
        return await this._api.do(`servers/gd/${srvid}/logs`, "POST", {type: type, page: page})
    }
    getMusic = async (srvid, mode, query = "", page = 0) => {
        return await this._api.do(`servers/gd/${srvid}/music`, "POST", {mode: mode, page: page, query: query})
    }
    addMusic = async (srvid, type, url) => {
        return await this._api.do(`servers/gd/${srvid}/music`, "PUT", {type: type, url: url})
    }
    updateLogo = async (srvid, avatar_file) => {
        let datax = new FormData()
        datax.append("profile_pic", avatar_file)
        return await this._api.doForm(`servers/gd/${srvid}/icon`, "POST", datax)
    }
    updateSettings = async (srvid, settings) => {
        return await this._api.do(`servers/gd/${srvid}/settings`, "POST", settings)
    }
    buildlabPush = async (srvid, blab) => {
        return await this._api.do(`servers/gd/${srvid}/buildlab`, "POST", blab)
    }
    fetchBuildStatus = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}/buildlab/status`, "GET")
    }
    moduleDiscord = async (srvid, enable, module) => {
        return await this._api.do(`servers/gd/${srvid}/modules/discord`, "PUT", {...module, enable: enable})
    }
    getRoles = async (srvid) => {
        return await this._api.do(`servers/gd/${srvid}/roles`, "GET")
    }
    setRole = async (srvid, role) => {
        return await this._api.do(`servers/gd/${srvid}/roles`, "POST", role)
    }
    searchUsers = async (srvid, keyword) => {
        return await this._api.do(`servers/gd/${srvid}/get/users?user=${encodeURI(keyword)}`, "GET")
    }
}

// endregion

// region GDPS Users API
class gdps_users {
    constructor(apix) {
        this._api = apix
    }
    login = async (srvid, uname, password, fcaptcha) => {
        return await this._api.do(`servers/gd/${srvid}/u/login`, "POST", {
            uname: uname,
            password: password,
            fCaptchaToken: fcaptcha,
            hCaptchaToken: ""
        })
    }
    get = async (srvid) => {
        console.log(this._api.qid)
        return await this._api.do(`servers/gd/${srvid}/u`, "GET")
    }
    forgotPassword = async (srvid, email, fcaptcha) => {
        return await this._api.do(`servers/gd/${srvid}/u/recover`, "POST", {
            fCaptchaToken: fcaptcha, email: email, hCaptchaToken: ""
        })
    }
    updateUsername = async (srvid, uname) => {
        return await this._api.do(`servers/gd/${srvid}/u`, "PUT", {uname: uname, password: "", email: ""})
    }
    updateEmail = async (srvid, email) => {
        return await this._api.do(`servers/gd/${srvid}/u`, "PUT", {uname: "", password: "", email: email})
    }
    updatePassword = async (srvid, password) => {
        return await this._api.do(`servers/gd/${srvid}/u`, "PUT", {uname: "", password: password, email: ""})
    }
    getMusic = async (srvid, mode, query = "", page = 0) => {
        return await this._api.do(`servers/gd/${srvid}/u/music`, "POST", {mode: mode, page: page, query: query})
    }
    addMusic = async (srvid, type, url) => {
        console.log(this._api.authorization)
        return await this._api.do(`servers/gd/${srvid}/u/music`, "PUT", {type: type, url: url})
    }
}
//endregion

// region Particle API
class particles {
    constructor(apix) {
        this._api = apix
    }

    search = async (data) => {
        return await this._api.do("particle/search", "POST", data)
    }

    get_user = async (reg=false) => {
        return await this._api.do(`particle/user?reg=${reg?"true":"false"}`, "GET")
    }
}
// endregion

export default useFiberAPI
export {serverFiberAPI, useLoader}