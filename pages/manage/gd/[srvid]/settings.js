import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import GDNavBar from "@/components/Manage/NavBars/GDNavBar";
import PanelContent from "@/components/Global/PanelContent";
import {useRouter} from "next/router";

import {useEffect, useRef, useState} from "react";

import GDLablogo from '@/assets/logos/geometrydash.png'
import GDLogo from '@/assets/logos/gd_icon.png'
import toast, {Toaster} from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAndroid, faApple, faDiscord, faVk, faWindows} from "@fortawesome/free-brands-svg-icons";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber.ts";
import {
    faAlignCenter,
    faAlignLeft, faAlignRight, faBrush, faCog,
    faCopy, faFloppyDisk, faImage,
    faMusic, faPaintbrush,
    faQuestion,
    faQuestionCircle,
    faStar, faTrash,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {SettingsTour} from "@/locales/tours/manage/gd";
import {
    FloatButton,
    Input,
    Tour,
    Button,
    Select,
    Popover,
    Switch,
    Segmented,
    Modal,
    ConfigProvider,
    ColorPicker
} from "antd";
import {deepEqual} from "@/components/Hooks";
import Linkify from "linkify-react";
import {GDPSAdminMobileNav} from "@/components/PanelMobileNav";



function isObject(object) {
    return object != null && typeof object === 'object';
}

const aligns = ["left","center","right"]
const topSizes = [10,25,50,100,200,250,500]
var saveToast=null;
const deleteCode=""+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)

