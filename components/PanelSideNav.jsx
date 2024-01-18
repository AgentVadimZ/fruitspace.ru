import NavItem from "./NavBar/NavItem";
import SideBar from "./NavBar/SideBar";

import ServerIcon from "./assets/icons/server.svg"
import WindowIcon from '@mui/icons-material/Window';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StoreIcon from '@mui/icons-material/Store';
import Link from "next/link";
import {useRouter} from "next/router";
import {Tooltip} from "@mui/material";
import {useGlobalLocale} from "../locales/useLocale";
import SideItem from "./NavBar/SideItem";


export default function PanelSideNav(props) {

    const router = useRouter();
    const localeGlobal = useGlobalLocale(router)

    return (
        <SideBar>
            <Link href="/profile" passHref>
                <SideItem icon={<WindowIcon/>} active={router.pathname==="/profile"} text={localeGlobal.get('panelSideNav').dashboard} />
            </Link>
            <Link href="/profile/servers" passHref>
                <SideItem icon={<ServerIcon className="h-5" />} active={router.pathname==="/profile/servers"} text={localeGlobal.get('panelSideNav').servers} />
            </Link>
            <Link href="/profile/user" passHref>
                <SideItem icon={<PersonIcon/>} active={router.pathname==="/profile/user"} text={localeGlobal.get('panelSideNav').account} />
            </Link>
            <Link href="/profile/billing" passHref>
                <SideItem icon={<AccountBalanceWalletIcon/>} active={router.pathname==="/profile/billing"} text={localeGlobal.get('panelSideNav').billing} />
            </Link>
            <Link href="/particles" passHref>
                <SideItem icon={<AutoAwesomeIcon/>} active={router.pathname==="/particles"} text={"Particle Hub"} />
            </Link>
        </SideBar>
    )
}