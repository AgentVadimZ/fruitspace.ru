import styles from "./NavBar.module.css"


export default function NavBar(props) {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.insideNavbar}>{props.children}</ul>
        </nav>
    )
}