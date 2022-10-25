import Link from "next/link";
import styles from "./NavBar/NavBar.module.css";
import {useCookies} from "react-cookie";
import NavBar from "./NavBar/NavBar";
import NavItem from "./NavBar/NavItem";
import {DropdownItem, DropdownMenu} from "./NavBar/DropDown";

import RightSvg from "./assets/icons/right.svg";
import logo from "./assets/logo.png";
import ServerSvg from "./assets/icons/server.svg";
import NotificationSvg from "./assets/icons/notification.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StoreIcon from '@mui/icons-material/Store';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import MinecraftLogo from "./assets/logos/minecraft.png"
import GDLogo from "./assets/logos/geometrydash.png"
import RockstarLogo from "./assets/logos/rockstargames.png"


export default function GlobalNav(props) {

    const [cookies, setCookie] = useCookies(["fruit_token"]);

    // useEffect(()=>{
    //     fetch("https://api.fruitspace.one/users/fetchProfile")
    // },[])

    return (
        <NavBar>
            <Link href={"/"}><img src={logo.src} className={styles.logo}></img></Link>
            <span style={{flex:1}}></span>
            <NavItem icon={<ServerSvg/>}>
                <DropdownMenu centered>
                    <DropdownItem leftIcon={<img src={MinecraftLogo.src}/>} rightIcon={<RightSvg/>}>
                        <div className={styles.MultilineItem}>
                            Minecraft
                            <span>• 0 серверов</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem leftIcon={<img src={GDLogo.src}/>} rightIcon={<RightSvg/>}>
                        <div className={styles.MultilineItem}>
                            Geometry Dash
                            <span>• 0 серверов</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem leftIcon={<img src={RockstarLogo.src}/>} rightIcon={<RightSvg/>}>
                        <div className={styles.MultilineItem}>
                            Grand Theft Auto
                            <span>• 0 серверов</span>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </NavItem>
            <NavItem icon={<NotificationSvg/>}>
                <DropdownMenu centered>
                    <DropdownItem leftIcon={<NotificationSvg/>} rightIcon={<DeleteIcon/>}>
                        <div className={styles.MultilineItem}>
                            Notification
                            <span>Важное сообщение, его стоит прочитать. Оптимальный размер до 75 символов...</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem leftIcon={<NotificationSvg/>} rightIcon={<DeleteIcon/>}>
                        <div className={styles.MultilineItem}>
                            Notification 2
                            <span>Тут уже вообще пофиг</span>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </NavItem>
            <NavItem profile icon={props.profilePic}>
                <DropdownMenu>
                    <Link href="/profile/user">
                        <DropdownItem leftIcon={<img src={"https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"}/>}
                                                    rightIcon={<RightSvg />}>M41den</DropdownItem>
                    </Link>
                    <Link href="/profile/billing">
                        <DropdownItem leftIcon={<MonetizationOnIcon/>} rightIcon={<AddCircleIcon/>}>
                            <p className={styles.BalBox}>
                                <span><AccountBalanceWalletIcon/> 3090₽</span>
                                <span><StoreIcon/> 1650₽</span>
                            </p>
                        </DropdownItem>
                    </Link>
                    <Link href="/manage/store">
                        <DropdownItem leftIcon={<StoreIcon/>} rightIcon={<RightSvg/>}>Мои магазины</DropdownItem>
                    </Link>
                </DropdownMenu>
            </NavItem>
        </NavBar>
    )
}