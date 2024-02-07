import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";


export default function About(props) {

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const newLocal = <br />;
    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
            <div className={styles.main}>
                <div className={styles.innerMain}>
                    <h2>{locale.get('header')}</h2>
                    <div className="m-8 text-center bg-[color:var(--subtle-color)] p-3 br-50 rounded-3xl">
                        <p>
                            👋Добро пожаловать на FruitSpace - игровой хостинг для игр GeometryDash, Minecraft и CS.
                        </p>
                        <p>
                            Мы основали данный проект, вдохновившись идеей создать идеальное место для формирования
                            сообществ или совместных игр с друзьями, и уже более года продолжаем его активно
                            поддерживать.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold m-8 text-center">
                        Что мы предлагаем?
                    </h2>

                    <div className="m-8 text-center bg-[color:var(--subtle-color)] p-3 br-50 rounded-3xl">
                        <div className="flex flex-wrap items-center justify-center">
                            {[
                                {
                                    icon: "🍎",
                                    title: "Высокую производительность и стабильность",
                                    description:
                                        "И это не просто слова. Наши сервера работают на мощном оборудовании, которое обеспечивает высокую скорость, низкую задержку и защиту от DDoS-атак.",
                                },
                                {
                                    icon: "🍊",
                                    title: "Безопасность и конфиденциальность",
                                    description:
                                        "Мы заботимся о ваших данных и используем все современные методы их защиты. Обычным .php файлом вы ничего не сделаете.",
                                },
                                {
                                    icon: "🍇",
                                    title: "Открытость и честность нашей команды",
                                    description:
                                        "Мы всегда готовы помочь вам с любыми вопросами и проблемами, а также советами по созданию собственных проектов.",
                                },
                                {
                                    icon: "🍍",
                                    title: "Ивенты и розыгрышы",
                                    description:
                                        "Вся наша команда коллективно решила, что быть бездушным скучным сервисом, просто предоставляющим свои услуги не сделает нас особенными. Поэтому мы часто проводим различные события!",
                                },
                            ].map((item, index) => (
                                <div key={index} className="w-full max-w-xs mt-0 m-5 sm:w-1/3">
                                    <h3 className="text-white text-xl mb-2 font-bold">
                                        {item.icon} {item.title}
                                    </h3>
                                    <p className="text-gray-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold m-8 text-center">
                        А также...
                    </h2>

                    <div className="m-8 text-center bg-[color:var(--subtle-color)] p-3 br-50 rounded-3xl">
                        <div className="flex flex-wrap items-center justify-center">
                            {[
                                {
                                    icon: "🍈",
                                    title: "Удобную панель управления",
                                    description:
                                        "Мы совместили простой и понятный дизайн и большое количество удобных функций и получилась панель управления.",
                                }
                            ].map((item, index) => (
                                <div key={index}>
                                    <h3 className="text-white text-xl mb-2 font-bold">
                                        {item.icon} {item.title}
                                    </h3>
                                    <p className="text-gray-300">{item.description}</p>
                                </div>
                            ))}
                        </div>

                        <img width={400} className="lg:inline hidden rounded m-4"
                             src="https://images-ext-2.discordapp.net/external/xec8A_XJu_7yfBk2EDQFBprWZ9meEcWGrx202J7DHw4/https/i.ibb.co/qmZNXZp/Screenshot-2024-02-07-173700.png"
                             alt="Скриншот из панели (1)"/>
                        <img width={400} className="lg:inline hidden rounded m-4"
                             src="https://images-ext-1.discordapp.net/external/wHaB_ptKV7IxMMOo3RMvUKwnYOWgnZ-3VBfuXzryxxo/https/i.ibb.co/P4Ff2qz/Screenshot-2024-02-07-173724.png"
                             alt="Скриншот из панели (2)"/>
                        <img width={400} className="lg:inline hidden rounded m-4"
                             src="https://images-ext-1.discordapp.net/external/lCjzyAufEW9Emzk8m3MyJrZUtzMNR6vscid701JWel4/https/i.ibb.co/0XGP3sw/Screenshot-2024-02-07-173754.png"
                             alt="Скриншот из панели (3)"/>
                    </div>
                </div>
            </div>
            <Footer router={props.router}/>
        </>
    )
}