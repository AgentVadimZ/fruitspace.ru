import NavItem from "./NavBar/NavItem";
import SideBar from "./NavBar/SideBar";

import ServerIcon from "./assets/icons/server.svg"
import WindowIcon from '@mui/icons-material/Window';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import StoreIcon from '@mui/icons-material/Store';
import Link from "next/link";
import {useRouter} from "next/router";


export default function PanelSideNav(props) {

    const router = useRouter();

    return (
        <SideBar>
            <Link href="/profile" passHref>
                <NavItem icon={<WindowIcon/>} acetone square active={router.pathname==="/profile"}/>
            </Link>
            <Link href="/profile/servers" passHref>
                <NavItem icon={<ServerIcon/>} acetone square active={router.pathname==="/profile/servers"}/>
            </Link>
            <Link href="/profile/user">
                <NavItem icon={<PersonIcon/>} acetone square active={router.pathname==="/profile/user"}/>
            </Link>
            <Link href="/profile/billing">
                <NavItem icon={<AccountBalanceWalletIcon/>} acetone square active={router.pathname==="/profile/billing"}/>
            </Link>
            <Link href="/manage/store">
                <NavItem icon={<StoreIcon/>} acetone square />
            </Link>
        </SideBar>
    )
}