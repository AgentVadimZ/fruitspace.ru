import styles from './PanelContent.module.css'


export default function PanelContent(props) {

    return (
        <div className={styles.panelContent}>
            {props.children}
        </div>
    )
}