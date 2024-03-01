import GlobalNav from "../components/GlobalNav";
import styles from "../components/Index.module.css"

import MinecraftLogo from "../components/assets/logos/minecraft.png"
import GDLogo from "../components/assets/logos/geometrydash.png"
import CSLogo from "../components/assets/logos/counterstrike.png"
import RightIcon from '@/assets/icons/right.svg'


import Footer from "../components/Global/Footer";
import GlobalHead from "../components/GlobalHead";
import useLocale, {useGlobalLocale} from "../locales/useLocale";
import Link from "next/link";
import {serverFiberAPI} from "../fiber/fiber";
import {useRef} from "react";
import {BetaData} from '../components/betadata';
import {Rate, Carousel} from "antd";

export async function getStaticProps(ctx) {
    const api = serverFiberAPI(null)
    let stats = await api.fetch.stats()
    return {
        revalidate: 60,
        props: {
            stats: stats
        }
    }
}

export default function Home(props) {

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const getRegionalPostfix = localeGlobal.get('funcShowServers')
    const getLvlsCnt = localeGlobal.get('funcLvlsServer')


    const scrollRef = useRef(null)

    return <>
        <GlobalHead og={og} />
        <div className="fixed top-0 left-0 w-screen h-screen -z-20 bg-[#191921]"></div>
        <div className="fixed top-0 left-0 w-screen h-screen -z-10 techBg"></div>
        <div className="">
            {BetaData.beta && <div className="bg-slate-600 glass bg-opacity-20 h-12 flex items-center justify-between z-[9999] relative">
                <p className="rounded-full bg-slate-600 mx-2 flex items-center h-fit">
                    <span className="text-lg bg-blue-600 rounded-full px-4 py-1">Бета </span>
                    <span className="mx-2 text-sm">Сборка от {BetaData.date}</span>
                </p>
                <p className="rounded-full bg-slate-600 mx-2 flex flex-col items-center h-fit z-[9999] group cursor-pointer">
                    <span className="text-lg rounded-full px-4 py-1">Что нового? ›</span>
                    <div className="flex-col gap-2 hidden group-hover:flex absolute top-full text-md right-4 rounded-xl p-2 bg-slate-600 z-[9999]">
                        {BetaData.description.map((changes,i)=>{
                            return <div key={i} className="rounded-lg p-2 bg-slate-800">
                                <p className="my-1">Сборка от {changes.date}</p>
                                <ul className="text-sm">
                                    {changes.deltas.map((change,j)=>{
                                        return <li key={j}>• {change}</li>
                                    })}
                                </ul>
                            </div>
                        })}
                    </div>
                </p>
            </div>}
            <GlobalNav router={props.router} mainpage />

            <div className={styles.main}>

                <div className="flex flex-col items-center justify-center lg:h-[100vh] relative">
                    <h1 className="text-5xl mt-48 lg:mt-2 xl:text-8xl font-[Coolvetica] tracking-wider font-normal fruitText m-2 select-none">FruitSpace</h1>
                    <p className="text-lg text-center xl:text-2xl m-0 font-[Helvetica]">Удобный и надежный хостинг для ваших любимых игр. И ещё немножко магии ✨</p>

                    <div className="mt-24 grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-16 select-none">
                        <ProdCard link="/product/gd" name="Geometry Dash" description="Кастомная музыка, 2.2, моды и конфигуратор установщиков" logo={GDLogo.src} stats={`${props.stats.gdps_count} ${getRegionalPostfix(props.stats.gdps_count)} • ${getLvlsCnt(props.stats.gdps_levels)}`} />
                        <ProdCard link="/product/mc" name="Minecraft" description="Мощные сервера, динамические ресурсы и удобная панель" logo={MinecraftLogo.src} stats="Уже на FruitSpace!" />
                        <ProdCard link="#" name="Counter Strike" description="128 тикрейт, быстрая установка модов и FastDL" logo={CSLogo.src} stats="Скоро. Q2 2024" />
                    </div>

                    <Link href="/top/gd" legacyBehavior>
                        <div className="w-full md:w-fit mt-4 xl:mt-8 p-0.5 rounded-2xl bg-gradient-to-br from-[#8e388e88] via-[#5a00ff88] to-[#0d6efd88] flex flex-col">
                            <div className="flex-1 bg-[#333338cc] glass rounded-2xl p-2 font-[Helvetica] cursor-pointer flex items-center justify-between hover:bg-[#33333888] transition-all duration-300 md:max-w-md">
                                <img alt="prod.logo" className="h-16 lg:mr-2" src="https://img.icons8.com/nolan/96/1A6DFF/C822FF/prize.png" />
                                <h2 className="m-0 w-fit">Топ серверов</h2>
                                <RightIcon className="flex-shrink-0 w-8 lg:ml-auto" />
                            </div>
                        </div>
                    </Link>

                </div>

                <div className="bg-black bg-opacity-25 rounded-t-2xl glassb !border-b-0 mt-16 py-8">
                    <p className="text-4xl text-center m-0 font-[Helvetica]" ref={scrollRef}>На грани
                        возможного</p>
                    <p className="text-center text-lg px-4 xl:px-24">Неважно, любите ли вы добавлять массу модов и
                        плагинов или предпочитаете
                        ванильные версии игр — FruitSpace позволит вам насладиться всеми возможностями игры по
                        максимуму. Музыка из любых источников и быстрые обновления текстур/модов для Geometry Dash.
                        SourceMod и MetaMod для Counter Strike (fastDL в комплекте). Поддержка многопоточных ядер и
                        объединения нескольких серверов для Minecraft.
                        Если для чего-то не нужно переписывать игру с нуля, у нас скорее всего это есть.</p>
                    <p className="text-4xl text-center m-0 mt-16 font-[Helvetica]">Для новичков и профи</p>
                    <p className="text-center text-lg px-4 xl:px-24">Мы стремимся делать управление серверами простым и
                        удобным, не забирая возможности тонко кастомизировать
                        каждый аспект ваших любимых игр. Для каждой игры мы предоставляем отдельную удобную панель, в
                        которой могут разобраться даже те, кто до этого не имеел
                        свой собственный сервер. </p>
                    <p className="text-4xl text-center m-0 mt-16 font-[Helvetica]">Нам доверяют <span
                        className="text-blue-600">{props.stats.clients}</span> клиентов</p>
                    <p className="text-center text-lg px-4 xl:px-24">Не решаетесь, стоит ли вам входить в нишу игровых
                        серверов? Наш хостинг помогает достичь своих целей
                        абсолютно каждому - мододелам, новичкам, профессионалам, и просто игрокам которые хотят создать
                        свой укромный уголок. Не верите?
                        Прочтите реальные отзывы или оставьте свой!</p>

                    <Carousel dots={{className:"!bottom-2"}}>
                        {reviews.map((u, i) => {
                            return <div key={i} className="px-2 py-2 rounded-xl bg-[#333338aa] my-4 overflow-y-scroll
                             !w-5/6 lg:!w-2/3 h-96 mx-auto !flex flex-col glass">
                                <div className="flex flex-col lg:flex-row items-center justify-between">
                                    <p>{u.date}</p>
                                    <p className="text-lg m-0">{u.user}</p>
                                    <Rate className="p-4 bg-[var(--active-color)] rounded-lg h-fit" allowHalf disabled
                                          defaultValue={u.rating}/>
                                </div>
                                <div>
                                    {u.pros && <>
                                        <p className="text-lg lg:text-xl mb-1">Что понравилось?</p>
                                        <pre className="text-md rounded-lg bg-[var(--active-color)] p-2 whitespace-normal leading-tight mt-0">{u.pros}</pre>
                                    </>}
                                    {u.cons && <>
                                        <p className="text-lg lg:text-xl mb-1">Что не понравилось, чего не хватает?</p>
                                        <pre className="text-md rounded-lg bg-[var(--active-color)] p-2 whitespace-normal leading-tight mt-0">{u.cons}</pre>
                                    </>}
                                    {u.verdict && <>
                                        <p className="text-lg lg:text-xl mb-1">Останетесь ли на FruitSpace?</p>
                                        <pre className="text-md rounded-lg bg-[var(--active-color)] p-2 whitespace-normal leading-tight mt-0">{u.verdict}</pre>
                                    </>}
                                </div>
                                <div className="flex flex-col lg:flex-row justify-between items-center mt-auto">
                                    <span className="text-gray-300">Хостинг: {u.product}</span>
                                    <a href={u.url} className="text-[var(--primary-color)]">Отзыв в Discord →</a>
                                </div>
                            </div>
                        })}
                    </Carousel>
                </div>
            </div>
        </div>

        <Footer router={props.router}/>
    </>;
}


