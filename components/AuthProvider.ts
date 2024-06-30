import {useRecoilState} from "recoil";
import useFiberAPI from "@/fiber/fiber";
import {userAtom} from "@/fiber/fiber.model";
import useSWR from "swr";
import {NextRouter} from "next/router";
import {ReactNode} from "react";

type AuthProviderArgs = {
    RequireAuth: boolean
    children?: ReactNode
    router: NextRouter
}

export default function AuthProvider({RequireAuth, children, router}: AuthProviderArgs): ReactNode {
    const api = useFiberAPI()
    const [user, setUser] = useRecoilState(userAtom)

    const {data, isLoading, error} = useSWR("/user/"+api.authorization,api.user.sso)

    data&&setUser(data)

    if(!RequireAuth)
        return children

    if(isLoading) {
        return "Loading..."
    }

    if(error || (!user.uname && !data.uname)) {
        console.log(data, isLoading, !!error, !user.uname)
        router.push(`/profile/login?redirect=${router.asPath}`)
        return "Redirecting..."
    }

    return children

}