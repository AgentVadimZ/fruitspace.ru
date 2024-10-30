import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import styles from "@/components/Index.module.css";
import Footer from "@/components/Global/Footer";
import {useEffect, useRef, useState} from "react";

import logo from "@/assets/Fruitspace2.png"
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {Button as MuiButton, IconButton, InputAdornment, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab"
import {styled} from "@mui/system";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import useEffectOnce from "@/components/Hooks";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {Button, Form, Input, Popover} from "antd";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";


export default function Login(props) {
    const router = useRouter()

    const hcaptchaRef = useRef(null)
    const [mode, setMode] = useState("login") //login, reg, forgot
    const [show2FA, setShow2FA] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [htoken, setHtoken] = useState(null)

    const locale = useLocale(props.router)
    const localeGlobal= useGlobalLocale(props.router)

    const ParseError = localeGlobal.get('funcParseErr')

    useEffectOnce(()=>{
        toast.dismiss()
    })

    const api = useFiberAPI()

    const rush = (vals) => {
        hcaptchaRef.current.execute()
        setFormData(vals)
        setLoading(true)
    }


    const register = async ()=> {
        let resp = await api.auth.register(formData.uname, formData.name, formData.surname, formData.email, formData.password, htoken, locale.locale)
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
            setMode("login")
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
        let resp = await api.auth.login(formData.uname, formData.password, htoken, formData.otp||"")
        if (resp.status==="ok") {
            toast.success(locale.get('loginSuccess'), {
                duration: 1000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            api.auth.setCookieToken(resp.token)
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
        let resp = await api.auth.recover(formData.email, htoken, locale.locale)
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

    useEffect(() => {
        if (!htoken || !loading) return
        if (mode === "login") login()
        if (mode === "reg") register()
        if (mode === "forgot") resetPassword()
    }, [htoken]);

    return <>
        <GlobalHead title={localeGlobal.get('navName')}/>
        <GlobalNav router={props.router} mainpage />
        <Toaster/>
        <div className="h-[calc(100vh-var(--nav-height))] flex flex-col justify-center items-center">
            <div className="bg-active border-subtle rounded-2xl border-solid border-1 p-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    {mode === "login" && <h1 className="text-xl font-bold">Вход</h1>}
                    {mode === "reg" && <h1 className="text-xl font-bold">Регистрация</h1>}
                    {mode === "forgot" && <h1 className="text-xl font-bold">Сброс пароля</h1>}
                    <span className="flex-1 h-0.5 bg-subtle"></span>
                </div>
                {mode==="login" &&
                    <Form className="laptop:w-96" labelCol={{span: 8}} wrapperCol={{span: 16}} onFinish={rush}>
                        <Form.Item label="Логин" name="uname" colon={false} rules={[
                            {
                                required: true,
                                min: 5,
                                max: 32,
                                message: "Длина логина должна быть от 5 до 32 символов"
                            },
                            {
                                pattern: new RegExp("^[a-zA-Z0-9_.-]+$"),
                                message: "Логин может содержать только английские буквы, цифры и знаки _ . -"
                            }
                        ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Пароль" name="password" colon={false} rules={[
                            {
                                required: true,
                                min: 8,
                                max: 128,
                                message: "Длина пароля должна быть от 8 до 128 символов"
                            },
                            {
                                pattern: new RegExp("^[a-zA-Z0-9~!@#$%^&*()_\\-+={}\\[\\]|\\\\:;\"'<,>.?/]+$"),
                                message: "Пароль содержит неверные символы"
                            }
                        ]}>
                            <Input.Password />
                        </Form.Item>
                        {show2FA&&<Form.Item label="Код 2ФА" name="otp" colon={false} rules={[
                            {
                                required: true,
                                len: 6,
                                pattern: new RegExp("^[0-9]+$"),
                                message: "Код 2ФА должен состоять из 6 цифр"
                            }
                        ]}>
                            <Input.OTP />
                        </Form.Item>}
                        <div className="flex items-center gap-2">
                            <Button type="primary" ghost onClick={() => api.auth.discord()}
                                    className="!text-white flex items-center justify-center gap-2">
                                <FontAwesomeIcon className="text-lg" icon={faDiscord}/> Discord
                            </Button>
                            <Popover content="Привяжите Discord аккаунт в панели, чтобы входить без пароля">
                                <FontAwesomeIcon className="text-gray-400" icon={faQuestionCircle}/>
                            </Popover>
                            <Button loading={loading} type="primary" htmlType="submit" className="ml-auto">Войти</Button>
                        </div>
                    </Form>
                }

                {mode==="reg" &&
                    <Form className="laptop:w-96" labelCol={{span: 8}} wrapperCol={{span: 16}} onFinish={rush}>
                        <Form.Item label="Логин" name="uname" colon={false} rules={[
                            {
                                required: true,
                                min: 5,
                                max: 32,
                                message: "Длина логина должна быть от 5 до 32 символов"
                            },
                            {
                                pattern: new RegExp("^[a-zA-Z0-9_.-]+$"),
                                message: "Логин может содержать только английские буквы, цифры и знаки _ . -"
                            }
                        ]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Email" name="email" colon={false} rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Неверный формат почты"
                            }
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Имя" name="name" colon={false} rules={[
                            {
                                required: true,
                                min: 3,
                                max: 120,
                                message: "Длина имени должна быть от 3 до 120 символов"
                            },
                            {
                                pattern: new RegExp("^[a-zA-Z]+$"),
                                message: "Укажите имя на английском языке"
                            }
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Фамилия" name="surname" colon={false} rules={[
                            {
                                required: true,
                                min: 3,
                                max: 120,
                                message: "Длина имени должна быть от 3 до 120 символов"
                            },
                            {
                                pattern: new RegExp("^[a-zA-Z]+$"),
                                message: "Укажите фамилию на английском языке"
                            }
                        ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Пароль" name="password" colon={false} rules={[
                            {
                                required: true,
                                min: 8,
                                max: 128,
                                message: "Длина пароля должна быть от 8 до 128 символов"
                            },
                            {
                                pattern: new RegExp("^[a-zA-Z0-9~!@#$%^&*()_\\-+={}\\[\\]|\\\\:;\"'<,>.?/]+$"),
                                message: "Пароль содержит неверные символы"
                            }
                        ]}>
                            <Input.Password />
                        </Form.Item>
                        <div className="flex items-center justify-end">
                            <Button loading={loading} type="primary" htmlType="submit" className="ml-auto">Зарегистрироваться</Button>
                        </div>
                    </Form>
                }

                {mode==="forgot" &&
                    <Form className="laptop:w-96" labelCol={{span: 8}} wrapperCol={{span: 16}} onFinish={rush}>
                        <Form.Item label="Email" name="email" colon={false} rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Неверный формат почты"
                            }
                        ]} className="mb-0">
                            <Input />
                        </Form.Item>
                        <span className="block text-xs text-gray-400 my-2 text-center">На указанную почту будет отправлен новый пароль</span>
                        <div className="flex items-center gap-2 justify-end">
                            <Button loading={loading} type="primary" htmlType="submit" className="ml-auto">Сброс пароля</Button>
                        </div>
                    </Form>
                }

                <div className="flex items-center gap-2 justify-between">
                    <Button type="link"
                            onClick={() => setMode(mode === "forgot" ? "login" : "forgot")}>
                        {mode === "forgot" ? "Войти" : "Я забыл пароль"}
                    </Button>
                    <Button type="link"
                            onClick={() => setMode(mode === "reg" ? "login" : "reg")}>
                        {mode === "reg" ? "Войти" : "Регистрация"}
                    </Button>
                </div>
                <div>
                    <span className="text-xs text-gray-400 block text-center">Мы используем hCaptcha для защиты от ботов</span>
                    <HCaptcha
                        sitekey="c17bb027-5ed7-4e3d-9f67-6f3ed2d78090"
                        onVerify={(val) => setHtoken(val)}
                        theme="dark" size="invisible" ref={hcaptchaRef}
                        onExpire={() => hcaptcha.reset()}
                    />
                </div>
            </div>
        </div>
        <Footer router={props.router}/>
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