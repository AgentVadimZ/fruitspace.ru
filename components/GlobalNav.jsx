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
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VpnKeyIcon from '@mui/icons-material/VpnKey';import StoreIcon from '@mui/icons-material/Store';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

import MinecraftLogo from "./assets/logos/minecraft.png"
import GDLogo from "./assets/logos/geometrydash.png"
import RockstarLogo from "./assets/logos/rockstargames.png"
import {useEffect, useState} from "react";


const getRegionalPostfix = (num)=> {
    num%=10
    switch (num) {
        case 1:
            return "сервер"
        case 2:
        case 3:
        case 4:
            return "сервера"
        default:
            return "серверов"

    }
}

export default function GlobalNav(props) {

    const [navData, setNavData] = useState({
        uname: null,
        profilePic: null,
        bal: 0,
        shop_bal: 0,
        usd: false,

        notifications: [],

        servers: {
            mc: 0,
            gd: 0,
            gta: 0,
        }
    })


    useEffect(()=>{
        fetch("https://api.fruitspace.one/v1/user/sso",{credentials:"include"}).then(resp=>resp.json()).then((resp)=>{
            if (resp.status==="ok") {
                setNavData({
                    uname: resp.uname,
                    profilePic: resp.profilePic,
                    bal: resp.bal,
                    shop_bal: 0,
                    usd: false,

                    notifications: [],

                    servers: {
                        mc: 0,
                        gd: 0,
                        gta: 0,
                    }
                })
            }
        })
    },[])

    return (
        <NavBar>
            <Link href={"/"}><img src={logo.src} className={styles.logo}></img></Link>
            <span style={{flex:1}}></span>
            { navData.uname && (<><NavItem icon={<ServerSvg/>}>
                <DropdownMenu centered>
                    <DropdownItem leftIcon={<img src={MinecraftLogo.src}/>} rightIcon={<RightSvg/>}>
                        <div className={styles.MultilineItem}>
                            Minecraft
                            <span>• {navData.servers.mc} {getRegionalPostfix(navData.servers.mc)}</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem leftIcon={<img src={GDLogo.src}/>} rightIcon={<RightSvg/>}>
                        <div className={styles.MultilineItem}>
                            Geometry Dash
                            <span>• {navData.servers.gd} {getRegionalPostfix(navData.servers.gd)}</span>
                        </div>
                    </DropdownItem>
                    <DropdownItem leftIcon={<img src={RockstarLogo.src}/>} rightIcon={<RightSvg/>}>
                        <div className={styles.MultilineItem}>
                            Grand Theft Auto
                            <span>• {navData.servers.gta} {getRegionalPostfix(navData.servers.gta)}</span>
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </NavItem>
            <NavItem icon={<NotificationSvg/>}>
                <DropdownMenu centered>
                    {navData.notifications.length===0? (
                        <DropdownItem leftIcon={<NotificationsOffIcon/>}>
                            <div className={styles.MultilineItem}>
                                Нет новых уведомлений
                            </div>
                        </DropdownItem>
                    ): (
                        navData.notifications.map((notification, i)=>(
                            <DropdownItem key={i} leftIcon={<NotificationSvg/>} rightIcon={<DeleteIcon/>}>
                                <div className={styles.MultilineItem}>
                                    {notification.title}
                                    <span>{notification.text}</span>
                                </div>
                            </DropdownItem>
                        ))
                    )}

                    {/*<DropdownItem leftIcon={<NotificationSvg/>} rightIcon={<DeleteIcon/>}>*/}
                    {/*    <div className={styles.MultilineItem}>*/}
                    {/*        Сообщение для Naizura*/}
                    {/*        <span>Сюда помещается 75 символов, учти это</span>*/}
                    {/*    </div>*/}
                    {/*</DropdownItem>*/}
                </DropdownMenu>
            </NavItem> </>)}


            {navData.uname ? (
                <NavItem profile icon={<img src={navData.profilePic}/>}>
                    <DropdownMenu>
                    <Link href="/profile/user">
                        <DropdownItem leftIcon={<img src={navData.profilePic}/>}
                                                    rightIcon={<RightSvg />}>{navData.uname}</DropdownItem>
                    </Link>
                    <Link href="/profile/billing">
                        <DropdownItem leftIcon={<MonetizationOnIcon/>} rightIcon={<AddCircleIcon/>}>
                            <p className={styles.BalBox}>
                                <span><AccountBalanceWalletIcon/> {navData.bal}{navData.usd?"$":"₽"}</span>
                                <span><StoreIcon/> {navData.shop_bal}{navData.usd?"$":"₽"}</span>
                            </p>
                        </DropdownItem>
                    </Link>
                    <Link href="/manage/store">
                        <DropdownItem leftIcon={<StoreIcon/>} rightIcon={<RightSvg/>}>Мои магазины</DropdownItem>
                    </Link>
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