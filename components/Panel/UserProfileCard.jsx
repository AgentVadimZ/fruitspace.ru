
import styles from "./UserProfileCard.module.css"
import styles2 from "../Cards/ServerItem.module.css"
import styles3 from "../Manage/GDManage.module.css"
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";
import {styled} from "@mui/system";
import {Backdrop, Button, IconButton, InputAdornment, TextField, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PasswordIcon from '@mui/icons-material/Password';
import {useCookies} from "react-cookie";
import ParseError from "../ErrParser";
import toast from "react-hot-toast";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function UserProfileCard(props) {

    const [user,setUser] = useRecoilState(UserState)
    const [showEditPicHint, setPicEditHint] = useState(false)
    const [cookies, setCookie, delCookie] = useCookies(["token"])
    const [backdrop, setBackdrop] = useState("none")

    const [pwdResetData, setPwdResetData] = useState({
        current: "",
        newpass: "",
        newpassConfirm: "",

        showCurrent: false,
        showNew: false
    })

    const [totp, setTotp] = useState({
        secret: "",
        image: "",
        code: ""
    })

    const getTOTP = ()=> {
        fetch("https://api.fruitspace.one/v1/user/totp",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({verify: "regen"})}).then(resp=>resp.json()).then((resp)=>{
            if(resp.status==="ok") {
                setTotp(resp)
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

    const updatePassword = ()=> {
        if (pwdResetData.newpass!==pwdResetData.newpassConfirm) {
            toast.error("Новые пароли не совпадают", {
                duration: 10000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            return
        }
        fetch("https://api.fruitspace.one/v1/user/update/password",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({password:pwdResetData.current, newPassword: pwdResetData.newpass})}).then(resp=>resp.json()).then((resp)=>{
            if(resp.status==="ok") {
                toast.success("Пароль обновлен успешно", {
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
                <SettingsItem text="Изменить пароль" onClick={()=>setBackdrop("password")}><PasswordIcon className={styles2.AddIcon}/></SettingsItem>
                <SettingsItem text={user.is2fa?"Отключить 2ФА":"Включить 2ФА"} onClick={()=>setBackdrop("2fa")}><LockPersonIcon className={styles2.AddIcon}/></SettingsItem>
            </div>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop!="none"} onClick={()=>setBackdrop("none")}>

                {backdrop==="password" && <div className={styles3.BackdropBox} onClick={(e)=>e.stopPropagation()}>
                    <h3>Изменить пароль</h3>
                    <FruitThinField fullWidth label="Текущий пароль" type={pwdResetData.showCurrent?"text":"password"} variant="outlined" value={pwdResetData.current} style={{margin:".5rem 0"}}
                    onChange={(evt)=>setPwdResetData({...pwdResetData, current: evt.target.value})}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end"
                                                            onClick={()=>setPwdResetData({...pwdResetData,showCurrent: !pwdResetData.showCurrent})}>
                                                    {pwdResetData.showCurrent ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}/>
                    <FruitThinField fullWidth label="Новый пароль" type={pwdResetData.showNew?"text":"password"} variant="outlined" value={pwdResetData.newpass} style={{margin:".5rem 0"}}
                                    onChange={(evt)=>setPwdResetData({...pwdResetData, newpass: evt.target.value})}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end"
                                                            onClick={()=>setPwdResetData({...pwdResetData,showNew: !pwdResetData.showNew})}>
                                                    {pwdResetData.showNew ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}/>
                    <FruitThinField fullWidth label="Подтвердите новый пароль" type={pwdResetData.showNew?"text":"password"} variant="outlined" value={pwdResetData.newpassConfirm} style={{margin:".5rem 0"}}
                                    onChange={(evt)=>setPwdResetData({...pwdResetData, newpassConfirm: evt.target.value})}/>
                    <div className={styles3.CardBottom}>
                        <Button variant="contained" className={styles3.SlimButton} onClick={updatePassword}>Изменить пароль</Button>
                        <Button variant="contained" className={`${styles3.SlimButton} ${styles3.btnError}`}
                                onClick={()=>setBackdrop("none")}>Отмена</Button>
                    </div>
                </div>}

                {backdrop==="2fa" && <div className={styles3.BackdropBox} onClick={(e)=>e.stopPropagation()}>
                    <h3>Двухфакторная аутентификация</h3>
                    {totp.image!=="" && <>
                        <img src={totp.image} style={{borderRadius:"4px", margin:"0 auto", display:"block"}} />
                        <p>Секрет: <span className={styles3.CodeBlock}>{totp.secret}</span></p>
                        <FruitThinField fullWidth label="Введите код (ничего не делает)" type="text" variant="outlined" value={totp.code} style={{margin:".5rem 0"}}
                                        onChange={(evt)=>setTotp({...totp, code: evt.target.value.replaceAll(/[^0-9]/g,'')})}/>
                    </>}
                    <div className={styles3.CardBottom}>
                        <Button variant="contained" className={`${styles3.SlimButton}`} onClick={()=>getTOTP()}>Запросить код</Button>
                        <Button variant="contained" className={`${styles3.SlimButton} ${styles3.btnError}`}
                                onClick={()=>setBackdrop("none")}>Выйти</Button>
                    </div>
                </div>}
            </Backdrop>
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



function SettingsItem(props) {

    return (
        <div className={styles2.ServerCard} onClick={props.onClick}>
            {props.children}
            <h3 className={styles2.AddText}>{props.text}</h3>
        </div>
    )
}