/* FruitSpace API v1.0 */

import {useCookies} from "react-cookie";
import {useRecoilState} from "recoil";
import {serverGDAtom, userAtom} from "./fiber.model.js";

const DISCORD_AUTH = "https://discord.com/oauth2/authorize?client_id=1119240313605734410&response_type=code&scope=identify%20guilds%20guilds.join&state="

const api = {
    base_url: "https://api.fruitspace.one/v2/",
    authorization: "",
}

// region API

api.do = async (endpoint, method="GET", body=null) => {
    return fetch(api.base_url+endpoint,
        {method: method, body: body?JSON.stringify(body):null, headers:{"Authorization":api.authorization, "Content-Type":"application/json"}}
    ).then(r=>r.json()).catch(e=>({status:"error", message:e.message, code:"conn"}))
}
api.doForm = async (endpoint, method="GET", body=null) => {
    return fetch(api.base_url+endpoint,
        {method: method, body: body, headers:{"Authorization":api.authorization}}
    ).then(r=>r.json()).catch(e=>({status:"error", message:e.message, code:"conn"}))
}

const useFiberAPI = (cookie="token")=> {
    const [cookies, setCookie, delCookie] = useCookies([cookie])
    api.authorization = cookies[cookie]
    api.auth = auth
    auth.logout=()=>delCookie(cookie, { path: '/' })
    auth.setCookieToken=(token)=>setCookie(cookie,token,
        {path:"/",expires:new Date(new Date().getTime()+(1000*60*60*24*30)), secure:true})
    auth._api = api
    api.user = user
    user._api = api
    api.payments = payments
    payments._api = api
    api.fetch = ufetch
    ufetch._api = api
    api.servers = servers
    servers._api = api
    api.gdps_manage = gdps_manage
    gdps_manage._api = api
    api.gdps_users = gdps_users
    gdps_users._api = api
    return api
}
// endregion

// region  Auth API
const auth = {_api: api}
auth.logout = ()=>{}
auth.login = async (uname, password, hcaptcha, totp="") => {
    return await auth._api.do("auth/login","POST", {
        uname: uname,
        password: password,
        hCaptchaToken: hcaptcha,
        totp: totp
    })
}
auth.register = async (uname, name, surname, email, password, hcaptcha, lang) => {
    return await auth._api.do("auth/register","POST", {
        uname: uname,
        name: name,
        surname: surname,
        email: email,
        password: password,
        hCaptchaToken: hcaptcha,
        lang: lang
    })
}
auth.recover = async (email, hcaptcha, lang) => {
    return await auth._api.do("auth/recover", "POST", {
        email: email,
        hCaptchaToken: hcaptcha,
        lang: lang
    })
}
auth.discord = () => {
    window.location.href=DISCORD_AUTH+(auth._api.authorization?auth._api.authorization:"")
}
// endregion

// region User API
const user = {_api: api}
user.sso = async () => {
    return await user._api.do("user","GET")
}
user.useUser = ()=> {
    return useRecoilState(userAtom)
}
user.updateName = async (name, surname) => {
    return await user._api.do("user","PATCH", {
        name: name,
        surname: surname
    })
}
user.updatePassword = async (password, new_password) => {
    return await user._api.do("user","PATCH", {
        password: password,
        new_password: new_password
    })
}
user.updateTOTP = async (totp) => {
    return await user._api.do("user","PATCH", {
        totp: totp
    })
}
user.resetAvatar = async () => {
    var datax = new FormData()
    datax.append("reset", "reset")
    return await user._api.doForm("user/avatar","POST", datax)
}
user.updateAvatar = async (avatar_file) => {
    var datax = new FormData()
    datax.append("profile_pic", avatar_file)
    return await user._api.doForm("user/avatar","POST", datax)
}
// endregion

// region Payments API
const payments = {_api: api}
payments.new = async (amount, merchant)=>{
    return await payments._api.do("payments", "POST", {amount: amount, merchant: merchant})
}
payments.get = async ()=>{
    return await payments._api.do("payments", "GET")
}
//endregion

