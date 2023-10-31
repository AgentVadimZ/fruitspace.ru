import styles from './ServerItem.module.css'

import GDLogo from '../assets/logos/geometrydash.png'
import MCLogo from '../assets/logos/minecraft.png'
import CSLogo from '../assets/logos/counterstrike.png'
import QuestionMark from '../assets/icons/cross.png'
import RightSvg from "../assets/icons/right.svg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from "next/link";
import {useGlobalLocale} from "../../locales/useLocale";


export default function ServerItem(props) {

    const localeGlobal = useGlobalLocale(props.router)

    const Types = {
        "gd": GDLogo.src,
        "mc": MCLogo.src,
        "cs": CSLogo.src
    }
    return props.add?(
        <Link href={"/product/order/"+props.type}>
            <div className={styles.ServerCard}>
                <AddCircleIcon className={styles.AddIcon}/>
                <h3 className={styles.AddText}>{localeGlobal.get('create')}</h3>
            </div>
        </Link>
    ):(
        <Link href={"/manage/"+props.type+"/"+props.uuid}>
            <div className={styles.ServerCard}>
                <img className={styles.ServerIcon} src={props.icon?props.icon:(Types[props.type]||QuestionMark.src)} />
                <div className={styles.ServerBox}>
                    <h3>{props.name}</h3>
                    <p><b>{props.plan}</b> → {props.desc}</p>
                </div>
                <RightSvg className="w-8"/>
            </div>
        </Link>
    )
}