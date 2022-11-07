
import styles from "./TeamMemberCard.module.css"



export default function TeamMemberCard(props) {

    return (
        <div className={styles.card}>
            <div className={styles.headBox}>
                <img alt="avatar" src={props.img}/>
                <div className={styles.nameBox}>
                    <h3>{props.name}</h3>
                    <p>{props.position}</p>
                </div>
            </div>
            <div className={styles.convBox}>
                {props.dialogue.map((e,i)=>(<p key={i} className={i%2===0?styles.convMine:styles.convUser}>{e}</p>))}
            </div>
        </div>
    )
}