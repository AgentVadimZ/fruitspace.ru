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


const ParseError = (err)=>{
    let errc = err.split("|")[1] || err
    switch (errc){
        case "eml": return "Неверный формат email"
        case "uname_shrt": return "Слишком короткий логин (необходимо 5+ символов)"
        case "uname_long": return "Слишком длинный логин (необходимо меньше 32 символов)"
        case "name_shrt": return "Слишком короткое имя (необходимо 2+ символов)"
        case "name_long": return "Слишком длинное имя (необходимо меньше 120 символов)"
        case "surname_shrt": return "Слишком короткая фамилия (необходимо 2+ символов)"
        case "surname_long": return "Слишком длинная фамилия (необходимо меньше 120 символов)"
        case "uname": return "Логин содержит недопустимые символы"
        case "name": return "Имя содержит недопустимые символы"
        case "surname": return "Фамилия содержит недопустимые символы"
        case "pwd_short": return "Слишком короткий пароль (необходимо 8+ символов)"
        case "pwd_long": return "Слишком длинный пароль (необходимо меньше 120 символов)"
        case "pwd": return "Пароль содержит недопустимые символы"
        case "uname_taken": return "Данное имя пользователя уже занято"
        case "eml_taken": return "Аккаунт с данной почтой уже зарегистрирован"
        case "reg": return "Техническая ошибка при регистрации. Сообщите о ней в тех. поддержку!"
        case "ver": return "Ошибка отправки письма с подтверждением. Сообщите о ней в тех. поддержку!"
        case "captcha": return "Не удалось пройти капчу. Попробуйте еще раз"
        default: return err
    }
}


export default function Login(progs) {

    const [regMode, setRegMode] = useState(false)
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


    const register = ()=> {
        setLoading(true)
        // let resp = await fetch("https://api.fruitspace.one/v1/auth/register", {
        //     method: 'POST', body: JSON.stringify(formData)
        // }).then(r => r.json())
        let resp = {status:"okd",error:"Amongus |captcha"}
        console.log("E")
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
            toast.error("Произошла ошибка: "+ParseError(resp.error), {
                duration: 10000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
        }
        setLoading(false)
    }

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav profilePic={<img src="https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"/>} />
            <Toaster/>
            <div className={styles.main}>
                <div className={styles.form}>
                    <img src={logo.src} />
                    <h3>{regMode?"Зарегистрироваться":"Войти"}</h3>
                    <form>
                        <FruitTextField fullWidth label="@username" type="text" variant="outlined" style={{margin:".5rem"}}
                                        value={formData.uname} onChange={(evt)=>{setFormData({
                                            ...formData,
                                            uname: evt.target.value.replaceAll(/[^a-zA-Z0-9_.-]/g,'')
                                        })}}/>


                        {regMode && <FruitTextField fullWidth label="Email" type="email" variant="outlined" style={{margin:".5rem"}}
                                                    value={formData.email} onChange={(evt)=>{setFormData({
                            ...formData,
                            email: evt.target.value.replaceAll(/[^a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.@]/g,'')
                        })}} />}

                        {regMode && <FruitTextField fullWidth label="Имя (англ)" type="text" variant="outlined" style={{margin:".5rem"}}
                                        value={formData.name} onChange={(evt)=>{setFormData({
                            ...formData,
                            name: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                        })}} />}

                        {regMode && <FruitTextField fullWidth label="Фамилия (англ)" type="text" variant="outlined" style={{margin:".5rem"}}
                                                    value={formData.surname} onChange={(evt)=>{setFormData({
                            ...formData,
                            surname: evt.target.value.replaceAll(/[^a-zA-Z]/g,'')
                        })}} />}

                        <FruitTextField fullWidth label="Пароль" type={formData.showPassword?"text":"password"}
                                        variant="outlined"
                                        style={{margin:".5rem"}} value={formData.password}
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
                                        }}/>
                        <HCaptcha
                            sitekey="c17bb027-5ed7-4e3d-9f67-6f3ed2d78090"
                            onVerify={(val,idk)=>setFormData({
                                ...formData,
                                hCaptchaToken: val
                            })}
                            theme="dark"
                        />
                        <LoadingButton loading={loading} className={styles.formButton} onClick={register}>
                            {regMode?"Зарегистрироваться":"Войти"}
                        </LoadingButton>
                        <p style={{margin:".5rem"}}>{regMode?"Уже есть аккаунт?":"Нет аккаунта?"}
                            <span style={{cursor:"pointer", color:"#0d6efd", fontWeight:"bolder"}}
                            onClick={()=>setRegMode(!regMode)}> {regMode?"Войти":"Зарегистрироваться"}</span></p>
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