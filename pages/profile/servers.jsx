import GlobalNav from "@/components/GlobalNav";
import PanelSideNav from "@/components/PanelSideNav";
import GlobalHead from "@/components/GlobalHead";
import PanelContent from "@/components/Global/PanelContent";
import {TabsList, TabPanel, Tab, TabButton} from "@/components/Global/Tab";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ServerItem from "@/components/Cards/ServerItem";
import useEffectOnce from "@/components/Hooks";
import toast from "react-hot-toast";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHardDrive, faMemory, faMicrochip} from "@fortawesome/free-solid-svg-icons";
import {ProfileMobileNav} from "@/components/PanelMobileNav";


export default function Servers(props) {
    const router = useRouter()
    const {s} = router.query;
    const route = "gd";
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
            <ProfileMobileNav />
            <PanelContent>
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)}
                              className={"serversWindow"}>
                    <TabsList>
                        <Tab value="gd">GD</Tab>
                        <Tab value="mc">MC</Tab>
                        <Tab value="cs">CS</Tab>
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
                        {servers.mc?servers.mc.map((val, i)=> {
                                const plan = GetMCPlan(val.plan)
                                return <ServerItem key={i} type="mc" name={val.srv_name} plan={plan.title} router={props.router}
                                        desc={<span className="flex items-center gap-2">
                                        <span><FontAwesomeIcon icon={faMicrochip}/> {plan.cpus}</span>
                                        •
                                        <span><FontAwesomeIcon icon={faMemory} /> {plan.minRam==plan.maxRam
                                            ?plan.maxRam
                                            :`${plan.minRam}→${plan.maxRam}`} GB</span>
                                        •
                                        <span><FontAwesomeIcon icon={faHardDrive}/> {plan.ssd+val.add_disk} GB</span>
                                        </span>} uuid={val.srvid} icon={''} />
                            }):""}
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
                case 4: return "Foundation"
                default: return "???"
            }
}

const GetMCPlan=(plan)=>{
    return mc_tariffs[plan]||{
        title: "Unknown",
        id: "u",
        cpus: 0,
        minRam: 0,
        maxRam: 0,
        ssd: 0
    }
}

const mc_tariffs = {
    d1: {
        title: "Next ⋙",
        id: "D-1 S",
        price: 350,
        cpus: 1,
        minRam: 2,
        maxRam: 4,
        ssd: 20
    },
    d2: {
        title: "Reforged",
        id: "D-2 S+",
        price: 700,
        cpus: 2,
        minRam: 4,
        maxRam: 8,
        ssd: 30
    },
    d3: {
        title: "EverPeak",
        id: "D-3 M",
        price: 1300,
        cpus: 3,
        minRam: 8,
        maxRam: 12,
        ssd: 45
    },
    d4: {
        title: "Orbital",
        id: "D-4 M+",
        price: 1700,
        cpus: 4,
        minRam: 8,
        maxRam: 16,
        ssd: 60
    },
    d5: {
        title: "Horizon",
        id: "D-5 L",
        price: 2600,
        cpus: 5,
        minRam: 16,
        maxRam: 24,
        ssd: 100
    },
    s1: {
        title: "Air",
        id: "S-1 S~",
        price: 550,
        cpus: 1,
        minRam: 4,
        maxRam: 4,
        ssd: 30
    },
    s2: {
        title: "Viper",
        id: "S-2 S++",
        price: 1000,
        cpus: 2,
        minRam: 8,
        maxRam: 8,
        ssd: 40
    },
    s3: {
        title: "Carbon",
        id: "S-3 M~",
        price: 1500,
        cpus: 3,
        minRam: 12,
        maxRam: 12,
        ssd: 60
    },
    s4: {
        title: "Proton",
        id: "S-4 M++",
        price: 2300,
        cpus: 4,
        minRam: 16,
        maxRam: 16,
        ssd: 80
    },
    s5: {
        title: "Warp",
        id: "S-5 L+",
        price: 3200,
        cpus: 5,
        minRam: 24,
        maxRam: 24,
        ssd: 120
    },
}