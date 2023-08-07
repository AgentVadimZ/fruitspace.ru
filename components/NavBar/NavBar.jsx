import styles from "./NavBar.module.css"


export default function NavBar(props) {
    return (
        <nav className={styles.navbar} style={
            props.mainpage&&{
                background:"linear-gradient(var(--bkg-color),transparent)",
                borderBottom: "none"
            }
        }>
            <ul className={styles.insideNavbar}>{props.children}</ul>
        </nav>
    )
}