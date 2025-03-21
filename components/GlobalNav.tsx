import Link from "next/link";
import styles from "@/components/NavBar/NavBar.module.css";
import NavBar from "@/components/NavBar/NavBar";
import logo_sm from "@/assets/ava.png";
import logo from "@/assets/Fruitspace2.png";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import MinecraftLogo from "@/assets/logos/minecraft.png"
import GDLogo from "@/assets/logos/geometrydash.png"
import {useRouter} from "next/router";
import {useGlobalLocale} from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber";
import {useState} from "react";
import {HideOn} from "react-hide-on-scroll";
import {Button, Drawer} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronRight,
    faCircleDollarToSlot, faCube, faLayerGroup, faNewspaper,
    faRightFromBracket,
    faShop, faSquare,
    faWallet
} from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


const links = [
    {
        text: "Хостинг игр",
        items: [
            {
                text: "Geometry Dash",
                link: "/product/gd",
                icon: faSquare
            }
        ]
    },
    {
        text: "Сообщество",
        items: [
            {
                text: "Документация",
                link: "/docs",
                icon: faLayerGroup
            }
        ]
    },
    {
        text: "О FruitSpace",
        link: "/about"
    }
] as NavLinkProps[]


export default function GlobalNav({mainpage}: {mainpage?: boolean}) {

    const api = useFiberAPI()

    const [user,] = api.user.useUser()
    // const user = userModel
    const router = useRouter()

    const localeGlobal = useGlobalLocale(router)

    const logout = async () => {
        api.auth.logout()
    }

    const getRegionalPostfix = localeGlobal.get('funcShowServers')

    const prettyPrint = (num) => new Intl.NumberFormat('ru-RU',
        {style: 'currency', currency: "RUB"}).format(num).replace(/[.|,]00/g, '')

    const [open, setOpen] = useState(false)

    const [drawer, setDrawer] = useState(false)

    return (
        <NavBar mainpage={mainpage}>
            <Link href={"/"} legacyBehavior>
                {mainpage ? <img src={logo_sm.src} alt="logo" className={styles.logo}/>
                    : <img src={logo.src} alt="logo" className="h-8 ml-1 cursor-pointer"/>}
            </Link>
            {(mainpage && !['/', ''].includes(router.pathname)) &&
                <HideOn atHeight height={120}>
                    <Link href="/"
                          className="fixed top-4 desktop:top-3 left-16 hidden ipad:block ipad:text-2xl desktop:text-3xl font-[Coolvetica] tracking-wider font-normal fruitText m-0 select-none">FruitSpace</Link>
                </HideOn>
            }

            <div className={`hidden laptop:flex fixed top-2 left-1/2 -translate-x-1/2 items-center gap-2 rounded-xl backdrop-blur bg-active bg-opacity-50 ${mainpage?"glassb":""}`}>
                {
                    links.map((item, i) => NavLink({...item, key: i}))
                }
            </div>

            <div className="flex items-center gap-2">
                {user.uname ?
                    <div className="relative">
                        <img src={user.profile_pic} onClick={() => setOpen(!open)}
                             className="rounded-full h-10 border-1 border-solid border-white border-opacity-25
                             cursor-pointer hover:brightness-110"/>
                        {open && <div className="flex flex-col gap-4 absolute top-full mt-2 right-0 rounded-xl p-2 z-[9999]
                    bg-active backdrop-blur bg-opacity-50 border-1 border-solid border-white border-opacity-25 w-72">

                            <Link href="/profile"
                                  className="flex items-center gap-2 p-1 pr-3 cursor-pointer rounded-lg hover:bg-subtle">
                                <img src={user.profile_pic} className="rounded-full h-12 w-12"/>
                                <div className="flex flex-col flex-1">
                                    <p className="text-lg font-mono -mb-1">{user.uname}</p>
                                    <Button className="w-fit" size="small"
                                            icon={<FontAwesomeIcon icon={faRightFromBracket}/>}
                                            type="text" danger onClick={(e) => {
                                        e.preventDefault()
                                        logout()
                                    }}>
                                        Выйти
                                    </Button>
                                </div>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </Link>
                            <div className="flex items-center gap-2 p-1 rounded-lg">
                                <div className="w-12 h-12 flex items-center justify-center"><FontAwesomeIcon
                                    icon={faCircleDollarToSlot} className="text-2xl"/></div>
                                <div className="flex flex-col flex-1 bg-subtle rounded-lg border-1 border-solid
                                    border-white border-opacity-25">
                                    <div className="flex items-center">
                                        <span className="flex items-center gap-2 px-1.5 py-1 border-r-1
                                    border-white border-opacity-25 flex-1">
                                            <FontAwesomeIcon icon={faWallet}/>
                                            <span className="text-sm">{prettyPrint(user.balance)}</span>
                                        </span>
                                        <span className="flex items-center gap-2 px-1.5 py-1 flex-1">
                                            <FontAwesomeIcon icon={faShop}/>
                                            <span className="text-sm">{prettyPrint(user.shop_balance)}</span>
                                        </span>
                                    </div>
                                    <Link href="/profile/billing" className="px-2 py-1 border-t-[1px] border-white border-opacity-25 text-sm
                                    gap-1.5 flex items-center hover:bg-btn rounded-b-lg">
                                        Кошелек <FontAwesomeIcon icon={faChevronRight} className="text-xs"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-1 rounded-lg text-sm">
                                <span className="w-full border-b-[1px] border-white border-opacity-25"></span>
                                <div className="flex flex-col gap-2 w-full">
                                    <Link className="flex gap-1 items-center rounded-lg hover:bg-subtle p-1
                                    border-1 border-solid border-white border-opacity-25 cursor-pointer select-none"
                                          href="/profile/servers?s=mc">
                                        <img src={MinecraftLogo.src} className="h-12"/>
                                        <div>
                                            <p>Minecraft</p>
                                            <p className="text-xs">{user.servers.mc} {getRegionalPostfix(user.servers.mc)}</p>
                                        </div>
                                    </Link>
                                    <Link className="flex gap-1 items-center rounded-lg hover:bg-subtle p-1
                                    border-1 border-solid border-white border-opacity-25 cursor-pointer select-none"
                                          href="/profile/servers?s=gd">
                                        <img src={GDLogo.src} className="h-12"/>
                                        <div>
                                            <p>Geometry Dash</p>
                                            <p className="text-xs">{user.servers.gd} {getRegionalPostfix(user.servers.gd)}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>}
                        {open &&
                            <div onClick={() => setOpen(false)} className="fixed top-0 left-0 w-full h-full"/>}
                    </div>
                    : <Link href="/profile/login" className="select-none bg-subtle py-2 px-4 rounded-full flex items-center gap-2 bg-opacity-50 backdrop-blur-sm
                border-1 border-solid border-white border-opacity-25 hover:bg-opacity-50">
                        <VpnKeyIcon/>
                        Войти
                    </Link>}
                <div className="relative laptop:hidden">
                    <p className="flex justify-center items-center h-11 w-11 rounded-xl backdrop-blur bg-subtle bg-opacity-50 -mr-2"
                    onClick={()=>setDrawer(true)}>
                        <FontAwesomeIcon className="text-lg" icon={faBars}/>
                    </p>
                    <Drawer open={drawer} onClose={()=>setDrawer(false)} width="75vw"
                    className="!bg-active !bg-opacity-75 !backdrop-blur">
                        <div className="flex flex-col gap-2">
                            {
                                links.map((item, i) => DrawerLink({...item, key: i}))
                            }
                        </div>
                    </Drawer>
                </div>
            </div>
        </NavBar>
    );
}

