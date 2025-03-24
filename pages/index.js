import GlobalNav from "@/components/GlobalNav";
import styles from "@/components/Index.module.css"

import MinecraftLogo from "@/assets/logos/minecraft.png"
import GDLogo from "@/assets/logos/geometrydash.png"
import CSLogo from "@/assets/logos/counterstrike.png"
import BSLogo from "@/assets/logos/beatsaber.png"
import RightIcon from '@/assets/icons/right.svg'
import BannerGD from "@/assets/BannerGD.png"

import FeatureCoreImg from "@/assets/features/core_3d-sm.png"
import FeatureShieldImg from "@/assets/features/shield_3d-sm.png"
import FeatureMusicImg from "@/assets/features/music_3d-sm.png"
import ScreenshotGaus from "@/assets/screenshots/gd_gaus2.png"
import TariffPS from "@/assets/features/gd_pressstart.svg"
import TariffSG from "@/assets/features/gd_singularity.svg"
import TariffFD from "@/assets/features/gd_foundation.svg"

import Footer from "@/components/Global/Footer";
import GlobalHead from "@/components/GlobalHead";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import Link from "next/link";
import {serverFiberAPI} from "@/fiber/fiber.ts";
import {useEffect, useRef} from "react";
import {BetaData} from '@/components/betadata';
import {Rate, Carousel, Button} from "antd";
import Script from "next/script";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDown,
    faBarsProgress,
    faChartSimple, faChevronRight,
    faCloudArrowDown,
    faCog,
    faCogs, faComment,
    faDownload,
    faEllipsis,
    faForward,
    faGem,
    faHeadset,
    faInfoCircle,
    faInfinity,
    faMap, faNewspaper,
    faPaintbrush,
    faPlay,
    faPlus,
    faShield,
    faShop,
    faStar,
    faStopwatch20,
    faTheaterMasks,
    faUser,
    faUserGroup,
    faXmark,
    faZap
} from "@fortawesome/free-solid-svg-icons";
import {faDiscord, faItunesNote} from "@fortawesome/free-brands-svg-icons";

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

const formatStat = (num) => {
    if (num<1000) {
        return num
    } else if (num<1000000) {
        return (num/1000).toFixed(1) + "K"
    } else if (num<1000000000) {
        return (num/1000000).toFixed(1) + "M"
    } else {
        return "1B+"
    }
}

