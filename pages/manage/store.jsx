

import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";


export default function Store(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
            <div className={styles.main}>
                <h3 style={{textAlign:"center"}}>Магазины + Рекламный кабинет</h3>
                <p style={{textAlign:"center"}}>Суть такая: возможность создавать свои магазины для приватных серверов, а еще штука для покупки рекламы</p>
                <p style={{textAlign:"center"}}>Появится в обозримом будущем, но пока не особо понятно, как это должно выглядеть.</p>
            </div>
        </>
    )
}