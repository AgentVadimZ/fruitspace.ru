import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {Router, useRouter} from "next/router";
import styles from "../../../../components/Manage/GDManage.module.css"
import {Avatar, Badge, IconButton, List, ListItem, ListItemText} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBan,
    faBolt,
    faGamepad, faGhost,
    faQuestion, faStar,
    faUserCheck,
    faUserPlus,
    faUserSlash
} from "@fortawesome/free-solid-svg-icons";



const GetActionIcon = (iconid) => {
    switch (iconid){
        case 0:
            return <FontAwesomeIcon icon={faUserPlus} />
        case 1:
            return <FontAwesomeIcon icon={faUserCheck} />
        case 2:
            return <FontAwesomeIcon icon={faUserSlash} />
        case 3:
            return <FontAwesomeIcon icon={faBan} />
        case 4:
            return <FontAwesomeIcon icon={faGamepad} />
        case 5:
            return <FontAwesomeIcon icon={faBolt} />
        default:
            return <FontAwesomeIcon icon={faQuestion} />
    }
}

const GetActionBadge = (type, isMod, uid) => {
    const badgeVisible = isMod || uid===0

    return (
        <Badge badgeContent={<FontAwesomeIcon icon={uid===0?faGhost:faStar} />}  invisible={!badgeVisible}
               color="primary" overlap="circular" anchorOrigin={{vertical:"bottom", horizontal: "right"}}>
            <Avatar style={{backgroundColor:"var(--btn-color)"}}>
                {GetActionIcon(type)}
            </Avatar>
        </Badge>
    )
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
    }

    return (
        <ListItemText
            primary={<b>{prim}</b>}
            secondary={<p style={{margin:"0 .5rem",fontSize:"10pt",color:"#cacad0"}}>{sec}</p>}/>
    )
}

const Demo = [
    {id: 1, date: "2021-09-06 15:42:06", uid: 0, type: 0, target_id: 1, isMod: 0, data: {uname: "M41den", action: "Register"}},
    {id: 2, date: "2021-09-06 15:42:06", uid: 0, type: 1, target_id: 2, isMod: 0, data: {uname:"MeteoLDrago2", action:"Login"}},
    {id: 3, date: "2021-09-06 15:42:06", uid: 0, type: 2, target_id: 2, isMod: 0, data: {uname:"MeteoLDrago2", action:"Login"}},
    {id: 4, date: "2021-09-06 15:42:06", uid: 0, type: 3, target_id: 2, isMod: 0, data: {action:"Ban", type:"Ban:StarsLimit"}},
    {id: 4, date: "2021-09-06 15:42:06", uid: 0, type: 3, target_id: 2, isMod: 0, data: {action:"Ban", type:"Ban:StarsLimit"}},
    {id: 5, date: "2021-09-06 15:42:06", uid: 0, type: 4, target_id: 2, isMod: 0, data: {uname:"MeteoLDrago2", action:"Login"}},
    {id: 6, date: "2021-09-06 15:42:06", uid: 0, type: 5, target_id: 2, isMod: 0, data: {uname:"MeteoLDrago2", action:"Login"}},
]

export default function ActionsGD(props) {
    const router = useRouter()

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <PanelContent>
                <div className={styles.CardBox} style={{width:"100%"}}>
                    <div>
                        Sort and etc
                    </div>
                    <List dense>
                        {Demo.map((val,i)=>(
                            <ListItem key={i} className={styles.hoverable} secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>}>
                                <ListItemAvatar>
                                    {GetActionBadge(val.type, val.isMod, val.uid)}
                                </ListItemAvatar>
                                {GetActionText(val)}
                            </ListItem>
                        ))}
                    </List>
                </div>
            </PanelContent>
        </>
    )
}

ActionsGD.RequireAuth=true