import styles3 from "@/components/Manage/GDManage.module.css"
import {styled} from "@mui/system";
import {Backdrop, IconButton, InputAdornment, TextField, Tooltip} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import {useState} from "react";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PasswordIcon from '@mui/icons-material/Password';
import toast from "react-hot-toast";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import useFiberAPI from "@/fiber/fiber.ts";
import {Button, Input, List} from "antd";
import useSWR, {mutate} from "swr";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Logo from "@/assets/ava.png"

export default function UserProfileCard(props) {

    const api = useFiberAPI()

    const {data: sessdata} = useSWR("/sessions", api.user.listSessions)
    const sessions = sessdata?.sessions||[]

    const [user0] = api.user.useUser()
    const [user, setUser] = useState(user0)
    const [showEditPicHint, setPicEditHint] = useState(false)
    const [backdrop, setBackdrop] = useState("none")


    // const {data:discord} = useSWR(`https://discordlookup.mesavirep.xyz/v1/user/${user.discord_id}`, async r=>fetch(r).then(r=>r.json()))

    const discord = null

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

    const resetSessions = () => {
        api.user.resetSessions().then((resp)=>{
            mutate("/sessions")
            if(resp.status==="ok") {
                toast.success("Сессии успешно сброшены", {
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
        const input = document.createElement("input");
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
            const datax = new FormData();
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
        <div className="grid grid-cols-1 gap-4 laptop:grid-cols-3 w-fit">
            <div className="flex bg-active glassb rounded-2xl relative w-fit">
                <img className="rounded-xl w-auto h-64" src={user.profile_pic} />
                <Tooltip title={locale.get('picChange')} placement="right" arrow open={showEditPicHint}
                className="absolute rounded-xl bg-[var(--btn-color)] p-2 bottom-2 right-2 h-10 w-10 fill-white
                transition-all duration-300 border-solid border-2 border-[var(--btn-color)] cursor-pointer
                hover:bg-[var(--btn-hover)] hover:fill-[var(--primary-color)] hover:border-[var(--primary-color)]">
                    <EditIcon onMouseEnter={()=>setPicEditHint(true)} onMouseLeave={()=>setPicEditHint(false)}
                    onClick={updateProfilePic}/>
                </Tooltip>
            </div>

            <div className="col-span-1 laptop:col-span-2 flex flex-col laptop:w-[30rem] bg-active glassb p-4 rounded-2xl">
                <div className="flex flex-col items-center gap-4 laptop:flex-row">
                    <p className="text-nowrap text-sm">Отображаемое имя</p>
                    <Input value={user.name} onChange={(evt)=>{
                        setUser({
                            ...user,
                            name: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                        })
                    }} />
                </div>

                <div className="flex items-center gap-2">
                    <span className="flex gap-2 font-mono bg-subtle glassb w-fit px-2 py-1 rounded-md mt-4">
                        <Image src={Logo.src} width={24} height={24} />
                        @{user.uname}
                    </span>
                    {user.discord_id != "0" && discord &&
                        <span className="flex gap-2 bg-[#5865F2] glassb font-mono w-fit px-2 py-1 rounded-md mt-4">
                            <img src={discord.avatar.link} width={24} height={24} className="rounded-full"/>
                            {discord.username}
                        </span>
                    }
                </div>

                <div className="flex flex-col laptop:flex-row justify-end mt-8 laptop:mt-auto gap-4">
                    <Button className="!text-white !shadow-none" danger type="primary" onClick={(e) => updateProfilePic(e,true)}>{locale.get('reset')}</Button>
                    <Button type="primary" onClick={updateName}>{locale.get('save')}</Button>
                </div>
            </div>

            <div className="flex flex-col gap-2 bg-active glassb p-2 rounded-2xl h-fit">
                <SettingsItem text={locale.get('options')[0]} onClick={()=>setBackdrop("password")}><PasswordIcon className="h-8 w-8" /></SettingsItem>
                <SettingsItem text={locale.get('options')[user.is_2fa?1:2]} onClick={()=>setBackdrop("2fa")}><LockPersonIcon className="h-8 w-8" /></SettingsItem>
                <SettingsItem text={locale.get('options')[user.discord_id!="0"?4:3]} onClick={()=>api.auth.discord()}><FontAwesomeIcon icon={faDiscord} className="!h-8 w-8" /></SettingsItem>
            </div>

            <div className="col-span-1 laptop:col-span-2 flex flex-col gap-4 laptop:w-[30rem] bg-active glassb p-4 rounded-2xl">
                <div>
                    <p className="text-sm rounded-t-lg px-2 w-fit border-1 border-b-active border-[#ffffff44]
                                relative z-20 -mb-[1px]">Активные сессии</p>
                    <List className="rounded-tl-none border-1 border-solid border-white border-opacity-25
                                relative z-10 bg-active glassb rounded-xl" dataSource={sessions} renderItem={(item, i) => (
                        <div key={i} className="p-2 flex flex-col gap-2">
                        <span className="flex gap-2 items-center">
                            <FontAwesomeIcon icon={faKey} className="h-4 w-4" />
                            {item.useragent}
                            <span className="font-mono text-sm rounded-md bg-subtle px-1.5">{item.ip}</span>
                        </span>
                            <span className="ml-6">Выполнен вход: {new Date(item.logindate).toLocaleString()}</span>
                        </div>
                    )} />
                </div>
                <Button className="!text-white !bg-red-600 !bg-opacity-10 hover:!bg-opacity-25" danger type="default" onClick={(e)=>resetSessions()}>Сбросить все сессии</Button>
            </div>

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
        <div className="bg-ac rounded-xl p-2 flex items-center cursor-pointer hover:bg-btn" onClick={props.onClick}>
            {props.children}
            <span className="mx-auto my-0">{props.text}</span>
        </div>
    )
}