export default function Home(props) {
    const router = props.router
    useLocale(props.router);
    const localeGlobal = useGlobalLocale(props.router)

    const getRegionalPostfix = localeGlobal.get('funcShowServers')
    const getLvlsCnt = localeGlobal.get('funcLvlsServer')


    const scrollRef = useRef(null)
    const carouselRef = useRef(null)

    const blobaref = useRef(null)
    const cardref = useRef(null)

    const moveBloba = (evt) => {
        const {clientX, clientY} = evt
        const rect = cardref.current?.getBoundingClientRect()
        const left = clientX - rect.left
        const top = clientY - rect.top
        blobaref.current?.animate({
            left: `${left}px`,
            top: `${top}px`,
        }, {
            duration: 3000,
            fill: "forwards"
        })
    }

    return <>
        <GlobalHead og={og}/>
        <div>
            <GlobalNav router={props.router} mainpage/>

            {/*<div className="h-screen dotsBg overflow-hidden grid grid-cols-1 ipad:grid-cols-2">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-6xl mt-48 laptop:mt-2 desktop:text-8xl font-[Coolvetica] tracking-wider font-normal fruitText m-2 select-none">FruitSpace</h1>
                    <p className="text-md text-center desktop:text-xl m-0 font-[Helvetica] max-w-2xl">
                        Удобный и надежный хостинг для ваших любимых игр. И ещё немножко магии ✨
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <div className="overflow-hidden aspect-[3/4] rounded-3xl glassb w-2/3 bg-[#171721] relative"
                    onPointerMove={moveBloba} ref={cardref}>
                        <div ref={blobaref} className="bloba z-[1]"></div>
                        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-3xl z-[2]"></div>
                        <div className="z-10 absolute top-0 left-0 p-8">
                            <p className="text-6xl font-avant font-bold">EBICHESKY</p>
                            <p className="text-3xl font-avant font-bold">Analitichesky</p>
                        </div>
                    </div>
                </div>
            </div>*/}

            <div className={styles.main}>

                <div className="relative select-none mb-16 p-8 laptop:p-16">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-5xl laptop:text-7xl desktop:text-8xl font-[Coolvetica] tracking-wider font-normal fruitText mb-4 select-none">FruitSpace</h1>
                        <p className="text-lg laptop:text-xl m-0 font-[Helvetica] max-w-2xl text-[#cacad0]">Удобный и надежный хостинг для ваших любимых игр. И ещё немножко магии ✨</p>
                        
                        <div className="flex flex-wrap gap-4 mt-8">
                            <Button className="uppercase font-semibold" type="primary" size="large"
                                icon={<FontAwesomeIcon icon={faZap}/>}
                                onClick={() => router.push('/product/order/gd')}>
                                Создать сервер
                            </Button>
                            <Button className="uppercase font-semibold" size="large"
                                onClick={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                                Узнать больше
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="rounded-t-2xl relative select-none h-112" ref={scrollRef}>
                    <Image className="rounded-t-2xl" src={BannerGD} fill="object-fit" objectFit="cover" layout="fill"
                           quality={100}/>
                    <div
                        className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-dark from-15% to-transparent flex flex-col gap-2">
                        <p className="text-3xl">Хостинг GDPS</p>
                        <p>Уютное место для игры с друзьями или крупнейший сервер в РК. Мощности хватит на все.</p>
                        <div className="flex flex-col laptop:flex-row gap-4">
                            <div className="flex flex-wrap gap-4">
                                <Button className="uppercase font-semibold" type="primary" size="large"
                                        icon={<FontAwesomeIcon icon={faZap}/>}
                                        onClick={() => router.push('/product/order/gd')}>
                                    заказать на fruitspace
                                </Button>
                                <Button className="uppercase font-semibold" size="large"
                                        icon={<FontAwesomeIcon icon={faStar}/>}
                                        onClick={() => router.push('/top/gd')}>
                                    топ серверов
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse laptop:flex-row select-none">
                    <div className="flex flex-col p-8 flex-1">
                        <p className="font-mono">простая и функциональная</p>
                        <p className="text-5xl uppercase font-semibold">панель</p>
                        <div className="h-96 py-4 text-lg max-w-3xl flex flex-col gap-4">
                            <p>
                                Забудьте про головную боль с настройкой через PHP файлы и БД. Сосредоточьтесь на своем
                                сообществе,
                                а мы позаботимся обо всем остальном
                            </p>
                            <div>
                                Что можно настроить?
                                <div className="text-base">
                                    {[
                                        [faGem, "Лут сундуков"],
                                        [faMap, "Маппаки и гаунтлеты"],
                                        [faTheaterMasks, "Роли модераторов и косметические роли"],
                                        [faDownload, "Страницу загрузки"],
                                        [faCog, "Моды и текстуры (прямо в панели!)"],
                                        [faPaintbrush, "Дейли и задания"],
                                        [faEllipsis, "...и много чего еще"]
                                    ].map((e, i) => <p className="flex gap-2 items-center" key={i}><FontAwesomeIcon
                                        className="w-4" icon={e[0]}/> {e[1]}</p>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col relative flex-1">
                        <img src={ScreenshotGaus.src}
                             className="laptop:object-none object-left-top object-cover h-64 laptop:h-full"/>
                        <div className="absolute 2desktop:hidden h-full w-full z-10 bg-gradient-to-l from-dark to-25%"></div>
                    </div>
                </div>

                <div className="mt-16 select-none">
                    <p className="text-center font-mono">полный</p>
                    <p className="text-5xl uppercase font-semibold text-center">кастом</p>
                    <p className="text-center ">хостинг построен с нуля специально для Geometry Dash</p>
                    <div className="grid grid-cols-1 laptop:grid-cols-3 gap-8 mt-8">
                        <div
                            className="flex flex-col 2desktop:flex-row gap-4 bg-active border-subtle rounded-2xl border-solid border-1">
                            <img src={FeatureCoreImg.src} className="2desktop:w-[17rem] 2desktop:h-[17rem]"/>
                            <div className="flex flex-col gap-2 p-4 text-sm">
                                <p className="text-2xl font-semibold rainbow mb-2">Ядро GhostCore</p>
                                <p className="text-base">Написано с нуля на Go и быстрее Cvolton в 8-15 раз</p>
                                <p>Встроенный рейт-бот, антиспам, антинакрутка и антибот</p>
                                <p>А еще изменяемый размер топа, гибкая система ролей и поддержка версий 1.9-2.2</p>
                            </div>
                        </div>

                        <div
                            className="flex flex-col 2desktop:flex-row gap-4 bg-active border-subtle rounded-2xl border-solid border-1">
                            <img src={FeatureShieldImg.src} className="2desktop:w-[17rem] 2desktop:h-[17rem]"/>
                            <div className="flex flex-col gap-2 p-4 text-sm">
                                <p className="text-2xl font-semibold rainbow mb-2">Защита от DDoS</p>
                                <p className="text-base">Выращен в антиутопии и закален огнем</p>
                                <p>Весной 2024 наша система выдержала атаку в 150K+ RPS, летом 2023 атаку в 10Гбит/с</p>
                                <p>Ежедневно на нас совершаются DDoS атаки мощностью 10K+ RPS. Короче надежно, с нами не
                                    пропадете</p>
                            </div>
                        </div>

                        <div
                            className="flex flex-col 2desktop:flex-row gap-4 bg-active border-subtle rounded-2xl border-solid border-1">
                            <img src={FeatureMusicImg.src} className="2desktop:w-[17rem] 2desktop:h-[17rem]"/>
                            <div className="flex flex-col gap-2 p-4 text-sm">
                                <p className="text-2xl font-semibold rainbow mb-2">Библиотека музыки</p>
                                <p className="text-base">Ваш сервер - ваша музыка</p>
                                <p>Загружайте музыку из <span className="text-amber-600 font-semibold">NewGrounds</span>,
                                    <span className="text-red-600 font-semibold">YouTube</span>, <span
                                        className="text-blue-600 font-semibold">ВКонтакте</span> и <span
                                        className="text-green-600 font-semibold">Deezer</span> прямо в панели
                                </p>
                                <p>Вдохновение приходит и уходит, а наша библиотека музыки остается с вами навсегда</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 select-none">
                    <p className="text-5xl uppercase font-semibold text-center">тарифы</p>
                    <p className="text-center font-mono">на любой вкус</p>
                    <div className="grid grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 gap-8 mt-8 w-fit mx-auto">


                        <div
                            className="flex items-center flex-col gap-4 bg-active glassb rounded-2xl p-4 laptop:w-96">
                            <TariffSG className="w-32 border-white border-2"/>
                            <p className="text-2xl font-semibold font-avant uppercase -mt-3 tracking-wide">
                                Singularity
                            </p>
                            <p>Для тех, кто знает что делает</p>
                            <div className="flex flex-col gap-4 p-4">
                                {[
                                    [faInfinity, "Неограниченное количество игроков и уровней"],
                                    [faItunesNote, "Музыка из NewGrounds и YouTube"],
                                    [faCogs, "Полноценная панель для владельцев и игроков"],
                                    [faForward, "Версии от 1.9 до 2.2"],
                                    [faBarsProgress, "Базовая статистика сервера"],
                                    [faZap, "Конфигуратор установщиков: кастомный логотип и вечное хранение"]
                                ].map((e, i) => <span className="flex gap-4 items-center" key={i}>
                                    <div className="flex justify-center !w-8">
                                        <FontAwesomeIcon className="text-2xl" icon={e[0]}/>
                                    </div> <span className="flex-1">{e[1]}</span>
                                </span>)}
                            </div>
                            <Button type="primary" size="large" className="w-full mt-auto"
                                    onClick={() => router.push('/product/order/gd?t=2')}>49₽/мес</Button>
                        </div>

                        <div
                            className="flex items-center flex-col gap-4 bg-active border-subtle rounded-2xl border-solid border-1 p-4 laptop:w-96">
                            <TariffFD className="w-32"/>
                            <p className="text-2xl font-semibold font-avant uppercase -mt-3 tracking-wide">
                                Foundation
                            </p>
                            <p>Надежное основание для мощных проектов</p>
                            <div className="flex flex-col gap-4 p-4">
                                {[
                                    [faPlus, "Все, что есть в Singularity"],
                                    [faItunesNote, "Музыка из NewGrounds, YouTube, Deezer, VK и mp3 файлов"],
                                    [faChartSimple, "Полная статистика сервера"],
                                    [faZap, "BuildLab: логотип, текстуры, моды и поддержка iOS"],
                                    [faUserGroup, "Доступ для совладельцев и админов к панели"],
                                    [faShop, "Встроенный магазин для игроков"],
                                    [faCloudArrowDown, "Автоматические резервные копии"],
                                    [faStar, "Рейт-бот для Discord"]
                                ].map((e, i) => <span className="flex gap-4 items-center" key={i}>
                                    <div className="flex justify-center !w-8">
                                        <FontAwesomeIcon className="text-2xl" icon={e[0]}/>
                                    </div> <span className="flex-1">{e[1]}</span>
                                </span>)}
                            </div>
                            <Button type="primary" size="large" className="w-full mt-auto"
                                    onClick={() => router.push('/product/order/gd?t=4')}>149₽/мес</Button>
                        </div>
                    </div>

                </div>

                <div className="mt-24 select-none p-8 laptop:p-12">
                    <p className="text-4xl laptop:text-5xl font-semibold text-center mb-2">Почему выбирают <span className="fruitText">FruitSpace</span>?</p>
                    <p className="text-center text-lg mb-12">Наши преимущества, которые делают нас лучшими в своем деле</p>
                    
                    <div className="grid grid-cols-1 laptop:grid-cols-3 gap-8">
                        <div className="bg-[#222230] p-6 rounded-xl flex flex-col items-center text-center hover:bg-[#27273a] transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#8e388e] to-[#5a00ff] rounded-full flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faZap} className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Быстродействие</h3>
                            <p className="text-[#cacad0]">Мгновенное развертывание серверов и быстрый доступ к вашим играм. Начните играть уже через несколько минут после регистрации.</p>
                        </div>
                        
                        <div className="bg-[#222230] p-6 rounded-xl flex flex-col items-center text-center hover:bg-[#27273a] transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#0d6efd] to-[#5a00ff] rounded-full flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faShield} className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Надежная защита</h3>
                            <p className="text-[#cacad0]">Все серверы защищены от DDoS-атак и других угроз. Мы гарантируем безопасность и стабильность ваших данных.</p>
                        </div>
                        
                        <div className="bg-[#222230] p-6 rounded-xl flex flex-col items-center text-center hover:bg-[#27273a] transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#5a00ff] to-[#0d6efd] rounded-full flex items-center justify-center mb-4">
                                <FontAwesomeIcon icon={faHeadset} className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
                            <p className="text-[#cacad0]">Наша команда поддержки всегда готова помочь вам с любыми вопросами. Мы решаем проблемы быстро и эффективно.</p>
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center">
                        <Button type="primary" size="large" className="text-base uppercase font-semibold px-8"
                                icon={<FontAwesomeIcon icon={faZap} />}
                                onClick={() => router.push('/product/order/gd')}>
                            Создать сервер
                        </Button>
                        <p className="mt-4 text-sm text-[#cacad0]">Присоединяйтесь к тысячам довольных клиентов FruitSpace</p>
                    </div>
                </div>
            </div>
        </div>

        <Footer router={props.router}/>
    </>;
}

Home.jivo = true;

const og = {
    title: "FruitSpace - хостинг Minecraft, CS, GDPS",
    description: "Удобный и надежный хостинг для ваших любимых игр. И ещё немножко магии ✨"
};
