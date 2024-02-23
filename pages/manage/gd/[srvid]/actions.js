import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {useRouter} from "next/router";
import styles from "../../../../components/Manage/GDManage.module.css"
import {
    Avatar,
    Badge, Button, ClickAwayListener,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    MenuList,
    Pagination,
    Tooltip
} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAsterisk,
    faBan,
    faBolt, faCalendarDay, faCalendarWeek,
    faGamepad, faGhost,
    faQuestion, faRocket, faStar, faStarHalfStroke, faThumbtack, faTrash, faUpload,
    faUserCheck,
    faUserPlus,
    faUserSlash, faWarning
} from "@fortawesome/free-solid-svg-icons";
import {faContao} from "@fortawesome/free-brands-svg-icons";
import {useEffect, useState} from "react";
import Skeleton from '@mui/material/Skeleton';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useFiberAPI from "../../../../fiber/fiber";


const SqBadge = (text) => <span className="rounded-md bg-[var(--btn-color)] group-hover:bg-[var(--active-color)] px-2 py-1 ml-2">{text}</span>


const GetLevelActionIcon = (data) => {
    let pd = data.data
    let icon = faGamepad
    switch (pd.action.toLowerCase()) {
        case "upload":
        case "update":
            icon = faUpload
            break
        case "delete":
            icon = faTrash
            break
        case "rate": {
            let action = pd.type.split(":")
            switch (action[0].toLowerCase()) {
                case "rate":
                    icon = faStarHalfStroke
                    break
                case "starrate":
                    icon = faStar
                    break
                case "feature":
                case "unfeature":
                    icon = faThumbtack
                    break
                case "epic":
                case "unepic":
                    icon = faRocket
                    break
                case "daily":
                    icon = faCalendarDay
                    break
                case "weekly":
                    icon = faCalendarWeek
                    break
                case "coins":
                    icon = faContao
                    break
                default:
                    icon = faQuestion

            }
        }

    }

    return <FontAwesomeIcon icon={icon} />
}

const GetActionIcon = (data) => {
    switch (data.type){
        case 0:
            return <FontAwesomeIcon icon={faUserPlus} />
        case 1:
            return <FontAwesomeIcon icon={faUserCheck} />
        case 2:
            return <FontAwesomeIcon icon={faUserSlash} />
        case 3:
            return <FontAwesomeIcon icon={faBan} />
        case 4:
            return GetLevelActionIcon(data)
        case 5:
            return <FontAwesomeIcon icon={faBolt} />
        default:
            return <FontAwesomeIcon icon={faQuestion} />
    }
}

const GetActionBadge = (data) => {
    const badgeVisible = data.isMod || data.uid===0

    return (
        <Badge badgeContent={<FontAwesomeIcon icon={data.uid===0?faGhost:faStar} />}  invisible={!badgeVisible}
               color="primary" overlap="circular" anchorOrigin={{vertical:"bottom", horizontal: "right"}}>
            <Avatar className="bg-[var(--btn-color)] group-hover:bg-[var(--active-color)]">
                {GetActionIcon(data)}
            </Avatar>
        </Badge>
    )
}

const GetLevelActionText = (data) => {
    let prim=""
    let sec=""
    let pd = data.data
    switch (pd.action.toLowerCase()) {
        case "upload":
        case "update":
            prim = <>Загружен {pd.name}{SqBadge("v"+(pd.version?pd.version:"0"))}{SqBadge(pd.uname)}</>
            sec = data.date+" | ID: "+data.target_id+" | Объектов: "+pd.objects
            break
        case "delete":
            prim = <>Удален {pd.name||"[уровень]"}{SqBadge(pd.uname)}</>
            sec = data.date+" | ID: "+data.target_id
            break
        case "rate": {
            let action = pd.type.toLowerCase().split(":")
            switch (action[0]) {
                case "rate":
                    let diff = action[1]||"?"
                    if(diff=="reset")
                        prim = <>Рейт {pd.name} cброшен {SqBadge(pd.uname)}</>
                    else
                        prim = <>Рейт {pd.name} на {diff}{SqBadge(pd.uname)}</>
                    sec = data.date+" | ID: "+data.target_id
                    break
                case "starrate":
                    prim = <>Стар рейт {pd.name} на {action[1]||"?"}⭐{SqBadge(pd.uname)}</>
                    sec = data.date+" | ID: "+data.target_id
                    break
                case "feature":
                    prim = <>{pd.name} получил Feature{SqBadge(pd.uname)}</>
                    sec = data.date+" | ID: "+data.target_id
                    break
                case "unfeature":
                    prim = <>{pd.name} утратил <s>Feature</s>{SqBadge(pd.uname)}</>
                    sec = data.date+" | ID: "+data.target_id
                    break
                case "epic":
                    prim = <>{pd.name} получил Epic{SqBadge(pd.uname)}</>
                    sec = data.date+" | ID: "+data.target_id
                    break
                case "unepic":
                    prim = <>{pd.name} утратил <s>Epic</s>{SqBadge(pd.uname)}</>
                    sec = data.date+" | ID: "+data.target_id
                    break
                case "daily":
                    prim = <>{pd.name} {action[1]=="publish"?"добавлен в":"удален из"} Daily{SqBadge(pd.uname)}</>
                    sec = data.date+" | ID: "+data.target_id
                    break
                case "weekly":
                    prim = <>{pd.name} {action[1]=="publish"?"добавлен в":"удален из"} Weekly{SqBadge(pd.uname)}</>
                    sec = data.date+" | ID: "+data.target_id
                    break
                case "coins":
                    prim = <>{pd.name} {action[1]=="verify"?"получил":"потерял"} вериф. монеты{SqBadge(pd.uname)}</>
                    sec = data.date+" | ID: "+data.target_id
                    break
            }
        }
    }


    return [prim,sec]
}

