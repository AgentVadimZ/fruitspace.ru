import GlobalNav from "../../components/GlobalNav";
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import PanelContent from "../../components/Global/PanelContent";
import {TabsList, TabPanel, Tab, TabButton} from "../../components/Global/Tab";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {Router, useRouter} from "next/router";
import {useEffect, useMemo, useState} from "react";
import {Button} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ServerItem from "../../components/Cards/ServerItem";
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";
import {useCookies} from "react-cookie";
import useEffectOnce from "../../components/Hooks";
import toast from "react-hot-toast";


export default function Servers(props) {
    const router = useRouter()
    const {s} = router.query;
    var route = "gd";
    const [tab, setTab] = useState(route);

    const [user,setUser] = useRecoilState(UserState)
    const [cookies, setCookie, delCookie] = useCookies(["token"])

    const [servers, setServers] = useState({
        gd: [],
        mc: [],
        gta: []
    })

    useEffectOnce(()=>{
        toast.dismiss()
    })

    useEffectOnce(()=>{
        fetch("https://api.fruitspace.one/v1/manage/list",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]}}
        ).then(resp=>resp.json()).then((resp)=>{
            if (resp.status==="ok") {
                setServers(resp)
            }
        })
    })

    useEffect(()=>{setTab(s?s:"gd")},[s])
    return (
        <>
            <GlobalHead title="Мои серверы"/>
            <GlobalNav />
            <PanelSideNav />
            <PanelContent>
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)}
                              className={"serversWindow"}>
                    <TabsList>
                        <Tab value="gd">GD</Tab>
                        <Tab value="mc">MC</Tab>
                        <Tab value="gta">GTA</Tab>
                        <TabButton><ExpandMoreIcon/></TabButton>
                    </TabsList>
                    <TabPanel value="gd">
                        {servers.gd?servers.gd.map((val, i)=>(
                            <ServerItem key={i} type="gd" name={val.srvname} plan={GetGDPlan(val.plan)}
                                        desc={ParseDesc(val.userCount, val.levelCount)} uuid={val.srvid} icon={val.icon} />
                            )):""}
                        <ServerItem type="gd" add/>
                    </TabPanel>
                    <TabPanel value="mc">
                        {/*<ServerItem type="mc"/>*/}
                        {/*<ServerItem type="mc"/>*/}
                        {/*<ServerItem type="mc"/>*/}
                        <ServerItem type="mc" add/>
                    </TabPanel>
                    <TabPanel value="gta">
                        {/*<ServerItem type="gta"/>*/}
                        {/*<ServerItem type="gta"/>*/}
                        {/*<ServerItem type="gta"/>*/}
                        <ServerItem type="gta" add/>
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

const ParseDesc=(players, levels)=>{
    let str=""+players
    let cplayers=players%10
    switch (cplayers) {
        case 1:
            str+=" игрок"
            break
        case 2:
        case 3:
        case 4:
            str+=" игрока"
            break
        default:
            str+=" игроков"
    }
    str+=" • "+levels
    let clevels=levels%10
    switch (clevels) {
        case 1:
            str+=" уровень"
            break
        case 2:
        case 3:
        case 4:
            str+=" уровня"
            break
        default:
            str+=" уровней"
    }
    return str
}