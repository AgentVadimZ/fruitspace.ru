
import styles from "./FeatureCard.module.css"


export default function FeatureCard(props) {

    return <div className={styles.card}>
        <img src={props.img}/>
        <div className={styles.cardContent}>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
            {/*<span><Link href={"#"}>ССЫЛКА</Link> ➔</span>*/}
            <span>{props.subtext}</span>
        </div>
    </div>
}