const ProdCard = (props) => (
    <Link href={props.link} legacyBehavior>
        <div className="p-0.5 rounded-2xl bg-gradient-to-br from-[#8e388e88] via-[#5a00ff88] to-[#0d6efd88] flex flex-col">
            <div
                className="flex-1 bg-[#333338cc] glass rounded-2xl p-4 pr-2 font-[Helvetica] cursor-pointer flex items-center hover:bg-[#33333888] transition-all duration-300 max-w-md">
                <img alt="prod.logo" className="h-24 mr-2" src={props.logo}/>
                <div>
                    <h2 className="m-0">{props.name}</h2>
                    <p className="leading-tight text-sm lg:text-md lg:leading-normal m-0">{props.description}</p>
                    <p className="text-xs text-nowrap lg:text-sm m-0 mt-2 text-[#cacad0]">{props.stats}</p>
                </div>
                <RightIcon className="flex-shrink-0 w-8 ml-auto"/>
            </div>
        </div>
    </Link>
)

const reviews = [
    {
        user: "Kenny",
        rating: 4.5,
        date: "18/07/2023",
        pros: "9/10 Все шикарно, интерфейс, лёгкая настройка, личное ядро, скоро ещё другие игры!!! 2.2 хоть и баганый, дешёвый, не пересчитать плюсов. Почему не 10? Потому что модов нит((((",
        cons: "Хочу моды",
        verdict: "Мой сервер 3 место среди всех, не собираюсь никуда уходить, фрукт навсегда!",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1130817182868197526",
        product: "Geometry Dash"
    },
    {
        user: "cryata",
        rating: 5,
        date: "18/07/2023",
        pros: "Очень удобный интерфейс, сервер создать может даже дурак",
        cons: "Не хватает серверов по майнкрафту",
        verdict: "Я перейду на другой хостинг только если фрутспейс сдохнет",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1130816668864622612",
        product: "Geometry Dash"
    },
    {
        user: "system11x",
        rating: 4.5,
        date: "18/07/2023",
        pros: "Меня всё устраивало",
        cons: "",
        verdict: "Онлайн упал, было нецелесообразно держать мёртвый гдпс поэтому я снёс его нахрен. Сервис хороший, порекомендую друзьям но сам на нём не буду задерживаться",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1130817711988035717",
        product: "Geometry Dash"
    },
    {
        user: "Norowoll",
        rating: 4.5,
        date: "18/07/2023",
        pros: "Хороший хостинг с красивым названием, сайт достаточно удобный! Полезных функций тоже достаточно, особенно возможность добавления кастомной музыки и поддержка IOS (без этого я бы просто жить не смог)",
        cons: "Из минусов: Нередкие баги, порою ложатся сервера. Ещё с апреля жду возможность установления модов в сам установщик, два раза разговаривал об этом с Модерацией. Что что, но функционал сейчас относительно ограниченный, особенно хочется официальные уровни обновлять)",
        verdict: "Пользуюсь хостингом ещё с января, пока весомых причин переходить нету!",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1130818223374340146",
        product: "Geometry Dash"
    },
    {
        user: "propogando4kaa",
        rating: 5,
        date: "18/07/2023",
        pros: "Всё работает идеально! Отличный сервис!",
        cons: "Ожидаю больше всего встроенный модменю на пк и телефоны!",
        verdict: "У меня есть свой GDPS на вашем хостинге и уходить от вас я не собираюсь т.к думаю что ваш сервис самый лучший из всех возможных!",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1130840075043876965",
        product: "Geometry Dash"
    },
    {
        user: "riantgd",
        rating: 4.5,
        date: "18/07/2023",
        pros: "",
        cons: "",
        verdict: "Отличный хостинг, другие просто в пролёте. Единственное, сделайте BuildLab в бесплатном тарифе, а так же дополните документацию, она слишком сужена. Например, многие не знают, что уровни короче медиума нельзя оценивать больше, чем на изи. Ведь из-за этого вам могут поставить 1 звезду. За бесплатно могу создать ГДПС - имба!!!",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1130876052609187910",
        product: "Geometry Dash"
    },
    {
        user: "Gow GG",
        rating: 4,
        date: "18/07/2023",
        pros: "Сам фрут спейс хороший хостинг, есть хорошая защита от дудосов, но есть 1 минус: нету общего доступа к бд (хз как это назвать, типа вебхуков связанных с бд)",
        cons: "Я очень жду гибкую настройку встраиваний рейт-бота",
        verdict: "Я владелец самого крупного на данный момент сервера фс, но планирую съехать для удобства",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1130913227228848281",
        product: "Geometry Dash"
    },
    {
        user: "bledyt",
        rating: 5,
        date: "19/07/2023",
        pros: "",
        cons: "Очень жду хостинг по майнкрафту",
        verdict: "Был на TakeOff, был очень доволен❤️ ( ушел тк больше не заинтересован сферой геометри даш)",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1131114760218353684",
        product: "Geometry Dash"
    },
    {
        user: "aquiline_",
        rating: 4,
        date: "19/07/2023",
        pros: "Приятный и удобный интерфейс, удобная система музыки, хорошие сервера за свою цену.",
        cons: "Довольно часто случаются перебои: музыка может резко перестать работать, лвла не всегда грузит. Хотелось бы видеть больше возможностей BuildLab, как пример, замена официальных уровней, моды и прочее",
        verdict: "У меня есть свой гдпс, со своими фишками, сник пиками, текстурпаком, сезонами и ещё кучей классных плюшек и я не планирую менять хостинг. Fruitspace - пожалуй лучший хост за последнее время. \n",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1131879896298291310",
        product: "Geometry Dash"
    },
    {
        user: "aonatis",
        rating: 5,
        date: "30/11/2023",
        pros: "Хороший хост, удобная панель управления,  красивое оформление сайта и дс сервера.",
        cons: "Не хватает меня в составе : D",
        verdict: "У меня есть GDPS на этом хостинге и я никуда не уйду с этого хорошего хоста потому-что он самый лучший из всех каких я знаю \n",
        url: "https://discord.com/channels/1025382676875726898/1130816253284585512/1179753501480452220",
        product: "Geometry Dash"
    },
]

const og = {
    title: "FruitSpace - хостинг Minecraft, CS, GDPS",
    description: "Удобный и надежный хостинг для ваших любимых игр. И ещё немножко магии ✨"
}
