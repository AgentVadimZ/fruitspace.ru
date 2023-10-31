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
                        <TeamMemberCard name="M41den" position="Александр" dialogue={[
                            ""
                        ]}
                                        img="https://cdn.fruitspace.one/profile_pics/c4ca4238a0b923820dcc509a6f75849b.png" />
                        <TeamMemberCard name="Glorius" position="Кирилл" dialogue={[
                            "Чем ты занимаешься на этом хостинге?",
                            "Я помогаю людям в тикетах, участвую в организации ивентов, а ещё я отвечаю за 900% всех эмодзи на дискорд сервере FruitSpace)##i:https://media.discordapp.net/attachments/949684545505091617/1169007797963325540/video_2023-08-18_13-34-59.gif"
                        ]} img="https://media.discordapp.net/attachments/949684545505091617/1169008310675054704/0ede585b86fb6ecc6b5a35446a27f443.png" />
                        <TeamMemberCard name="LowFi" position="" dialogue={[

                        ]} img="https://media.discordapp.net/attachments/949684545505091617/1169009126009995264/original.png" />
                        <TeamMemberCard name="Leapher" position="Иван" dialogue={[

                        ]} img="https://media.discordapp.net/attachments/949684545505091617/1169011679833620581/b8fe367643e5deb23e70ede5f48cd914.png" />
                        <TeamMemberCard name="Dragon Ms" position="" dialogue={[
                            "Привет, ты кто?",
                            "Не помню. А кто ты?",
                            "Я драгон мс. Но ты ведь тоже драгон мс, верно?",
                            "Хм, да, я тоже редактор в ВК группе FruitSpace, точно также отвечаю на сообщения и публикую что-то. Но тогда как зовут того, кто это читает?",
                            "Нас кто-то читает?..."
                        ]} img="https://media.discordapp.net/attachments/949684545505091617/1169010871255715880/9a98d65252d3d0c16f45d70955e42ef9.png" />
                        <TeamMemberCard name="LowFi" position="" dialogue={[

                        ]} img="https://media.discordapp.net/attachments/949684545505091617/1169009126009995264/original.png" />
                    </div>
                </div>
            </div>
            <Footer router={props.router}/>
        </>
    )
}