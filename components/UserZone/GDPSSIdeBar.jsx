import SideBar from "@/components/NavBar/SideBar";

import PersonIcon from '@mui/icons-material/Person';

import MusicIcon from "@/assets/icons/panel_music.svg"

import Link from "next/link";
import {useRouter} from "next/router";
import {useGlobalLocale} from "@/locales/useLocale";
import SideItem from "@/components/NavBar/SideItem";


export default function GDPSNavBar(props) {

    const router = useRouter();
    const srvid = router.query.srvid
    let action = router.pathname.split("/")
    action = action[action.length-1]

    const globalLocale = useGlobalLocale(router)

    return (
        <SideBar>
            <Link href={"/gdps/"+srvid+"/panel"} legacyBehavior>
                <SideItem icon={<PersonIcon className="h-5" />} active={action==="panel"} text={globalLocale.get('panelGDPSNav').profile} />
            </Link>
            {props.music && <Link href={"/gdps/"+srvid+"/music"} passHref legacyBehavior>
                <SideItem icon={<MusicIcon className="h-5" />} active={action==="music"} text={globalLocale.get('panelGDPSNav').music} />
            </Link>}
            {/*{srv.tariffConfig.Roles && <Link href={"/manage/gd/"+srvid+"/roles"}>*/}
            {/*    <NavItem icon={<RolesIcon/>} acetone square active={action==="roles"}>*/}
            {/*        <Tooltip title="Игроки и роли" placement="right" arrow open><span /></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>}*/}
            {/*<Link href={"/manage/gd/"+srvid+"/chests"}>*/}
            {/*    <NavItem icon={<ChestsIcon/>} acetone square active={action==="chests"}>*/}
            {/*        <Tooltip title="Сундуки" placement="right" arrow open><span /></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>*/}
            {/*{srv.tariffConfig.Quests && <Link href={"/manage/gd/"+srvid+"/quests"}>*/}
            {/*    <NavItem icon={<QuestsIcon/>} acetone square active={action==="quests"}>*/}
            {/*        <Tooltip title="Уровни и квесты" placement="right" arrow open><span /></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>}*/}
            {/*{srv.tariffConfig.Levelpacks && <Link href={"/manage/gd/"+srvid+"/levelpacks"}>*/}
            {/*    <NavItem icon={<LevelpacksIcon/>} acetone square active={action==="levelpacks"}>*/}
            {/*        <Tooltip title="Маппаки и испытания" placement="right" arrow open><span /></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>}*/}
            {/*<Link href={"/manage/gd/"+srvid+"/settings"}>*/}
            {/*    <NavItem icon={<SettingsIcon/>} acetone square active={action==="settings"}>*/}
            {/*        <Tooltip title="Настройки" placement="right" arrow open><span /></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>*/}
            {/*{srv.tariffConfig.Logs && <Link href={"/manage/gd/"+srvid+"/actions"}>*/}
            {/*    <NavItem icon={<ActionsIcon/>} acetone square active={action==="actions"}>*/}
            {/*        <Tooltip title="Действия" placement="right" arrow open><span /></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>}*/}
            {/*{srv.tariffConfig.Shops && <Link href={"/manage/gd/"+srvid+"/store"}>*/}
            {/*    <NavItem icon={<StoreIcon/>} acetone square active={action==="store"}>*/}
            {/*        <Tooltip title="Мои магазины" placement="right" arrow open><span /></Tooltip>*/}
            {/*    </NavItem>*/}
            {/*</Link>}*/}
        </SideBar>
    );
}
