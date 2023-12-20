import GlobalHead from "../../../components/GlobalHead";
import GlobalNav from "../../../components/GlobalNav";
import useLocale, {useGlobalLocale} from "../../../locales/useLocale";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {styled} from "@mui/system";
import {Backdrop, MenuItem, Switch, TextField} from "@mui/material";
import {useState} from "react";
import {TabsList, TabPanel, Tab} from "../../../components/Global/Tab";

export default function OrderMC(props){
    const locale = useLocale(props.router);
    const localeGlobal = useGlobalLocale(props.router)

    const [tariff, setTariff] = useState(props.router.query.t||"d2")
    const [ssd, setSSD] = useState(0)
    const [addPort, setAddPort] = useState(false)
    const [name, setName] = useState("")
    const [version, setVersion] = useState("1.20.2")
    const [core, setCore] = useState("paper")

    const [backdrop, setBackdrop] = useState("none")

    const [ttab, setTtab] = useState("dynamic")

    const tariffData = (()=>{
        const ttype = (tariff[0]||"d")=="s"?tariffs.static:tariffs.dynamic
        return ttype[tariff[1]-1]||ttype[1]
    })()

    return(
        <>
            <div className=" bg-[url(https://abrakadabra.fun/uploads/posts/2021-12/1640970997_4-abrakadabra-fun-p-strashnii-fon-mainkraft-4.png)] bg-opacity-50 h-screen w-screen">
                <GlobalHead title={localeGlobal.get('navName')}/>
                <GlobalNav mainpage router={props.router}/>
                <p className="text-center color-white pt-2 text-xl">Создание нового Minecraft сервера</p>
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto w-11/12 lg:w-3/4">
                    <TariffCard tariffData={tariffData} main setBackdrop={setBackdrop} setTariff={setTariff} />
                    <ConfigCard core={core} setCore={setCore} name={name} setName={setName} version={version} setVersion={setVersion} />
                    <AdditionalCard ssd={ssd} setSSD={setSSD} addPort={addPort} setAddPort={setAddPort} />
                </div>
            </div>
            <Backdrop className="bg-black bg-opacity-75" sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={backdrop!="none"} onClick={()=>setBackdrop("none")}>
                {backdrop=="tariff"&&<div className="w-full h-full overflow-y-scroll pb-4" onClick={(e)=>e.stopPropagation()}>
                    <p className="text-3xl text-center">Ресурсы</p>
                    <TabsUnstyled value={ttab} onChange={(e,val)=>setTtab(val)} class="w-fit mx-auto">
                        <TabsList className="mx-auto text-center">
                            <Tab value="dynamic" className="!w-fit">Динамические</Tab>
                            <Tab value="static" className="!w-fit">Статические</Tab>
                        </TabsList>
                        <TabPanel value="dynamic" className="border-none !p-0">
                            <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto w-11/12 lg:w-3/4">
                                {tariffs.dynamic.map((t, i)=>{
                                    return <TariffCard key={i} tariffData={t} setBackdrop={setBackdrop} setTariff={setTariff} />
                                })}
                            </div>
                        </TabPanel>
                        <TabPanel value="static" className="border-none !p-0">
                            <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto w-11/12 lg:w-3/4">
                                {tariffs.static.map((t, i)=>{
                                    return <TariffCard key={i} tariffData={t} setBackdrop={setBackdrop} setTariff={setTariff} />
                                })}
                            </div>
                        </TabPanel>
                    </TabsUnstyled>
                </div>}
            </Backdrop>
        </>
    )
}

// OrderMC.RequireAuth = true


const TariffCard = ({tariffData, main, setBackdrop, setTariff}) => {
    return <div className="glassb flex flex-col relative bg-[var(--subtle-color)] p-4 rounded-xl group hover:cursor-pointer nohighlight"
                onClick={() => {
                    setBackdrop(main?"tariff":"none")
                    if(!main)
                        setTariff(`${tariffData.id[0].toLowerCase()}${tariffData.id[2]}`)
                    console.log(main,`${tariffData.id[0].toLowerCase()}${tariffData.id[2]}`)
                }}>
        <span className="text-xs rounded-md w-fit px-2 py-1 bg-[var(--btn-color)] group-hover:bg-[var(--btn-hover)] absolute top-2 right-2">
            {main?"Изменить":"Выбрать"}
        </span>
        <p className="mt-0">Тариф</p>
        <p className="my-0 transtext bg-gradient-to-t from-red-300 to-blue-500 font-[Coolvetica] text-4xl text-transparent bg-clip-text text-white">
            {tariffData.title}
        </p>
        <div className="flex gap-2 mt-2 text-sm mb-2">
            <span className="px-2 py-1 rounded-md bg-[var(--btn-color)]">{tariffData.cpus} CPUs</span>
            <span className="px-2 py-1 rounded-md bg-[var(--btn-color)]">
                               {!tariffData.minRam?tariffData.maxRam:tariffData.minRam+" ➝ "+tariffData.maxRam} GB RAM
                           </span>
            <span className="px-2 py-1 rounded-md bg-[var(--btn-color)]">{tariffData.ssd} GB SSD</span>
        </div>
        <div className="flex items-center justify-between mt-auto">
            <span className="text-gray-300 text-xs">{tariffData.id}</span>
            <p className="px-2 py-1 rounded-md bg-[var(--primary-color)] w-fit text-lg font-light my-0 ml-auto">{tariffData.price}₽/мес</p>
        </div>
    </div>
}

