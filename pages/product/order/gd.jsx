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


export default function Order(props) {

    const router = useRouter()
    const [srv, setSrv] = useState({
        name: "",
        tariff: router.query.t||2,
        payDuration: "mo"
    })
    const [tariffs,setTariffs] = useState({});
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie, delCookie] = useCookies(["token"])

    const createServer = ()=> {
        setLoading(true)
        fetch("https://api.fruitspace.one/v1/manage/gd/new",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({name: srv.name, tariff: parseInt(srv.tariff), duration: srv.payDuration})}).then(resp=>resp.json()).then((resp)=>{
                    setLoading(false)
                    if(resp.status==="ok") {
                toast.success("Сервер создан",{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
                router.push("/profile/servers")
            }else{
                toast.error("Не удалось создать GDPS: "+resp.error,{style: {
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

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <Toaster/>
            <div className={styles.main}>
                <div className={styles.form}>
                    <h3>Создать новый GDPS</h3>
                    <div style={{display:"flex",alignItems:"center",width:"100%"}}>
                        <FruitTextField label="Название" type="text" variant="outlined" style={{margin:".5rem",flex:1}}
                                        value={srv.name||''} onChange={(evt)=>{setSrv({
                            ...srv, name: evt.target.value.replaceAll(/[^a-zA-Z\d .\-_]/g,'')
                        })}} />
                        <FruitTextField
                            select label="Тариф" value={srv.tariff}
                            sx={{minWidth:"8rem"}}
                            onChange={(evt)=>setSrv({
                                ...srv, tariff: evt.target.value,
                            })}>
                            {tariffs&&Object.keys(tariffs).map((i) => {
                                console.log(i,tariffs[i])
                                return (
                                    <MenuItem key={i} value={i}>
                                        {tariffs[i].Title} [{tariffs[i].PriceRUB}р]
                                    </MenuItem>
                                )
                            })}
                        </FruitTextField>
                    </div>
                    <TabsUnstyled value={srv.payDuration} onChange={(e,val)=>setSrv({
                        ...srv, payDuration: val
                    })}>
                        <TabsList>
                            <Tab value="mo">1 месяц</Tab>
                            <Tab value="yr">1 год (2мес бесплатно)</Tab>
                        </TabsList>
                    </TabsUnstyled>

                    {tariffs[srv.tariff] && <p>Вы получаете GDPS с названием <b>{srv.name||"Безымянный"}</b> с тарифом <b>{tariffs[srv.tariff].Title}</b> по цене <b>{tariffs[srv.tariff].PriceRUB}р</b>.
                    А именно возможность иметь {tariffs[srv.tariff].Players===-1?"∞":tariffs[srv.tariff].Players} игроков, {tariffs[srv.tariff].Levels===-1?"∞":tariffs[srv.tariff].Levels} уровней. <br/><br/> Функионал в панели: настройка сундуков,
                        {tariffs[srv.tariff].ACL&&" ACL,"}{tariffs[srv.tariff].Shops&&" магазины,"}{tariffs[srv.tariff].Roles&&" удобная настройка ролей,"}{tariffs[srv.tariff].CustomChests&&" кастомные сундуки для ролей,"}
                        {tariffs[srv.tariff].Modules&&" модули ядра,"}{tariffs[srv.tariff].Backups&&" резервные копии,"}{tariffs[srv.tariff].Logs&&" логи,"}{tariffs[srv.tariff].Levelpacks&&" удобная настройка маппаков и гаунтлетов,"}
                        {tariffs[srv.tariff].Quests&&" удобная настройка дейли/викли и квестов,"}<br/><br/>GDLab: {tariffs[srv.tariff].GDLab.Enabled?" Доступен. Android, Windows,":" нет."} {tariffs[srv.tariff].GDLab.IOS&&" iOS,"}
                        {tariffs[srv.tariff].GDLab&&" MacOS,"}{tariffs[srv.tariff].GDLab.Icons&&" кастомная иконка,"}{tariffs[srv.tariff].GDLab&&" кастомные текстуры,"}{tariffs[srv.tariff].GDLab.V22&&" поддержка 2.2,"}<br/><br/>
                    Возможности музыки: NewGrounds,{tariffs[srv.tariff].Music.YouTube&&" YouTube,"}{tariffs[srv.tariff].Music.Deezer&&" Deezer,"}{tariffs[srv.tariff].Music.VK&&" VK,"}{tariffs[srv.tariff].Music.Files&&" Dropbox,"}</p>}
                    <div style={{display:'flex',alignItems:"center",justifyContent:"space-between",width:"100%"}}>
                        {tariffs[srv.tariff] && <p style={{padding:"1rem .5rem",borderRadius:"8px",backgroundColor:"var(--btn-color)"}}>
                            {srv.payDuration==="yr"?tariffs[srv.tariff].PriceRUB*10:tariffs[srv.tariff].PriceRUB}р/{srv.payDuration==="yr"?"год":"мес"}</p>}

                        <LoadingButton loading={loading} className={styles.formButton} style={{width:"fit-content"}} onClick={createServer}>
                            Создать
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