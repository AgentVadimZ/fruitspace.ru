

import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";


export default function Store(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav profilePic={<img src="https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"/>} />
            <div className={styles.main}>
                <h3 style={{textAlign:"center"}}>Магазины + Рекламный кабинет</h3>
                <p style={{textAlign:"center"}}>Суть такая: возможность создавать свои магазины для приватных серверов, а еще штука для покупки рекламы</p>
                <p style={{textAlign:"center"}}>Появится в обозримом будущем, но пока не особо понятно, как это должно выглядеть.</p>
            </div>
        </>
    )
}