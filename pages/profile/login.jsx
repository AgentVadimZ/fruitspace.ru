import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import {useState} from "react";

import logo from "../../components/assets/Fruitspace2.png"
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab"
import {styled} from "@mui/system";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import useEffectOnce from "../../components/Hooks";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";
import useFiberAPI from "../../fiber/fiber";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {mutate} from "swr";





export default function Login(props) {
    const router = useRouter()


    const [regMode, setRegMode] = useState(false)
    const [forgotPass, setForgotPass] = useState(false)
    const [show2FA, setShow2FA] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        uname: "",
        name: "",
        email: "",
        surname: "",
        password: "",
        hCaptchaToken: "",
        showPassword: false,
        TOTP: ""
    })

    const locale = useLocale(props.router)
    const localeGlobal= useGlobalLocale(props.router)

    const ParseError = localeGlobal.get('funcParseErr')

    useEffectOnce(()=>{
        toast.dismiss()
    })

    const api = useFiberAPI()


    const register = async ()=> {
        setLoading(true)
        let resp = await api.auth.register(formData.uname, formData.name, formData.surname, formData.email, formData.password, formData.hCaptchaToken, locale.locale)
        if (resp.status==="ok") {
            toast(locale.get('confirmationSent'), {
                duration: 5000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            toast.success(locale.get('regSuccess'), {
                duration: 5000,
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
        setLoading(false)
    }

    const login = async ()=> {
        setLoading(true)
        let resp = await api.auth.login(formData.uname, formData.password, formData.hCaptchaToken, formData.TOTP)
        if (resp.status==="ok") {
            toast.success(locale.get('loginSuccess'), {
                duration: 1000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            api.auth.setCookieToken(resp.token)
            await mutate("/user")
            console.log("a")
            setTimeout(()=>router.replace(router.query.redirect||"/profile/"),1000)
        }else{
            if(resp.code=="2fa_req") {
                setShow2FA(true)
                setLoading(false)
                return
            }
            toast.error(locale.get('err')+ParseError(resp.code, resp.message), {
                duration: 10000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            hcaptcha.reset()
        }
        setLoading(false)
    }

    const resetPassword = async ()=> {
        setLoading(true)
        let resp = await api.auth.recover(formData.email, formData.hCaptchaToken, locale.locale)
        if (resp.status==="ok") {
            toast.success(locale.get('passResetSuccess'), {
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
            hcaptcha.reset()
        }
        setLoading(false)
    }

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav />
            <Toaster/>
            <div className={styles.main}>
                <div className={styles.form}>
                    <img src={logo.src} />
                    <h3>{regMode?locale.get('loginO')[0]:locale.get('loginO')[forgotPass?1:2]}</h3>
                    <form>
                        {!forgotPass && <FruitTextField fullWidth label="@username" type="text" variant="outlined" style={{margin:".5rem"}}
                                        value={formData.uname||''} onChange={(evt)=>{setFormData({
                                            ...formData,
                                            uname: evt.target.value.replaceAll(/[^a-zA-Z0-9_.-]/g,'')
                                        })}}/> }


                        {(regMode||forgotPass) && <FruitTextField fullWidth label="Email" type="email" variant="outlined" style={{margin:".5rem"}}
                                                    value={formData.email||''} onChange={(evt)=>{setFormData({
                            ...formData,
                            email: evt.target.value.replaceAll(/[^a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.@]/g,'')
                        })}} />}

                        {regMode && <FruitTextField fullWidth label={(locale.get('regField')[0])} type="text" variant="outlined" style={{margin:".5rem"}}
                                        value={formData.name||''} onChange={(evt)=>{setFormData({
                            ...formData,
                            name: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                        })}} />}

                        {regMode && <FruitTextField fullWidth label={(locale.get('regField')[1])} type="text" variant="outlined" style={{margin:".5rem"}}
                                                    value={formData.surname||''} onChange={(evt)=>{setFormData({
                            ...formData,
                            surname: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                        })}} />}

                        {!forgotPass && <FruitTextField fullWidth label={(locale.get('regField')[2])} type={formData.showPassword?"text":"password"}
                                        variant="outlined"
                                        style={{margin:".5rem"}} value={formData.password||''}
                                        onChange={(evt)=>{setFormData({
                                            ...formData,
                                            password: evt.target.value.replaceAll(/[^a-zA-Z0-9~!@#$%^&*()_\-+={}\[\]|\\:;"'<,>.?/]/g,'')
                                        })}}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end"
                                                        onClick={()=>setFormData({...formData,showPassword: !formData.showPassword})}>
                                                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}/>}

                        {show2FA && <FruitTextField fullWidth label={(locale.get('regField')[3])} type="text" variant="outlined"
                                                    style={{margin:".5rem",border:"4px solid var(--error-color)",borderRadius:"12px"}}
                                                    value={formData.TOTP||''} onChange={(evt)=>{setFormData({
                            ...formData,
                            TOTP: evt.target.value.replaceAll(/[^0-9]/g,'')
                        })}} />}

                        <HCaptcha
                            sitekey="c17bb027-5ed7-4e3d-9f67-6f3ed2d78090"
                            onVerify={(val,idk)=>setFormData({
                                ...formData,
                                hCaptchaToken: val
                            })}
                            theme="dark"
                        />
                        <LoadingButton loading={loading} className={styles.formButton} onClick={(regMode?register:(forgotPass?resetPassword:login))}>
                            {regMode?locale.get('loginO')[0]:locale.get('loginO')[forgotPass?1:2]}
                        </LoadingButton>
                        <Button className={styles.formButton} startIcon={<FontAwesomeIcon icon={faDiscord} />} onClick={()=>api.auth.discord()}>DISCORD</Button>

                        { !forgotPass && <p style={{margin:".5rem"}}>{locale.get('accPass')[regMode?0:1]}
                            <span style={{cursor:"pointer", color:"#0d6efd", fontWeight:"bolder"}}
                            onClick={()=>setRegMode(!regMode)}> {locale.get('loginO')[regMode?2:0]}</span></p>}
                        {!regMode && <p style={{margin:".5rem"}}>{locale.get('accPass')[forgotPass?4:5]}
                            <span style={{cursor:"pointer", color:"#0d6efd", fontWeight:"bolder"}}
                                  onClick={()=>setForgotPass(!forgotPass)}> {locale.get('accPass')[forgotPass?2:3]}</span></p>}

                    </form>
                </div>
            </div>
            <Footer router={props.router}/>
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