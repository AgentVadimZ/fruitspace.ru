import {useRouter} from "next/router";
import {useCookies} from "react-cookie";


export default function SetGDPSToken(props) {
    const router = useRouter()
    const srvid = router.query.srvid
    const [cookies, setCookie, removeCookie] = useCookies([`acc${srvid}`])
    if (router.query.token) {
        setCookie(`acc${srvid}`,router.query.token,
            {path:"/",expires:new Date(new Date().getTime()+(1000*60*60*24*30)), secure:true})
        router.push(`/gdps/${srvid}/panel`)
    }
    return (
        <p>Signing you in...</p>
    )
}