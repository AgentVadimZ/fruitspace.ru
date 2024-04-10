import SideBar from "@/components/NavBar/SideBar";

import ServerIcon from "@/assets/icons/server.svg"
import WindowIcon from '@mui/icons-material/Window';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from "next/link";
import {useRouter} from "next/router";
import {useGlobalLocale} from "@/locales/useLocale";
import SideItem from "@/components/NavBar/SideItem";


export default function PanelSideNav(props) {

    const router = useRouter();
    const localeGlobal = useGlobalLocale(router)

    return (
        <SideBar>
            <Link href="/profile" passHref legacyBehavior>
                <SideItem icon={<WindowIcon/>} active={router.pathname==="/profile"} text={localeGlobal.get('panelSideNav').dashboard} />
            </Link>
            <Link href="/profile/servers" passHref legacyBehavior>
                <SideItem icon={<ServerIcon className="h-5" />} active={router.pathname==="/profile/servers"} text={localeGlobal.get('panelSideNav').servers} />
            </Link>
            <Link href="/profile/user" passHref legacyBehavior>
                <SideItem icon={<PersonIcon/>} active={router.pathname==="/profile/user"} text={localeGlobal.get('panelSideNav').account} />
            </Link>
            <Link href="/profile/billing" passHref legacyBehavior>
                <SideItem icon={<AccountBalanceWalletIcon/>} active={router.pathname==="/profile/billing"} text={localeGlobal.get('panelSideNav').billing} />
            </Link>
            <Link href="/particles" passHref legacyBehavior>
                <SideItem icon={<AutoAwesomeIcon/>} active={router.pathname==="/particles"} text={"Particle Hub"} />
            </Link>
        </SideBar>
    );
}