import Link from "next/link";
import styles from "./NavBar/NavBar.module.css";
import NavBar from "./NavBar/NavBar";
import NavItem from "./NavBar/NavItem";
import {DropdownItem, DropdownMenu} from "./NavBar/DropDown";

import RightSvg from "./assets/icons/right.svg";
import logo_sm from "./assets/ava.png";
import logo from "./assets/Fruitspace2.png";
import ServerSvg from "./assets/icons/server.svg";
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StoreIcon from '@mui/icons-material/Store';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import MinecraftLogo from "./assets/logos/minecraft.png"
import GDLogo from "./assets/logos/geometrydash.png"
import CSLogo from "./assets/logos/counterstrike.png"
import {useRouter} from "next/router";
import {useGlobalLocale} from "../locales/useLocale";
import useFiberAPI from "../fiber/fiber";
import {useRecoilState} from "recoil";
import {userAtom} from "../fiber/fiber.model";
import {useState} from "react";
import {HideOn} from "react-hide-on-scroll";


export default function GlobalNav(props) {

    const api = useFiberAPI()

    const [user,setUser] = useRecoilState(userAtom)
    // const user = userModel
    const router = useRouter()

    const localeGlobal = useGlobalLocale(router)

    const logout = async () => {
        api.auth.logout()
    }

    const getRegionalPostfix = localeGlobal.get('funcShowServers')

    const prettyPrint = (num)=>new Intl.NumberFormat(user.usd?'en-US':'ru-RU',
        {style: 'currency',currency: user.usd?"USD":"RUB"}).format(num).replace(/[.|,]00/g, '')

    const [open, setOpen] = useState(false)

    return (
        <NavBar mainpage={props.mainpage}>
            <Link href={"/"} legacyBehavior><img src={props.mainpage?logo_sm.src:logo.src} alt="logo" className={styles.logo}></img></Link>
            {(props.mainpage&&!['/',''].includes(router.asPath))&&
                <HideOn atHeight height={200}>
                    <h1 className="fixed top-2 left-[50%] -translate-x-[50%] hidden md:block md:text-2xl xl:text-3xl font-[Coolvetica] tracking-wider font-normal fruitText m-0 select-none">FruitSpace</h1>
                </HideOn>
            }

            <div className="flex items-center">
                {user.uname && (<>
                    <NavItem icon={<ServerSvg/>} open={open} setOpen={setOpen} name="servers">
                        <DropdownMenu centered>
                            <Link href="/profile/servers?s=mc" legacyBehavior>
                                <DropdownItem leftIcon={<img src={MinecraftLogo.src}/>} rightIcon={<RightSvg/>}>
                                    <div className={styles.MultilineItem}>
                                        Minecraft
                                        <span>• {user.servers.mc} {getRegionalPostfix(user.servers.mc)}</span>
                                    </div>
                                </DropdownItem>
                            </Link>
                            <Link href="/profile/servers?s=gd" legacyBehavior>
                                <DropdownItem leftIcon={<img src={GDLogo.src}/>} rightIcon={<RightSvg/>}>
                                    <div className={styles.MultilineItem}>
                                        Geometry Dash
                                        <span>• {user.servers.gd} {getRegionalPostfix(user.servers.gd)}</span>
                                    </div>
                                </DropdownItem>
                            </Link>
                            <Link href="/profile/servers?s=cs" legacyBehavior>
                                <DropdownItem leftIcon={<img src={CSLogo.src}/>} rightIcon={<RightSvg/>}>
                                    <div className={styles.MultilineItem}>
                                        Counter Strike
                                        <span>• {user.servers.cs} {getRegionalPostfix(user.servers.cs)}</span>
                                    </div>
                                </DropdownItem>
                            </Link>
                        </DropdownMenu>
                    </NavItem></>)}


                {user.uname ? (
                    <NavItem profile icon={<img src={user.profile_pic}/>} open={open} setOpen={setOpen} name="profile">
                        <DropdownMenu>
                            <Link href="/profile/" legacyBehavior>
                                <DropdownItem leftIcon={<img src={user.profile_pic}/>}
                                              rightIcon={<RightSvg />}>{user.uname}</DropdownItem>
                            </Link>
                            <Link href="/profile/billing" legacyBehavior>
                                <DropdownItem leftIcon={<MonetizationOnIcon/>} rightIcon={<AddCircleIcon/>}>
                                    <p className={styles.BalBox}>
                                        <span><AccountBalanceWalletIcon/> {prettyPrint(user.balance)}</span>
                                        <span><StoreIcon/> {prettyPrint(user.shop_balance)}</span>
                                    </p>
                                </DropdownItem>
                            </Link>
                            <Link href="/manage/store" legacyBehavior>
                                <DropdownItem leftIcon={<StoreIcon/>} rightIcon={<RightSvg/>}>{localeGlobal.get('navMyShops')}</DropdownItem>
                            </Link>
                            <DropdownItem leftIcon={<LogoutOutlinedIcon/>} onClick={()=>logout()}>{localeGlobal.get('navLogout')}</DropdownItem>
                        </DropdownMenu>
                    </NavItem>
                ): (<NavItem icon={<PersonIcon/>}>
                    <DropdownMenu>
                        <Link href="/profile/login" legacyBehavior><DropdownItem leftIcon={<VpnKeyIcon/>}>{localeGlobal.get('navLogin')}</DropdownItem></Link>
                    </DropdownMenu>
                </NavItem>)}
            </div>
        </NavBar>
    );
}