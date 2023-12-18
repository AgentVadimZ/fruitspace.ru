import GlobalHead from "../../../components/GlobalHead";
import GlobalNav from "../../../components/GlobalNav";
import styles from "../../../components/Index.module.css";
import useLocale, {useGlobalLocale} from "../../../locales/useLocale";
import {useRouter} from "next/router";

export default function OrderMC(props){
    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)
    return(
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav mainpage router={props.router} />    
            <div className={styles.main}>
                <h1>Apache3</h1>
            </div>
        </>
    )
}