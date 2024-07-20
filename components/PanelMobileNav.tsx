import {ReactNode} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faServer, faUser, faWallet} from "@fortawesome/free-solid-svg-icons";
import {Tooltip} from "antd";
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {useRouter} from "next/router";


type PanelMobileNavProps = {
    children: ReactNode
}

export default function PanelMobileNav(props: PanelMobileNavProps) {
    return <div className="flex tablet:hidden fixed bottom-0 h-16 w-full z-50 p-2">
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
}

export function MobileNavItem(props: MobileNavItemProps) {
    
    const router = useRouter()
    const active = router.pathname === props.link
    
    return <Tooltip title={props.title}>
        <Link passHref legacyBehavior href={props.link}>
            <div className={`flex flex-col items-center gap-1 p-2 rounded-xl ${active&&"bg-primary bg-opacity-50 backdrop-blur"}`}>
                {props.img||<FontAwesomeIcon className="p-1 aspect-square" icon={props.icon}/>}
            </div>
        </Link>
    </Tooltip>
}


export function ProfileMobileNav() {
    return <PanelMobileNav>
        <MobileNavItem title="Главная" icon={faHome} link="/profile" />
        <MobileNavItem title="Главная" icon={faServer} link="/profile/servers" />
        <MobileNavItem title="Главная" icon={faUser} link="/profile/user" />
        <MobileNavItem title="Главная" icon={faWallet} link="/profile/billing" />
        <MobileNavItem title="Главная" img={<AutoAwesomeIcon className="h-6" />} link="/particles" />
    </PanelMobileNav>
}