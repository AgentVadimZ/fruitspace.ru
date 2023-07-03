import styles from './PanelContent.module.css'


export default function PanelContent(props) {

    return (
        <div className={`${styles.panelContent} ${props.nocorner?"!m-8":""}`}>
            {props.children}
            {props.nocorner?"":<div className={styles.panelCorner}><div/></div>}
        </div>
    )
}