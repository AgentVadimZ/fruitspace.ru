import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {Router, useRouter} from "next/router";

import styles from "../../../../components/Manage/GDManage.module.css"
import {styled} from "@mui/system";
import {
    Backdrop,
    Button,
    ButtonGroup, Chip,
    IconButton,
    InputAdornment,
    MenuItem,
    Switch,
    TextField,
    Tooltip
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import {AddPhotoAlternate, Restore, Visibility, VisibilityOff, Warning} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import SaveIcon from '@mui/icons-material/Save';

import discordLogo from '../../../../components/assets/social/discord.png'
import vkLogo from '../../../../components/assets/social/vkontakte.png'
import GDLablogo from '../../../../components/assets/logos/geometrydash.png'
import GDLogo from '../../../../components/assets/logos/gd_icon.png'
import {useRecoilState} from "recoil";
import GDServer from "../../../../states/gd_server";
import toast, {Toaster} from "react-hot-toast";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import {Alert, ToggleButton, ToggleButtonGroup} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Face3Icon from '@mui/icons-material/Face3';
import BackupBox from '../../../../components/assets/icons/backup_box.svg'
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {Tab, TabsList} from "../../../../components/Global/TinyTab";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAndroid, faApple, faWindows} from "@fortawesome/free-brands-svg-icons";
import {useCookies} from "react-cookie";
import useLocale, {useGlobalLocale} from "../../../../locales/useLocale";


