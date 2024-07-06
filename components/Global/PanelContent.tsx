import { ReactNode } from 'react'
import styles from './PanelContent.module.css'

type PanelContentProps = {
    nocorner?: boolean
    children: ReactNode
}

export default function PanelContent(props: PanelContentProps) {

    return (
        <div className={`${styles.panelContent} ${props.nocorner?"!m-8":""}`}>
            {props.children}
            {props.nocorner?"":<div className={styles.panelCorner}><div/></div>}
        </div>
    )
}