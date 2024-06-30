import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import useFiberAPI from "@/fiber/fiber";


export default function SetGDPSToken(props) {
    const router = useRouter()
    const srvid = router.query.srvid

    const api = useFiberAPI(`gdps_token`)
    let tokens = api.authorization||{}
    const defaultId = tokens.default?.[srvid] || 0

    if (router.query.token) {
        if (tokens[srvid]) {
            tokens[srvid][defaultId] = resp.token
        } else {
            tokens[srvid] = [resp.token]
        }
        if (tokens.default) {
            tokens.default[srvid] = defaultId
        } else {
            tokens.default = {[srvid]: defaultId}
        }
        api.auth.setCookieToken(JSON.stringify(tokens))
        router.push(`/gdps/${srvid}/panel`)
    }
    return (
        <p>Signing you in...</p>
    )
}