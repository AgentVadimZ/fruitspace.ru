
import styles from "./TeamMemberCard.module.css"



export default function TeamMemberCard(props) {

    const parseAttachments = (text) => {
        let mtext = text.split("##")
        let att;
        if (mtext.length>1) {
            let typea=mtext[1].substring(0,1)
            let url=mtext[1].substring(2)
            switch (typea) {
                case "i":
                    att = (<img src={url} className={styles.attachImg} />)
                    break
                case "v":
                    att = (<video src={url} className={styles.attachVid} onClick={(evt)=>evt.target.play()} /> )
                    break
                case "g":
                    att = (<video src={url} className={styles.attachVid} loop autoPlay muted /> )
            }
        }
        return (<>
            {mtext[0]}
            {att}
        </>)
    }

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
                {props.dialogue.map((e,i)=>(<p key={i} className={i%2===0?styles.convMine:styles.convUser}>{parseAttachments(e)}</p>))}
            </div>
        </div>
    )
}