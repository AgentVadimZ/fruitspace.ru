import styles from "./NavBar.module.css"


export default function SideBar(props) {

    return (
        <div className={styles.SideBar}>
            {props.children}
        </div>
    )
}