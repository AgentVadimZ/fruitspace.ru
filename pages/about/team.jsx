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
                        <TeamMemberCard name="TheOfSover" position="Денис" dialogue={[
                            "Привет, что делаешь?",
                            "В техподдержке работаю и модерирую Discord",
                            "Сейчас 3 ночи...",
                            "Я сова, ничего не знаю🦉"
                        ]} img="https://images-ext-2.discordapp.net/external/kIkcA_EWozABAvJKAyEAFsRhxz8juU0p-UWAOj1MoAY/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/1026126589102133280/b10d7ee4b5ca0493cdce953ead67220c.webp"/>
                        <TeamMemberCard name="Nikomu" position="Тимур" dialogue={[
                            "Тимуууур Бабаааев",
                            "Тимуууур Бабаааев)",
                            "← Он нам классные статьи пишет и выпускает посты в ВК",
                            "Ага",
                            "Круто"
                        ]} img="https://sun2-9.userapi.com/s/v1/ig2/zZqHjOCiU0wekMBxTj52lKiMQ7VvVykfAfXJH3vQlL4UUUbzCpnyw82m7rbaICoQNjJckxya4Y2sQu6eUwiUkTnq.jpg?size=200x200&quality=95&crop=999,115,475,475&ava=1"/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}