import {ReactNode} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChartLine, faCog,
    faCompactDisc, faGear,
    faHome, faMasksTheater,
    faMusic,
    faServer,
    faUser,
    faWallet
} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "antd";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {useRouter} from "next/router";
import RolesIcon from "@/assets/icons/panel_roles.svg";
import SettingsIcon from "@/assets/icons/panel_settings.svg";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import LevelpacksIcon from "@/assets/icons/panel_levelpacks.svg";
import ChestsIcon from "@/assets/icons/panel_chests.svg";
import ActionsIcon from "@/assets/icons/panel_actions.svg";


type PanelMobileNavProps = {
    children: ReactNode
}

export default function PanelMobileNav(props: PanelMobileNavProps) {
    return <div className="flex tablet:hidden fixed bottom-0 h-16 w-full z-[100] p-2">
        <div className="flex items-center gap-4 justify-between px-1
        bg-active bg-opacity-50 backdrop-blur glassb rounded-2xl flex-1">
            {props.children}
        </div>
    </div>
}


type MobileNavItemProps = {
    title: string
    icon?: IconDefinition
    link: string
    img?: ReactNode
    children?: ReactNode
}

export function MobileNavItem(props: MobileNavItemProps) {
    
    const router = useRouter()
    const active = router.asPath === props.link
    
    return <Tooltip title={<span className="bg-active glassb px-1.5 py-0.5 rounded">{props.title}</span>}>
        <Link passHref legacyBehavior href={props.link}>
            <div className={`flex flex-col items-center gap-1 p-2 rounded-xl ${active&&"bg-primary bg-opacity-50 backdrop-blur"}`}>
                {props.img||<FontAwesomeIcon className="p-1 aspect-square" icon={props.icon}/>}
            </div>
        </Link>
    </Tooltip>
}


export function MobileNavMenuItem(props: MobileNavItemProps) {

    const router = useRouter()
    const active = router.asPath === props.link

    return <Link passHref legacyBehavior href={props.link}>
        <div
            className={`flex w-fit items-center gap-2 p-2 rounded-xl ${active && "bg-primary bg-opacity-50 backdrop-blur"}`}>
            {props.img || <FontAwesomeIcon className="p-1 aspect-square" icon={props.icon}/>}
            <span className="text-sm text-nowrap">{props.title}</span>
        </div>
    </Link>
}

export function MobileNavMenu(props: MobileNavItemProps) {

    return <div className="flex flex-col items-center gap-1 p-2 rounded-xl relative group">
        {props.img || <FontAwesomeIcon className="p-1 aspect-square" icon={props.icon}/>}
        <div className="hidden group-hover:flex absolute bottom-12 right-0 p-0.5 glassb rounded-xl bg-active bg-opacity-95 flex-col gap-1">
            {props.children}
        </div>
    </div>
}


export function ProfileMobileNav() {
    return <PanelMobileNav>
        <MobileNavItem title="Главная" icon={faHome} link="/profile"/>
        <MobileNavItem title="Мои серверы" icon={faServer} link="/profile/servers"/>
        <MobileNavItem title="Аккаунт" icon={faUser} link="/profile/user"/>
        <MobileNavItem title="Биллинг" icon={faWallet} link="/profile/billing" />
        <MobileNavItem title="Particle Hub" img={<AutoAwesomeIcon className="h-6" />} link="/particles" />
    </PanelMobileNav>
}

export function GDPSAdminMobileNav({srvid}: {srvid: string}) {
    return <PanelMobileNav>
        <MobileNavItem title="Главная" icon={faChartLine} link={`/manage/gd/${srvid}`} />
        <MobileNavItem title="Главная" icon={faMusic} link={`/manage/gd/${srvid}/music`} />
        <MobileNavItem title="Главная" img={<RolesIcon className="h-6 p-0.5" />} link={`/manage/gd/${srvid}/roles`} />
        <MobileNavItem title="Главная" img={<SettingsIcon className="h-6 p-0.5" />} link={`/manage/gd/${srvid}/settings`} />
        <MobileNavMenu title="Главная" icon={faBars} link="">
            <MobileNavMenuItem title="Паки уровней" img={<LevelpacksIcon className="h-6 p-0.5" />} link={`/manage/gd/${srvid}/levelpacks`} />
            <MobileNavMenuItem title="Сундуки" img={<ChestsIcon className="h-6 p-0.5" />} link={`/manage/gd/${srvid}/chests`} />
            <MobileNavMenuItem title="Действия" img={<ActionsIcon className="h-6 p-0.5" />} link={`/manage/gd/${srvid}/actions`} />
        </MobileNavMenu>
    </PanelMobileNav>
}