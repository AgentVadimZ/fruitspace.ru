import Link from "next/link";
import styles from "../NavBar/NavBar.module.css";
import NavBar from "../NavBar/NavBar";

import logo from "../assets/Fruitspace2.png";

import {useRouter} from "next/router";
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