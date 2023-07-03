import styles from './ServerItem.module.css'

import GDLogo from '../assets/logos/geometrydash.png'
import MCLogo from '../assets/logos/minecraft.png'
import GTALogo from '../assets/logos/rockstargames.png'
import QuestionMark from '../assets/icons/cross.png'
import RightSvg from "../assets/icons/right.svg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from "next/link";
import {useGlobalLocale} from "../../locales/useLocale";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown, faDownload} from "@fortawesome/free-solid-svg-icons";
import {Badge} from "@mui/material";


export default function ServerTopItem(props) {

    const Types = {
        "gdps": GDLogo.src,
        "mc": MCLogo.src,
        "gta": GTALogo.src
    }
    const colors = [
        "#d4af37",
        "#aaa9ad",
        "#cd7f32",
        "#8e388e",
        "#5a00ff"
    ]
    const color = props.place<5?colors[props.place]:"#0d63fd"

    return<div className={styles.ServerCard}>
        <img className={styles.ServerIcon} src={props.icon?props.icon:(Types[props.type]||QuestionMark.src)} />
        <div className={styles.ServerBox}>
            <h3>
                    <span className={`inline-flex justify-center items-center rounded-full h-6 min-w-[1rem] px-1`} style={{backgroundColor:color}}
                    >{props.place+1}</span> {props.name} {props.place==0&&<FontAwesomeIcon icon={faCrown} color={colors[0]} />}
            </h3>
            <p>{props.desc}</p>
        </div>
        {(props.place<5&&<Link href={`https://gofruit.space/${props.type}/${props.uuid}`}>
            <FontAwesomeIcon icon={faDownload} className="!w-6 !h-6 p-2 rounded-lg bg-[#0d6efd] hover:bg-blue-700"/>
        </Link>)}
    </div>
}