import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import TeamMemberCard from "../../components/Cards/TeamMemberCard";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";



export default function Team(props) {

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
                    <div className={styles.productCardGrid}>
                        <TeamMemberCard name="M41den" position={locale.get('m41den.position')} dialogue={locale.get('m41den.dialogue')}
                                        img="https://cdn.fruitspace.one/profile_pics/c4ca4238a0b923820dcc509a6f75849b.png" />
                        {/*<TeamMemberCard name="Flowi" position={locale.get('flowi.position')} dialogue={locale.get('flowi.dialogue')}*/}
                        {/*                img="https://media.discordapp.net/attachments/949684545505091617/1076792338183102564/167679769874326480.webp"/>*/}
                        {/*<TeamMemberCard name="Mirvis" position={locale.get('mirvis.position')} dialogue={locale.get('mirvis.dialogue')}*/}
                        {/*            img="https://media.discordapp.net/attachments/949684545505091617/1052208025273892884/Screenshot_2022-12-13-15-58-48-28_92460851df6f172a4592fca41cc2d2e6.jpg"/>*/}
                        {/*<TeamMemberCard name="Wilson" position={locale.get('wilson.position')} dialogue={locale.get('wilson.dialogue')}*/}
                        {/*                img="https://cdn.discordapp.com/avatars/907548853694234675/549c32d28b6e351026f494803b2f8248.webp"/>*/}
                        {/*<TeamMemberCard name="Leapher" position={locale.get('leapher.position')} dialogue={locale.get('leapher.dialogue')}*/}
                        {/*                img="https://cdn.discordapp.com/avatars/534337521551671306/b8fe367643e5deb23e70ede5f48cd914.webp"/>*/}
                    </div>
                </div>
            </div>
            <Footer router={props.router}/>
        </>
    )
}