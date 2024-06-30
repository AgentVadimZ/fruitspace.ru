import SideBar from "@/components/NavBar/SideBar";

import AnalyticsIcon from "@/assets/icons/panel_analytics.svg"
import MusicIcon from "@/assets/icons/panel_music.svg"
import RolesIcon from "@/assets/icons/panel_roles.svg"
import ChestsIcon from "@/assets/icons/panel_chests.svg"
import SettingsIcon from "@/assets/icons/panel_settings.svg"
import ActionsIcon from "@/assets/icons/panel_actions.svg"
import LevelpacksIcon from "@/assets/icons/panel_levelpacks.svg"

import Link from "next/link";
import {useRouter} from "next/router";
import useEffectOnce from "@/components/Hooks";
import {useGlobalLocale} from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber.ts";
import SideItem from "@/components/NavBar/SideItem";


export default function GDNavBar(props) {

    const router = useRouter();
    const srvid = router.query.srvid
    let action = router.pathname.split("/")
    action = action[action.length-1]

    const api = useFiberAPI()
    const [srv, setSrv] = api.servers.useGDPS()

    const globalLocale = useGlobalLocale(router)


    useEffectOnce(()=>{
        api.gdps_manage.get(srvid).then((resp)=>{
                if(resp.Srv) setSrv(resp);
                else router.push("/profile/servers");
        })
    })

    return srv.Tariff?(
        <SideBar sref={props.sref}>
            <Link href={"/manage/gd/"+srvid+"/"} passHref legacyBehavior>
                <SideItem icon={<AnalyticsIcon className="h-5" />} active={action==="[srvid]"} text={globalLocale.get('panelGDPSNav').analytics} />
            </Link>
            {srv.Tariff.CustomMusic && <Link href={"/manage/gd/"+srvid+"/music"} passHref legacyBehavior>
                <SideItem icon={<MusicIcon className="h-5" />} active={action==="music"} text={globalLocale.get('panelGDPSNav').music} />
            </Link>}
            {srv.Tariff.Roles && <Link href={"/manage/gd/"+srvid+"/roles"} legacyBehavior>
                <SideItem icon={<RolesIcon className="h-5" />} active={action==="roles"} text={globalLocale.get('panelGDPSNav').roles} />
            </Link>}
            <Link href={"/manage/gd/"+srvid+"/chests"} legacyBehavior>
                <SideItem icon={<ChestsIcon className="h-5" />} active={action==="chests"} text={globalLocale.get('panelGDPSNav').chests} />
            </Link>
            {/*{srv.Tariff.Quests && <Link href={"/manage/gd/"+srvid+"/quests"}>*/}
            {/*    <NavItem icon={<QuestsIcon/>} acetone square active={action==="quests"}>*/}
            {/*        <Tooltip title={globalLocale.get('panelGDPSNav').quests} placement="right" arrow open><span /></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>}*/}
            <Link href={"/manage/gd/"+srvid+"/levelpacks"} legacyBehavior>
                <SideItem icon={<LevelpacksIcon className="h-5" />} active={action==="levelpacks"} text={globalLocale.get('panelGDPSNav').levelpacks} />
            </Link>
            <Link href={"/manage/gd/"+srvid+"/settings"} legacyBehavior>
                <SideItem icon={<SettingsIcon className="h-5" />} active={action==="settings"} text={globalLocale.get('panelGDPSNav').settings} />
            </Link>

            {/*{srv.Tariff.GDLab.Enabled &&<Link href={"/manage/gd/" + srvid + "/gdlab"}>*/}
            {/*    <NavItem icon={<FontAwesomeIcon icon={faFlask}/>} acetone square active={action === "profile"}>*/}
            {/*        <Tooltip title={globalLocale.get('panelGDPSNav').gdlab} placement="right" arrow*/}
            {/*                 open><span/></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>}*/}
            {srv.Tariff.Logs && <Link href={"/manage/gd/"+srvid+"/actions"} legacyBehavior>
                <SideItem icon={<ActionsIcon className="h-5" />} active={action==="actions"} text={globalLocale.get('panelGDPSNav').actions} />
            </Link>}
            {/*{srv.Tariff.Shops && <Link href={"/manage/gd/"+srvid+"/store"}>*/}
            {/*    <NavItem icon={<StoreIcon/>} acetone square active={action==="store"}>*/}
            {/*        <Tooltip title={globalLocale.get('panelGDPSNav').shops} placement="right" arrow open><span /></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>}*/}
        </SideBar>
    ):(<></>);
}
