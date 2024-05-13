import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import styles from "@/components/Index.module.css";


const DocsIndex = (props) => {
    return <>
        <GlobalHead/>
        <GlobalNav router={props.router} mainpage />
        <div className={styles.main}>
        </div>
    </>
}

export default DocsIndex