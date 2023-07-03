import Head from "next/head";
import GlobalNav from "../../components/GlobalNav";
import SideBar from "../../components/NavBar/SideBar";
import NavItem from "../../components/NavBar/NavItem";

import WalletIcon from '@mui/icons-material/Wallet';
import styles from '../../components/Manage/GDManage.module.css'
import ustyles from  '../../components/Panel/PanelPage.module.css'
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import useEffectOnce from "../../components/Hooks";
import toast, {Toaster} from "react-hot-toast";
import PanelContent from "../../components/Global/PanelContent";

import cardImg from '../../components/assets/bg_2.jpeg'
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";
import {useCookies} from "react-cookie";
import ParseError from "../../components/ErrParser";
import {useState} from "react";
import Link from "next/link";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";
import {loader} from "next/dist/build/webpack/config/helpers";
import useFiberAPI from "../../fiber/fiber";



export default function Index(props){

    const api = useFiberAPI()

    const [user,setUser] = api.user.useUser()

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const ParseDesc = localeGlobal.get('funcLvlPlayerServer')

    useEffectOnce(()=>{
        toast.dismiss()
    })

    return (
        <>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <PanelSideNav />
            <Toaster/>
            <PanelContent>
                <div className={styles.CardBox} style={{background:`url(${cardImg.src})`,backgroundSize:"cover",padding:0}}>
                    <div className={ustyles.wrapper}>
                        <h2>👋 {locale.get('hello')}</h2>
                        <p>
                            <Link href="/profile/user">
                            <div className={ustyles.probox}>
                                <img src={user.profile_pic} />
                                <h3>@{user.uname}</h3>
                            </div>
                            </Link>
                            <h3 className={ustyles.pointer}>👈 {locale.get('itsYou')}</h3>
                        </p>

                        {user.top_servers.gd ? <p>
                            <div className={ustyles.probox}>
                                <img src={user.top_servers.gd.icon} />
                                <Link href={"/manage/gd/"+user.top_servers.gd.srvid}>
                                <div className={ustyles.databox}>
                                    <h3>{user.top_servers.gd.srv_name}</h3>
                                    <span>{ParseDesc(user.top_servers.gd.user_count,user.top_servers.gd.level_count)}</span>
                                </div>
                                </Link>
                            </div>
                            <h3 className={ustyles.pointer}>👈 {locale.get('mostPopular')[0]}</h3>
                        </p> : <p><h3 className={ustyles.pointer}>🤔 {locale.get('mostPopular')[1]}</h3></p> }

                    </div>
                </div>
            </PanelContent>
        </>
    )
}

Index.RequireAuth = true