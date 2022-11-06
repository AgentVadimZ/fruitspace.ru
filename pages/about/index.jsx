import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";


export default function About(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
            <div className={styles.main}>
                <div className={styles.innerMain}>
                    <h2>О нас</h2>
                    <p style={{margin:"2rem"}}><strong>FruitSpace</strong> - игровой хостинг, предоставляющий приватные сервера для игр Minecraft,
                        Geometry Dash и Grand Theft Auto: San Andreas / IV / V</p>
                </div>
                <div style={{height:"100vh"}} />
            </div>
            <Footer/>
        </>
    )
}