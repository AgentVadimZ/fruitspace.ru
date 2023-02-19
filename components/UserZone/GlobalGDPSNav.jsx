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


export default function GlobalGDPSNav(props) {

    const [user,setUser] = useRecoilState(UserState)

    const [cookies, setCookie, delCookie] = useCookies(["token"])
    const router = useRouter()

    const logout = () => {
        delCookie("token", { path: '/' })
        router.reload()
    }

    return (
        <NavBar>
            <Link href={"/"}><>
                <img src={GDLogo.src} alt="logo" className={styles.logo}></img>
                <h2 style={{verticalAlign:"middle",fontWeight:"normal"}}>{props.name}</h2>
            </></Link>
            <span className={styles.delim} />
            <Link href={"/"}><img src={logo.src} alt="logo" className={styles.logo}></img></Link>
            <span style={{flex:1}}></span>
            { user.uname && (<><NavItem icon={<ServerSvg/>}>
                <DropdownMenu centered>
                    <Link href="/profile/servers?s=gd">
                        <DropdownItem leftIcon={<img src={GDLogo.src}/>} rightIcon={<RightSvg/>}>
                            <div className={styles.MultilineItem}>
                                Geometry Dash
                                <span>• {user.servers.gd} {getRegionalPostfix(user.servers.gd)}</span>
                            </div>
                        </DropdownItem>
                    </Link>
                </DropdownMenu>
            </NavItem>
                <NavItem icon={<NotificationSvg className={user.notifications.length!==0?"notifyAnimate":""} />}>
                    <DropdownMenu centered>
                        {user.notifications.length===0? (
                            <DropdownItem leftIcon={<NotificationsOffIcon/>}>
                                <div className={styles.MultilineItem}>
                                    Нет новых уведомлений
                                </div>
                            </DropdownItem>
                        ): (
                            user.notifications.map((notification, i)=>(
                                <DropdownItem key={i} leftIcon={<NotificationSvg/>} rightIcon={notification.target_uid!==0&&<DeleteIcon
                                    onClick={()=>deleteNotification(notification.uuid)}/>}>
                                    <div className={styles.MultilineItem}>
                                        {notification.title}
                                        <span>{notification.text}</span>
                                    </div>
                                </DropdownItem>
                            ))
                        )}
                    </DropdownMenu>
                </NavItem> </>)}


            {user.uname ? (
                <NavItem profile icon={<img src={user.profilePic}/>}>
                    <DropdownMenu>
                        <Link href="/profile/">
                            <DropdownItem leftIcon={<img src={user.profilePic}/>}
                                          rightIcon={<RightSvg />}>{user.uname}</DropdownItem>
                        </Link>
                        <Link href="/profile/billing">
                            <DropdownItem leftIcon={<MonetizationOnIcon/>} rightIcon={<AddCircleIcon/>}>
                                <p className={styles.BalBox}>
                                    <span><AccountBalanceWalletIcon/> {prettyPrint(user.bal)}</span>
                                    <span><StoreIcon/> {prettyPrint(user.shop_bal)}</span>
                                </p>
                            </DropdownItem>
                        </Link>
                        <Link href="/manage/store">
                            <DropdownItem leftIcon={<StoreIcon/>} rightIcon={<RightSvg/>}>Мои магазины</DropdownItem>
                        </Link>
                        <DropdownItem leftIcon={<LogoutOutlinedIcon/>} onClick={()=>logout()}>Выйти</DropdownItem>
                    </DropdownMenu>
                </NavItem>
            ): (<NavItem icon={<PersonIcon/>}>
                <DropdownMenu>
                    <Link href="/profile/login"><DropdownItem leftIcon={<VpnKeyIcon/>}>Войти</DropdownItem></Link>
                </DropdownMenu>
            </NavItem>)}
        </NavBar>
    )
}