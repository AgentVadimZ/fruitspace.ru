import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";


export default function Partnership(props) {

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav router={props.router} mainpage />
            <div className={styles.main}>
                <div className={styles.innerMain}>
                    <h2>{locale.get('header')}</h2>
                    <div className="m-8 bg-[color:var(--subtle-color)] text-center p-5 br-50 rounded-3xl">
                        <p></p>
                    </div>
                </div>
            </div>
            <Footer router={props.router}/>
        </>
    )
}