import GlobalHead from "../../../components/GlobalHead";
import GlobalNav from "../../../components/GlobalNav";
import styles from "../../../components/Index.module.css";
import {useRouter} from "next/router";
import {styled} from "@mui/system";
import {MenuItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Tab, TabsList} from "../../../components/Global/TinyTab";
import useEffectOnce from "../../../components/Hooks";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {LoadingButton} from "@mui/lab";
import toast, {Toaster} from "react-hot-toast";
import {useCookies} from "react-cookie";
import useLocale, {useGlobalLocale} from "../../../locales/useLocale";


export default function Order(props) {

    const router = useRouter()
    const [srv, setSrv] = useState({
        name: "",
        tariff: router.query.t||2,
        payDuration: "yr",
        promocode: ""
    })
    const [tariffs,setTariffs] = useState({});
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie, delCookie] = useCookies(["token"])

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const ParseError = localeGlobal.get('funcParseErr')

    const createServer = ()=> {
        setLoading(true)
        fetch("https://api.fruitspace.one/v1/manage/gd/new",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({name: srv.name, tariff: parseInt(srv.tariff), duration: srv.payDuration, promocode: srv.promocode})}).then(resp=>resp.json()).then((resp)=>{
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
        fetch("https://api.fruitspace.one/v1/fetch/tariffs",
            {credentials:"include"}).then(resp=>resp.json()).then((resp)=>{
            if(resp.status==="ok") {
                setTariffs(resp.Tariffs)
            }})
    })

    const getLocalPrice = (tariff) => {
        if (locale.locale==="ru")
            return ""+(tariff.PriceRUB===0?0:tariff.PriceRUB-1)+"₽"
        else
            return "$"+(tariff.PriceUSD===0?0:tariff.PriceUSD-0.01)
    }
    const getLocalPriceYear = (tariff) => {
        if (locale.locale==="ru")
            return ""+(tariff.PriceRUB===0?0:tariff.PriceRUB*10-1)+"₽"
        else
            return "$"+(tariff.PriceUSD===0?0:tariff.PriceUSD*10-0.01)
    }

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav router={props.router} />
            <Toaster/>
            <div className={styles.main}>
                <div className={styles.form}>
                    <h3>{locale.get('createTitle')}</h3>
                    <div style={{display:"flex",alignItems:"center",width:"100%"}}>
                        <FruitTextField label={locale.get('createGDPSTitle')} type="text" variant="outlined" style={{margin:".5rem",flex:1}}
                                        value={srv.name||''} onChange={(evt)=>{setSrv({
                            ...srv, name: evt.target.value.replaceAll(/[^a-zA-Z\d .\-_]/g,'')
                        })}} />
                        <FruitTextField
                            select label={locale.get('createTariff')} value={srv.tariff}
                            sx={{minWidth:"8rem"}}
                            onChange={(evt)=>setSrv({
                                ...srv, tariff: evt.target.value,
                            })}>
                            {tariffs&&Object.keys(tariffs).map((i) => {
                                return (
                                    <MenuItem key={i} value={i}>
                                        {tariffs[i].Title} [{getLocalPrice(tariffs[i])}]
                                    </MenuItem>
                                )
                            })}
                        </FruitTextField>
                    </div>
                    <TabsUnstyled value={srv.payDuration} onChange={(e,val)=>setSrv({
                        ...srv, payDuration: val
                    })}>
                        <TabsList>
                            <Tab value="mo">{locale.get('createDurationMonth')}</Tab>
                            <Tab value="yr">{locale.get('createDurationYear')}</Tab>
                        </TabsList>
                    </TabsUnstyled>

                    {tariffs[srv.tariff] && <p>{locale.get('descInter')[0]} <b>{srv.name||locale.get('nameless')}</b>
                        {' '}{locale.get('descInter')[1]} <b>{tariffs[srv.tariff].Title}</b> {locale.get('descInter')[2]}
                        {' '}<b>{tariffs[srv.tariff].PriceRUB} {locale.get('descInter')[3]}</b>.
                        {' '}{locale.get('descInter')[4]} {tariffs[srv.tariff].Players===-1?"∞":tariffs[srv.tariff].Players} {locale.get('descInter')[5]},
                        {' '}{tariffs[srv.tariff].Levels===-1?"∞":tariffs[srv.tariff].Levels} {locale.get('descInter')[6]}. <br/><br/>

                        {locale.get('descInter')[7]}: {locale.get('createFeatures')[0]},
                        {tariffs[srv.tariff].ACL&&locale.get('createFeatures')[1]}{tariffs[srv.tariff].Shops&&locale.get('createFeatures')[2]}
                        {tariffs[srv.tariff].Roles&&locale.get('createFeatures')[3]}{tariffs[srv.tariff].CustomChests&&locale.get('createFeatures')[4]}
                        {tariffs[srv.tariff].Modules&&locale.get('createFeatures')[5]}{tariffs[srv.tariff].Backups&&locale.get('createFeatures')[6]}
                        {tariffs[srv.tariff].Logs&&locale.get('createFeatures')[7]}{tariffs[srv.tariff].Levelpacks&&locale.get('createFeatures')[8]}
                        {tariffs[srv.tariff].Quests&&locale.get('createFeatures')[9]}<br/><br/>

                        GDLab: {tariffs[srv.tariff].GDLab.Enabled?locale.get('createFeatures')[10]:locale.get('createFeatures')[11]} {tariffs[srv.tariff].GDLab.IOS&&locale.get('createFeatures')[12]}
                        {tariffs[srv.tariff].GDLab.MacOS&&locale.get('createFeatures')[13]}{tariffs[srv.tariff].GDLab.Icons&&locale.get('createFeatures')[14]}
                        {tariffs[srv.tariff].GDLab.Textures&&locale.get('createFeatures')[15]}{tariffs[srv.tariff].GDLab.V22&&locale.get('createFeatures')[16]}<br/><br/>
                        {locale.get('descInter')[8]}: NewGrounds,{tariffs[srv.tariff].Music.YouTube&&" YouTube,"}{tariffs[srv.tariff].Music.Deezer&&" Deezer,"}{tariffs[srv.tariff].Music.VK&&" VK,"}{tariffs[srv.tariff].Music.Files&&" Dropbox,"}</p>}


                    <div style={{display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}>
                        {tariffs[srv.tariff] && <p style={{padding:"1rem .5rem",borderRadius:"8px",backgroundColor:"var(--btn-color)", margin: 0}}>
                            {srv.payDuration==="yr"
                                ?getLocalPriceYear(tariffs[srv.tariff])
                                :getLocalPrice(tariffs[srv.tariff])}/
                                    {locale.get('createTime')[srv.payDuration==="yr"?0:1]}</p>}

                        <FruitThinField label={locale.get('createPromo')} type="text" variant="outlined" style={{margin:".5rem"}}
                                        value={srv.promocode||''} onChange={(evt)=>{setSrv({
                            ...srv, promocode: evt.target.value.toUpperCase().replaceAll(/[^a-zA-Z\d\-_]/g,'')
                        })}} />

                        <LoadingButton loading={loading} className={styles.formButton} style={{width:"fit-content"}} onClick={createServer}>
                            {locale.get('createCreate')}
                        </LoadingButton>
                    </div>
                </div>
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
