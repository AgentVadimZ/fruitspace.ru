
import styles from "./UserProfileCard.module.css"
import styles2 from "../Cards/ServerItem.module.css"
import styles3 from "../Manage/GDManage.module.css"
import {styled} from "@mui/system";
import {Backdrop, Button, IconButton, InputAdornment, TextField, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PasswordIcon from '@mui/icons-material/Password';
import toast from "react-hot-toast";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import useFiberAPI from "../../fiber/fiber";

export default function UserProfileCard(props) {

    const api = useFiberAPI()

    const [user,setUser] = api.user.useUser()
    const [showEditPicHint, setPicEditHint] = useState(false)
    const [backdrop, setBackdrop] = useState("none")

    const [pwdResetData, setPwdResetData] = useState({
        current: "",
        newpass: "",
        newpassConfirm: "",

        showCurrent: false,
        showNew: false
    })

    const [totp, setTotp] = useState({
        totp_secret: "",
        totp_image: "",
        code: ""
    })

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const ParseError = localeGlobal.get('funcParseErr')

    const getTOTP = ()=> {
        if (totp.code) {
            api.user.updateTOTP(totp.code).then((resp)=>{
                if(resp.status==="ok") {
                    toast.success(locale.get('twoFA')[5], {
                        duration: 10000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                    setUser({...user, is_2fa: true})
                }else{
                    toast.error(locale.get('err')+ParseError(resp.code, resp.message), {
                        duration: 10000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                }
            })
            return
        }
        api.user.updateTOTP("regen").then((resp)=>{
            if(resp.status==="ok") {
                setTotp(resp)
            }else{
                toast.error(locale.get('err')+ParseError(resp.code, resp.message), {
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
        api.user.updateName(user.name, user.surname).then((resp)=>{
            if(resp.status==="ok") {
                toast.success(locale.get('profileUpdateSuccess'), {
                    duration: 1000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            }else{
                toast.error(locale.get('err')+ParseError(resp.code, resp.message), {
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
            toast.error(locale.get('passDontMatch'), {
                duration: 10000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            return
        }
        api.user.updatePassword(pwdResetData.current, pwdResetData.newpass).then((resp)=>{
            if(resp.status==="ok") {
                toast.success(locale.get('passChangeSuccess'), {
                    duration: 1000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            }else{
                toast.error(locale.get('err')+ParseError(resp.code, resp.message), {
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
        var input = document.createElement("input")
        input.type = "file"
        input.accept="image/png, image/jpeg"
        input.onchange=(e)=>{
            api.user.updateAvatar(e.target.files[0]).then((resp)=>{
                if(resp.status==="ok") {
                    toast.success(locale.get('picChangeSuccess'), {
                        duration: 1000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                    setUser((usr)=>({...usr, profilePic: resp.profilePic}))
                }else{
                    toast.error(locale.get('err')+ParseError(resp.code, resp.message), {
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
            api.user.resetAvatar().then((resp)=>{
                if(resp.status==="ok") {
                    toast.success(locale.get('picChangeSuccess'), {
                        duration: 1000,
                        style: {
                            color: "white",
                            backgroundColor: "var(--btn-color)"
                        }
                    })
                    setUser((usr)=>({...usr, profilePic: resp.profilePic}))
                }else{
                    toast.error(locale.get('err')+ParseError(resp.code, resp.message), {
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

    return <>
        <div className={styles.ProfileBox}>
            <div className={styles.ProfilePic}>
                <img src={user.profile_pic} />
                <Tooltip title={locale.get('picChange')} placement="right" arrow open={showEditPicHint}>
                    <EditIcon onMouseEnter={()=>setPicEditHint(true)} onMouseLeave={()=>setPicEditHint(false)}
                    onClick={updateProfilePic}/>
                </Tooltip>
            </div>

            <div className={styles.UnameBox}>
                <div className={styles.UnameNameBox}>
                    <FruitTextField fullWidth label={locale.get('accInfo')[0]} type="text" variant="outlined" style={{margin:".5rem"}}
                                value={user.name} onChange={(evt)=>{setUser({
                    ...user,
                    name: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                    })}} />
                    <FruitTextField fullWidth label={locale.get('accInfo')[1]} type="text" variant="outlined" style={{margin:".5rem"}}
                                value={user.surname} onChange={(evt)=>{setUser({
                    ...user,
                    surname: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                    })}} />
                </div>
                <h3 className="font-normal">@{user.uname}</h3>
                <div className={styles.UnameBoxButtons}>
                    <Button variant="contained" className={`${styles.cardButton} btnError`} onClick={(e)=>updateProfilePic(e,true)}>{locale.get('reset')}</Button>
                    <Button variant="contained" className={styles.cardButton} onClick={updateName}>{locale.get('save')}</Button>
                </div>
            </div>
        </div>

        <div className={styles.SettingsBox}>
            <SettingsItem text={locale.get('options')[0]} onClick={()=>setBackdrop("password")}><PasswordIcon className={styles2.AddIcon}/></SettingsItem>
            <SettingsItem text={locale.get('options')[user.is_2fa?1:2]} onClick={()=>setBackdrop("2fa")}><LockPersonIcon className={styles2.AddIcon}/></SettingsItem>
            <SettingsItem text={locale.get('options')[user.discord_id!="0"?4:3]} onClick={()=>api.auth.discord()}><FontAwesomeIcon icon={faDiscord} className={styles2.AddIcon} /></SettingsItem>
        </div>

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdrop!="none"} onClick={()=>setBackdrop("none")}>

            {backdrop==="password" && <div className={styles3.BackdropBox} onClick={(e)=>e.stopPropagation()}>
                <h3>{locale.get('chPassword')[0]}</h3>
                <FruitThinField fullWidth label={locale.get('chPassword')[1]} type={pwdResetData.showCurrent?"text":"password"} variant="outlined" value={pwdResetData.current} style={{margin:".5rem 0"}}
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
                <FruitThinField fullWidth label={locale.get('chPassword')[2]} type={pwdResetData.showNew?"text":"password"} variant="outlined" value={pwdResetData.newpass} style={{margin:".5rem 0"}}
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
                <FruitThinField fullWidth label={locale.get('chPassword')[3]} type={pwdResetData.showNew?"text":"password"} variant="outlined" value={pwdResetData.newpassConfirm} style={{margin:".5rem 0"}}
                                onChange={(evt)=>setPwdResetData({...pwdResetData, newpassConfirm: evt.target.value})}/>
                <div className={styles3.CardBottom}>
                    <Button variant="contained" className={styles3.SlimButton} onClick={updatePassword}>{locale.get('chPassword')[0]}</Button>
                    <Button variant="contained" className={`${styles3.SlimButton} ${styles3.btnError}`}
                            onClick={()=>setBackdrop("none")}>{locale.get('cancel')}</Button>
                </div>
            </div>}

            {backdrop==="2fa" && <div className={styles3.BackdropBox} onClick={(e)=>e.stopPropagation()}>
                <h3>{locale.get('twoFA')[0]}</h3>
                {totp.totp_image!=="" && <>
                    <img src={totp.totp_image} style={{borderRadius:"4px", margin:"0 auto", display:"block"}} />
                    <p>{locale.get('twoFA')[3]}: <span className={styles3.CodeBlock}>{totp.totp_secret}</span></p>
                    <FruitThinField fullWidth label={locale.get('twoFA')[1]} type="text" variant="outlined" value={totp.code} style={{margin:".5rem 0"}}
                                    onChange={(evt)=>setTotp({...totp, code: evt.target.value.replaceAll(/[^0-9]/g,'')})}/>
                </>}
                <div className={styles3.CardBottom}>
                    <Button variant="contained" className={`${styles3.SlimButton}`} onClick={()=>getTOTP()}>{totp.code?locale.get('twoFA')[4]:locale.get('twoFA')[2]}</Button>
                    <Button variant="contained" className={`${styles3.SlimButton} ${styles3.btnError}`}
                            onClick={()=>setBackdrop("none")}>{locale.get('cancel')}</Button>
                </div>
            </div>}
        </Backdrop>
    </>;
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
        <div className="bg-[var(--active-color)] rounded-xl p-3 flex items-center cursor-pointer hover:bg-[var(--btn-color)]" onClick={props.onClick}>
            {props.children}
            <h3 className="mx-auto my-0">{props.text}</h3>
        </div>
    )
}