// region Fetch API
const ufetch = {_api: api}
ufetch.gdpsTariffs = async () => {
    return await ufetch._api.do("fetch/gd/tariffs","GET")
}
ufetch.gdpsTop = async (page=0) => {
    return await ufetch._api.do(`fetch/gd/top?offset=${page}`,"GET")
}
ufetch.gdpsGet = async (srvid) => {
    return await ufetch._api.do(`fetch/gd/info/${srvid}`, "GET")
}
// endregion

// region Servers API
const servers = {_api: api}
servers.list = async () => {
    return await servers._api.do("servers", "GET")
}
servers.createGDPS = async (name, tariff, duration, promocode, srvid="") => {
    return await servers._api.do("servers/gd", "POST", {
        name: name, tariff: tariff, duration: duration, promocode: promocode, srvid: srvid
    })
}
servers.useGDPS = ()=> {
    return useRecoilState(serverGDAtom)
}

//endregion

// region GDPS Manage API
const gdps_manage = {_api: api}
gdps_manage.delete = async (srvid)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}`, "DELETE")
}
gdps_manage.get = async (srvid)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}`, "GET")
}
gdps_manage.dbreset = async (srvid)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}/dbreset`, "GET")
}
gdps_manage.updateChests = async (srvid, chests)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}/chests`, "POST", chests)
}
gdps_manage.getLogs = async (srvid, type, page=0)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}/logs`, "POST", {type: type, page: page})
}
gdps_manage.getMusic = async (srvid, mode, query="", page=0)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}/music`, "POST", {mode: mode, page: page, query: query})
}
gdps_manage.addMusic = async (srvid, type, url)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}/music`, "PUT", {type: type, url: url})
}
gdps_manage.updateLogo = async (srvid, avatar_file) => {
    var datax = new FormData()
    datax.append("profile_pic", avatar_file)
    return await user._api.doForm(`servers/gd/${srvid}/icon`,"POST", datax)
}
gdps_manage.updateSettings = async (srvid, settings)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}/settings`, "POST", settings)
}
gdps_manage.buildlabPush = async (srvid, blab)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}/buildlab`, "POST", blab)
}
gdps_manage.moduleDiscord = async (srvid, enable, module)=> {
    return await gdps_manage._api.do(`servers/gd/${srvid}/modules/discord`, "PUT", {...module, enable: enable})
}
// endregion

// region GDPS Users API
const gdps_users = {_api: api}
gdps_users.login = async (srvid, uname, password, hcaptcha) => {
    return await gdps_users._api.do(`servers/gd/${srvid}/u/login`,"POST", {
        uname: uname,
        password: password,
        hCaptchaToken: hcaptcha
    })
}
gdps_users.get = async (srvid) => {
    return await gdps_users._api.do(`servers/gd/${srvid}/u`,"GET")
}
gdps_users.forgotPassword = async (srvid, email, hcaptcha) => {
    return await gdps_users._api.do(`servers/gd/${srvid}/u/recover`,"POST", {hCaptchaToken: hcaptcha, email: email})
}
gdps_users.updateUsername = async (srvid, uname) => {
    return await gdps_users._api.do(`servers/gd/${srvid}/u`,"PUT", {uname: uname, password: "", email: ""})
}
gdps_users.updateEmail = async (srvid, email) => {
    return await gdps_users._api.do(`servers/gd/${srvid}/u`,"PUT", {uname: "", password: "", email: email})
}
gdps_users.updatePassword = async (srvid, password) => {
    return await gdps_users._api.do(`servers/gd/${srvid}/u`,"PUT", {uname: "", password: password, email: ""})
}
gdps_users.getMusic = async (srvid, mode, query="", page=0)=> {
    return await gdps_users._api.do(`servers/gd/${srvid}/u/music`, "POST", {mode: mode, page: page, query: query})
}
gdps_users.addMusic = async (srvid, type, url)=> {
    return await gdps_users._api.do(`servers/gd/${srvid}/u/music`, "PUT", {type: type, url: url})
}
//endregion

export default useFiberAPI