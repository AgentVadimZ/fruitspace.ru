import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {useRouter} from "next/router";
import styles from "../../../../components/Manage/GDManage.module.css";
import {useEffect, useRef, useState} from "react";
import {
    Autocomplete,
    Avatar,
    ClickAwayListener,
    IconButton, InputAdornment,
    List,
    ListItem,
    ListItemText,
    Switch,
    TextField,
    ToggleButtonGroup, Tooltip
} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBan,
    faCancel,
    faCheck, faCircleDot,
    faCirclePlus,
    faHammer,
    faPen, faQuestion,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

import modBadge from "../../../../components/assets/gd/mod.png"
import modElderBadge from "../../../../assets/gd/mod-elder.png"
import modListBadge from "../../../../assets/gd/mod-leaderboard.png"
import toast, {Toaster} from "react-hot-toast";
import {styled} from "@mui/system";
import {Restore} from "@mui/icons-material";
import dynamic from "next/dynamic";
import HelpIcon from "@mui/icons-material/Help";
import useFiberAPI from "../../../../fiber/fiber";
import {FloatButton, Tour} from "antd";
import {RolesTour} from "../../../../locales/tours/manage/gd";

const SketchPicker = dynamic(() => import("react-color").then((mod)=>mod.SketchPicker), { ssr: false });

const fromRGB = (vals) => {
    return `${vals.r},${vals.g},${vals.b}`
}
const toRGB = (vals) => {
    let u = vals.split(",")
    return {
        r: parseInt(u[0]),
        g: parseInt(u[1]),
        b: parseInt(u[2])
    }
}

const fn=(val)=>{
    console.log(val)
    return val
}

