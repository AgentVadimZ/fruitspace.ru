import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import TeamMemberCard from "../../components/Cards/TeamMemberCard";



export default function Team(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
            <div className={styles.main}>
                <div className={styles.innerMain}>
                    <h2>Наша команда</h2>
                    <div className={styles.productCardGrid}>
                        <TeamMemberCard name="M41den" position="Александр" dialogue={[
                            "Расскажи, чем ты у нас занимаешься?",
                            "Я просто сделал FruitSpace, от сайта до самой системы хостинга и возни с серверами",
                            "🤨🤨🤨 Норм"
                        ]} img="https://cdn.fruitspace.one/profile_pics/c4ca4238a0b923820dcc509a6f75849b.png" />
                        <TeamMemberCard name="MemHouse" position="Дмитрий" dialogue={[
                            "Ты там живой?",
                            "Ахах, конечно нет! Я же занимаюсь Minecraft и плагины пишу",
                            "Аааа, подготовь тогда public static java.lang.Object ноль равно равно один...",
                            "Не смешно",
                            "Смешно"
                        ]} img="https://media.discordapp.net/attachments/949684545505091617/1052206376027439104/MemHouse.webp"/>
                        {/*<TeamMemberCard name="Flowi" position="???" dialogue={[*/}
                        {/*    "..."*/}
                        {/*]} img="https://media.discordapp.net/attachments/949684545505091617/1052209127675396166/flowi-1.webp"/>*/}
                    <TeamMemberCard name="Mirvis" position="Артем" dialogue={[
                            "Это Мирвис 😺",
                            "Да, это я",
                            "← Он нам классные статьи пишет и выпускает посты в ВК",
                            "Ага",
                            "Круто"
                        ]} img="https://media.discordapp.net/attachments/949684545505091617/1052208025273892884/Screenshot_2022-12-13-15-58-48-28_92460851df6f172a4592fca41cc2d2e6.jpg"/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}