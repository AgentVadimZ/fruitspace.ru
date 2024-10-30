import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import {faCircleInfo, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAndroid, faApple, faDiscord, faVk, faWindows} from "@fortawesome/free-brands-svg-icons";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {styled} from "@mui/system";
import {Backdrop, TextField} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";
import {getBrowserLocale} from "@/components/Hooks";
import Linkify from "linkify-react";
import useFiberAPI, {serverFiberAPI} from "@/fiber/fiber.ts";
import GlobalHead from "@/components/GlobalHead";
import {useCaptchaHook} from "@aacn.eu/use-friendly-captcha";
import {Button, ConfigProvider, Form, Input} from "antd";

export async function getServerSideProps(ctx) {
    let srvid = ctx.params.srvid
    const api = serverFiberAPI(ctx, `acc${srvid}`)
    let srv = await api.fetch.gdpsGet(srvid)
    if (srv.srvid){
        return {
            props: {
                srv: srv
            }
        }
    }
    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}

export default function DownloadPage(props) {

    const router = useRouter()

    const lang = getBrowserLocale()

    const localeGlobal = useGlobalLocale(router)
    const locale = useLocale(router)
    if (lang!=null) {
        locale.locale = lang==="ru"?"ru":"en"
        localeGlobal.locale = lang==="ru"?"ru":"en"
    }

    const funnyCaptcha = useCaptchaHook({
        siteKey: "FCMN099137D3O0N9",
        language: "en"
    })

    const showPlayers = localeGlobal.get('funcLvlPlayerServer')
    const errParse = localeGlobal.get('funcParseErr')
    const srvid = router.query.srvid
    const srv = props.srv

    const [user, setUser] = useState({})

    const api = useFiberAPI(`gdps_token`)
    let tokens = api.authorization||{}
    const defaultId = tokens.default?.[srvid] || 0
    api.authorization = tokens[srvid]?.[defaultId] || ""

    useEffect(() => {
        api.gdps_users.get(srvid).then(r=>setUser(r))
    }, []);

    const [creds, setCreds] = useState({uname:"", password:"", captcha:"", email: ""})
    const [backdrop, setBackdrop] = useState("none")
    const [showLogin, setShowLogin] = useState(false)
    


    const aLogin=()=>{
        const solution = funnyCaptcha.captchaStatus.solution
        if(!solution) {
            toast.error(errParse("captcha"), {
                duration: 10000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            return
        }
        api.gdps_users.login(srvid, creds.uname, creds.password, solution).then((resp)=>{
            if (resp.status==="ok") {

                toast.success(locale.get('success'), {
                    duration: 1000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })

                if (tokens[srvid]) {
                    tokens[srvid][defaultId] = resp.token
                } else {
                    tokens[srvid] = [resp.token]
                }
                if (tokens.default) {
                    tokens.default[srvid] = defaultId
                } else {
                    tokens.default = {[srvid]: defaultId}
                }
                api.auth.setCookieToken(JSON.stringify(tokens))
                router.push(srvid+"/panel")
            }else{
                switch (resp.code) {
                    case "-1":
                        toast.error(locale.get("errLogin"), {
                            duration: 10000,
                            style: {
                                color: "white",
                                backgroundColor: "var(--btn-color)"
                            }
                        })
                        break
                    case "-12":
                        toast.error(locale.get('errBanned'), {
                            duration: 10000,
                            style: {
                                color: "white",
                                backgroundColor: "var(--btn-color)"
                            }
                        })
                        break
                    default:
                        toast.error(errParse(resp.code, resp.message), {
                            duration: 10000,
                            style: {
                                color: "white",
                                backgroundColor: "var(--btn-color)"
                            }
                        })
                        // hcaptcha.reset()
                }
            }
        })
    }

    const aRecover = ()=>{
        const solution = funnyCaptcha.captchaStatus.solution
        if(!solution) {
            toast.error(errParse("captcha"), {
                duration: 10000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            return
        }
        api.gdps_users.forgotPassword(srvid, creds.email, solution).then((resp)=>{
            if (resp.status==="ok") {
                switch (resp.code) {
                    case "-1":
                        toast.error(locale.get("errLogin"), {
                            duration: 10000,
                            style: {
                                color: "white",
                                backgroundColor: "var(--btn-color)"
                            }
                        })
                        break
                    case "-12":
                        toast.error(locale.get('errBanned'), {
                            duration: 10000,
                            style: {
                                color: "white",
                                backgroundColor: "var(--btn-color)"
                            }
                        })
                        break
                    default:
                        toast.success(locale.get('success'), {
                            duration: 1000,
                            style: {
                                color: "white",
                                backgroundColor: "var(--btn-color)"
                            }
                        })
                        break
                }
            }else{
                toast.error(errParse(resp.code, resp.message), {
                    duration: 10000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
                // hcaptcha.reset()
            }
        })
    }

    const config = {
        bg: "",
        accent: "#0d6efd",
        variant: "primary", // primary/default
        ...srv.downloadpage_style || {}
    }

    const align = ["text-left","text-center","text-right"][props.srv.text_align || 0]

    return (<>
            <GlobalHead title={srv.srv_name} description={srv.description} image={srv.icon}/>
            <Toaster/>
        <ConfigProvider theme={{
            components: {
                Button: {
                    colorBorder: config.accent,
                    colorPrimary: config.accent,
                    colorPrimaryHover: `${config.accent}88`
                }
            }
        }}>
            <div className="h-screen flex justify-center items-center flex-col bg-center bg-cover" style={{
                backgroundImage: `url(${config.bg})`
            }}>
                <div className="w-fit max-w-full laptop:max-w-xl flex flex-col gap-4">
                    <div
                        className="bg-active backdrop-blur bg-opacity-75 border-white border-opacity-25 rounded-2xl border-solid border-1 p-4 flex flex-col gap-4">
                        <div className="flex gap-4 items-center flex-col laptop:flex-row">
                            <img className="h-40 rounded-xl" src={srv.icon}/>
                            <div className="text-center laptop:text-left">
                                <p className="text-2xl w-fit mx-auto laptop:mx-0">{srv.srv_name}</p>
                                <span className="text-sm">{showPlayers(srv.user_count, srv.level_count)}</span>
                            </div>
                        </div>
                        <Linkify as="pre" className={`p-2 rounded-xl mt-2 text-sm whitespace-pre-wrap ${align}`}
                                 options={{className: "text-primary"}}>
                            {srv.description}
                        </Linkify>
                        <div className="flex items-center justify-between flex-col laptop:flex-row">
                            <p className="my-0 mx-4 text-lg">{locale.get('download')}</p>
                            {srv.client_windows_url &&
                                <span className="flex gap-2">
                                    {srv.client_windows_url &&
                                        <Button type={config.variant} size="large"
                                                icon={<FontAwesomeIcon icon={faWindows}/>}
                                                onClick={() => router.push(srv.client_windows_url)}>Windows</Button>
                                    }
                                    {srv.client_android_url &&
                                        <Button type={config.variant} size="large"
                                                icon={<FontAwesomeIcon icon={faAndroid}/>}
                                                onClick={() => router.push(srv.client_android_url)}>Android</Button>
                                    }
                                    {srv.client_ios_url &&
                                        <Button type={config.variant} size="large"
                                                icon={<FontAwesomeIcon icon={faApple}/>}
                                                onClick={() => router.push(srv.client_ios_url)}>iOS</Button>
                                    }

                        </span>}
                        </div>
                    </div>
                    <div
                        className="bg-active backdrop-blur bg-opacity-75 border-white border-opacity-25 rounded-2xl border-solid border-1 p-2 flex w-[available]
                        items-center gap-2">
                        {/*<a className="hover:bg-blue-800 cursor-pointer bg-primary text-lg flex items-center justify-center h-12 rounded-xl flex-1 last:mr-0"*/}
                        {/*   onClick={() => {*/}
                        {/*       if (user.uname && !router.query.fresh) router.push(srvid + "/panel")*/}
                        {/*       else setShowLogin(!showLogin)*/}
                        {/*   }}>{((user.uname && !router.query.fresh) ? locale.get('loginas') + user.uname : locale.get('login'))}</a>*/}
                        <Button className="h-full rounded-xl text-lg flex-1" type={config.variant} onClick={() => {
                            if (user.uname && !router.query.fresh) router.push(srvid + "/panel")
                            else setShowLogin(!showLogin)
                        }}>{((user.uname && !router.query.fresh) ? locale.get('loginas') + user.uname : locale.get('login'))}</Button>

                        {srv.discord &&
                            <Button type={config.variant} className="h-full rounded-xl aspect-square w-12 p-0 flex items-center justify-center"
                                    onClick={() => window.location.href = "https://discord.gg/" + srv.discord}>
                                <FontAwesomeIcon
                                    icon={faDiscord} className="!h-6"/>
                            </Button>
                        }
                        {srv.vk &&
                            <Button type={config.variant} className="h-full rounded-xl aspect-square w-12 p-0 flex items-center justify-center"
                                    onClick={() => window.location.href = "https://vk.com/" + srv.vk}>
                                <FontAwesomeIcon
                                    icon={faVk} className="!h-8"/>
                            </Button>
                        }

                    </div>

                    {showLogin && <>
                        <div className="bg-active backdrop-blur bg-opacity-75 border-white border-opacity-25 rounded-2xl border-solid border-1 p-4">
                            <Form labelCol={{span: 4}}>
                                <Form.Item label="Логин">
                                    <Input onChange={(evt) => setCreds({...creds, uname: evt.target.value})}/>
                                </Form.Item>
                                <Form.Item label="Пароль">
                                    <Input.Password
                                        onChange={(evt) => setCreds({...creds, password: evt.target.value})}/>
                                </Form.Item>
                            </Form>
                            <div className="flex justify-end">
                                <Button className="ml-auto" icon={<FontAwesomeIcon icon={faRightToBracket}/>}
                                        type="primary"
                                        onClick={() => setBackdrop('login')}>Войти</Button>
                            </div>
                        </div>

                        <div
                            className="bg-active backdrop-blur bg-opacity-75 border-white border-opacity-25 border-1 p-2 w-[available] flex flex-col laptop:flex-row rounded-xl">
                            <Button type={config.variant} className="w-full"
                                    onClick={() => setBackdrop("forgot")}>
                                {locale.get('forgot')}
                            </Button>
                        </div>
                    </>}

                    <div
                        className="p-2 w-full text-sm text-gray-400 flex items-center justify-center bg-dark bg-opacity-25 backdrop-blur rounded-lg">
                        <FontAwesomeIcon icon={faCircleInfo} className="mr-2"/>
                        {locale.get("lognote")}
                    </div>
                </div>
            </div>
            <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                      open={backdrop != "none"} onClick={() => setBackdrop("none")}>

                {backdrop === "login" && <div
                    className="bg-active backdrop-blur bg-opacity-75 border-white border-opacity-25 rounded-2xl border-solid border-1 p-2 w-96 flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}>
                    {funnyCaptcha.CaptchaWidget(
                        {className: "bg-[var(--btn-hover)] rounded-xl p-2"},
                        {
                            icon: {color: "white", fill: "white", height: "3rem", width: "3rem"},
                            button: {
                                color: "white",
                                background: "#0d6efd",
                                borderRadius: '4px',
                                marginBottom: ".5rem",
                                fontWeight: "normal",
                                fontSize: "11pt",
                                padding: ".5rem 0"
                            },
                            text: {textAlign: "center", margin: ".5rem"}
                        }
                    )}
                    <Button type="primary" onClick={aLogin}>Войти в панель</Button>
                </div>}
                {backdrop === "forgot" && <div
                    className="bg-active backdrop-blur bg-opacity-75 border-white border-opacity-25 rounded-2xl border-solid border-1 p-2 w-96 flex flex-col gap-4"
                    onClick={(e) => e.stopPropagation()}>
                    {funnyCaptcha.CaptchaWidget(
                        {className: "bg-[var(--btn-hover)] rounded-xl p-2"},
                        {
                            icon: {color: "white", fill: "white", height: "3rem", width: "3rem"},
                            button: {
                                color: "white",
                                background: "#0d6efd",
                                borderRadius: '4px',
                                marginBottom: ".5rem",
                                fontWeight: "normal",
                                fontSize: "11pt",
                                padding: ".5rem 0"
                            },
                            text: {textAlign: "center", margin: ".5rem"}
                        }
                    )}
                    <Form labelCol={{span: 5}}>
                        <Form.Item label="Email" colon={false} name="email" className="mb-0" rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Неверный формат почты"
                            }
                        ]}>
                            <Input placeholder="user@email.com"
                                   onChange={(evt) => setCreds({...creds, email: evt.target.value})}/>
                        </Form.Item>
                    </Form>
                    <Button type="primary" onClick={aRecover}>Восстановить аккаунт</Button>
                </div>}
            </Backdrop>
        </ConfigProvider>
    </>)
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