const AdditionalCard = ({ssd, setSSD, addPort, setAddPort}) => {
    return <div className="glassb flex flex-col relative bg-[var(--subtle-color)] p-4 rounded-xl group">

        <p className="mt-0">Доп. услуги</p>
        <div className="flex flex-col gap-2">
            <div className="rounded-lg bg-[var(--btn-color)] p-2 flex items-center justify-between h-12">
                <span>Выделенный IP + Порт 25565</span>
                <FruitSwitch checked={addPort} onChange={(e, val)=>setAddPort(val)} />
            </div>
            <div className="rounded-lg bg-[var(--btn-color)] p-2 flex items-center justify-between h-12">
                <span>Доп. место</span>
                <span className="flex items-center gap-2 bg-black bg-opacity-[38%] p-1 rounded-full">
                    <span className="nohighlight hover:cursor-pointer flex items-center justify-center rounded-full h-7 bg-[var(--btn-color)] hover:bg-[var(--btn-hover)] aspect-square"
                          onClick={()=>setSSD(Math.max(ssd-1,0))}>–</span>
                    <span className="select-none">{ssd*10} GB</span>
                    <span className="nohighlight hover:cursor-pointer flex items-center justify-center rounded-full h-7 bg-[var(--btn-color)] hover:bg-[var(--btn-hover)] aspect-square"
                    onClick={()=>setSSD(ssd+1)}>+</span>
                </span>
            </div>
        </div>
    </div>
}

const ConfigCard = ({name, setName, version, setVersion, core, setCore}) => {
    return <div className="glassb flex flex-col relative bg-[var(--subtle-color)] p-4 rounded-xl group"
                onClick={() => {}}>

        <p className="mt-0">Настройки</p>
        <div className="flex flex-col gap-2">
            <FruitThinField label="Название сервера" value={name}
                            onChange={(evt)=>setName(evt.target.value.replaceAll(/[^a-zA-Z0-9.-_]/g,''))} />
            <div className="rounded-lg bg-[var(--btn-color)] p-2 flex items-center justify-between h-12">
                <FruitThinField
                    select label="Ядро" value={core}
                    sx={{minWidth:"8rem"}}
                    onChange={(evt)=>setCore(evt.target.value)}>
                    {cores.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.split("_").map((v)=>{return v[0].toUpperCase()+v.slice(1)}).join(" ")}
                        </MenuItem>
                    ))}
                </FruitThinField>
                <FruitThinField
                    select label="Версия" value={version}
                    sx={{minWidth:"8rem"}}
                    onChange={(evt)=>setVersion(evt.target.value)}>
                    {versions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </FruitThinField>
            </div>
        </div>
    </div>
}

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


const FruitSwitch = styled(Switch)({
    height: 46,
    width: 70,
    padding: 8,
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            transform: 'translateX(24px)',
            // color: 'var(--success-color)'
        },
    },
    '& .MuiSwitch-track': {
        borderRadius: 22,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="white" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="white" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 24,
        height: 24,
        margin: 2,
    },
});


const cores = [
    "vanilla",
    "spigot",
    "paper",
    "purpur",
    "folia",
    "fabric",
    "forge",
    "quilt",
    "sponge",
    "sponge_forge"
]

const versions = [
    "1.9.4",
    "1.12.2",
    "1.14.4",
    "1.16.5",
    "1.17.1",
    "1.18.2",
    "1.19.3",
    "1.19.4",
    "1.20.2"
]

const tariffs = {}
tariffs.dynamic = [
    {
        title: "Next ⋙",
        id: "D-1 S",
        price: 350,
        cpus: 1,
        minRam: 2,
        maxRam: 4,
        ssd: 20
    },
    {
        title: "Reforged",
        id: "D-2 S+",
        price: 700,
        cpus: 2,
        minRam: 4,
        maxRam: 8,
        ssd: 30
    },
    {
        title: "EverPeak",
        id: "D-3 M",
        price: 1300,
        cpus: 3,
        minRam: 8,
        maxRam: 12,
        ssd: 45
    },
    {
        title: "Orbital",
        id: "D-4 M+",
        price: 1700,
        cpus: 4,
        minRam: 8,
        maxRam: 16,
        ssd: 60
    },
    {
        title: "Horizon",
        id: "D-5 L",
        price: 2600,
        cpus: 5,
        minRam: 16,
        maxRam: 24,
        ssd: 100
    },
]

tariffs.static = [
    {
        title: "Air",
        id: "S-1 S~",
        price: 550,
        cpus: 1,
        maxRam: 4,
        ssd: 30
    },
    {
        title: "Viper",
        id: "S-2 S++",
        price: 1000,
        cpus: 2,
        maxRam: 8,
        ssd: 40
    },
    {
        title: "Carbon",
        id: "S-3 M~",
        price: 1500,
        cpus: 3,
        maxRam: 12,
        ssd: 60
    },
    {
        title: "Proton",
        id: "S-4 M++",
        price: 2300,
        cpus: 4,
        maxRam: 16,
        ssd: 80
    },
    {
        title: "Warp",
        id: "S-5 L+",
        price: 3200,
        cpus: 5,
        maxRam: 24,
        ssd: 120
    },
]