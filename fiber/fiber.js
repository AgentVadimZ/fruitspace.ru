/* FruitSpace API v1.0 */

import {useCookies} from "react-cookie";
import {useRecoilState} from "recoil";
import {userAtom} from "./fiber.model.js";
import {useEffect} from "react";
import {useTraceUpdate} from "../components/Hooks";

const DISCORD_AUTH = "https://discord.com/oauth2/authorize?client_id=1119240313605734410&response_type=code&scope=identify%20guilds%20guilds.join&state="

const api = {
    base_url: "https://api.fruitspace.one/v2/",
    authorization: "",
}

api.do = async (endpoint, method="GET", body=null) => {
    return fetch(api.base_url+endpoint,
        {method: method, body: body?JSON.stringify(body):null, headers:{"Authorization":api.authorization, "Content-Type":"application/json"}}
    ).then(r=>r.json()).catch(e=>({status:"error", message:e.message, code:"conn"}))
}
api.doForm = async (endpoint, method="GET", body=null) => {
    return fetch(api.base_url+endpoint,
        {method: method, body: body, headers:{"Authorization":api.authorization,"Content-Type":"multipart/form-data"}}
    ).then(r=>r.json()).catch(e=>({status:"error", message:e.message, code:"conn"}))
}

const useFiberAPI = ()=> {
    const [cookies, setCookie, delCookie] = useCookies(["token"])
    api.authorization = cookies.token
    api.auth = auth
    auth.logout=()=>delCookie("token", { path: '/' })
    auth.setCookieToken=(token)=>setCookie("token",token,
        {path:"/",expires:new Date(new Date().getTime()+(1000*60*60*24*30)), secure:true})
    auth._api = api
    api.user = user
    user._api = api
    api.fetch = ufetch
    ufetch._api = api
    return api
}

// ---- Auth API ----
const auth = {_api: api}
auth.logout = ()=>{}
auth.login = async (uname, password, hcaptcha) => {
    return await auth._api.do("auth/login","POST", {
        uname: uname,
        password: password,
        hCaptchaToken: hcaptcha
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

// ---- User API ----
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

// ---- FETCH API ----
const ufetch = {_api: api}
ufetch.gdps_tariffs = async () => {
    return await ufetch._api.do("fetch/gd/tariffs","GET")
}
ufetch.gdps_top = async (page=0) => {
    return await ufetch._api.do(`fetch/gd/top?offset=${page}`,"GET")
}
ufetch.gdps_get = async (srvid) => {
    return await ufetch._api.do(`fetch/gd/info/${srvid}`, "GET")
}


export default useFiberAPI