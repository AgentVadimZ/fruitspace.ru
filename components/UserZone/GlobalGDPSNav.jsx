import Link from "next/link";
import styles from "../NavBar/NavBar.module.css";
import NavBar from "../NavBar/NavBar";
import NavItem from "../NavBar/NavItem";
import {DropdownItem, DropdownMenu} from "../NavBar/DropDown";

import RightSvg from "../assets/icons/right.svg";
import logo from "../assets/Fruitspace2.png";
import ServerSvg from "../assets/icons/server.svg";
import NotificationSvg from "../assets/icons/notification.svg";
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StoreIcon from '@mui/icons-material/Store';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import GDLogo from "../assets/logos/geometrydash.png"

import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";
import {useCookies} from "react-cookie";
import {useGlobalLocale} from "../../locales/useLocale";


export default function GlobalGDPSNav(props) {
    const router = useRouter()

    const globalLocale = useGlobalLocale(router)


    return (
        <NavBar>
            <Link href={"/"}><>
                <img src={props.icon} alt="logo" className={styles.logo}></img>
                <h2 className="font-normal text-lg">{props.name}</h2>
            </></Link>
            <span className={styles.delim} />
            <Link href={"/"}><img src={logo.src} alt="logo" className={`${styles.logo} !h-6 lg:!h-[75%]`}></img></Link>
            <span style={{flex:1}}></span>

        </NavBar>
    )
}