type NavLinkProps = {
    key: number
    inner?: boolean
    icon?: IconProp
    link?: string
    text: string
    items?: NavLinkProps[]
}

const NavLink = ({key, inner, icon, link, text, items}: NavLinkProps) => {
    return <div className={`relative group ${inner?"p-0":"p-2"}`} key={key}>
        {
            link
                ? <Link href={link} className="flex gap-2 items-center font-now text-sm leading-none rounded-lg cursor-pointer
                bg-subtle bg-opacity-0 backdrop-blur px-4 py-3 text-gray-300 hover:text-white hover:bg-opacity-75 text-nowrap transition-all duration-150">
                    {icon&&<FontAwesomeIcon icon={icon} />} {text}
                </Link>
                : <>
                    <p className="flex gap-2 items-center font-now text-sm leading-none rounded-lg cursor-pointer
                bg-subtle bg-opacity-0 backdrop-blur px-4 py-3 text-gray-300 group-hover:text-white group-hover:bg-opacity-75 transition-all duration-150">
                        {text}
                        <FontAwesomeIcon className="text-xs" icon={faChevronDown}/>
                    </p>
                    <div className="hidden group-hover:flex flex-col bg-[#1a1a20] glassb rounded-xl
                    absolute top-full left-2 z-[9999] p-2 gap-2 min-w-40">
                        {items?.map((item, i)=>NavLink({...item, key: i, inner: true}))}
                    </div>

                </>
        }
    </div>
}

const DrawerLink = ({key, icon, link, text, items}: NavLinkProps) => {
    return link
        ? <Link key={key} href={link} className={`flex gap-2 items-center font-now leading-none rounded-lg cursor-pointer
    bg-subtle bg-opacity-50 backdrop-blur p-4 text-gray-300 hover:text-white hover:bg-opacity-100 text-nowrap`}>
            {icon&&<FontAwesomeIcon icon={icon} />} {text}
            </Link>
            : <div key={key} className="bg-subtle bg-opacity-50 backdrop-blur rounded-lg">
                <p className="flex gap-2 items-center justify-between font-now leading-none cursor-pointer
                p-4 text-gray-300 hover:text-white text-nowrap border-b-1 border-white border-opacity-25">
                    {text}
                    <FontAwesomeIcon className="text-xs" icon={faChevronDown}/>
                </p>
            {
                items?.map((val, i) => (
                    <Link key={i} href={val.link} className={`flex gap-2 items-center font-now leading-none rounded-lg cursor-pointer
                    p-4 text-gray-300 hover:text-white hover:bg-opacity-100 text-nowrap`}>
                        {val.icon&&<FontAwesomeIcon icon={val.icon} />} {val.text}
                    </Link>
                ))
            }
        </div>

}