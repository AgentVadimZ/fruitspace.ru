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
                        <TeamMemberCard name="Flowi" position="???" dialogue={[
                            "Как успехи с ботом?",
                            "Нуууу##v:https://cdn.discordapp.com/attachments/1044208028452409375/1058667798194307093/discord_bug_numbrer_on1.mp4",
                            "Ты сможешь"
                        ]} img="https://cdn.discordapp.com/avatars/685774766262452264/ef779841dcbc48ee824c721231c93e77.webp"/>
                    <TeamMemberCard name="Mirvis" position="Вячеслав" dialogue={[
                            "Это Мирвис 😺",
                            "Да, это я",
                            "← Он нам выпускает посты в ВК и админит в Discord",
                            "Ага",
                            "Круто"
                        ]} img="https://media.discordapp.net/attachments/949684545505091617/1052208025273892884/Screenshot_2022-12-13-15-58-48-28_92460851df6f172a4592fca41cc2d2e6.jpg"/>
                        <TeamMemberCard name="Wilson" position="Артем" dialogue={[
                            "Техсаппортатор-3000?",
                            "##g:https://images-ext-1.discordapp.net/external/4Duyxm-m5Mea236PNvF3SNAYOxF_WjZJXFbyjl96m6k/https/media.tenor.com/exRZ3es-yb8AAAPo/maxwell-maxwell-cat.mp4",
                            "Вопросов не имею"
                        ]} img="https://cdn.discordapp.com/avatars/907548853694234675/549c32d28b6e351026f494803b2f8248.webp"/>
                        {/*<TeamMemberCard name="Leapher" position="Иван" dialogue={[*/}
                        {/*    "Как успехи с ботом?",*/}
                        {/*    "Нуууу##v:https://cdn.discordapp.com/attachments/1044208028452409375/1058667798194307093/discord_bug_numbrer_on1.mp4",*/}
                        {/*    "Ты сможешь"*/}
                        {/*]} img="https://cdn.discordapp.com/avatars/534337521551671306/b8fe367643e5deb23e70ede5f48cd914.webp"/>*/}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}