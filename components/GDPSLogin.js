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

    useEffect(()=>{

    }, [cookies])

    return [user, "creds", "idk"]
}