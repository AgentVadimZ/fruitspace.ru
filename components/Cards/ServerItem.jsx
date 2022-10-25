import styles from './ServerItem.module.css'

import GDLogo from '../assets/logos/geometrydash.png'
import MCLogo from '../assets/logos/minecraft.png'
import GTALogo from '../assets/logos/rockstargames.png'
import QuestionMark from '../assets/icons/cross.png'
import RightSvg from "../assets/icons/right.svg";
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function ServerItem(props) {

    const Types = {
        "gd": GDLogo.src,
        "mc": MCLogo.src,
        "gta": GTALogo.src
    }
    return props.type==="add"?(
        <div className={styles.ServerCard}>
            <AddCircleIcon className={styles.AddIcon}/>
            <h3 className={styles.AddText}>Добавить</h3>
        </div>
    ):(
        <div className={styles.ServerCard}>
            <img className={styles.ServerIcon} src={Types[props.type]||QuestionMark.src} />
            <div className={styles.ServerBox}>
                <h3>{props.name}</h3>
                <p>{props.plan} → {props.desc}</p>
            </div>
            <RightSvg/>
        </div>
    )
}