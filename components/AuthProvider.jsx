import {useRecoilState} from "recoil";
import useEffectOnce from "./Hooks";
import useFiberAPI from "../fiber/fiber";
import {userAtom} from "../fiber/fiber.model";
import useSWR from "swr";



export default function AuthProvider({RequireAuth, children, router}) {
    const api = useFiberAPI()
    const [user, setUser] = useRecoilState(userAtom)

    const {data, isLoading, error} = useSWR("/user",api.user.sso)

    data&&setUser(data)
    data&&console.log(data)

    if(!RequireAuth)
        return children

    if(isLoading) {
        return "Loading..."
    }

    if(error||!user) {
        router.push(`/profile/login?redirect=${router.pathname}`)
        return "Redirecting..."
    }

    return children

}