export default function SettingsGD(props) {
    const refs = useRef({})
    const tourSteps = SettingsTour.map((v,i)=>({
        ...v, target: ()=>refs.current[v.target],
        nextButtonProps: {children: <span>Далее</span>},
        prevButtonProps: {children: <span>Назад</span>},
        className: "w-fit laptop:w-[520px]"
    }))
    const [tourOpen, setTourOpen] = useState(!!props.router.query.tour)

    const router = useRouter()
    const [backdrop, setBackdrop] = useState("none")
    const [userDelCode, setUserDelCode] = useState("")
    const uploadRef = useRef()
    const uploadTexturesRef = useRef()

    const api = useFiberAPI()
    const [srv, setSrv] = api.servers.useGDPS()

    const [settings, setSettings] = useState({
        id: "",
        description: {
            text: "Welcome to my GDPS!",
            align: 0,
            discord: null,
            vk: null,
        },
        spaceMusic: false,
        topSize: 100,
        security: {
            enabled: true,
            autoActivate: false,
            levelLimit: true
        },
        modules: {},
        downloadpage_style: {}
    })

    const [oldSettings, setOldSettings] = useState({})

    const [buildlab, setBuildlab] = useState({
        id: "",
        srvname: "",
        version: "2.2",

        windows: false,
        android: false,
        ios: false,
        macos: false,

        icon: "gd_default.png",
        iconObj: null,
        iconData: null,
        textures: "default",
        textureObj: null,
    })

    const [discordbot, setDiscordbot] = useState({rate:"",newuser:"",newlevel:"",newmusic:""})

    const dbRef = useRef()

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const ParseError = localeGlobal.get('funcParseErr')

    useEffect(()=>{
        if (srv.CoreConfig) {
            let d={
                description: {
                    text: srv.Srv.description,
                    align: srv.Srv.text_align,
                    discord: srv.Srv.discord,
                    vk: srv.Srv.vk,
                },
                spaceMusic: srv.Srv.is_space_music && srv.CoreConfig.ServerConfig.HalMusic,
                topSize: srv.CoreConfig.ServerConfig.TopSize,
                security: {
                    enabled: !srv.CoreConfig.SecurityConfig.DisableProtection,
                    autoActivate: srv.CoreConfig.SecurityConfig.AutoActivate,
                    levelLimit: !srv.CoreConfig.SecurityConfig.NoLevelLimits
                },
                modules: srv.CoreConfig.ServerConfig.EnableModules,
                downloadpage_style: srv.Srv.downloadpage_style
            }
            setSettings(d)
            setOldSettings(d)
        }
        srv.Srv&&setDiscordbot(srv.Srv.m_stat_history)
    },[srv])

    const redirectToDB = () => {
        dbRef.current?.requestSubmit()
    }
    const ResetDBPassword = ()=> {
        api.gdps_manage.dbreset(srv.Srv.srvid).then((resp)=>{
            if(resp.status==="ok") {
                toast.success(locale.get('dbPassResetSuccess'),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }else{
                toast.error(locale.get('dbPassResetErr'),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }
        })
        setBackdrop("none")
    }
    const copyValueR=()=>{
        toast.success(locale.get('copy'), {
            duration: 1000,
            style: {
                color: "white",
                backgroundColor: "var(--btn-color)"
            }
        })
    }
    const saveData = ()=>{
        toast.dismiss("save")
        api.gdps_manage.updateSettings(srv.Srv.srvid, settings).then((resp)=>{
            if(resp.status==="ok") {
                setOldSettings(settings)
                toast.success(locale.get('saveSuccess'),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }else{
                toast.error(locale.get('saveErr'),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }
        }).catch(()=>toast.error(locale.get('saveErr'),{style: {
                color: "white",
                backgroundColor: "var(--btn-color)"
            }}))
        api.gdps_manage.moduleDiscord(srv.Srv.srvid,!!settings.modules.discord, {...discordbot}).then(()=>{})
    }

    const updateIcon = async ()=> {
        let cl = await api.gdps_manage.updateLogo(srv.Srv.srvid, buildlab.iconObj)

                if(cl.status==="ok") {
                    toast.success(locale.get('logoUpd'), {
                        duration: 1000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                }else{
                    toast.error(locale.get('universalErr')+ParseError(cl.code), {
                        duration: 10000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                }
                return cl.status==="ok"
    }
    const goBuildLab = async () => {
        let loader = toast.loading(locale.get('goBuildLab'),{style: {
                color: "white",
                backgroundColor: "var(--btn-color)"
            }})

        let rc = true
        if (buildlab.icon==="custom") rc = await updateIcon()
        if (rc===false) toast.dismiss(loader)
        let res=buildlab.textures
        if (buildlab.textureObj!==null) {
            let cdata = new FormData()
            cdata.append("file",buildlab.textureObj)
            cdata.append("expires","12h")
            cdata.append("maxDownloads", "1")
            cdata.append("autoDelete", "true")
            res = await fetch("https://file.io", {method:"POST", body: cdata}).then(res=>res.json()).then(r=>(r.link))
        }
            api.gdps_manage.buildlabPush(srv.Srv.srvid, {
                ...buildlab,
                iconData:"",
                id: srv.srvid,
                iconObj: "",
                textureObj: "",
                textures: res
            }).then((resp)=>{
                    toast.dismiss(loader)
            if(resp.status==="ok"){
                toast.success(locale.get('goBuildLabSuccess'),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }else{
                toast.error(locale.get('universalErr')+resp.message,{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }
        }).catch(()=>{
            toast.dismiss(loader)
            toast.error(locale.get('connectionErr'),{style: {
                color: "white",
                backgroundColor: "var(--btn-color)"
            }})
        })
    }

    const deleteServer=()=>{
        api.gdps_manage.delete(srv.Srv.srvid).then((resp)=>{
            if(resp.status==="ok"){
                toast.success("Сервер удален успешно",{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
                setTimeout(()=>router.push("/profile/servers/"), 3000)
            }else{
                toast.error(locale.get('universalErr')+resp.message,{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }
        }).catch(()=>{
            toast.error(locale.get('connectionErr'),{style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }})
        })
    }

    const changeIcon = (evt)=> {
        let files = evt.target.files[0]
        let fr = new FileReader()
        fr.onload=()=>{
            setBuildlab({...buildlab, iconObj: files, icon: "custom", iconData: fr.result})
        }
        fr.readAsDataURL(files)

    }
    const changeTextures = (evt)=> {
        let files = evt.target.files[0]
        setBuildlab({...buildlab, textureObj: files, textures: files.name})
    }

    const srvIcon = (()=>{
        if(buildlab.icon==="custom") return buildlab.iconData
        if(srv.icon==="gd_default.png") return GDLogo.src
        return "https://cdn.fruitspace.one/server_icons/"+srv.Srv?.icon
    })()

    useEffect(()=>{
        !deepEqual(settings, oldSettings)?toast((
            <div>
                <p>
                    <FontAwesomeIcon className="text-2xl" icon={faFloppyDisk} /> {locale.get('dontForget')}</p>
                <Button variant="contained" className="bg-success w-full" onClick={()=>saveData()}>{locale.get('save')}</Button>
            </div>), {
            duration: Infinity,
            id: "save",
            position: "top-center",
            className: "glassb p-2 !bg-subtle",
        }):toast.remove("save")
    },[settings, oldSettings, discordbot])

    return <>
        <GlobalHead title={locale.get('nav')}/>
        <GlobalNav />
        <GDNavBar />

        <GDPSAdminMobileNav srvid={srv?.Srv?.srvid} />
        <Toaster/>
        <Tour open={tourOpen} onClose={()=>setTourOpen(false)} steps={tourSteps}/>
        <FloatButton
            shape="square"
            type="primary" className="right-4 bottom-16 ipad:right-5 ipad:bottom-5"
            onClick={() => setTourOpen(true)}
            icon={<FontAwesomeIcon icon={faQuestion} />}
        />

        {srv.Srv && <>
        <PanelContent>
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 laptop:gap-8 w-full desktop:w-5/6">
                <div className="p-4 rounded-2xl bg-active glassb flex flex-col gap-4 flex-1" ref={r => refs.current["db"] = r}>
                    <p className="rounded-md px-1.5 py-0.5 glassb w-fit">База данных</p>
                    <div className="flex gap-4 items-center">
                        <p className="w-20">Логин</p>
                        <Input value={"halgd_" + srv.Srv.srvid || ''} addonAfter={
                            <FontAwesomeIcon className="cursor-pointer" icon={faCopy} onClick={() => {
                                navigator.clipboard.writeText("halgd_" + srv.Srv.srvid);
                                copyValueR()
                            }}/>
                        }/>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="w-20">Пароль</p>
                        <Input.Password value={srv.Srv.db_password||''} addonAfter={
                            <FontAwesomeIcon className="cursor-pointer" icon={faCopy} onClick={() => {
                                navigator.clipboard.writeText(srv.Srv.db_password);
                                copyValueR()
                            }}/>
                        }/>
                    </div>
                    <div className="flex flex-col laptop:flex-row gap-4 items-end laptop:items-center justify-end mt-auto">
                        <Button onClick={() => setBackdrop("dbreset")} danger>Сбросить пароль</Button>
                        <form method="post" action="https://db.fruitspace.ru" target="_blank" ref={dbRef}>
                            <input type="hidden" name="auth[server]" value="FruitSpace GDPS Database"/>
                            <input type="hidden" name="auth[username]" value={"halgd_" + srv.Srv.srvid || ''}/>
                            <input type="hidden" name="auth[password]" value={srv.Srv.db_password || ''}/>
                            <input type="hidden" name="auth[db]" value={"gdps_" + srv.Srv.srvid || ''}/>
                            <Button onClick={() => redirectToDB()} type="primary">Перейти в БД</Button>
                        </form>
                    </div>
                </div>


                <div className="p-4 rounded-2xl bg-active glassb flex flex-col gap-4 flex-1"
                     ref={r => refs.current["db"] = r}>
                    <p className="rounded-md px-1.5 py-0.5 glassb w-fit">Настройки ядра</p>
                    <div className="flex gap-4 items-center justify-between" ref={r => refs.current["topsize"] = r}>
                        <p>Размер топа игроков</p>
                        <Select value={settings.topSize}
                                options={topSizes.map((opt) => ({label: `${opt} игроков`, value: opt}))}
                                onChange={(val) => setSettings({...settings, topSize: val})}/>
                    </div>
                    {srv.Tariff && srv.Tariff.CustomMusic &&
                        <div className="flex gap-4 items-center justify-between">
                            <p className="flex gap-2 items-center">
                                <Popover arrow={false} overlayClassName="w-96 glassb rounded-lg"  title="Кастомная музыка" content={
                                    <p>Кастомная музыка из NewGrounds, YouTube, VK и др. добавляется через панель.<br/>
                                        В отключенном состоянии используется музыка с NewGrounds напрямую (с обходом вайтлиста) <br/>
                                        ⚠️ Можно включить один раз, так как треки будут преобразованы
                                    </p>
                                }>
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                </Popover>
                                Музыка FruitSpace
                            </p>
                            <Switch checked={settings.spaceMusic} onChange={(val)=>setSettings({
                                ...settings, spaceMusic: val,
                            })} disabled={settings.spaceMusic}  />
                        </div>
                    }
                    <div className="flex flex-col gap-4 rounded-xl glassb p-4 mt-4 relative"
                         ref={r => refs.current["antibot"] = r}>
                        <p className="flex gap-4 items-center absolute left-2 -top-4 bg-active rounded-lg glassb px-1.5 py-0.5">
                            <Popover arrow={false} className="-mr-2" overlayClassName="w-96 glassb rounded-lg"
                                     title="Антибот" content={
                                <p>
                                    Кулдаун сообщений, комментариев, защита от накрутки и спама уровнями<br/>
                                    • Защита от спама уровнями работает на основе частоты выкладывания уровней,
                                    поэтому иногда может по ошибке банить игроков (например после рекламы игроки
                                    начинают строить очень много уровней за сутки). Отключите, если это является
                                    проблемой
                                </p>
                            }>
                                <FontAwesomeIcon icon={faQuestionCircle}/>
                            </Popover>
                            Антибот
                            <Switch checked={settings.security.enabled} onChange={(val) => setSettings({
                                ...settings, security: {...settings.security, enabled: val},
                            })}/>
                        </p>

                        <div className="flex gap-4 items-center justify-between">
                            Автоактивация аккаунтов
                            <Switch checked={settings.security.autoActivate} onChange={(val) => setSettings({
                                ...settings, security: {...settings.security, autoActivate: val},
                            })} disabled={!settings.security.enabled}/>
                        </div>
                        <div className="flex gap-4 items-center justify-between">
                            Защита от спама уровнями
                            <Switch checked={settings.security.levelLimit} onChange={(val) => setSettings({
                                ...settings, security: {...settings.security, levelLimit: val},
                            })} disabled={!settings.security.enabled}/>
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-active glassb flex flex-col gap-4 flex-1"
                     ref={r=>refs.current["customization"]=r}>
                    <p className="rounded-md px-1.5 py-0.5 glassb w-fit">Страница загрузки</p>
                    <Input.TextArea value={settings.description.text||''}
                                    onChange={(evt)=>{setSettings({...settings,
                                        description: {...settings.description, text: evt.target.value}
                                    })}} style={{textAlign: aligns[settings.description.align]}} />
                    <div className="flex flex-wrap gap-2 items-center justify-end mt-auto">
                        <Popover overlayClassName="w-64" content="Используйте #players# и #levels# чтобы вставить текущее количество игроков и уровней">
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </Popover>
                        {srv.Tariff?.GDLab.Enabled &&
                            <Button type="primary" className="bg-success hover:!bg-green-700"
                                    onClick={()=>setBackdrop("buildlab")}>🔨 BuildLab™</Button>}
                        {srv.Tariff?.GDLab.Extended &&
                            <Button className="hover:!text-primary" icon={<FontAwesomeIcon icon={faPaintbrush} />}
                                    onClick={()=>setBackdrop("downloadpage")}></Button>}
                        <Button.Group>
                            <Button icon={<FontAwesomeIcon icon={faVk} className="text-white text-xl" />} style={{
                                backgroundColor: settings.description.vk&&"var(--primary-color)"
                            }} onClick={()=>setBackdrop("linksocial")}/>
                            <Button icon={<FontAwesomeIcon icon={faDiscord} className="text-white" />} style={{
                                backgroundColor: settings.description.discord&&"var(--primary-color)"
                            }} onClick={()=>setBackdrop("linksocial")}/>
                        </Button.Group>
                        <Segmented rootClassName="bg-btn select-none" options={[
                            {icon: <FontAwesomeIcon icon={faAlignLeft}/>, value: 0},
                            {label: <FontAwesomeIcon icon={faAlignCenter} />, value: 1},
                            {label: <FontAwesomeIcon icon={faAlignRight} />, value: 2},
                        ]} value={settings.description.align} onChange={(val)=>{setSettings({...settings,
                            description: {...settings.description, align: val}
                        })}} />
                    </div>
                </div>

                <div className="p-4 rounded-2xl bg-active glassb flex flex-col gap-4 flex-1">
                    <p className="rounded-md px-1.5 py-0.5 glassb w-fit">Настройки ядра</p>
                    <div className="flex gap-4 items-center justify-between">
                        <p>Ядро</p>
                        <p className="font-mono text-sm bg-btn rounded px-1.5 py-0.5">GhostCore | v2.X (Hybrid)</p>
                    </div>
                    <div className="flex flex-col gap-4 rounded-xl glassb p-4 mt-4 relative">
                        <p className="flex gap-4 items-center absolute left-2 -top-4 bg-active rounded-lg glassb px-1.5 py-0.5">
                            Модули ядра
                            <Switch checked={!!(settings.modules&&settings.modules.discord)} onChange={(val) => setSettings({
                                ...settings, modules: {...settings.modules, discord: val},
                            })} disabled={srv.Srv.plan<3}/>
                        </p>

                        <div className="flex gap-4 items-center justify-between">
                            <p className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faDiscord} /> Discord
                            </p>
                            <FontAwesomeIcon className="hover:bg-btn p-1.5 rounded-full" icon={faCog} onClick={()=>setBackdrop("gdpsbot")} />
                        </div>
                    </div>
                    <div className="flex flex-col laptop:flex-row gap-4 items-center justify-between">
                        Управление
                        <p className="flex items-center gap-2">
                            <Button danger type="primary" onClick={() => setBackdrop("delete")}>
                                Удалить GDPS
                            </Button>
                            {srv.Tariff && srv.Tariff.Backups &&
                                <Button onClick={()=>setBackdrop("backups")}>
                                Бэкапы
                            </Button>
                            }
                        </p>
                    </div>
                </div>
            </div>

        </PanelContent>

        <Modal title="Сброс пароля от БД" open={backdrop==="dbreset"}
               onCancel={()=>setBackdrop("none")} onOk={ResetDBPassword}
        okButtonProps={{danger:true}} cancelText="Отмена" okText="Сбросить пароль">
            <p className="font-semibold">
                🚨 Стоп-стоп-стоп! 🚨
            </p>
            <p>Вы точно хотите сбросить пароль? <br/>
                Обычно сброс необходим в случае, если пароль базы данных оказался в плохих руках.<br/>
                Вы в любой момент можете узнать пароль в настройках, но мы все-равно хотим убедиться, что вы знаете, что делаете
            </p>
        </Modal>

        <Modal title="Ссылки на медиа" open={backdrop === "linksocial"}
               onCancel={() => setBackdrop("none")} onOk={() => setBackdrop("none")}
               cancelButtonProps={{className: "hidden"}} okText="Готово">
            <div className="flex flex-col gap-4">

                <div className="rounded-xl p-2 glassb">
                    <div className="flex items-center gap-4">
                        <p className="w-24 text-nowrap">
                            <FontAwesomeIcon icon={faDiscord}/> Discord
                        </p>
                        <Input value={settings.description.discord || ''} placeholder="fruitspace"
                               addonBefore="discord.gg/"
                               onChange={(evt) => setSettings({
                                   ...settings, description: {
                                       ...settings.description, discord: evt.target.value
                                   }
                               })}/>
                    </div>
                    <p className="text-sm text-gray-300">
                        Инвайт для Discord сервера генерируйте бессрочным
                    </p>
                </div>
                <div className="rounded-xl p-2 glassb">
                    <div className="flex items-center gap-4">
                        <p className="w-24 text-nowrap">
                            <FontAwesomeIcon className="text-lg" icon={faVk}/> VK
                        </p>
                        <Input value={settings.description.vk || ''} placeholder="fruit_space"
                               addonBefore="vk.com/"
                               onChange={(evt) => setSettings({
                                   ...settings, description: {
                                       ...settings.description, vk: evt.target.value
                                   }
                               })}/>
                    </div>
                </div>
            </div>
        </Modal>

        <Modal title="Кастомизация страницы загрузки" open={backdrop === "downloadpage"}
               onCancel={() => setBackdrop("none")} onOk={() => setBackdrop("none")}
               cancelButtonProps={{className: "hidden"}} okText="Готово">
            <ConfigProvider theme={{
                components: {
                    Button: {
                        colorBorder: settings.downloadpage_style?.accent||"#0d63fd",
                        colorPrimary: settings.downloadpage_style?.accent||"#0d63fd",
                        colorPrimaryHover: `${settings.downloadpage_style?.accent||"#0d63fd"}88`
                    }
                }
            }}>
            <div className="flex flex-col gap-4">
                <div className="rounded-xl glassb flex flex-col justify-center items-center gap-2 aspect-video w-full
                bg-center bg-cover bg-dark" style={{backgroundImage: `url(${settings.downloadpage_style?.bg})`}}>
                    <div
                        className="w-2/3 bg-active backdrop-blur bg-opacity-75 border-white border-opacity-25 rounded-lg border-solid border-1 p-2 flex flex-col gap-2">
                        <div className="flex gap-2 items-center flex-row">
                            <img className="h-20 rounded" src={srvIcon}/>
                            <div className="text-left">
                                <p className="text-xs w-fit">{srv.Srv.srv_name}</p>
                                <p className="text-[0.5rem]">{ParseDesc(srv.Srv.user_count, srv.Srv.level_count)}</p>
                            </div>
                        </div>
                        <Linkify as="pre" className="p-1 text-[0.5rem] whitespace-pre-wrap"
                                 options={{className: "text-primary"}}>
                            {srv.Srv.description}
                        </Linkify>

                        <div className="flex items-center justify-between flex-row">
                            <p className="my-0 mx-2 text-[0.5rem]">Скачать</p>
                            {srv.Srv?.client_windows_url &&
                                <span className="flex gap-2 ">
                                    {srv.Srv.client_windows_url &&
                                        <Button type={settings.downloadpage_style?.variant||"primary"} size="small"
                                                className="text-[0.5rem] h-5 rounded"
                                                icon={<FontAwesomeIcon icon={faWindows}/>}>Windows</Button>
                                    }
                                    {srv.Srv.client_android_url &&
                                        <Button type={settings.downloadpage_style?.variant||"primary"} size="small"
                                                className="text-[0.5rem] h-5 rounded"
                                                icon={<FontAwesomeIcon icon={faAndroid}/>}>Android</Button>
                                    }
                                    {srv.Srv.client_ios_url &&
                                        <Button type={settings.downloadpage_style?.variant||"primary"} size="small"
                                                className="text-[0.5rem] h-5 rounded"
                                                icon={<FontAwesomeIcon icon={faApple}/>}>iOS</Button>
                                    }

                        </span>}
                        </div>
                    </div>
                    <div
                        className="w-2/3 bg-active backdrop-blur bg-opacity-75 border-white border-opacity-25 rounded-lg border-solid border-1 p-1 flex
                        items-center gap-1">
                        <Button size="small" className=" rounded text-[0.5rem] flex-1 h-5"
                                type={settings.downloadpage_style?.variant||"primary"}>Войти в панель</Button>
                        {srv.Srv?.discord &&
                            <Button type={settings.downloadpage_style?.variant||"primary"} className="h-5 rounded aspect-square w-5 p-0 flex items-center justify-center"
                                    size="small">
                                <FontAwesomeIcon
                                    icon={faDiscord} className="!h-3"/>
                            </Button>
                        }
                        {srv.Srv?.vk &&
                            <Button type={settings.downloadpage_style?.variant||"primary"} className="h-5 rounded aspect-square w-5 p-0 flex items-center justify-center"
                                    size="small">
                                <FontAwesomeIcon
                                    icon={faVk} className="!h-4"/>
                            </Button>
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-xl glassb p-4 mt-4 relative">
                    <p className="flex gap-4 items-center absolute left-2 -top-4 bg-active rounded-lg glassb px-1.5 py-0.5">
                        Вид страницы
                    </p>
                    <div className="flex items-center gap-4">
                        Стиль кнопок
                        <ColorPicker disabledAlpha showText format="hex" value={settings.downloadpage_style?.accent||"#0d63fd"}
                                     onChange={(color) => setSettings({...settings, downloadpage_style: {
                                             ...settings.downloadpage_style, accent: `#${color.toHex()}`
                                         }})} rootClassName="bg-subtle" />
                        <Select options={[
                            {label: "Заполненный", value: "primary"},
                            {label: "Обводка", value: "default"},
                        ]} value={settings.downloadpage_style?.variant||"primary"} onChange={(val)=>setSettings({...settings, downloadpage_style: {
                                ...settings.downloadpage_style, variant: val
                            }})} />
                    </div>
                    <div className="flex items-center gap-4">
                        Фоновое изображение
                        <Input placeholder="https://.../image.jpg" value={settings.downloadpage_style?.bg} onChange={
                            (evt)=>setSettings({...settings, downloadpage_style: {
                                    ...settings.downloadpage_style, bg: evt.target.value
                                }})}  />
                    </div>
                </div>
            </div>
            </ConfigProvider>
        </Modal>
        <Modal wrapClassName="ultradanger" title="🧨 Удаление сервера 🧨" open={backdrop === "delete"}
               onCancel={() => setBackdrop("none")} onOk={() => {
            userDelCode === srv.Srv.srvid ? deleteServer()
                : toast.error("ID неверный. Повторите попытку.", {
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
        }}
               okButtonProps={{danger: true}} cancelText="Отмена" okText="Удалить">
            <div className="flex flex-col gap-4">
                <p className="font-semibold">
                    Вы точно хотите удалить сервер?
                </p>
                <p>
                    Мы не сохраним резервные копии и сервер удалится навсегда без возврата средств.<br/>
                    И на всякий случай пройдите проверку:
                </p>
                <div className="flex items-center gap-4">
                    <p className="text-nowrap">ID вашего сервера</p>
                    <Input value={userDelCode} onChange={(evt) => setUserDelCode(evt.target.value.substring(0, 4))}/>
                </div>
            </div>
        </Modal>

        <Modal closeIcon={false} title={
            <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-2">
                    <img className="w-16" src={GDLablogo.src}/>
                    <div>
                        <p className="text-xl rainbow font-semibold">FruitSpace</p>
                        <p className="text-xs">GeometryLab™</p>
                    </div>
                </div>
                <Select labelRender={item => `GD ${item.value}`} options={[
                    {value: "1.9"},
                    {value: "2.0"},
                    {value: "2.1"},
                    {value: "2.2"}
                ]} value={buildlab.version} onChange={(val) => setBuildlab({...buildlab, version: val})}/>
            </div>
        } open={backdrop === "buildlab"}
               onCancel={() => setBackdrop("none")} onOk={goBuildLab}
               cancelText="Отмена" okText="Запустить сборку">
            <div className="flex flex-col gap-4">
                <div className="glassb p-2 rounded-xl flex gap-2 items-center">
                    <img className="w-24 rounded-lg" src={srvIcon}/>
                    <div className="flex flex-col gap-2 p-2">
                        <Input value={buildlab.srvname || srv.Srv.srv_name} onChange={(evt) => setBuildlab({
                            ...buildlab, srvname: evt.target.value
                        })} placeholder="Название GDPS"/>
                        <div className="flex items-center gap-2 text-xl">
                            <Button type="primary" icon={<FontAwesomeIcon icon={faImage}/>}
                                    onClick={() => uploadRef.current.click()}/>
                            <Button icon={<FontAwesomeIcon icon={faTrash}/>}
                                    onClick={() => setBuildlab({...buildlab, icon: "gd_default.png"})}/>
                        </div>
                        <input type="file" accept=".png, .jpg, .jpeg" hidden ref={uploadRef} onChange={changeIcon}/>
                    </div>
                </div>
                <div className="flex flex-col gap-4 rounded-xl glassb p-4 mt-4 relative">
                    <p className="flex gap-4 items-center absolute left-2 -top-4 bg-active rounded-lg glassb px-1.5 py-0.5">
                        Установщики
                    </p>

                    <div className="flex gap-4 items-center justify-between">
                        <p className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faWindows}/> Windows
                        </p>
                        <Switch checked={buildlab.windows} onChange={(val) => setBuildlab({
                            ...buildlab, windows: val,
                        })}/>
                    </div>
                    <div className="flex gap-4 items-center justify-between">
                        <p className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faAndroid}/> Android
                        </p>
                        <Switch checked={buildlab.android} onChange={(val) => setBuildlab({
                            ...buildlab, android: val,
                        })}/>
                    </div>
                    {srv.Tariff?.GDLab.IOS &&
                        <div className="flex gap-4 items-center justify-between">
                            <p className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faApple}/> iOS
                            </p>
                            <Switch checked={buildlab.ios} onChange={(val) => setBuildlab({
                                ...buildlab, ios: val,
                            })}/>
                        </div>
                    }
                </div>
            </div>
            {/*{srv.Tariff && srv.Tariff.GDLab.Textures*/}
            {/*    &&<div className={styles.SettingsPlato} style={{margin:"0 .5rem .5rem .5rem"}}>*/}
            {/*        <input type="file" accept=".fpack" hidden ref={uploadTexturesRef} onChange={changeTextures}/>*/}

            {/*        <p>{locale.get('buildLab')[3]} (<span style={{color:"var(--primary-color)"}}>{buildlab.textures==="default"?locale.get('buildLab')[4]:buildlab.textures}</span>)</p>*/}
            {/*        <div style={{display:"flex"}}>*/}
            {/*            <IconButton className={`${styles.SquareIcon} ${styles.SquareIconGreen}`}*/}
            {/*                        onClick={()=>uploadTexturesRef.current.click()}>*/}
            {/*                <CloudUploadIcon/></IconButton>*/}
            {/*            <IconButton className={`${styles.SquareIcon} ${styles.SquareIconRed}`}*/}
            {/*                        onClick={()=>setBuildlab({...buildlab, textures: "default"})}>*/}
            {/*                <Restore/></IconButton>*/}
            {/*        </div>*/}
            {/*    </div>}*/}
        </Modal>

        <Modal title="Рейт-бот" open={backdrop === "gdpsbot"}
               onCancel={() => setBackdrop("none")} onOk={() => setBackdrop("none")}
               cancelButtonProps={{className: "hidden"}} okText="Готово">
            <div className="flex flex-col gap-4">
                <p>
                    🎮 Рейт-бот для Discord
                    Когда игроки будут регистрироваться, загружать и рейтить уровни - вы получите красивое сообщение на сервере<br/>

                    ⚠️ Включите на канале с вебхуком разрешение &quot;использовать внешние эмодзи с других серверов&quot; для @everyone
                </p>
                <Input addonBefore={<>
                    <FontAwesomeIcon icon={faStar}/> Рейты
                </>} value={discordbot?.rate || ''} onChange={(evt) => setDiscordbot({...discordbot, rate: evt.target.value})}
                placeholder="https://discord.com/api/webhooks/..." />
                <Input addonBefore={<>
                    <FontAwesomeIcon icon={faUpload}/> Новые уровни
                </>} value={discordbot?.newlevel || ''} onChange={(evt) => setDiscordbot({...discordbot, newlevel: evt.target.value})}
                       placeholder="https://discord.com/api/webhooks/..." />
                <Input addonBefore={<>
                    <FontAwesomeIcon icon={faStar}/> Новые игроки
                </>} value={discordbot?.newuser || ''} onChange={(evt) => setDiscordbot({...discordbot, newuser: evt.target.value})}
                       placeholder="https://discord.com/api/webhooks/..." />
                <Input addonBefore={<>
                    <FontAwesomeIcon icon={faMusic}/> Загрузка музыки
                </>} value={discordbot?.newmusic || ''} onChange={(evt) => setDiscordbot({...discordbot, newmusic: evt.target.value})}
                       placeholder="https://discord.com/api/webhooks/..." />
            </div>
        </Modal>

        {/*<Backdrop*/}
        {/*    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}*/}
        {/*    open={backdrop != "none"} onClick={() => setBackdrop("none")}>*/}

        {/*    {backdrop === "backups" && <div className={styles.BackdropBox} onClick={(e) => e.stopPropagation()}>*/}
        {/*        <h3>{locale.get('backups')[0]}</h3>*/}
        {/*        <List>*/}
        {/*            {srv.backups?.map((val,i)=>(*/}
        {/*                    <ListItem key={i} className={styles.hoverable} secondaryAction={*/}
        {/*                        <IconButton edge="end">*/}
        {/*                            <CloudUploadIcon onClick={()=>toast.success(locale.get('backups')[1]+val.date+locale.get('backups')[2],{style: {*/}
        {/*                                    color: "white",*/}
        {/*                                    backgroundColor: "var(--btn-color)"*/}
        {/*                                }})} />*/}
        {/*                        </IconButton>}>*/}
        {/*                        <ListItemAvatar>*/}
        {/*                            <BackupBox className={styles.bluesvg} style={{marginRight:"1rem"}}/>*/}
        {/*                        </ListItemAvatar>*/}
        {/*                        <ListItemText primary={srv.srvname+" "+val.date}*/}
        {/*                                      secondary={<p style={{margin:0}}>{ParseDesc(val.players,val.levels)}</p>}/>*/}
        {/*                    </ListItem>*/}
        {/*                ))}*/}
        {/*        </List>*/}
        {/*        {locale.get('backups')[3]}*/}
        {/*        <div className={styles.CardBottom}>*/}
        {/*            <Button variant="contained" className={styles.SlimButton}*/}
        {/*                    onClick={()=>setBackdrop("none")}>{locale.get('backups')[4]}</Button>*/}
        {/*        </div>*/}
        {/*    </div>}*/}
        {/*</Backdrop>*/}
            </> }
    </>;
}

SettingsGD.RequireAuth = true


const ParseDesc = (players, levels) => {
    let str = "" + players
    let cplayers = players % 10
    switch (cplayers) {
        case 1:
            str += " игрок"
            break
        case 2:
        case 3:
        case 4:
            str += " игрока"
            break
        default:
            str += " игроков"
    }
    str += " • "+levels
    let clevels=levels%10
    switch (clevels) {
        case 1:
            str+=" уровень"
            break
        case 2:
        case 3:
        case 4:
            str+=" уровня"
            break
        default:
            str+=" уровней"
    }
    return str
}