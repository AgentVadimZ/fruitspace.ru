import {atom, useRecoilState} from "recoil";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {UserState} from "../states/user";



export default function AuthProvider(props) {
    const [user,setUser] = useRecoilState(UserState)
    const [cookies, setCookie, delCookie] = useCookies(["token"])
    const router = useRouter()
    useEffect(()=>{
        fetch("https://api.fruitspace.one/v1/user/sso",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]}}
        ).then(resp=>resp.json()).then((resp)=>{
            if (resp.status==="ok") {
                setUser({
                    uname: resp.uname,
                    name: resp.name,
                    surname: resp.surname,
                    is2fa: !!resp.is2fa,
                    profilePic: resp.profilePic,
                    bal: resp.bal,
                    shop_bal: resp.shop_bal,
                    usd: false,

                    notifications: resp.notifications?resp.notifications:[],

                    servers: resp.servers
                })
            }else{props.RequireAuth&&router.push("/profile/login")}
        }).catch(()=>{props.RequireAuth&&router.push("/profile/login")})
    },[cookies])

    return (<>{user.uname&&props.children}</>)
}