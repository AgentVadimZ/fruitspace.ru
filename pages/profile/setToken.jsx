import {useRouter} from "next/router";
import useFiberAPI from "@/fiber/fiber";
import {useContext} from "react";
import {ApiContext} from "@/components/AuthProvider";


export default function SetToken(props) {
    const router = useRouter()
    const api = useContext(ApiContext)
    if (router.query.token) {
        api.auth.setCookieToken(router.query.token)
        router.push("/profile/")
    }
    return (
        <p>Signing you in...</p>
    )
}