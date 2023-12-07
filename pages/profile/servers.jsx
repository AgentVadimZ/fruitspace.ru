import GlobalNav from "../../components/GlobalNav";
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import PanelContent from "../../components/Global/PanelContent";
import {TabsList, TabPanel, Tab, TabButton} from "../../components/Global/Tab";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ServerItem from "../../components/Cards/ServerItem";
import useEffectOnce from "../../components/Hooks";
import toast from "react-hot-toast";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";
import useFiberAPI from "../../fiber/fiber";


export default function Servers(props) {
    const router = useRouter()
    const {s} = router.query;
    var route = "gd";
    const [tab, setTab] = useState(route)

    const api = useFiberAPI()

    const [servers, setServers] = useState({
        gd: [],
        mc: [],
        cs: []
    })

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const ParseDesc = localeGlobal.get('funcLvlPlayerServer')

    useEffectOnce(()=>{
        toast.dismiss()
    })

    useEffectOnce(()=>{
        api.servers.list().then((resp)=>{
            if (resp.status==="ok") {
                setServers(resp)
            }
        })
    })

    useEffect(()=>{setTab(s?s:"gd")},[s])
    return (
        <>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <PanelSideNav />
            <PanelContent>
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)}
                              className={"serversWindow"}>
                    <TabsList>
                        <Tab value="gd">GD</Tab>
                        <Tab value="mc">MC</Tab>
                        <Tab value="cs">CS</Tab>
                        <TabButton><ExpandMoreIcon/></TabButton>
                    </TabsList>
                    <TabPanel value="gd">
                        {servers.gd?servers.gd.map((val, i)=>(
                            <ServerItem key={i} type="gd" name={val.srv_name} plan={GetGDPlan(val.plan)} router={props.router}
                                        desc={ParseDesc(val.user_count, val.level_count)} uuid={val.srvid} icon={val.icon} />
                            )):""}
                        <ServerItem router={props.router} type="gd" add/>
                    </TabPanel>
                    <TabPanel value="mc">
                        {/*<ServerItem type="mc"/>*/}
                        {/*<ServerItem type="mc"/>*/}
                        {/*<ServerItem type="mc"/>*/}
                        <ServerItem router={props.router} type="mc" add/>
                    </TabPanel>
                    <TabPanel value="cs">
                        {/*<ServerItem type="gta"/>*/}
                        {/*<ServerItem type="gta"/>*/}
                        {/*<ServerItem type="gta"/>*/}
                        <ServerItem router={props.router} type="cs" add/>
                    </TabPanel>
                </TabsUnstyled>
            </PanelContent>
        </>
    )
}

Servers.RequireAuth = true




const GetGDPlan=(plan)=> {
            switch (plan) {
                case 0:
                case 1: return "Press Start"
                case 2: return "Singularity"
                case 3: return "Takeoff"
                case 4: return "Overkill"
                default: return "???"
            }
}