import styles from "./MetaCard.module.css"
import Image from "next/image";

export default function MetaCard(props) {
    return (
        <div className={props.double?styles.doublecard:styles.card}>
            <img src={props.image}/>
            <p className={styles.text}>{props.text}</p>
        </div>
    )
}