import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";


export default function About(props) {

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav />
            <div className={styles.main}>
                <div className={styles.innerMain}>
                    <h2>{locale.get('header')}</h2>
                    <p className="m-4"><span className="font-bold">FruitSpace</span>{locale.get('description')}</p>
                </div>
                <div style={{height:"100vh"}} />
            </div>
            <Footer router={props.router}/>
        </>
    )
}