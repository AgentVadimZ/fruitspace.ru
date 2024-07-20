import useFiberAPI, {api} from "@/fiber/fiber"
import useSWR from "swr"
import {NextRouter} from "next/router"
import {createContext, ReactNode} from "react"
import {UserModel} from "@/fiber/fiber.model";

type AuthProviderArgs = {
    RequireAuth: boolean
    children?: ReactNode
    router: NextRouter
}

const ApiContext = createContext<api>(null)
export {ApiContext}

export default function AuthProvider({RequireAuth, children, router}: AuthProviderArgs): ReactNode {
    const api = useFiberAPI()

    const [, setUser] = api.user.useUser()
    const {data, isLoading, error} = useSWR<UserModel>("/user/"+api.authorization,api.user.sso)

    data?.uname&&setUser(data)

    if(!RequireAuth)
        return (<ApiContext.Provider value={api}>{children}</ApiContext.Provider>)

    if(isLoading) {
        return "Loading..."
    }

    if(error || (!data.uname)) {
        router.push(`/profile/login?redirect=${router.asPath}`)
        return "Redirecting..."
    }

    return (<ApiContext.Provider value={api}>{children}</ApiContext.Provider>)

}