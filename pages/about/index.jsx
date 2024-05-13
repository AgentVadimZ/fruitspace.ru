import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import pSrvList from "../../assets/panel1.png";
import pAnalytics from "../../assets/panel2.png";
import pSettings from "../../assets/panel3.png";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";
import { Image } from 'antd';


export default function About(props) {

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav router={props.router} mainpage />
            <div className={styles.main}>
                <h2 className="text-3xl text-center font-semibold">О нас</h2>
                <div className="glassb m-8 bg-active p-3 br-50 rounded-2xl">
                    <p className="text-lg">
                        👋 Добро пожаловать на FruitSpace - пуленепробиваемый игровой хостинг для Geometry Dash и Minecraft.
                    </p>
                    <div className="py-2 px-4 border-l-4 rounded mt-2 max-w-7xl flex flex-col gap-2">
                        <p className="text-gray-300">
                            Вам нужна надежная основа для вашего сообщества или уютное местечко для игры с друзьями?
                            Вы пришли по адресу!
                        </p>
                        <p className="text-gray-300">
                            Наши основные принципы - <span className="text-primary">честность, надежность и инновации</span>. На этих трех принципах и держится
                            FruitSpace.
                        </p>
                    </div>
                </div>

                <h2 className="text-xl font-semibold m-8 text-center">
                    Что мы предлагаем?
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 m-8">

                    <div className="glassb bg-active p-3 rounded-2xl flex flex-col gap-2">
                        <h3 className="text-white text-xl font-bold">
                            🍎 Высокую производительность и надежность
                        </h3>
                        <p className="text-gray-300">
                            Мы используем собственное оборудование и не зависим от облачных провайдеров. Это позволяет
                            оптимизировать хостинг и выстраивать свои цепочки защиты. А еще у нас <span className="text-primary">
                            пинг 10мс до IXcellerate</span> - одного из крупнейших датацентров России
                        </p>
                        <div className="mt-auto">
                            <p className="bg-active rounded-t-lg px-2 w-fit border-1 border-b-active border-solid border-white border-opacity-25
                                        relative z-20 -mb-[1px]">Что за оборудование?</p>
                            <div className="bg-active p-2 rounded-lg rounded-tl-none border-1 border-solid border-white border-opacity-25 text-md mt-0
                                        relative z-10 text-sm flex flex-col gap-2">
                                <p className="text-gray-300">
                                    Серверы: сертифицированное оборудование от HP и Supermicro, никаких самосборок
                                </p>
                                <p className="text-gray-300">
                                    Сетевое: Mikrotik уровня CRS, Cisco уровня Catalyst 9xxx
                                </p>
                                <p className="text-gray-300">
                                    Наши провайдеры: ВымпелКом и Квант-Телеком - да, оба магистральные
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glassb bg-active p-3 rounded-2xl flex flex-col gap-2">
                        <h3 className="text-white text-xl font-bold">
                            🍊 Безопасность и конфиденциальность
                        </h3>
                        <p className="text-gray-300">
                            Мы заботимся о безопасности ваших данных и сделаем все возможное для защиты вас и ваших
                            серверов.
                            Например, <span
                            className="text-primary">с января по март 2024 мы отразили 173 DDoS атаки</span>,
                            а регулярное тестирование нашего кода на уязвимости гарантирует своевременное обнаружение и
                            исправление уязвимостей
                        </p>
                        <div className="mt-auto">
                            <p className="bg-active rounded-t-lg px-2 w-fit border-1 border-b-active border-solid border-white border-opacity-25
                                        relative z-20 -mb-[1px]">Смешная история</p>
                            <div className="bg-active p-2 rounded-lg rounded-tl-none border-1 border-solid border-white border-opacity-25 text-md mt-0
                                        relative z-10 text-sm flex flex-col gap-2">
                                <p className="text-gray-300">
                                    В конце 2023 один из наших клиентов кому-то перешел дорогу.
                                    Повалились &quot;разоблачения&quot;,
                                    угрозы в адрес него и хостинга, DDoS-атаки и даже попытки шантажа и подкупа
                                    администрации
                                    хостинга для удаления его сервера. В общем не получилось, он до сих пор находится в
                                    топе GDPS серверов
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="glassb bg-active p-3 rounded-2xl flex flex-col gap-2">
                        <h3 className="text-white text-xl font-bold">
                            🍇 Открытость и честность нашей команды
                        </h3>
                        <p className="text-gray-300">
                            Мы всегда готовы ответить на ваши вопросы, помочь с решением проблем и даже дать совет по
                            ведению и продвижению своих проектов.
                        </p>
                    </div>

                    <div className="glassb bg-active p-3 rounded-2xl flex flex-col gap-2">
                        <h3 className="text-white text-xl font-bold">
                            🍍 Ивенты и розыгрыши
                        </h3>
                        <p className="text-gray-300">
                            Мы регулярно проводим различные ивенты, конкурсы и розыгрыши. А в перерывах между ними
                            у вас не получится заскучать, даже если захочется
                        </p>
                    </div>
                </div>

            </div>
            <Footer router={props.router}/>
        </>
    )
}