import GlobalHead from "../../../components/GlobalHead";
import GlobalNav from "../../../components/GlobalNav";
import styles from "../../../components/Index.module.css";
import {useRouter} from "next/router";
import {styled} from "@mui/system";
import {ListItem, ListItemIcon, ListItemText, MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Tab, TabsList, TabPanel} from "../../../components/Global/Tab";
import useEffectOnce from "../../../components/Hooks";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {LoadingButton} from "@mui/lab";
import toast, {Toaster} from "react-hot-toast";
import {useCookies} from "react-cookie";
import useLocale, {useGlobalLocale} from "../../../locales/useLocale";
import TariffCard from "../../../components/Cards/TariffCard";
import PersonIcon from "@mui/icons-material/Person";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CloseIcon from "@mui/icons-material/Close";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import AddIcon from "@mui/icons-material/Add";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {useRecoilState} from "recoil";
import GDServer from "../../../states/gd_server";
import useFiberAPI from "../../../fiber/fiber";


export default function Order(props) {

    const router = useRouter()
    const [srv, setSrv] = useState({
        srvid: router.query.id||"",
        name: "",
        payDuration: "yr",
        promocode: ""
    })
    const [payDurLock, setPayDurLock] = useState(false)

    const api = useFiberAPI()


    const [srvData,setSrvData] = api.servers.useGDPS()


    const [tariffs,setTariffs] = useState({});
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie, delCookie] = useCookies(["token"])

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
                router.push("/profile/servers")
            }else{
                toast.error(locale.get('createFailed')+ParseError(resp.error),{style: {
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
                        if(resp.Srv.plan!=1)
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
        let discount = (duration==="yr"?15:0)
        let barrier = 0
        if(srvData.Srv) barrier = srvData.Srv.plan

        return (
            <div className="flex flex-col lg:flex-row gap-8">
                {barrier<=1 && <TariffCard card={locale.get('cardPack')} discount={discount} i={suffix} name={tariffs['1'].Title} price={prc[duration](tariffs['1'])}
                                           img="https://img.freepik.com/free-vector/abstract-background-with-wavy-shapes_23-2148534078.jpg"
                                           desc={locale.get('tPressStart').desc} onClick={()=>createServer(1)}>
                    <ListItem className="py-0">
                        <ListItemIcon><PersonIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tPressStart').perks[0]}</span>}/>
                    </ListItem>
                    <ListItem className="py-0">
                        <ListItemIcon><MusicNoteIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tPressStart').perks[1]}</span>}/>
                    </ListItem>
                    <ListItem className="py-0">
                        <ListItemIcon><CloseIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tPressStart').perks[2]}</span>}/>
                    </ListItem>
                </TariffCard>}
                {barrier<=2 && <TariffCard card={locale.get('cardPack')} discount={discount} i={suffix} name={tariffs['2'].Title} price={prc[duration](tariffs['2'])}
                                           img="https://img.freepik.com/free-vector/gradient-wavy-background_23-2149115482.jpg"
                                           desc={locale.get('tSingularity').desc} onClick={()=>createServer(2)}>
                    <ListItem className="py-0">
                        <ListItemIcon><AllInclusiveIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tSingularity').perks[0]}</span>}/>
                    </ListItem>
                    <ListItem className="py-0">
                        <ListItemIcon><MusicNoteIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tSingularity').perks[1]}</span>}/>
                    </ListItem>
                    <ListItem className="py-0">
                        <ListItemIcon><PrecisionManufacturingIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tSingularity').perks[2]}</span>}/>
                    </ListItem>
                    <ListItem className="py-0">
                        <ListItemIcon><DesktopMacIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tSingularity').perks[3]}</span>}/>
                    </ListItem>
                </TariffCard>}
                {barrier<=3 && <TariffCard card={locale.get('cardPack')} discount={discount} i={suffix} name={tariffs['3'].Title} price={prc[duration](tariffs['3'])}
                                            img="https://img.freepik.com/free-vector/modern-colorful-flow-poster-wave-liquid-shape-blue-color-background-art-design-your-design-project-vector-illustration_1142-7676.jpg"
                                            desc={locale.get('tTakeoff').desc} onClick={()=>createServer(3)}>
                    <ListItem className="py-0">
                        <ListItemIcon><AddIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tTakeoff').perks[0]} <span className="text-base">Singularity</span></span>}/>
                    </ListItem>
                    <ListItem className="py-0">
                        <ListItemIcon><MusicNoteIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tTakeoff').perks[1]}</span>}/>
                    </ListItem>
                    <ListItem className="py-0">
                        <ListItemIcon><SettingsSuggestIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tTakeoff').perks[2]}</span>}/>
                    </ListItem>
                    <ListItem className="py-0">
                        <ListItemIcon><CloudDoneIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tTakeoff').perks[3]}</span>}/>
                    </ListItem>
                    <ListItem className="py-0">
                        <ListItemIcon><AttachMoneyIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={<span className="text-sm">{locale.get('tTakeoff').perks[4]}</span>}/>
                    </ListItem>
                </TariffCard>}
            </div>
        )
    }


    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav router={props.router} />
            <Toaster/>
            <div className={styles.main}>

                <h2 className="text-center">{locale.get('createTitle')}</h2>
                <div className="mx-auto w-fit grid grid-cols-1 lg:grid-cols-3">
                    <FruitTextField label={locale.get('createGDPSTitle')} type="text" variant="outlined" style={{margin:".5rem",flex:1}}
                                    value={srv.name||''} onChange={(evt)=>{setSrv({
                        ...srv, name: evt.target.value.replaceAll(/[^a-zA-Z\d .\-_]/g,'')
                    })}} className="col-span-2" disabled={srv.srvid.length===4}/>
                    <FruitTextField label={locale.get('createPromo')} type="text" variant="outlined" style={{margin:".5rem"}}
                                    value={srv.promocode||''} onChange={(evt)=>{setSrv({
                        ...srv, promocode: evt.target.value.toUpperCase().replaceAll(/[^a-zA-Z\d\-_]/g,'')
                    })}} />
                </div>

                <TabsUnstyled value={srv.payDuration} onChange={(e,val)=>setSrv({...srv, payDuration: val})} className="my-8 w-fit mx-auto">
                    <TabsList className="mx-auto">
                        {!(srv.payDuration!=="mo"&&payDurLock) && <Tab value="mo">{locale.get('tTabs')[0]}</Tab>}
                        {!(srv.payDuration!=="yr"&&payDurLock) &&<Tab value="yr" className="flex items-center">
                            {locale.get('tTabs')[1]} <span className="text-xs font-normal ml-1 rounded-md px-1 py-0.5" style={{backgroundColor:(srv.payDuration==="yr"?"var(--btn-color)":"var(--primary-color)")}}>-15%</span>
                        </Tab>}
                        <Tab value="all">{locale.get('tTabs')[2]}</Tab>
                    </TabsList>

                    <TabPanel value="mo" className="border-none !p-0">
                        {createCards('mo')}
                    </TabPanel>
                    <TabPanel value="yr" className="border-none !p-0">
                        {createCards('yr')}
                    </TabPanel>
                    <TabPanel value="all" className="border-none !p-0">
                        {createCards('all')}
                    </TabPanel>
                </TabsUnstyled>



            </div>
        </>
    )
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
