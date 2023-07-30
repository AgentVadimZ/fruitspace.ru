import NavItem from "../../NavBar/NavItem";
import SideBar from "../../NavBar/SideBar";

import PersonIcon from '@mui/icons-material/Person';

import StoreIcon from '@mui/icons-material/Store';
import AnalyticsIcon from "../../assets/icons/panel_analytics.svg"
import MusicIcon from "../../assets/icons/panel_music.svg"
import RolesIcon from "../../assets/icons/panel_roles.svg"
import ChestsIcon from "../../assets/icons/panel_chests.svg"
import QuestsIcon from "../../assets/icons/panel_quests.svg"
import LevelpacksIcon from "../../assets/icons/panel_levelpacks.svg"
import SettingsIcon from "../../assets/icons/panel_settings.svg"
import ActionsIcon from "../../assets/icons/panel_actions.svg"

import Link from "next/link";
import {useRouter} from "next/router";
import {Tooltip} from "@mui/material";
import {useRecoilState} from "recoil";
import GDServer from "../../../states/gd_server";
import {useEffect} from "react";
import {useCookies} from "react-cookie";
import useEffectOnce from "../../Hooks";
import {useGlobalLocale} from "../../../locales/useLocale";
import {globalLocale} from "../../../locales/loc/global";
import useFiberAPI from "../../../fiber/fiber";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlask} from "@fortawesome/free-solid-svg-icons";


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
        <SideBar>
            <Link href={"/manage/gd/"+srvid+"/"} passHref>
                <NavItem icon={<AnalyticsIcon/>} acetone square active={action==="[srvid]"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').analytics} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>
            {srv.Tariff.CustomMusic && <Link href={"/manage/gd/"+srvid+"/music"} passHref>
                <NavItem icon={<MusicIcon/>} acetone square active={action==="music"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').music} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>}
            {srv.Tariff.Roles && <Link href={"/manage/gd/"+srvid+"/roles"}>
                <NavItem icon={<RolesIcon/>} acetone square active={action==="roles"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').roles} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>}
            <Link href={"/manage/gd/"+srvid+"/chests"}>
                <NavItem icon={<ChestsIcon/>} acetone square active={action==="chests"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').chests} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>
            {srv.Tariff.Quests && <Link href={"/manage/gd/"+srvid+"/quests"}>
                <NavItem icon={<QuestsIcon/>} acetone square active={action==="quests"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').quests} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>}
            {srv.Tariff.Levelpacks && <Link href={"/manage/gd/"+srvid+"/levelpacks"}>
                <NavItem icon={<LevelpacksIcon/>} acetone square active={action==="levelpacks"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').levelpacks} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>}
            <Link href={"/manage/gd/"+srvid+"/settings"}>
                <NavItem icon={<SettingsIcon/>} acetone square active={action==="settings"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').settings} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>

            {srv.Tariff.GDLab.Enabled &&<Link href={"/manage/gd/" + srvid + "/gdlab"}>
                <NavItem icon={<FontAwesomeIcon icon={faFlask}/>} acetone square active={action === "profile"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').gdlab} placement="right" arrow
                             open><span/></Tooltip>
                </NavItem>
            </Link>}
            {srv.Tariff.Logs && <Link href={"/manage/gd/"+srvid+"/actions"}>
                <NavItem icon={<ActionsIcon/>} acetone square active={action==="actions"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').actions} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>}
            {srv.Tariff.Shops && <Link href={"/manage/gd/"+srvid+"/store"}>
                <NavItem icon={<StoreIcon/>} acetone square active={action==="store"}>
                    <Tooltip title={globalLocale.get('panelGDPSNav').shops} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>}
        </SideBar>
    ):(<></>)
}
