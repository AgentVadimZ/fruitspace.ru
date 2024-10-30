import styles from "./NavBar.module.css"


export default function NavBar(props) {
    return (
        <nav className={`${styles.navbar} border-b-1 border-solid tablet:border-none border-white border-opacity-25`} style={
            props.mainpage&&{
                background:"linear-gradient(var(--bkg-color),transparent)",
                borderBottom: "none"
            }
        }>
            <ul className={styles.insideNavbar}>{props.children}</ul>
        </nav>
    )
}