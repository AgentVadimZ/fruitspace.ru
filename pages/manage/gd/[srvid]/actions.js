import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import GDNavBar from "@/components/Manage/NavBars/GDNavBar";
import PanelContent from "@/components/Global/PanelContent";
import {useRouter} from "next/router";
import styles from "@/components/Manage/GDManage.module.css"
import {
    Avatar,
    Badge,
    List,
    ListItem,
    ListItemText,
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
import useFiberAPI from "@/fiber/fiber.ts";
import {Select, Pagination, Empty} from "antd";


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
        <ListItemText className="text-nowrap"
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
                <div className="p-4 rounded-2xl bg-active glassb flex flex-col gap-4 mb-4 w-full lg:w-2/3">
                    <p className="px-1.5 py-0.5 rounded-lg glassb w-fit">Лог действий</p>
                    <div className="flex items-center rounded-lg px-1.5 py-0.5 bg-btn">
                        <FontAwesomeIcon icon={faGhost} className="mr-2"/> — действие системы
                    </div>
                    <div className="flex items-center rounded-lg px-1.5 py-0.5 bg-btn">
                        <FontAwesomeIcon icon={faStar} className="mr-2"/> — действие модератора
                    </div>
                </div>
                <div className="p-4 rounded-2xl bg-active glassb flex flex-col gap-4 w-full lg:w-2/3">
                    <div className="flex flex-col lg:flex-row items-center gap-2">
                    <Select defaultValue={-1} options={[
                            {
                                value: -1,
                                label: <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faAsterisk} /> Все действия
                                </span>,
                            },
                            {
                                value: 0,
                                label: <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faUserPlus} /> Регистрация
                                </span>,
                            },
                            {
                                value: 1,
                                label: <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faUserCheck} /> Вход
                                </span>,
                            },
                            {
                                value: 3,
                                label: <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faUserSlash} /> Баны
                                </span>,
                            },
                            {
                                value: 4,
                                label: <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faGamepad} /> Действия с уровнями
                                </span>,
                            },
                        ]} onChange={(val)=>setSortMode(val)} />
                        <Pagination responsive pageSize={50} total={Logs.count*50} current={logFilter.page+1} showSizeChanger={false}
                                    onChange={(val)=>setLogFilter({...logFilter, page: val-1})} />
                    </div>
                    <div className="flex flex-col gap-2 overflow-y-auto">
                        {(Logs.results&&Logs.results.length>0)
                            ?Logs.results.map((val,i)=>
                                <ListItem key={i} className={`group ${styles.hoverable}`}>
                                    <ListItemAvatar>
                                        {GetActionBadge(val)}
                                    </ListItemAvatar>
                                    {GetActionText(val)}
                                </ListItem>
                            )
                            : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<p>
                                <p>Сейчас тут пусто</p>
                                <span className="text-xs text-gray-300">Попробуйте зарегистрироваться на вашем GDPS</span>
                            </p>} />
                        }
                    </div>
                </div>
            </PanelContent>
        </>
    )
}

ActionsGD.RequireAuth=true