const GetActionText = (data) => {
    let prim=""
    let sec=""
    switch (data.type) {
        case 0:
            prim=data.data.uname+" зарегистрировался"
            sec=data.date+" | UID: "+data.target_id
            break
        case 1:
            prim=data.data.uname+" вошел в аккаунт"
            sec=data.date+" | UID: "+data.target_id
            break
        case 2:
            prim=data.data.uname+" удалил аккаунт"
            sec=data.date+" | UID: "+data.target_id
            break
        case 3:
            prim=(data.data.uname||"UID "+data.target_id)+` был забанен (${data.data.type})`
            if (data.uid!=0) {
                prim = <>{prim}{SqBadge(data.data.mod_uname)}</>
            }
            sec=data.date+" | UID: "+data.target_id
            break
        case 4:
            [prim, sec] = GetLevelActionText(data)
            break

    }

    return (
        <ListItemText
            primary={prim}
            secondary={<p style={{margin:"0 .5rem",fontSize:"10pt",color:"#cacad0"}}>{sec}</p>}/>
    )
}

export default function ActionsGD(props) {
    const router = useRouter()
    const [Logs, setLogs] = useState({count:0, results:[]})
    const [sortShow, setSortShow] = useState(false)
    const [logFilter, setLogFilter] = useState({page:0,type:-1})


    const api = useFiberAPI()
    const [srv, setSrv] = api.servers.useGDPS()

    const setSortMode = (mode) => {
        setLogFilter({type: mode, page: 0})
        getLogs()
        setSortShow(false)
    }

    const getLogs = ()=>{
        setLogs({count:0, results:[]})
       api.gdps_manage.getLogs(srv.Srv.srvid, logFilter.type, logFilter.page).then((resp)=>{
                    setLogs(resp)
        })
    }

    useEffect(()=>{
        srv.Srv.srvid&&getLogs()
    }, [srv, logFilter])

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <PanelContent>
                <div className={styles.CardBox} style={{marginBottom:"2rem"}}>
                    <div className="flex items-center flex-col lg:flex-row gap-2">
                        <h3 className="!my-0 !mx-4">Лог действий</h3>
                        <div className="flex items-center rounded-lg bg-[var(--btn-color)] px-4 py-2">
                            <FontAwesomeIcon icon={faGhost} className="mr-2" /> — действие системы
                        </div>
                        <div className="flex items-center rounded-lg bg-[var(--btn-color)] px-4 py-2">
                            <FontAwesomeIcon icon={faStar} className="mr-2" /> — действие модератора
                        </div>
                    </div>
                </div>
                <div className={styles.CardBox} style={{width:"100%"}}>
                    <div className="flex items-center">
                        <ClickAwayListener onClickAway={()=>setSortShow(false)}>
                            <div>
                                <Tooltip
                                    open={sortShow}
                                    disableFocusListener disableHoverListener disableTouchListener
                                    title={
                                        <MenuList>
                                            <MenuItem selected={false} style={{borderRadius:"4px", backgroundColor: (logFilter.type===-1?"#0d6efd":"none")}}
                                                      onClick={()=>setSortMode(-1)}>
                                                <Button style={{color: "white"}} variant="text"
                                                        startIcon={<FontAwesomeIcon icon={faAsterisk} style={{height:"1.5rem"}}/>}>
                                                    Все действия
                                                </Button>
                                            </MenuItem>
                                            <MenuItem selected={false} style={{borderRadius:"4px", backgroundColor: (logFilter.type===0?"#0d6efd":"none")}}
                                                      onClick={()=>setSortMode(0)}>
                                                <Button style={{color: "white"}} variant="text"
                                                        startIcon={<FontAwesomeIcon icon={faUserPlus} style={{height:"1.5rem"}}/>}>
                                                    Регистрация
                                                </Button>
                                            </MenuItem>
                                            <MenuItem selected={false} style={{borderRadius:"4px", backgroundColor: (logFilter.type===1?"#0d6efd":"none")}}
                                                      onClick={()=>setSortMode(1)}>
                                                <Button style={{color: "white"}} variant="text"
                                                        startIcon={<FontAwesomeIcon icon={faUserCheck} style={{height:"1.5rem"}}/>}>
                                                    Вход
                                                </Button>
                                            </MenuItem>
                                            <MenuItem selected={false} style={{borderRadius:"4px", backgroundColor: (logFilter.type===2?"#0d6efd":"none")}}
                                                      onClick={()=>setSortMode(2)}>
                                                <Button style={{color: "white"}} variant="text"
                                                        startIcon={<FontAwesomeIcon icon={faUserSlash} style={{height:"1.5rem"}}/>}>
                                                    Удаление игрока
                                                </Button>
                                            </MenuItem>
                                            <MenuItem selected={false} style={{borderRadius:"4px", backgroundColor: (logFilter.type===3?"#0d6efd":"none")}}
                                                      onClick={()=>setSortMode(3)}>
                                                <Button style={{color: "white"}} variant="text"
                                                        startIcon={<FontAwesomeIcon icon={faBan} style={{height:"1.5rem"}}/>}>
                                                    Баны
                                                </Button>
                                            </MenuItem>
                                            <MenuItem selected={false} style={{borderRadius:"4px", backgroundColor: (logFilter.type===4?"#0d6efd":"none")}}
                                                      onClick={()=>setSortMode(4)}>
                                                <Button style={{color: "white"}} variant="text"
                                                        startIcon={<FontAwesomeIcon icon={faGamepad} style={{height:"1.5rem"}}/>}>
                                                    Действия с уровнями
                                                </Button>
                                            </MenuItem>
                                        </MenuList>
                                    }>
                                    <Button onClick={()=>setSortShow(!sortShow)} className={styles.SlimButton}
                                            style={{margin: "0 .5rem 0 0", color: "white"}}>
                                        {logFilter.type===-1&&<FontAwesomeIcon icon={faAsterisk} style={{height:"1.5rem"}}/>}
                                        {logFilter.type===0&&<FontAwesomeIcon icon={faUserPlus} style={{height:"1.5rem"}}/>}
                                        {logFilter.type===1&&<FontAwesomeIcon icon={faUserCheck} style={{height:"1.5rem"}}/>}
                                        {logFilter.type===2&&<FontAwesomeIcon icon={faUserSlash} style={{height:"1.5rem"}}/>}
                                        {logFilter.type===3&&<FontAwesomeIcon icon={faBan} style={{height:"1.5rem"}}/>}
                                        {logFilter.type===4&&<FontAwesomeIcon icon={faGamepad} style={{height:"1.5rem"}}/>}
                                        <KeyboardArrowDownIcon style={{height:"1rem"}} />
                                    </Button>
                                </Tooltip>
                            </div>
                        </ClickAwayListener>
                        <Pagination count={Logs.count} page={logFilter.page+1} onChange={(e,val)=>setLogFilter({...logFilter, page: val-1})} shape="rounded" sx={{"& *": {color:"white !important"}}} />
                    </div>
                    <List dense>
                        {(Logs.results&&Logs.results.length>0)
                            ?Logs.results.map((val,i)=>{
                            //
                            // console.log(val)
                            // try {val.data = JSON.parse(val.data)}catch (e){}


                            return (
                                <ListItem key={i} className={`group ${styles.hoverable}`}>
                                    <ListItemAvatar>
                                        {GetActionBadge(val)}
                                    </ListItemAvatar>
                                    {GetActionText(val)}
                                </ListItem>
                            )
                        })
                        :(
                            <ListItem className={`group ${styles.hoverable}`}>
                                <ListItemAvatar>
                                    <Skeleton variant="circular" width={40} height={40} className="bg-[var(--btn-color)]"/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Skeleton variant="text" className="bg-[var(--btn-color)] w-full"/>}
                                    secondary={<Skeleton variant="text" className="bg-[var(--btn-color)] w-48"/>}/>
                            </ListItem>
                            )}
                    </List>
                </div>
            </PanelContent>
        </>
    )
}

ActionsGD.RequireAuth=true