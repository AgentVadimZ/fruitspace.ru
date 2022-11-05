import GlobalHead from "../../../components/GlobalHead";
import GlobalNav from "../../../components/GlobalNav";
import styles from "../../../components/Index.module.css";


export default function Order(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav profilePic={<img src="https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"/>} />

            <div className={styles.main}></div>
        </>
    )
}

Order.RequireAuth = true