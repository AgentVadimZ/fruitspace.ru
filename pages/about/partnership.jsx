import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";
import { color } from "@mui/system";


export default function Partnership(props) {

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
            <div className={styles.main}>
                <div className={styles.innerMain}>
                    <h2>{locale.get('header')}</h2>
                    <div className="m-8 bg-[color:var(--subtle-color)] text-center p-5 br-50 rounded-3xl">
                        <p>
                        FruitSpace - один из лучших игровых хостингов, предлагающий качественные и надёжные сервера для игр Geometry Dash, Minecraft и Counter Strike. Наша команда постоянно работает над улучшением нашего сервиса и добавлением новых возможностей для наших клиентов. 
                        </p>
                        <p>
                        И мы всегда открыты для заключения партнерства.  
                        </p>
                        <p>Если вы вдруг захотите стать нашим партнёром, то напишите на нашу почту: <a style={{color: "#0d6efd", textDecoration: "none"}} href="mailto:support@fruitspace.one">support@fruitspace.one</a></p>
                        <p>Или же вступите: 1) в наш <a style={{color: "#0d6efd", textDecoration: "none"}} href="https://discord.gg/fruitspace">Discord сервер</a>, на котором вы можете открыть тикет, 2) в наше <a style={{color: "#0d6efd", textDecoration: "none"}} href="https://vk.com/fruit_space">VK сообщество</a> и связаться через личные сообщения. Мы будем рады обсудить с вами все детали и условия нашего дальнейшего партнерства.</p>
                        <p>Спасибо за ваш интерес к сотрудничеству с FruitSpace!</p>
                        <img className="saturate-0 opacity-15 w-80 hidden lg:block mt-6 ml-auto mr-auto" src="https://purepng.com/public/uploads/large/purepng.com-bananasbananabananasyellow-bananabotanically-a-berryedible-fruitherbaceousgenus-musa-1701527188945fd4fq.png" alt="" />
                    </div>
                </div>
            </div>
            <Footer router={props.router}/>
        </>
    )
}