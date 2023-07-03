import {atom, useRecoilState} from "recoil";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {UserState} from "../states/user";
import useEffectOnce from "./Hooks";
import useFiberAPI from "../fiber/fiber";
import {userAtom} from "../fiber/fiber.model";



export default function AuthProvider(props) {
    const api = useFiberAPI()
    const router = useRouter()
    const [user, setUser] = useRecoilState(userAtom)
    useEffectOnce(()=>{
        api.user.sso().then((resp)=>{
            if (resp.status==="ok") {
                setUser(resp)
            }else{props.RequireAuth&&router.push("/profile/login")}
        }).catch(()=>{props.RequireAuth&&router.push("/profile/login")})
    },[router.pathname])
    return (<>{
        props.RequireAuth
            ?(user.uname?props.children:"Redirecting...")
            :props.children}
    </>)
}