import GlobalHead from "@/components/GlobalHead";
import GlobalGDPSNav from "@/components/UserZone/GlobalGDPSNav";
import GDPSNavBar from "@/components/UserZone/GDPSSIdeBar";
import {Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import useFiberAPI from "@/fiber/fiber";
import PanelContent from "@/components/Global/PanelContent";


export default function Reupload(props) {

    const router = props.router

    const srvid = router.query.srvid
    const [srv, setSrv] = useState({})
    const [user, setUser] = useState({})

    const api = useFiberAPI(`gdps_token`)
    let tokens = api.authorization||{}
    const defaultId = tokens.default?.[srvid] || 0
    let token = tokens[srvid]?.[defaultId] || ""
    if(router.query.acc) {
        token = router.query.acc
    }
    api.authorization = token

    const [creds, setCreds] = useState({uname:user.uname, password: "", email: user.email})

    useEffect(()=> {
        srvid&&api.gdps_users.get(srvid).then(resp=>{
            if(!resp.uname) router.push(`/gdps/${srvid}/`)
            setUser({...resp, vessels: JSON.parse(resp.vessels||"{}")})
            setCreds({uname:resp.uname, password: "", email: resp.email})
        })
    }, [srvid, router.query.acc])

    useEffect(()=>{
        if (srvid==null) return
        api.fetch.gdpsGet(srvid).then((resp)=>{
            if(resp.srvid) setSrv(resp);
            else router.push("/");
        })
    },[srvid, router.query.acc])

    return <>
        <GlobalHead title={srv.srv_name}/>
        <GlobalGDPSNav name={srv.srv_name} icon={srv.icon} users={tokens}/>
        <GDPSNavBar plan={srv.plan}/>
        <Toaster/>
        {user.uname && <PanelContent></PanelContent>}
    </>
}