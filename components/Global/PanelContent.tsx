import { ReactNode } from 'react'
import styles from './PanelContent.module.css'

type PanelContentProps = {
    nocorner?: boolean
    children: ReactNode
}

export default function PanelContent(props: PanelContentProps) {

    return (
        <div className={`${styles.panelContent} ${props.nocorner?"!m-8":"m-4 tablet:m-4 tablet:ml-[calc(var(--nav-height)+1rem)]"}`}>
            {props.children}
            {props.nocorner?"":<div className="hidden tablet:block fixed w-8 h-8 bg-active -z-10 left-[var(--nav-height)] top-[var(--nav-height)]">
                <div className="rounded-tl-full bg-dark w-full h-full" />
            </div>}
        </div>
    )
}