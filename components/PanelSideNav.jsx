import NavItem from "./NavBar/NavItem";
import SideBar from "./NavBar/SideBar";

import ServerIcon from "./assets/icons/server.svg"
import WindowIcon from '@mui/icons-material/Window';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StoreIcon from '@mui/icons-material/Store';
import Link from "next/link";
import {useRouter} from "next/router";
import {Tooltip} from "@mui/material";
import {useGlobalLocale} from "../locales/useLocale";


export default function PanelSideNav(props) {

    const router = useRouter();
    const localeGlobal = useGlobalLocale(router)

    return (
        <SideBar>
            <Link href="/profile" passHref>
                <NavItem icon={<WindowIcon/>} acetone square active={router.pathname==="/profile"}>
                    <Tooltip title={localeGlobal.get('panelSideNav').dashboard} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>
            <Link href="/profile/servers" passHref>
                <NavItem icon={<ServerIcon/>} acetone square active={router.pathname==="/profile/servers"}>
                    <Tooltip title={localeGlobal.get('panelSideNav').servers} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>
            <Link href="/profile/user">
                <NavItem icon={<PersonIcon/>} acetone square active={router.pathname==="/profile/user"}>
                    <Tooltip title={localeGlobal.get('panelSideNav').account} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>
            <Link href="/profile/billing">
                <NavItem icon={<AccountBalanceWalletIcon/>} acetone square active={router.pathname==="/profile/billing"}>
                    <Tooltip title={localeGlobal.get('panelSideNav').billing} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>
            <Link href="/manage/store">
                <NavItem icon={<StoreIcon/>} acetone square>
                    <Tooltip title={localeGlobal.get('panelSideNav').shops} placement="right" arrow open><span /></Tooltip>
                </NavItem>
            </Link>
        </SideBar>
    )
}