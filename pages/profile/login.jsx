import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import {useRef, useState} from "react";

import logo from "../../components/assets/logo.png"
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab"
import {styled} from "@mui/system";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import ParseError from "../../components/ErrParser";





export default function Login(progs) {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const router = useRouter()

    const [regMode, setRegMode] = useState(false)
    const [forgotPass, setForgotPass] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        uname: "",
        name: "",
        email: "",
        surname: "",
        password: "",
        hCaptchaToken: "",
        showPassword: false
    })


    const register = async ()=> {
        setLoading(true)
        let resp = await fetch("https://api.fruitspace.one/v1/auth/register", {
            method: 'POST', body: JSON.stringify(formData)
        }).then(r => r.json())
        if (resp.status==="ok") {
            toast("На почту было отправлено письмо с подтверждением", {
                duration: 5000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            toast.success("Регистрация прошла успешно", {
                duration: 5000,
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
        setLoading(false)
    }

    const login = async ()=> {
        setLoading(true)
        let resp = await fetch("https://api.fruitspace.one/v1/auth/login", {
            method: 'POST', body: JSON.stringify(formData), credentials: "include"
        }).then(r => r.json())
        if (resp.status==="ok") {
            toast.success("Вход произошел успешно", {
                duration: 1000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            setCookie("token",resp.token,
                {path:"/",expires:new Date(new Date().getTime()+(1000*60*60*24*30)), secure:true})
            setTimeout(()=>router.push("/profile/"),1000)
        }else{
            toast.error("Произошла ошибка: "+ParseError(resp.message), {
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
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
            <Toaster/>
            <div className={styles.main}>
                <div className={styles.form}>
                    <img src={logo.src} />
                    <h3>{regMode?"Зарегистрироваться":(forgotPass?"Восстановить пароль":"Войти")}</h3>
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

                        {regMode && <FruitTextField fullWidth label="Имя (англ)" type="text" variant="outlined" style={{margin:".5rem"}}
                                        value={formData.name||''} onChange={(evt)=>{setFormData({
                            ...formData,
                            name: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                        })}} />}

                        {regMode && <FruitTextField fullWidth label="Фамилия (англ)" type="text" variant="outlined" style={{margin:".5rem"}}
                                                    value={formData.surname||''} onChange={(evt)=>{setFormData({
                            ...formData,
                            surname: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                        })}} />}

                        {!forgotPass && <FruitTextField fullWidth label="Пароль" type={formData.showPassword?"text":"password"}
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
                        <HCaptcha
                            sitekey="c17bb027-5ed7-4e3d-9f67-6f3ed2d78090"
                            onVerify={(val,idk)=>setFormData({
                                ...formData,
                                hCaptchaToken: val
                            })}
                            theme="dark"
                        />
                        <LoadingButton loading={loading} className={styles.formButton} onClick={(regMode?register:login)}>
                            {regMode?"Зарегистрироваться":"Войти"}
                        </LoadingButton>
                        { !forgotPass && <p style={{margin:".5rem"}}>{regMode?"Уже есть аккаунт?":"Нет аккаунта?"}
                            <span style={{cursor:"pointer", color:"#0d6efd", fontWeight:"bolder"}}
                            onClick={()=>setRegMode(!regMode)}> {regMode?"Войти":"Зарегистрироваться"}</span></p>}
                        {!regMode && <p style={{margin:".5rem"}}>{forgotPass?"А нет,":"Хуже,"}
                            <span style={{cursor:"pointer", color:"#0d6efd", fontWeight:"bolder"}}
                                  onClick={()=>setForgotPass(!forgotPass)}> {forgotPass?"я вспомнил пароль":" я забыл пароль"}</span></p>}

                    </form>
                </div>
            </div>
            <Footer/>
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