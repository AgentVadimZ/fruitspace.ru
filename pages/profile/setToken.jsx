import {useRouter} from "next/router";
import {useCookies} from "react-cookie";


export default function setToken(props) {
    const router = useRouter()
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    if (router.query.token) {
        setCookie("token",router.query.token,
            {path:"/",expires:new Date(new Date().getTime()+(1000*60*60*24*30)), secure:true})
        router.push("/profile/")
    }
    return (
        <p>Signing you in...</p>
    )
}