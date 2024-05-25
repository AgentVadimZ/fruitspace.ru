

import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import styles from "@/components/Index.module.css";
import useLocale from "@/locales/useLocale";


export default function Store(props) {

    const locale = useLocale(props.router)

    return (
        <>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <div className={styles.main}>
                {locale.get('text')}
            </div>
        </>
    )
}