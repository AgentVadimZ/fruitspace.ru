import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";


export default function useGDPSLogin(srvid) {
    const [cookies, setCookie, delCookie] = useCookies(["acc"+srvid])

    const [user, setUser] = useState({
        uid: 0,
        uname: "",
        email: "",
        is_banned: false,

        stars: 0,
        diamonds: 0,
        coins: 0,
        ucoins: 0,
        demons: 0,
        cpoints: 0,
        orbs: 0,
        moons: 0,
        lvls_completed: 0,

        reg_date: "2000-01-01",


            icon_type: 0,
            clr_primary: 0,
            clr_secondary: 0,
            cube: 0,
            ship: 0,
            ball: 0,
            ufo: 0,
            wave: 0,
            robot: 0,
            spider: 0,
            swing: 0
    })
    const [isAuthDone, setAuthDone] = useState(false)

    const login = async (data)=> {
        let resp = await fetch("https://api.fruitspace.one/sched/gdps/login", {
            method: 'POST', body: JSON.stringify({...data, gdps: srvid}), credentials: "include"
        }).then(r => r.json())

        if (resp.status==="ok") {
            setCookie("acc"+srvid,resp.token, {path:"/",expires:new Date(new Date().getTime()+(1000*60*60*24*30)), secure:true})
        }
        return resp
    }

    const intLogin = async ()=> {
        let mk = cookies["acc"+srvid]
        if (mk==null) {
            setAuthDone(true)
            return
        }
        mk = mk.split(":")
        let udata = {
            uid: mk[0],
            ph: mk[1],
            gdps: srvid
        }
        let resp = await fetch("https://api.fruitspace.one/sched/gdps/auth", {
            method: 'POST', body: JSON.stringify(udata), credentials: "include"
        }).then(r => r.json())

        if (resp.uid) {
            setUser(resp)
        }
        setAuthDone(true)
    }

    const exec = async (url, data)=> {
        let mk = cookies["acc"+srvid]
        if (mk==null) {
            setAuthDone(true)
            return {}
        }
        mk = mk.split(":")
        let udata = {
            uid: mk[0],
            ph: mk[1],
            gdps: srvid
        }
        let resp = await fetch(url, {
            method: 'POST', body: JSON.stringify({...data, ...udata}), credentials: "include"
        }).then(r => r.json())
        setAuthDone(true)
        return resp
    }


    useEffect(()=>{
        intLogin()
    }, [cookies, srvid])

    return [user, isAuthDone, login, exec]
}