const aligns = ["left","center","right"]
const topSizes = [10,25,50,100,200,250,500]
var saveToast=null;
const deleteCode=""+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)
export default function SettingsGD(props) {
    const router = useRouter()
    const [srv, setSrv] = useRecoilState(GDServer)
    const [cookies, setCookie, delCookie] = useCookies(["token"])
    const [showPass, setShowPass] = useState(false)
    const [backdrop, setBackdrop] = useState("none")
    const [userDelCode, setUserDelCode] = useState("")
    const uploadRef = useRef()
    const uploadTexturesRef = useRef()

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
        modules: {}
    })

    const [buildlab, setBuildlab] = useState({
        id: "",
        srvname: "",
        version: "2.1",

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


    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const ParseError = localeGlobal.get('funcParseErr')



    useEffect(()=>{
        srv.coreConfig&&setSettings({
            description: {
                text: srv.description,
                align: srv.textAlign,
                discord: srv.discord,
                vk: srv.vk,
            },
            spaceMusic: srv.isSpaceMusic,
            topSize: srv.coreConfig.ServerConfig.TopSize,
            security: {
                enabled: !srv.coreConfig.SecurityConfig.DisableProtection,
                autoActivate: srv.coreConfig.SecurityConfig.AutoActivate,
                levelLimit: !srv.coreConfig.SecurityConfig.NoLevelLimits
            },
            modules: srv.coreConfig.ServerConfig.EnableModules
        })
    },[srv])

    const ResetDBPassword = ()=> {
        fetch("https://api.fruitspace.one/v1/manage/gd/dbreset",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({id:srv.srvid})}).then(resp=>resp.json()).then((resp)=>{
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
        fetch("https://api.fruitspace.one/v1/manage/gd/set_settings",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({...settings,id:srv.srvid})}).then(resp=>resp.json()).then((resp)=>{
            if(resp.status==="ok") {
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
    }

    const updateIcon = async ()=> {
        var datax = new FormData()
        datax.append("id", srv.srvid)
        datax.append("icon", buildlab.iconObj)
        let cl = await fetch("https://api.fruitspace.one/v1/manage/gd/update_icon",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: datax}).then(resp=>resp.json()).catch(()=>{})

                if(cl.status==="ok") {
                    toast.success(locale.get('logoUpd'), {
                        duration: 1000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                }else{
                    toast.error(locale.get('universalErr')+ParseError(cl.message), {
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

        fetch("https://api.fruitspace.one/v1/manage/gd/buildlab",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({
                    ...buildlab,
                    iconData:"",
                    id: srv.srvid,
                    iconObj: "",
                    textureObj: ""
                })}).then(resp=>resp.json()).then((resp)=>{
                    toast.dismiss(loader)
            if(resp.status==="ok"){
                toast.success(locale.get('goBuildLabSuccess'),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }else{
                toast.error(locale.get('universalErr')+resp.error,{style: {
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
        fetch("https://api.fruitspace.one/v1/manage/gd/delete",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({id: srv.srvid})}).then(resp=>resp.json()).then((resp)=>{
            if(resp.status==="ok"){
                toast.success("Сервер удален успешно",{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
                setTimeout(()=>router.push("/profile/servers/"), 5000)
            }else{
                toast.error(locale.get('universalErr')+resp.error,{style: {
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
        return "https://cdn.fruitspace.one/server_icons/"+srv.icon
    })()

    useEffect(()=>{
        toast((
            <div>
                <span><IconButton><SaveIcon style={{fill:"white"}}/></IconButton>{locale.get('dontForget')}</span>
                <Button variant="contained" className={`${styles.SlimButton} ${styles.btnSuccess}`}
                        fullWidth onClick={saveData}>{locale.get('save')}</Button>
            </div>),{
            duration: Infinity,
            id: "save",
            position: "bottom-right",
            style: {
                color: "white",
                backgroundColor: "var(--btn-color)",
            }})
    },[settings])

    return (
        <>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <GDNavBar />
            <Toaster/>
            <PanelContent>
                <div className={styles.CardGrid}>
                    <div className={styles.CardBox}>
                        <h3>{locale.get('db')}</h3>
                        <div className={styles.CardInbox}>
                            <FruitTextField fullWidth label={locale.get('dbFields')[0]} value={"halgd_"+srv.srvid||''}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end" onClick={()=>{navigator.clipboard.writeText("halgd_"+srv.srvid);copyValueR()}}>
                                                            <ContentPasteIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            disabled/>
                            <FruitTextField fullWidth label={locale.get('dbFields')[1]} type={showPass?"text":"password"}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end" onClick={()=>setShowPass(!showPass)}>
                                                            {showPass ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                        <IconButton edge="end" onClick={()=>{navigator.clipboard.writeText(srv.dbPassword);copyValueR()}}>
                                                            <ContentPasteIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            value={srv.dbPassword||''}
                            disabled/>
                        </div>
                        <div className={styles.CardBottom}>
                            <Button variant="contained" className={`${styles.SlimButton} ${styles.btnError}`}
                                    onClick={()=>setBackdrop("dbreset")}>{locale.get('dbSettings')[0]}</Button>
                            <Link href="https://db.fruitspace.one">
                                <Button variant="contained" className={styles.SlimButton}>{locale.get('dbSettings')[1]}</Button>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.CardBox}>
                        <h3>{locale.get('coreSettings')[0]}</h3>
                        <div className={styles.CardInbox}>
                            <div className={styles.SettingsPlato}>
                                <p>{locale.get('coreSettings')[1]}</p>
                                <FruitTextField
                                    select label={locale.get('coreSettings')[2]} value={settings.topSize}
                                    sx={{minWidth:"8rem"}}
                                    onChange={(evt)=>setSettings({
                                        ...settings, topSize: evt.target.value,
                                    })}>
                                    {topSizes.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option} {locale.get('coreSettings')[3]}
                                        </MenuItem>
                                    ))}
                                </FruitTextField>
                            </div>
                            {srv.tariffConfig && srv.tariffConfig.CustomMusic
                            && <div className={styles.SettingsPlato}>
                                    <p>
                                        <Tooltip title={locale.get('tips')[0]}>
                                            <IconButton><HelpIcon/></IconButton>
                                        </Tooltip>

                                        {locale.get('coreSettings')[5]}</p>
                                    <FruitSwitch checked={settings.spaceMusic} onChange={(e, val)=>setSettings({
                                        ...settings, spaceMusic: val,
                                    })} disabled={!!srv.isSpaceMusic} />
                                </div>
                            }
                            <fieldset className={styles.SettingsFieldset}>
                                <legend> <Tooltip title={locale.get('tips')[1]}>
                                    <IconButton><HelpIcon/></IconButton></Tooltip>
                                    {locale.get('coreSettings')[4]} <FruitSwitch checked={settings.security.enabled} onChange={(e, val)=>setSettings({
                                    ...settings, security: {...settings.security, enabled: val},
                                })} />
                                </legend>
                                <div className={styles.SettingsPlato}>
                                    <p>{locale.get('coreSettings')[6]}</p>
                                    <FruitSwitch checked={settings.security.autoActivate} onChange={(e, val)=>setSettings({
                                        ...settings, security: {...settings.security, autoActivate: val},
                                    })} disabled={!settings.security.enabled}/>
                                </div>
                                <div className={styles.SettingsPlato}>
                                    <p>{locale.get('coreSettings')[7]}</p>
                                    <FruitSwitch checked={settings.security.levelLimit} onChange={(e, val)=>setSettings({
                                        ...settings, security: {...settings.security, levelLimit: val},
                                    })} disabled={!settings.security.enabled}/>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div className={styles.CardBox}>
                        <h3>{locale.get('customSettings')[0]}</h3>
                        <div className={styles.CardInbox}>
                        <FruitTextField
                            label={locale.get('customSettings')[1]} multiline fullWidth
                            value={settings.description.text||''}
                            onChange={(evt)=>{setSettings({...settings,
                                description: {...settings.description, text: evt.target.value}
                            })}}
                            inputProps={{style:{textAlign: aligns[settings.description.align]}}}
                        />
                            <p>{locale.get('aboutSectDesc')[0]} <span className={styles.CodeBlock}>#players#</span> {locale.get('aboutSectDesc')[1]} <span className={styles.CodeBlock}>#levels#</span>
                                {' '+locale.get('aboutSectDesc')[2]}</p>

                        </div>


                        <div className={styles.CardBottom}>

                            {srv.tariffConfig && srv.tariffConfig.GDLab.Enabled && <Button variant="contained"
                                className={`${styles.cardButton} ${styles.btnSuccess}`} style={{height:40}}
                                onClick={()=>setBackdrop("buildlab")}>🔨 BuildLab™</Button>}

                            <ButtonGroup variant="contained"
                            sx={{backgroundColor: "var(--btn-color)"}}
                            className={styles.ToggleGroupImitator}>
                                <FruitIconButton className={settings.description.vk&&styles.btnLinked}
                                                 onClick={()=>setBackdrop("linksocial")}>
                                    <img src={vkLogo.src} />
                                </FruitIconButton>
                                <FruitIconButton className={settings.description.discord&&styles.btnLinked}
                                                 onClick={()=>setBackdrop("linksocial")}>
                                    <img src={discordLogo.src} />
                                </FruitIconButton>
                            </ButtonGroup>

                        <FruitToggleButtonGroup
                            size={"small"}
                            sx={{backgroundColor:"var(--bkg-color)", width:"fit-content", borderRadius: "8px"}}
                            value={settings.description.align} exclusive
                            onChange={(e,val)=>{setSettings({...settings,
                                description: {...settings.description, align: val}
                            })}}>
                            <ToggleButton value={0} aria-label="left aligned">
                                <FormatAlignLeftIcon />
                            </ToggleButton>
                            <ToggleButton value={1} aria-label="centered">
                                <FormatAlignCenterIcon />
                            </ToggleButton>
                            <ToggleButton value={2} aria-label="right aligned">
                                <FormatAlignRightIcon />
                            </ToggleButton>
                        </FruitToggleButtonGroup>
                    </div>
                    </div>

                    <div className={styles.CardBox}>
                        <h3>{locale.get('systemSettings')[0]}</h3>
                        <div className={styles.CardInbox}>
                            <p>{locale.get('systemSettings')[1]} <span className={styles.CodeBlock}>GhostCore | v2.X (Hybrid)</span></p>
                            <div className={styles.SettingsPlato}>
                                <b>{locale.get('systemSettings')[2]}</b>
                                <span>
                                    <Button variant="contained" className={`${styles.SlimButton} ${styles.btnError}`}
                                            onClick={()=>setBackdrop("delete")}>{locale.get('systemSettings')[3]}</Button>
                                    {srv.tariffConfig && srv.tariffConfig.Backups
                                        && <Button variant="contained" className={styles.SlimButton}
                                            onClick={()=>setBackdrop("backups")}>{locale.get('systemSettings')[4]}</Button>}
                                </span>
                            </div>
                            <fieldset className={styles.SettingsFieldset} disabled>
                                <legend>{locale.get('systemSettings')[5]} <FruitSwitch
                                    checked={!!(srv.tariffConfig && srv.tariffConfig.Modules)}/></legend>
                                <div className={styles.SettingsPlato}>
                                    <span><IconButton><img src={discordLogo.src} className={styles.adornments}/></IconButton>{locale.get('systemSettings')[6]}</span>
                                    <IconButton><SettingsIcon/></IconButton>
                                </div>
                                <div className={styles.SettingsPlato}>
                                    <span><IconButton><Face3Icon/></IconButton>M41dss </span>
                                    <IconButton><SettingsIcon/></IconButton>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

            </PanelContent>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop!="none"} onClick={()=>setBackdrop("none")}>

                {backdrop==="dbreset" && <div className={styles.BackdropBox} onClick={(e)=>e.stopPropagation()}>
                    {locale.get('dbResetConfirm')[0]}
                    <div className={styles.CardBottom}>
                        <Button variant="contained" className={`${styles.SlimButton} ${styles.btnError}`}
                                onClick={ResetDBPassword}>{locale.get('dbResetConfirm')[1]}</Button>
                        <Button variant="contained" className={styles.SlimButton}
                                onClick={()=>setBackdrop("none")}>{locale.get('dbResetConfirm')[2]}</Button>
                    </div>
                </div>}

                {backdrop==="linksocial" && <div className={styles.BackdropBox} onClick={(e)=>e.stopPropagation()}>
                    {locale.get('socials')[0]}
                    <FruitTextField fullWidth label={locale.get('socials')[1]} value={settings.description.vk||''}
                                    onChange={(evt)=>setSettings({...settings, description: {
                                            ...settings.description, vk: evt.target.value
                                        }})}
                                    placeholder="fruit_space"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"><IconButton>
                                                    <img src={vkLogo.src} className={styles.adornments}/>
                                            </IconButton><p>vk.com/</p></InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={()=>{setSettings({...settings, description: {
                                                    ...settings.description, vk: ""
                                                    }})}}>
                                                    <DeleteIcon className={styles.redsvg}/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}/>
                    <FruitTextField fullWidth label={locale.get('socials')[0]} value={settings.description.discord||''}
                                    onChange={(evt)=>setSettings({...settings, description: {
                                            ...settings.description, discord: evt.target.value
                                        }})}
                                    placeholder="fruitspace"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"><IconButton>
                                                <img src={discordLogo.src} className={styles.adornments}/>
                                            </IconButton><p>discord.gg/</p></InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={()=>{setSettings({...settings, description: {
                                                        ...settings.description, discord: ""
                                                    }})}}>
                                                    <DeleteIcon className={styles.redsvg}/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}/>
                    <div className={styles.CardBottom}>
                        <Button variant="contained" className={styles.cardButton}
                                onClick={()=>setBackdrop("none")}>{locale.get('socials')[3]}</Button>
                    </div>
                </div>}

                {backdrop==="delete" && <div className={styles.BackdropBox} style={{padding:0}} onClick={(e)=>e.stopPropagation()}>
                    <div className={styles.deleteBox}>
                        {locale.get('deleteConfirm')[0]}
                        <div className={styles.CardBottom}>
                            <FruitThinField label={locale.get('deleteConfirm')[1]+deleteCode} value={userDelCode}
                            onChange={(evt)=>setUserDelCode(evt.target.value.replaceAll(/[^0-9]/g,'').substring(0,4))}/>
                            <Button variant="contained" className={`${styles.SlimButton} ${styles.btnError}`}
                                    onClick={()=>{userDelCode===deleteCode?deleteServer()
                                        :toast.error(locale.get('deleteConfirm')[2],{style: {
                                                color: "white",
                                                backgroundColor: "var(--btn-color)"
                                            }})
                                    }}>{locale.get('deleteConfirm')[3]}</Button>
                            <Button variant="contained" className={`${styles.SlimButton} ${styles.btnSuccess}`}
                                    onClick={()=>setBackdrop("none")}>{locale.get('deleteConfirm')[4]}</Button>
                        </div>
                    </div>

                </div>}

                {backdrop==="backups" && <div className={styles.BackdropBox} onClick={(e)=>e.stopPropagation()}>
                    <h3>{locale.get('backups')[0]}</h3>
                    <List>
                        {srv.backups.map((val,i)=>(
                                <ListItem key={i} className={styles.hoverable} secondaryAction={
                                    <IconButton edge="end">
                                        <CloudUploadIcon onClick={()=>toast.success(locale.get('backups')[1]+val.date+locale.get('backups')[2],{style: {
                                                color: "white",
                                                backgroundColor: "var(--btn-color)"
                                            }})} />
                                    </IconButton>}>
                                    <ListItemAvatar>
                                        <BackupBox className={styles.bluesvg} style={{marginRight:"1rem"}}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={srv.srvname+" "+val.date}
                                                  secondary={<p style={{margin:0}}>{ParseDesc(val.players,val.levels)}</p>}/>
                                </ListItem>
                            ))}
                    </List>
                    {locale.get('backups')[3]}
                    <div className={styles.CardBottom}>
                        <Button variant="contained" className={styles.SlimButton}
                                onClick={()=>setBackdrop("none")}>{locale.get('backups')[4]}</Button>
                    </div>
                </div>}

                {backdrop==="buildlab" && <div className={styles.BackdropBox}
                                               style={{position:"relative",padding:"0 .5rem .5rem .5rem "}} onClick={(e)=>e.stopPropagation()}>
                        <TabsUnstyled value={buildlab.version} onChange={(e,val)=>setBuildlab({
                            ...buildlab, version: val, ios: (val==="2.2"?false:buildlab.ios)
                        })} className={styles.floatSelector}>
                            <TabsList>
                                <Tab value="2.1">2.1</Tab>
                                <Tab value="2.2">2.2 Custom</Tab>
                            </TabsList>
                        </TabsUnstyled>

                    <h3 className={styles.buildlabBrand}>
                        <img src={GDLablogo.src}/>
                        <div><h5>FruitSpace</h5><h3>GeometryLab™</h3></div>
                    </h3>
                    <div className={styles.buildlabTop}>
                        <img src={srvIcon} />
                        <input type="file" accept=".png, .jpg, .jpeg" hidden ref={uploadRef} onChange={changeIcon}/>
                        <div>
                            {srv.tariffConfig && srv.tariffConfig.GDLab.V22
                                && <FruitThinField fullWidth label={locale.get('buildLab')[0]} value={buildlab.srvname||srv.srvname} onChange={(evt)=>setBuildlab({
                                ...buildlab, srvname: evt.target.value
                            })} style={{marginBottom: ".5rem"}} InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={()=>{setBuildlab({...buildlab, srvname: ""})}}>
                                            <Restore/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}/>}

                            {srv.tariffConfig && srv.tariffConfig.GDLab.Icons && <div style={{width:"100%"}}>
                                <IconButton className={`${styles.SquareIcon} ${styles.SquareIconGreen}`}
                                onClick={()=>uploadRef.current.click()}>
                                    <AddPhotoAlternate/></IconButton>
                                <IconButton className={`${styles.SquareIcon} ${styles.SquareIconRed}`}
                                onClick={()=>setBuildlab({...buildlab, icon: "gd_default.png"})}>
                                    <DeleteIcon/></IconButton>

                            </div>}
                        </div>

                    </div>

                    <fieldset className={styles.SettingsFieldset}>
                        <legend>{locale.get('buildLab')[7]}</legend>
                        <div className={styles.SettingsPlato}>
                            <p>{buildlab.version==="2.2" && <><Chip color="warning" icon={<Warning />} label="Unstable"/>&nbsp;</>}
                                <FontAwesomeIcon icon={faWindows}/> Windows</p>
                            <FruitSwitch checked={buildlab.windows} onChange={(e, val)=>setBuildlab({
                                ...buildlab, windows: val,
                            })}/>
                        </div>
                        <div className={styles.SettingsPlato}>
                            <p>{buildlab.version==="2.2" && <><Chip color="warning" icon={<Warning />} label="Unstable"/>&nbsp;</>}
                                <FontAwesomeIcon icon={faAndroid}/> Android</p>
                            <FruitSwitch checked={buildlab.android} onChange={(e, val)=>setBuildlab({
                                ...buildlab, android: val,
                            })}/>
                        </div>
                        {srv.tariffConfig && srv.tariffConfig.GDLab.IOS && buildlab.version==="2.1" && <div className={styles.SettingsPlato}>
                            <p><FontAwesomeIcon icon={faApple}/> iOS</p>
                            <FruitSwitch checked={buildlab.ios} onChange={(e, val)=>setBuildlab({
                                ...buildlab, ios: val,
                            })}/>
                        </div>}
                    </fieldset>

                    {buildlab.version==="2.2"&& <Alert severity="warning" style={{backgroundColor:"#ed6c02",color:"#fff",marginTop:"1rem"}}>{locale.get('buildLab')[1]}</Alert>}

                    {buildlab.textures!=="default"&& <Alert severity="warning" style={{backgroundColor:"#ed6c02",color:"#fff",marginTop:"1rem"}}>
                        {locale.get('buildLab')[2]}</Alert>}

                    {srv.tariffConfig && srv.tariffConfig.GDLab.Textures
                        &&<div className={styles.SettingsPlato} style={{margin:"0 .5rem .5rem .5rem"}}>
                        <input type="file" accept=".zip, .fbundle" hidden ref={uploadTexturesRef} onChange={changeTextures}/>

                        <p>{locale.get('buildLab')[3]} (<span style={{color:"var(--primary-color)"}}>{buildlab.textures==="default"?locale.get('buildLab')[4]:buildlab.textures}</span>)</p>
                        <div style={{display:"flex"}}>
                            <IconButton className={`${styles.SquareIcon} ${styles.SquareIconGreen}`}
                                        onClick={()=>uploadTexturesRef.current.click()}>
                                <CloudUploadIcon/></IconButton>
                            <IconButton className={`${styles.SquareIcon} ${styles.SquareIconRed}`}
                                        onClick={()=>setBuildlab({...buildlab, textures: "default"})}>
                                <Restore/></IconButton>
                        </div>
                    </div>}

                    <div className={styles.CardBottom} style={{margin:".5rem 0 0 0"}}>
                        <Button variant="contained" className={`${styles.SlimButton} ${styles.btnSuccess}`}
                                onClick={goBuildLab}>{locale.get('buildLab')[5]}</Button>
                        <Button variant="contained" className={styles.SlimButton}
                                onClick={()=>setBackdrop("none")}>{locale.get('buildLab')[6]}</Button>
                    </div>
                </div>}
            </Backdrop>
        </>
    )
}

SettingsGD.RequireAuth=true



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

const FruitToggleButtonGroup = styled(ToggleButtonGroup)({
    '& .MuiToggleButtonGroup-grouped': {
        margin: "0",
        backgroundColor: "var(--btn-color)",
        borderRadius: "8px",
        '&.Mui-disabled': {
            border: 0,
        },
        '&.Mui-selected': {
            backgroundColor: "var(--primary-color)",
        },
    },
})

const FruitIconButton = styled(IconButton)({
    borderRadius: "0",
    '&:hover': {
        backgroundColor: "var(--primary-color)"
    },
    '&:first-of-type': {
        borderRadius: "8px 0 0 8px"
    },
    '&:last-child': {
        borderRadius: "0 8px 8px 0"
    },
})

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

const ParseDesc=(players, levels)=>{
    let str=""+players
    let cplayers=players%10
    switch (cplayers) {
        case 1:
            str+=" игрок"
            break
        case 2:
        case 3:
        case 4:
            str+=" игрока"
            break
        default:
            str+=" игроков"
    }
    str+=", "+levels
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