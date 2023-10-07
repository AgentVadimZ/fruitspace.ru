import Link from "next/link";
import styles from "./NavBar/NavBar.module.css";
import NavBar from "./NavBar/NavBar";
import NavItem from "./NavBar/NavItem";
import {DropdownItem, DropdownMenu} from "./NavBar/DropDown";

import RightSvg from "./assets/icons/right.svg";
import logo_sm from "./assets/ava.png";
import logo from "./assets/Fruitspace2.png";
import ServerSvg from "./assets/icons/server.svg";
import NotificationSvg from "./assets/icons/notification.svg";
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StoreIcon from '@mui/icons-material/Store';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import MinecraftLogo from "./assets/logos/minecraft.png"
import GDLogo from "./assets/logos/geometrydash.png"
import RockstarLogo from "./assets/logos/rockstargames.png"
import {useRouter} from "next/router";
import {useGlobalLocale} from "../locales/useLocale";
import useFiberAPI from "../fiber/fiber";
import {useRecoilState} from "recoil";
import {userAtom} from "../fiber/fiber.model";


export default function GlobalNav(props) {

    const api = useFiberAPI()

    const [user,setUser] = useRecoilState(userAtom)
    // const user = userModel
    const router = useRouter()

    const localeGlobal = useGlobalLocale(router)

    const logout = () => {
        api.auth.logout()
        router.reload()
    }

    const deleteNotification = (notif)=> {
        fetch("https://api.fruitspace.one/v1/user/del_notification",
            {credentials:"include", method: "POST", headers: {"Authorization": api.authorization},
                body: JSON.stringify({uuid: notif})}).then(()=>{
                    let not = structuredClone(user.notifications)
                    for (let i=0;i<not.length;i++)
                        if(not.at(i).uuid===notif)
                            not.splice(i,1)
                    setUser({...user,notifications: not})

        }).catch(()=>{})
    }

    const getRegionalPostfix = localeGlobal.get('funcShowServers')

    const prettyPrint = (num)=>new Intl.NumberFormat(user.usd?'en-US':'ru-RU',
        {style: 'currency',currency: user.usd?"USD":"RUB"}).format(num).replace(/[.|,]00/g, '')

    return (
        <NavBar mainpage={props.mainpage}>
            <Link href={"/"}><img src={props.mainpage?logo_sm.src:logo.src} alt="logo" className={styles.logo}></img></Link>
            <span style={{flex:1}}></span>
            { user.uname && (<><NavItem icon={<ServerSvg/>}>
                <DropdownMenu centered>
                    <Link href="/profile/servers?s=mc">
                    <DropdownItem leftIcon={<img src={MinecraftLogo.src}/>} rightIcon={<RightSvg/>}>
                        <div className={styles.MultilineItem}>
                            Minecraft
                            <span>• {user.servers.mc} {getRegionalPostfix(user.servers.mc)}</span>
                        </div>
                    </DropdownItem>
                    </Link>
                    <Link href="/profile/servers?s=gd">
                    <DropdownItem leftIcon={<img src={GDLogo.src}/>} rightIcon={<RightSvg/>}>
                        <div className={styles.MultilineItem}>
                            Geometry Dash
                            <span>• {user.servers.gd} {getRegionalPostfix(user.servers.gd)}</span>
                        </div>
                    </DropdownItem>
                    </Link>
                    <Link href="/profile/servers?s=gta">
                    <DropdownItem leftIcon={<img src={RockstarLogo.src}/>} rightIcon={<RightSvg/>}>
                        <div className={styles.MultilineItem}>
                            Grand Theft Auto
                            <span>• {user.servers.gta} {getRegionalPostfix(user.servers.gta)}</span>
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
                                {localeGlobal.get('navNoNewNotifications')}
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


            {user.status ? (
                <NavItem profile icon={<img src={user.profile_pic}/>}>
                    <DropdownMenu>
                    <Link href="/profile/">
                        <DropdownItem leftIcon={<img src={user.profile_pic}/>}
                                                    rightIcon={<RightSvg />}>{user.uname}</DropdownItem>
                    </Link>
                    <Link href="/profile/billing">
                        <DropdownItem leftIcon={<MonetizationOnIcon/>} rightIcon={<AddCircleIcon/>}>
                            <p className={styles.BalBox}>
                                <span><AccountBalanceWalletIcon/> {prettyPrint(user.balance)}</span>
                                <span><StoreIcon/> {prettyPrint(user.shop_balance)}</span>
                            </p>
                        </DropdownItem>
                    </Link>
                    <Link href="/manage/store">
                        <DropdownItem leftIcon={<StoreIcon/>} rightIcon={<RightSvg/>}>{localeGlobal.get('navMyShops')}</DropdownItem>
                    </Link>
                        <DropdownItem leftIcon={<LogoutOutlinedIcon/>} onClick={()=>logout()}>{localeGlobal.get('navLogout')}</DropdownItem>
                </DropdownMenu>
                </NavItem>
            ): (<NavItem icon={<PersonIcon/>}>
                <DropdownMenu>
                    <Link href="/profile/login"><DropdownItem leftIcon={<VpnKeyIcon/>}>{localeGlobal.get('navLogin')}</DropdownItem></Link>
                </DropdownMenu>
            </NavItem>)}
        </NavBar>
    )
}