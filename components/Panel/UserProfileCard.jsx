
import styles from "./UserProfileCard.module.css"
import styles2 from "../Cards/ServerItem.module.css"
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";
import {styled} from "@mui/system";
import {Button, TextField, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PasswordIcon from '@mui/icons-material/Password';
import {useCookies} from "react-cookie";
import ParseError from "../ErrParser";
import toast from "react-hot-toast";

export default function UserProfileCard(props) {

    const [user,setUser] = useRecoilState(UserState)
    const [showEditPicHint, setPicEditHint] = useState(false)
    const [cookies, setCookie, delCookie] = useCookies(["token"])
    console.log(user)

    const updateName = ()=> {
        fetch("https://api.fruitspace.one/v1/user/update/name",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({name:user.name, surname:user.surname})}).then(resp=>resp.json()).then((resp)=>{
            if(resp.status==="ok") {
                toast.success("Профиль обновлен успешно", {
                    duration: 1000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            }else{
                toast.error("Произошла ошибка: "+ParseError(resp.message), {
                    duration: 10000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            }
        }).catch(()=>{})
    }

    const updateProfilePic = (evt, reset=false)=> {
        console.log(reset)
        var input = document.createElement("input")
        input.type = "file"
        input.accept="image/png, image/jpeg"
        input.onchange=(e)=>{
            var datax = new FormData()
            datax.append("profile_pic", e.target.files[0])
            fetch("https://api.fruitspace.one/v1/user/update/avatar",
                {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                    body: datax}).then(resp=>resp.json()).then((resp)=>{
                if(resp.status==="ok") {
                    toast.success("Аватар обновлен успешно", {
                        duration: 1000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                    setUser((usr)=>({...usr, profilePic: resp.profilePic}))
                }else{
                    toast.error("Произошла ошибка: "+ParseError(resp.message), {
                        duration: 10000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                }
            }).catch(()=>{})
        }
        (reset===false)&&input.click()
        if (reset) {
            var datax = new FormData()
            datax.append("reset","reset")
            fetch("https://api.fruitspace.one/v1/user/update/avatar",
                {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                    body: datax}).then(resp=>resp.json()).then((resp)=>{
                if(resp.status==="ok") {
                    toast.success("Аватар обновлен успешно", {
                        duration: 1000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                    setUser((usr)=>({...usr, profilePic: resp.profilePic}))
                }else{
                    toast.error("Произошла ошибка: "+ParseError(resp.message), {
                        duration: 10000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                }
            }).catch(()=>{})
        }
    }
    // Code is highly unoptimized

    return (
        <>
            <div className={styles.ProfileBox}>
                <div className={styles.ProfilePic}>
                    <img src={user.profilePic} />
                    <Tooltip title="Изменить фотографию (Max: 5MB)" placement="right" arrow open={showEditPicHint}>
                        <EditIcon onMouseEnter={()=>setPicEditHint(true)} onMouseLeave={()=>setPicEditHint(false)}
                        onClick={updateProfilePic}/>
                    </Tooltip>
                </div>

                <div className={styles.UnameBox}>
                    <div className={styles.UnameNameBox}>
                        <FruitTextField fullWidth label="Имя (англ)" type="text" variant="outlined" style={{margin:".5rem"}}
                                    value={user.name} onChange={(evt)=>{setUser({
                        ...user,
                        name: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                        })}} />
                        <FruitTextField fullWidth label="Фамилия (англ)" type="text" variant="outlined" style={{margin:".5rem"}}
                                    value={user.surname} onChange={(evt)=>{setUser({
                        ...user,
                        surname: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                        })}} />
                    </div>
                    <h3>@{user.uname}</h3>
                    <div className={styles.UnameBoxButtons}>
                        <Button variant="contained" className={`${styles.cardButton} btnError`} onClick={(e)=>updateProfilePic(e,true)}>Сбросить фотографию</Button>
                        <Button variant="contained" className={styles.cardButton} onClick={updateName}>Сохранить</Button>
                    </div>
                </div>
            </div>

            <div className={styles.SettingsBox}>
                <SettingsItem text="Изменить пароль"><PasswordIcon className={styles2.AddIcon}/></SettingsItem>
                <SettingsItem text={user.is2fa?"Отключить 2ФА":"Включить 2ФА"}><LockPersonIcon className={styles2.AddIcon}/></SettingsItem>
            </div>
        </>
    )
}


const FruitTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#0d6efd',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
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
    },
});



function SettingsItem(props) {

    return (
        <div className={styles2.ServerCard}>
            {props.children}
            <h3 className={styles2.AddText}>{props.text}</h3>
        </div>
    )
}