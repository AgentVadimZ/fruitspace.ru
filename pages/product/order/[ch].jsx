import GlobalHead from "../../../components/GlobalHead";
import GlobalNav from "../../../components/GlobalNav";
import styles from "../../../components/Index.module.css";


export default function Order(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <div className={styles.main}></div>
        </>
    )
}

Order.RequireAuth = true