import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import styles from "./LineCard.module.css"
import Link from "next/link";

export default function LineCard(props) {

    return (
        <Link href={props.link?props.link:""}>
            <div className={styles.LineCard}>
                {props.logo}
                <h3>{props.title}</h3>
                <span style={{flex:1}} />
                <ChevronRightIcon />
            </div>
        </Link>
    )
}