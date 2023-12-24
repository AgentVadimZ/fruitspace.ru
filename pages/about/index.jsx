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
                    <ul className="m-8 text-center bg-[color:var(--subtle-color)] p-8 br-50 rounded-3xl">
                        <li>
                        👋 Добро пожаловать на <strong>FruitSpace</strong> - хостинг игровых серверов для <em>GeometryDash, Minecraft и CS:GO</em>. Каждая из этих трех игр обладает своей уникальной атмосферой, игровыми механиками и возможностями. Мы решили создать FruitSpace для того, чтобы предложить вам удобные, надежные и производительные серверы под каждую из этих игр. Мы предлагаем:
                        </li>
                        <br />
                        <li>
                        🍎 Высокую производительность и стабильность. Наши сервера работают на <em>мощном оборудовании</em>, которое обеспечивает высокую скорость, низкую задержку и защиту от DDoS-атак.
                        </li>
                        <br />
                        <li>
                        🍊 Безопасность и конфиденциальность. Мы заботимся о ваших данных и принимаем все необходимые меры для их защиты.
                        </li>
                        <br />
                        <li>
                        🍇 Поддержку 24/7. Наша команда всегда готова помочь вам <em>с любыми вопросами и проблемами</em>, а также советами по созданию собственных проектов. Мы также проводим различные конкурсы, в которых вы можете выиграть призы и бонусы. FruitSpace - не просто хостинг игр, это целый мир возможностей. На FruitSpace вы можете создавать и настраивать свои серверы как угодно благодаря нашей <em>удобной панели управления</em>, которая позволяет легко менять настройки и мониторить статистику.
                        </li>
                        <li>
                        <img src="https://images-ext-1.discordapp.net/external/4mntz6x1KBTtqgsHHqm4IL16VxeRk6WUzUen1U7rhoA/https/i.ibb.co/L0GxXPc/image.png?format=webp&quality=lossless&width=1050&height=664" alt="" className="rounded-xl mt-4" width={500}/>
                        </li>
                        <br />
                        <li>FruitSpace - ваш идеальный хостинг для игр GeometryDash, Minecraft и CS:GO!</li>
                    </ul>
                </div>
            </div>
            <Footer router={props.router}/>
        </>
    )
}