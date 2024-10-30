import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import styles from "@/components/Index.module.css";
import {styled} from "@mui/system";
import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import useEffectOnce from "@/components/Hooks";
import toast, {Toaster} from "react-hot-toast";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber.ts";
import Link from 'next/link';
import TariffPS from "@/assets/features/gd_pressstart.svg";
import {
    faBarsProgress, faChartSimple, faCloudArrowDown,
    faCogs, faForward,
    faInfinity,
    faPlay, faPlus, faShop, faStar,
    faStopwatch20,
    faUser, faUserGroup,
    faXmark, faZap
} from "@fortawesome/free-solid-svg-icons";
import {faItunesNote} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Input, Segmented} from "antd";
import TariffSG from "@/assets/features/gd_singularity.svg";
import TariffFD from "@/assets/features/gd_foundation.svg";
import TariffTO from "@/assets/features/autosetup_3d-sm.png";


export default function Order(props) {


    const [srv, setSrv] = useState({
        srvid: props.router?.query.id||"",
        name: "",
        payDuration: "yr",
        promocode: ""
    })
    const [payDurLock, setPayDurLock] = useState(false)

    const api = useFiberAPI()


    const [srvData,setSrvData] = api.servers.useGDPS()


    const [tariffs,setTariffs] = useState({});
    const [loading, setLoading] = props.globalLoader

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const ParseError = localeGlobal.get('funcParseErr')

    const createServer = (tariff)=> {
        setLoading(true)
        api.servers.createGDPS(srv.name, parseInt(tariff),srv.payDuration,srv.promocode,srv.srvid).then((resp)=>{
            setLoading(false)
            if(resp.status==="ok") {
                toast.success(locale.get('createSuccess'),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
                props.router.push(`/manage/gd/${resp.message}${srvData.Srv?"":"?tour=true"}`)
            }else{
                toast.error(locale.get('createFailed')+ParseError(resp.code, resp.message),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }})
    }

    useEffectOnce(()=>{
        api.fetch.gdpsTariffs().then((resp)=>{
            if(resp.status==="ok") {
                setTariffs(resp.Tariffs)
            }})
    })

    useEffect(()=> {
        if (srv.srvid.length===4) {
            api.gdps_manage.get(srv.srvid).then((resp)=>{
                if(resp.Srv) {
                    setSrvData(resp);
                    let payDur = "yr"
                    if (new Date(resp.Srv.expire_date).getFullYear()>2040) {
                        payDur = "all"
                        if(resp.Srv.plan>1)
                            setPayDurLock(true)
                    }
                    setSrv({...srv, name: resp.Srv.srv_name, payDuration: payDur})
                }
                else setSrv({...srv, srvid: ""})
            }).catch(()=>setSrv({...srv, srvid: ""}))
        }else{
            setSrvData({});
        }
    }, [])

    const getLocalPrice = (tariff) => {
        if (locale.locale==="ru")
            return (tariff.PriceRUB===0?0:tariff.PriceRUB-1)
        else
            return (tariff.PriceUSD===0?0:tariff.PriceUSD-0.01)
    }
    const getLocalPriceYear = (tariff) => {
        if (locale.locale==="ru")
            return (tariff.PriceRUB===0?0:tariff.PriceRUB*10-1)
        else
            return (tariff.PriceUSD===0?0:tariff.PriceUSD*10-0.01)
    }
    const getLocalPriceForever = (tariff) => {
        if (locale.locale==="ru")
            return (tariff.PriceRUB===0?0:tariff.PriceRUB*30-1)
        else
            return (tariff.PriceUSD===0?0:tariff.PriceUSD*30-0.01)
    }





    const createCards = (duration)=> {
        if (Object.keys(tariffs).length===0) return;

        let suffix = (locale.locale==="ru"?"₽":"$")+locale.get('period')[duration]
        let prc = {
            mo: getLocalPrice,
            yr: getLocalPriceYear,
            all: getLocalPriceForever
        }
        let discount = 0
        let barrier = srvData.Srv?.plan || 0
        if (srvData.Srv) {
            // Has server
            prc = {
                mo: prc.mo,
                // yr: (tariff) => {
                //     let orig = getLocalPriceYear(tariff)
                //     let monthsLeft = Math.floor(
                //         (new Date(srvData.Srv.expire_date) - new Date()) / 1000 / 60 / 60 / 24 / 30
                //     )
                //     monthsLeft = Math.min(10, monthsLeft)
                //     let old = getLocalPrice(tariffs[`${srvData.Srv.plan}`])+1
                //     return tariff.PriceRUB===old ? orig : Math.max(0, orig - old * monthsLeft)
                // },
                yr: prc.yr,
                all: (tariff) => {
                    let orig = getLocalPriceForever(tariff)
                    let old = getLocalPriceForever(tariffs[`${srvData.Srv.plan}`])
                    return new Date(srvData.Srv.expire_date).getFullYear()==2050
                        ? <span>
                        <span className="mx-1.5 px-1.5 py-0.5 rounded bg-subtle text-sm">{orig}-{old}{suffix}</span>
                        {orig-old}
                    </span>
                        : getLocalPriceForever(tariff)
                }
            }
        } else {
            discount = duration==="yr"?15:0
        }

        return (
            <div className="flex flex-col desktop:flex-row gap-8">
                {barrier <= 1 && <div
                    className="flex items-center flex-col gap-4 bg-active border-subtle rounded-2xl border-solid border-1 p-4 w-96">
                    <TariffPS className="w-32 mt-2"/>
                    <p className="text-2xl font-semibold font-avant uppercase -mt-6 tracking-wide">
                        Press Start
                    </p>
                    <p>Отличный вариант для начинающих</p>
                    <div className="flex flex-col gap-4 p-4">
                        {[
                            [faUser, "100 игроков • 500 уровней"],
                            [faItunesNote, "Доступна музыка из NewGrounds"],
                            [faXmark, "Панель с ограниченными возможностями"],
                            [faPlay, "Поддержка только 2.2"],
                            [faBarsProgress, "Базовая статистика сервера"],
                            [faStopwatch20, "Временное хранение установщиков"]
                        ].map((e, i) => <span className="flex gap-4 items-center" key={i}>
                            <div className="flex justify-center !w-8">
                                        <FontAwesomeIcon className="text-2xl" icon={e[0]}/>
                                    </div> <span className="flex-1">{e[1]}</span>
                        </span>)}
                    </div>
                    <Button type="primary" size="large" className="w-full mt-auto"
                            onClick={() => createServer(1)}>Бесплатно</Button>
                </div>
                }
                {barrier <= 2 && <div
                    className="flex items-center flex-col gap-4 bg-active border-subtle rounded-2xl border-solid border-1 p-4 w-96">
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
                    <Button type="primary" size="large"
                            className="w-full mt-auto flex items-center justify-center gap-2"
                            onClick={() => createServer(2)}>
                    {prc[duration](tariffs['2'])}{suffix}
                        {discount>0&&<span className="border-success border-2 bg-subtle text-white rounded-md px-1.5">-{discount}%</span>}
                    </Button>
                </div>
                }
                {barrier === 3 && <div
                    className="flex items-center flex-col gap-4 bg-active border-subtle rounded-2xl border-solid border-1 p-4 w-96">
                    <img src={TariffTO.src} className="w-32"/>
                    <p className="text-2xl font-semibold font-avant uppercase -mt-3 tracking-wide">
                        Takeoff
                    </p>
                    <p>Тариф устарел</p>
                    <div className="flex flex-col gap-4 p-4">
                        {[
                            [faPlus, "Все, что есть в Singularity"],
                            [faItunesNote, "Музыка из NewGrounds, YouTube, Deezer, VK и mp3 файлов"],
                            [faZap, "BuildLab: логотип, текстуры и поддержка iOS"],
                            [faCloudArrowDown, "Автоматические резервные копии"],
                            [faStar, "Рейт-бот для Discord"]
                        ].map((e, i) => <span className="flex gap-4 items-center" key={i}>
                            <div className="flex justify-center !w-8">
                                        <FontAwesomeIcon className="text-2xl" icon={e[0]}/>
                                    </div> <span className="flex-1">{e[1]}</span>
                        </span>)}
                    </div>
                    <Button type="primary" size="large"
                            className="w-full mt-auto flex items-center justify-center gap-2"
                            onClick={() => createServer(3)}>
                        {prc[duration](tariffs['3'])}{suffix}
                        {discount > 0 && <span
                            className="border-success border-2 bg-subtle text-white rounded-md px-1.5">-{discount}%</span>}
                    </Button>
                </div>}
                {barrier <= 4 && <div
                    className="flex items-center flex-col gap-4 bg-active border-subtle rounded-2xl border-solid border-1 p-4 w-96">
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
                    <Button type="primary" size="large"
                            className="w-full mt-auto flex items-center justify-center gap-2"
                            onClick={() => createServer(4)}>
                        {prc[duration](tariffs['4'])}{suffix}
                        {discount > 0 && <span
                            className="border-success border-2 bg-subtle text-white rounded-md px-1.5">-{discount}%</span>}
                    </Button>
                </div>
                }
            </div>
        )
    }


    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------

    const payOptions = []
    !(srv.payDuration !== "mo" && payDurLock) && payOptions.push({value: "mo", label: "Месяц"})
    !(srv.payDuration !== "yr" && payDurLock) && payOptions.push(
        {value: "yr", label: <span>Год <span className="bg-primary rounded px-1">-15%</span></span>}
    )
    payOptions.push({value: "all", label: "Навсегда"})

    return <>
        <GlobalHead title={localeGlobal.get('navName')}/>
        <GlobalNav router={props.router}/>
        <Toaster/>
        <div className={styles.main}>

            <h2 className="text-center text-2xl font-semibold">{props.router?.query.id ? "Продлить GDPS" : locale.get('createTitle')}</h2>
            <div className="mx-auto w-fit m-4">
                <div className="flex flex-col gap-2 p-4 glassb rounded-xl bg-active w-96">
                    <div className="flex items-center gap-4">
                        <p className="w-20">Название:</p>
                        <Input rootClassName="flex-1" value={srv.name || ''} onChange={(evt) => {
                            setSrv({
                                ...srv, name: evt.target.value.replaceAll(/[^a-zA-Z\d .\-_]/g, '')
                            })
                        }} disabled={srv.srvid.length === 4}/>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="w-20">Промокод:</p>
                        <Input rootClassName="flex-1" value={srv.promocode || ''} onChange={(evt) => {
                            setSrv({
                                ...srv, promocode: evt.target.value.toUpperCase().replaceAll(/[^a-zA-Z\d\-_]/g, '')
                            })
                        }} placeholder="(при наличии)" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 mx-auto items-center">
                <Segmented rootClassName="bg-subtle select-none w-fit" options={payOptions}
                           value={srv.payDuration} onChange={(val) => setSrv({...srv, payDuration: val})}/>

                {createCards(srv.payDuration)}
            </div>
        </div>
        <p className="mx-auto w-fit my-4 text-gray-300">
            {locale.get('tosReminder').main}
            <Link href="/about/tos" passHref className="hover:underline">{locale.get('tosReminder').link}</Link>
        </p>
    </>;
}

Order.RequireAuth = true


const FruitTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#0d6efd',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white !important',
        },
        '&:hover fieldset': {
            borderColor: '#cacad0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0d6efd',
        },
        borderRadius: "8px",
        color: "white",
        // backgroundColor: "var(--btn-color)",
        marginBottom: "1rem"
    },
});


const FruitThinField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#0d6efd',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiInputLabel-root[data-shrink="false"]:not(.Mui-focused)': {
        transform: "translate(14px, 10px) scale(1)"
    },
    '& .MuiOutlinedInput-root': {
        height: 40,
        '& fieldset': {
            borderColor: 'white !important',
        },
        '&:hover fieldset': {
            borderColor: '#cacad0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0d6efd',
        },
        borderRadius: "8px",
        color: "white",
    },
});