export default function RolesGD(props) {
    const refs = useRef({})
    const tourSteps = RolesTour.map((v,i)=>({
        ...v, target: ()=>refs.current[v.target],
        nextButtonProps: {children: <span>Далее</span>},
        prevButtonProps: {children: <span>Назад</span>},
        className: "w-fit lg:w-[520px]"
    }))
    const [tourOpen, setTourOpen] = useState(!!props.router.query.tour)


    const router = useRouter()

    const [roles, setRoles] = useState([])
    const [roleid, setRoleid] = useState(-1)

    const [crole, setCRole] = useState(roles[roleid])
    const [pickerOpen, setPickerOpen] = useState(false)
    const [iconOpen, setIconOpen] = useState(false)
    const [searchUserOpen, setSearchUserOpen] = useState(false)

    const [queryUsers, setQueryUsers] = useState([])
    const [utext, setUtext] = useState("")

    const api = useFiberAPI()

    const [srv, setSrv] = api.servers.useGDPS()

    const getRoles = async ()=> {
        let proles = await api.gdps_manage.getRoles(srv.Srv.srvid)
        proles.roles&&setRoles(proles.roles)
    }

    const update_role = async () => {
        // fetch stuff
        let resp = await api.gdps_manage.setRole(srv.Srv.srvid, crole)
        if(resp.status==="ok") {
            toast.success("Роль сохранена",{style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }})
        }else{
            toast.error("Ошибочка: "+resp.message,{style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }})
            return
        }
        roles[roleid] = crole
        setRoles(roles)
        setRoleid(-1)
    }

    const reset_role = () => {
        getRoles()
        setCRole(roles[roleid])
    }

    const enqueueUserSearch = (val)=> {
        api.gdps_manage.searchUsers(srv.Srv.srvid, val).then((r)=>{
            r.users&&setQueryUsers(r.users)
        })
    }

    useEffect(()=>{
        srv.Srv.srvid&&getRoles()
    },[srv])
    let el_icon = (lvl)=>{
        switch(lvl) {
            case 0:
                return <FontAwesomeIcon icon={faBan} className="w-12 !h-12 p-2 rounded-lg cursor-pointer"/>
            case 1:
                return <img src={modBadge.src} className="w-12 !h-12 p-2 rounded-lg cursor-pointer" />
            case 2:
                return <img src={modElderBadge.src} className="w-12 !h-12 p-2 rounded-lg cursor-pointer" />
            case 3:
                return <img src={modListBadge.src} className="w-12 !h-12 p-2 rounded-lg cursor-pointer" />
            default:
                return <FontAwesomeIcon icon={faCircleDot} className="w-12 !h-12 p-2 rounded-lg" />
        }
    }

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <Toaster/>
            <Tour open={tourOpen} onClose={()=>setTourOpen(false)} steps={tourSteps}/>
            <FloatButton
                ref={r=>refs.current["help"]=r}
                shape="square"
                type="primary"
                style={{right: 20, bottom: 20}}
                onClick={() => setTourOpen(true)}
                icon={<FontAwesomeIcon icon={faQuestion} />}
            />
            <PanelContent>
                <div className="flex flex-col xl:flex-row gap-8 w-full">
                    <div className={`${styles.CardBox} flex-1`}>
                        <h3>Роли</h3>
                        <div>
                            <List dense>

                                {roles.map((v,i)=>{
                                    if(i===roleid&&crole) {
                                        return (
                                            <div key={i} className="bg-[var(--subtle-color)] rounded-lg">
                                                <ListItem className="rounded-lg" sx={{background:"var(--subtle-color)"}} secondaryAction={
                                                    <div className="flex flex-col xl:flex-row gap-2">
                                                        <IconButton edge="end" className="bg-[var(--error-color)] hover:bg-red-800 mr-2" onClick={reset_role}>
                                                            <FontAwesomeIcon icon={faCancel} className="!h-5 w-5 text-white" />
                                                        </IconButton>
                                                        <IconButton edge="end" className="bg-[var(--success-color)] hover:bg-teal-700 mr-2" onClick={update_role}>
                                                            <FontAwesomeIcon icon={faCheck} className="!h-5 w-5 text-white" />
                                                        </IconButton>
                                                    </div>
                                                }>
                                                    <ListItemAvatar>
                                                        <Avatar className="bg-[transparent]">
                                                            {el_icon(crole.mod_level)}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <FruitThinField label={"Role name"} value={crole.role_name} onChange={(e)=>setCRole({...crole, role_name: e.target.value})} style={{marginBottom: ".5rem"}} InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton edge="end">
                                                                            <Restore/>
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}/>
                                                        }
                                                        secondary={
                                                            <div className="flex flex-col xl:flex-row gap-2">
                                                                <ClickAwayListener onClickAway={()=>setPickerOpen(false)}>
                                                                    <div className="w-fit">
                                                                        <Tooltip title={
                                                                            <SketchPicker disableAlpha color={toRGB(crole.comment_color)} className="!bg-transparent !shadow-none"
                                                                                          onChange={(val,e)=>setCRole({...crole, comment_color: fromRGB(val.rgb)})} />
                                                                        } placement="bottom-start" arrow open={pickerOpen}
                                                                                 disableFocusListener
                                                                                 disableHoverListener
                                                                                 disableTouchListener
                                                                                 PopperProps={{
                                                                                     disablePortal: true,
                                                                                 }}>
                                                                            <p className="flex items-center px-2 py-1 w-fit mx-1 my-0 rounded-md bg-[var(--btn-color)] gap-2 cursor-pointer hover:bg-[var(--btn-hover)]"
                                                                               onClick={()=>setPickerOpen(!pickerOpen)}>
                                                                                <span>Цвет роли</span>
                                                                                <div className="rounded-md w-8 h-4" style={{
                                                                                    backgroundColor:`rgb(${crole.comment_color})`
                                                                                }}></div></p>
                                                                        </Tooltip>
                                                                    </div>
                                                                </ClickAwayListener>
                                                                <ClickAwayListener onClickAway={()=>setIconOpen(false)}>
                                                                    <div className="w-fit">
                                                                        <Tooltip title={
                                                                            <div>
                                                                                <div className="grid grid-cols-3 gap-2">
                                                                                    <FontAwesomeIcon icon={faBan} className="w-12 !h-12 p-2 rounded-lg cursor-pointer" onClick={()=>setCRole({...crole, mod_level:0})}
                                                                                                     style={crole.mod_level==0?{backgroundColor:"var(--primary-color)"}:{}} />
                                                                                    <img src={modBadge.src} className="w-12 !h-12 p-2 rounded-lg cursor-pointer" onClick={()=>setCRole({...crole, mod_level:1})}
                                                                                         style={crole.mod_level==1?{backgroundColor:"var(--primary-color)"}:{}} />
                                                                                    <img src={modElderBadge.src} className="w-12 !h-12 p-2 rounded-lg cursor-pointer" onClick={()=>setCRole({...crole, mod_level:2})}
                                                                                         style={crole.mod_level==2?{backgroundColor:"var(--primary-color)"}:{}} />
                                                                                    <img src={modListBadge.src} className="w-12 !h-12 p-2 rounded-lg cursor-pointer" onClick={()=>setCRole({...crole, mod_level:3})}
                                                                                         style={crole.mod_level==3?{backgroundColor:"var(--primary-color)"}:{}} />
                                                                                    <FontAwesomeIcon icon={faCircleDot} className="w-12 !h-12 p-2 rounded-lg text-gray-400"
                                                                                                     style={crole.mod_level>2?{backgroundColor:"var(--primary-color)"}:{}} />
                                                                                </div>
                                                                                <FruitThinField fullWidth label={"ID Значка"} value={crole.mod_level} onChange={(e)=>setCRole({...crole, mod_level: parseInt(e.target.value)||0})} style={{margin: ".5rem 0"}}/>
                                                                            </div>
                                                                        } placement="bottom-start" arrow open={iconOpen}
                                                                                 disableFocusListener
                                                                                 disableHoverListener
                                                                                 disableTouchListener
                                                                                 PopperProps={{
                                                                                     disablePortal: true,
                                                                                 }}>
                                                                            <p className="flex items-center px-2 py-1 w-fit mx-1 my-0 rounded-md bg-[var(--btn-color)] gap-2 cursor-pointer hover:bg-[var(--btn-hover)]"
                                                                               onClick={()=>setIconOpen(!iconOpen)}>
                                                                                <span>Иконка</span>
                                                                                <span className="rounded-md px-1 bg-[var(--subtle-color)]">ID: {crole.mod_level}</span></p>
                                                                        </Tooltip>
                                                                    </div>
                                                                </ClickAwayListener>
                                                            </div>
                                                        }/>
                                                </ListItem>
                                                <div className="p-2">
                                                    <fieldset className={styles.SettingsFieldset}>
                                                        <legend>Разрешения на команды</legend>
                                                        <div className={styles.SettingsPlato}>
                                                            <span className={styles.CodeBlock}>!rate &lt;diff/reset&gt;</span>
                                                            <FruitSwitch checked={crole.privs.cRate} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, cRate: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span className={styles.CodeBlock}>!feature/!unfeature</span>
                                                            <FruitSwitch checked={crole.privs.cFeature} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, cFeature: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span className={styles.CodeBlock}>!epic/!unepic</span>
                                                            <FruitSwitch checked={crole.privs.cEpic} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, cEpic: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span className={styles.CodeBlock}>!coins &lt;verify/reset&gt;</span>
                                                            <FruitSwitch checked={crole.privs.cVerCoins} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, cVerCoins: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span className={styles.CodeBlock}>!daily [reset]</span>
                                                            <FruitSwitch checked={crole.privs.cDaily} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, cDaily: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span className={styles.CodeBlock}>!weekly [reset]</span>
                                                            <FruitSwitch checked={crole.privs.cWeekly} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, cWeekly: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <p>
                                                                <span className={styles.CodeBlock}>Level Management</span>
                                                                <Tooltip title={<pre>!lvl rename &lt;new_name&gt;<br/>
                                                    !lvl chown &lt;lvl_id&gt; &lt;new_username&gt;<br/>
                                                    !lvl desc &lt;description&gt;<br/>
                                                    !lvl list<br/>
                                                    !lvl unlist</pre>}>
                                                                    <IconButton><HelpIcon/></IconButton>
                                                                </Tooltip>
                                                            </p>
                                                            <FruitSwitch checked={crole.privs.cLvlAccess} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, cLvlAccess: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span className={styles.CodeBlock}>!lvl delete &lt;lvl_id&gt;</span>
                                                            <FruitSwitch checked={crole.privs.cDelete} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, cDelete: val?1:0}})}/>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset className={`${styles.SettingsFieldset} mt-4`}>
                                                        <legend>Разрешения на действия</legend>
                                                        <div className={styles.SettingsPlato}>
                                                            <span>Интерфейс модератора <span className={styles.CodeBlock}>(setting → help → req)</span> </span>
                                                            <FruitSwitch checked={crole.privs.aReqMod} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, aReqMod: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span>Оценка на звезды</span>
                                                            <FruitSwitch checked={crole.privs.aRateStars} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, aRateStars: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span>Отправка рейта главным модераторам</span>
                                                            <FruitSwitch checked={crole.privs.aRateReq} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, aRateReq: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span>Запретить оценку на демона (10⭐)</span>
                                                            <FruitSwitch checked={crole.privs.aRateNoDemon} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, aRateNoDemon: val?1:0}})}/>
                                                        </div>
                                                        <div className={styles.SettingsPlato}>
                                                            <span>Оценка демонов</span>
                                                            <FruitSwitch checked={crole.privs.aRateDemon} onChange={(e, val)=>setCRole({...crole, privs:{...crole.privs, aRateDemon: val?1:0}})}/>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset className={`${styles.SettingsFieldset} mt-4`}>
                                                        <legend>Игроки</legend>
                                                        <List dense>
                                                            {crole.users?.map((u,xi)=>(
                                                            <ListItem key={xi} className="hover:bg-[var(--btn-color)] rounded-lg" secondaryAction={
                                                                <IconButton edge="end" className="group hover:bg-[var(--error-color)] mr-2" onClick={()=>{
                                                                    crole.users.splice(xi,1)
                                                                    setCRole({...crole})
                                                                }}>
                                                                    <FontAwesomeIcon icon={faXmark} className="!h-4 w-4 text-[var(--error-color)] group-hover:text-white" />
                                                                </IconButton>}>
                                                                <ListItemText primary={<span className="flex items-center">
                                                                    {u.uname} <span className="rounded-md ml-2 px-2 bg-[var(--active-color)]">ID {u.uid}</span>
                                                                </span>} />
                                                            </ListItem>))
                                                            }

                                                            <ClickAwayListener onClickAway={()=>setSearchUserOpen(false)}>
                                                            <ListItem className="hover:bg-[var(--btn-color)] cursor-pointer rounded-lg" secondaryAction={(!searchUserOpen)&&
                                                                <IconButton edge="end" className="mr-2">
                                                                    <FontAwesomeIcon icon={faCirclePlus} className="text-white !h-4 w-4" />
                                                                </IconButton>} onClick={()=>setSearchUserOpen(true)}>
                                                                {searchUserOpen?(
                                                                <FruitAutocompleteField fullWidth options={queryUsers}
                                                                    getOptionLabel={(option) => option.uname||""}
                                                                    filterOptions={(x) => x}
                                                                    onInputChange={(event, newValue) => {
                                                                        if (newValue.length>2) {
                                                                            enqueueUserSearch(newValue)
                                                                        }
                                                                    }}
                                                                    onChange={(e,val)=>{
                                                                        crole.users.push(val)
                                                                        setCRole(crole)
                                                                        setSearchUserOpen(false)
                                                                    }}
                                                                    renderInput={(params) => (
                                                                    <TextField {...params} label="Имя игрока" />
                                                                )} />
                                                                ):(
                                                                    <ListItemText primary={"Добавить игрока"} />
                                                                )}
                                                            </ListItem>
                                                            </ClickAwayListener>
                                                        </List>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return <ListItem key={i} className="hover:bg-[var(--btn-color)] rounded-lg" secondaryAction={
                                        <IconButton edge="end" className="hover:bg-[var(--primary-color)] mr-2" onClick={()=>{
                                            setRoleid(i)
                                            setCRole(roles[i])
                                        }}>
                                            <FontAwesomeIcon icon={faPen} className="!h-5 w-5 text-white" />
                                        </IconButton>}>
                                        <ListItemAvatar>
                                            <Avatar className="bg-[transparent]">
                                                {el_icon(v.mod_level)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<span className="flex items-center">{v.role_name} <div className="rounded-full ml-2 w-3 h-3" style={{
                                                backgroundColor:`rgb(${v.comment_color})`
                                            }}></div></span>}
                                            secondary={<p style={{margin:"0 .5rem",fontSize:"10pt",color:"#cacad0"}}>ID: {v.id}</p>}/>
                                    </ListItem>
                                })}
                                <ListItem className="hover:bg-[var(--btn-color)] rounded-lg mt-2 cursor-pointer" onClick={()=>{
                                    setRoleid(roles.length)
                                    roles.push({
                                        id: roles.length+1,
                                        role_name: "New role",
                                        mod_level: 1,
                                        comment_color: "255,0,0",
                                        privs: {},
                                        users: []
                                    })
                                    setRoles(roles)
                                    setCRole(roles[roles.length-1])
                                }}>
                                <ListItemAvatar>
                                    <Avatar className="bg-[transparent] p-2">
                                        <FontAwesomeIcon icon={faCirclePlus} className="w-10 !h-10" />
                                    </Avatar>
                                </ListItemAvatar>
                                    <ListItemText primary={<span className="text-lg ml-2">Создать роль</span>} />
                            </ListItem>
                            </List>
                        </div>
                    </div>
                    <div className={`${styles.CardBox} flex-1`}>
                        <h3>Игроки</h3>
                        <div>
                            <p>Сделайте вид что все класс</p>
                            <p>А если серьезно, то накидайте идей сюда: <a className="text-blue-500 underline" href="https://discord.com/channels/1025382676875726898/1025478890552033362">Ссылочка на дс</a></p>
                        </div>
                        <List dense>
                            <ListItem className="hover:bg-[var(--btn-color)] rounded-lg" secondaryAction={
                                <IconButton edge="end" className="group hover:bg-[var(--error-color)] mr-2">
                                    <FontAwesomeIcon icon={faHammer} className="!h-4 w-4 text-[var(--error-color)] group-hover:text-white" />
                                </IconButton>}>
                                <ListItemText primary={<span className="flex items-center">
                                                                    Username <span className="rounded-md ml-2 px-2 bg-[var(--btn-color)]">ID 41</span>
                                    тут еще кнопки бан/разбан, может почта. Идей нету особо
                                                                </span>} />
                            </ListItem>
                        </List>
                    </div>
                </div>
            </PanelContent>
        </>
    )
}

RolesGD.RequireAuth=true

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

const FruitAutocompleteField = styled(Autocomplete)({
    '& label.Mui-focused': {
        color: '#0d6efd',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiInputLabel-root[data-shrink="false"]:not(.Mui-focused)': {
        transform: "translate(14px, 10px) scale(1)"
    },
    '& .MuiAutocomplete-input': {
        padding: "0 !important"
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