import GlobalHead from "../../../components/GlobalHead";
import GlobalNav from "../../../components/GlobalNav";
import useLocale, {useGlobalLocale} from "../../../locales/useLocale";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {styled} from "@mui/system";
import {Button, Backdrop, MenuItem, Switch, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {TabsList, TabPanel, Tab} from "../../../components/Global/Tab";
import {Form, Input, Select} from "antd";
import useFiberAPI from "../../../fiber/fiber";
import semver from "semver";
import BackgroundMC from "../../../components/assets/MCOrderBG.png"
import toast, {Toaster} from "react-hot-toast";

export default function OrderMC(props){
    const locale = useLocale(props.router);
    const localeGlobal = useGlobalLocale(props.router)
    const api = useFiberAPI()
    const [loading, setLoading] = props.globalLoader
    const ParseError = localeGlobal.get('funcParseErr')

    const [tariff, setTariff] = useState(props.router.query.t||"d2")
    const [cores, setCores] = useState(null)
    const [versions, setVersions] = useState([])

    const [config, setConfig] = useState({
        disk: 0,
        dedicated_port: false,
        name: "",
        version: "1.20.4",
        core: "vanilla"
    })

    useEffect(() => {
        api.fetch.minecraftFetchVersions().then(r=>setVersions(r))
        api.fetch.minecraftGetCores().then(r=>setCores(r.cores))
    }, []);

    const [addPort, setAddPort] = useState(false)

    const [backdrop, setBackdrop] = useState("none")

    const [ttab, setTtab] = useState("dynamic")

    const tariffData = (()=>{
        const ttype = (tariff[0]||"d")=="s"?tariffs.static:tariffs.dynamic
        return ttype[tariff[1]-1]||ttype[1]
    })()

    const TotalPrice = tariffData.price + config.disk*50 + (config.dedicated_port?1:0)*100

    const createServer = () => {
        if (config.name.length===0) {
            toast.error("Укажите название сервера", {style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }})
            return
        }
        setLoading(true)
        api.servers.createMC(config.name, tariff, config.core, config.version, config.disk, "", config.dedicated_port).then(resp=>{
            setLoading(false)
            if(resp.status==="ok") {
                toast.success("Сервер успешно создан!",{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
                props.router.push("/profile/servers?s=mc")
            } else{
                toast.error("Не удалось создать сервер: "+ParseError(resp.code, resp.message),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }})
    }

    return(
        <>
            <div className={`flex flex-col bg-opacity-50 lg:h-screen w-screen bg-cover`} style={{
                backgroundImage: `url(${BackgroundMC.src})`,
            }}>
                <GlobalHead title={localeGlobal.get('navName')}/>
                <GlobalNav mainpage router={props.router}/>
                <Toaster />
                <p className="text-center color-white pt-2 text-xl">Создание нового Minecraft сервера</p>
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto w-11/12 lg:w-3/4">
                    <TariffCard tariffData={tariffData} main setBackdrop={setBackdrop} setTariff={setTariff} />
                    <ConfigCard config={config} setConfig={setConfig} cores={cores} versions={versions} />
                    <AdditionalCard config={config} setConfig={setConfig} />
                </div>
                <div
                    className="mt-4 lg:mt-auto mb-6 glassb flex justify-between items-center relative bg-[var(--subtle-color)] rounded-xl w-11/12 lg:w-3/4 mx-auto">
                    <p className="select-none text-lg text-right mx-4 my-0">Итого: {TotalPrice} ₽/мес</p>
                    <Button variant="contained" className="m-4 text-lg rounded-lg bg-[#0d6efd]" onClick={createServer}>Заказать</Button>
                </div>
            </div>
            <Backdrop className="bg-black bg-opacity-75"
                      sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                      open={backdrop != "none"} onClick={() => setBackdrop("none")}>
                {backdrop == "tariff" &&
                    <div className="w-full h-full overflow-y-scroll pb-4" onClick={(e) => e.stopPropagation()}>
                    <p className="text-3xl text-center">Ресурсы</p>
                    <TabsUnstyled value={ttab} onChange={(e,val)=>setTtab(val)} className="w-fit mx-auto">
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

OrderMC.RequireAuth = true


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

const AdditionalCard = ({config, setConfig}) => {
    return <div className="glassb flex flex-col relative bg-[var(--subtle-color)] p-4 rounded-xl group">

        <p className="mt-0">Доп. услуги</p>
        <div className="flex flex-col gap-2">
            {/*<div className="rounded-lg bg-[var(--btn-color)] p-2 flex items-center justify-between h-12">*/}
            {/*    <span>Выделенный IP + Порт 25565</span>*/}
            {/*    <FruitSwitch checked={addPort} onChange={(e, val)=>setAddPort(val)} />*/}
            {/*</div>*/}
            <div className="rounded-lg bg-[var(--btn-color)] p-2 flex items-center justify-between h-12">
                <span>Доп. место</span>
                <span className="flex items-center gap-2 bg-black bg-opacity-[38%] p-1 rounded-full select-none">
                    <span className="nohighlight hover:cursor-pointer flex items-center justify-center rounded-full h-7 bg-[var(--btn-color)] hover:bg-[var(--btn-hover)] aspect-square"
                          onClick={()=>setConfig(c=>({...c, disk:Math.max(c.disk-1,0)}))}>–</span>
                    <span className="select-none">{config.disk*10} GB</span>
                    <span className="nohighlight hover:cursor-pointer flex items-center justify-center rounded-full h-7 bg-[var(--btn-color)] hover:bg-[var(--btn-hover)] aspect-square"
                    onClick={()=>setConfig(c=>({...c, disk:Math.min(c.disk+1, 20)}))}>+</span>
                </span>
            </div>
        </div>
    </div>
}

const ConfigCard = ({config, setConfig, cores, versions}) => {

    const findSuitableVersions = (core) => versions.filter((ver)=>semver.satisfies(ver, cores[core].version_constraint.replace(',','')))

    const suitableVersions = (versions&&cores)?findSuitableVersions(config.core):[]

    const [form] = Form.useForm()

    return (
        <div className="glassb flex flex-col relative bg-[var(--subtle-color)] p-4 rounded-xl group"
                    onClick={() => {}}>

            <p className="mt-0">Настройки</p>
            <div className="flex flex-col gap-2 h-full">
                <Form labelCol={{span: 8}} wrapperCol={{span: 16}} form={form}>
                    <Form.Item label="Название сервера" name="srvName">
                        <Input value={config.name} onChange={({target})=>setConfig(c=>({...c, name: target.value}))} />
                    </Form.Item>
                    <Form.Item label="Ядро" name="core">
                        <Select showSearch defaultValue={config.core} options={cores&&Object.keys(cores).map(c=>({value: c, label: cores[c].title}))}
                        onChange={(core)=>{
                            const ver = findSuitableVersions(core)[0]
                            setConfig(c=>({...c, core: core, version: ver}))
                            form.setFieldValue("version", ver)
                        }}/>
                    </Form.Item>
                    <Form.Item label="Версия" name="version">
                        <Select showSearch defaultValue={config.version} options={suitableVersions.map(ver=>({value:ver}))}
                        onChange={(version)=>{
                            setConfig(c=>({...c, version: version}))
                        }}/>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
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