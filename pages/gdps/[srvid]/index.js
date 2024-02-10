import useLocale, {useGlobalLocale} from "../../../locales/useLocale";
import {faCircleInfo, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAndroid, faApple, faDiscord, faVk, faWindows} from "@fortawesome/free-brands-svg-icons";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {styled} from "@mui/system";
import {Backdrop, TextField} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";
import {getBrowserLocale} from "../../../components/Hooks";
import Linkify from "linkify-react";
import useFiberAPI, {serverFiberAPI} from "../../../fiber/fiber";
import GlobalHead from "../../../components/GlobalHead";
import {useCaptchaHook} from "@aacn.eu/use-friendly-captcha";

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
    const token = tokens[srvid]?.[defaultId] || ""
    api.authorization = token

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

    const aRecover=()=>{
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

    return (<>
            <GlobalHead title={srv.srv_name} description={srv.description} image={srv.icon}/>
            <Toaster/>
            <div className="h-[100vh] flex justify-center items-center flex-col">
                <div className="w-fit max-w-full lg:max-w-xl">
                    <div className="bg-[var(--subtle-color)] p-2 rounded-2xl">
                        <div className="flex items-center flex-col lg:flex-row">
                            <img className="h-40 rounded-xl" src={srv.icon}/>
                            <div className="ml-4 text-center lg:text-left">
                                <h2 className="text-2xl my-2">{srv.srv_name}</h2>
                                <span>
                                {showPlayers(srv.user_count,srv.level_count)}
                                    <span className="py-0.5 px-2 bg-[var(--primary-color)] ml-2 rounded-md">by {srv.owner_id}</span>
                            </span>
                            </div>
                        </div>
                        <Linkify as="pre" className="bg-[var(--active-color)] p-2 rounded-xl mt-2 text-sm whitespace-normal"
                                 options={{className:"text-[var(--primary-color)]"}}>
                    {srv.description}
                    </Linkify>
                        <div className="flex items-center justify-between flex-col lg:flex-row">
                            <p className="my-0 mx-4 text-lg">{locale.get('download')}</p>
                            {srv.client_windows_url &&
                                <span className="flex">
                                    {srv.client_windows_url && <a className="flex rounded-lg bg-[var(--primary-color)] p-3 cursor-pointer mx-2 hover:bg-blue-800 first:ml-0 last:mr-0"
                                                                    href={srv.client_windows_url}><FontAwesomeIcon icon={faWindows} className="mr-2" /> Windows
                            </a>}
                                    {srv.client_android_url && <a className="flex rounded-lg bg-[var(--primary-color)] p-3 cursor-pointer mx-2 hover:bg-blue-800 first:ml-0 last:mr-0"
                                                                    href={srv.client_android_url}>
                                <FontAwesomeIcon icon={faAndroid} className="mr-2"/> Android
                            </a>}
                                    {srv.client_ios_url && <a className="flex rounded-lg bg-[var(--primary-color)] p-3 cursor-pointer mx-2 hover:bg-blue-800 first:ml-0 last:mr-0"
                                                                    href={srv.client_ios_url}>
                                <FontAwesomeIcon icon={faApple} className="mr-2" /> iOS
                            </a>}

                        </span>}
                        </div>
                    </div>
                    <div className="bg-[var(--subtle-color)] p-2 w-[available] flex rounded-2xl mt-4">
                        <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-lg flex items-center justify-center h-12 rounded-xl flex-1 mr-2 last:mr-0"
                           onClick={()=>{
                               if(user.uname && !router.query.fresh) router.push(srvid+"/panel")
                               else setShowLogin(!showLogin)
                           }}>{((user.uname && !router.query.fresh)?locale.get('loginas')+user.uname:locale.get('login'))}</a>

                        {srv.discord && <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block flex items-center justify-center rounded-xl w-12 mr-2 last:mr-0 aspect-square"
                                           onClick={()=>window.location.href="https://discord.gg/"+srv.discord}><FontAwesomeIcon icon={faDiscord} className="!h-6" /></a>
                        }
                        {srv.vk && <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block flex items-center justify-center rounded-xl w-12 aspect-square"
                                      onClick={()=>window.location.href="https://vk.com/"+srv.vk}><FontAwesomeIcon icon={faVk} className="!h-8"/></a>
                        }
                    </div>

                    {showLogin && <>
                        <div className="bg-[var(--subtle-color)] p-2 w-[available] flex flex-col lg:flex-row rounded-2xl mt-4">
                            <FruitTextField
                                label={locale.get("logfield")[0]}
                                value={creds.uname}
                                onChange={(evt)=>setCreds({...creds, uname: evt.target.value})}
                                className="mr-0 mb-2 lg:mr-2 lg:mb-0 flex-1"
                            />
                            <FruitTextField
                                label={locale.get("logfield")[1]} type="password"
                                value={creds.password}
                                onChange={(evt)=>setCreds({...creds, password: evt.target.value})}
                                className="mr-0 mb-2 lg:mr-2 lg:mb-0 flex-1"
                            />
                            <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block flex items-center justify-center rounded-xl h-14 aspect-square"
                               onClick={()=>setBackdrop("login")}><FontAwesomeIcon icon={faRightToBracket} className="!h-6"/></a>

                        </div>

                        <div className="bg-[var(--subtle-color)] p-1 w-[available] flex flex-col lg:flex-row rounded-xl mt-4">
                            <a className="hover:bg-red-800 cursor-pointer bg-[var(--error-color)] block text-base flex items-center m-1 justify-center h-8 rounded-lg flex-1"
                               onClick={()=>setBackdrop("forgot")}>{locale.get('forgot')}</a>
                        </div>
                    </>}

                    <div className="p-2 w-[available] flex mt-4 items-center justify-center">
                        <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                        {locale.get("lognote")}
                    </div>
                </div>
            </div>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={backdrop!="none"} onClick={()=>setBackdrop("none")}>
            {backdrop==="login" && <div className="bg-[var(--subtle-color)] p-2 rounded-2xl"
                                        onClick={(e)=>e.stopPropagation()}>
                {funnyCaptcha.CaptchaWidget(
                    {className: "bg-[var(--btn-hover)] rounded-xl p-2"},
                    {
                        icon: {color: "white", fill: "white", height: "3rem", width: "3rem"},
                        button: {
                            color: "white", background: "#0d6efd", borderRadius:'4px', marginBottom:".5rem", fontWeight:"normal",
                            fontSize: "11pt", padding:".5rem 0"
                        },
                        text: {textAlign:"center", margin:".5rem"}
                    }
                )}
                {/*<HCaptcha sitekey="c17bb027-5ed7-4e3d-9f67-6f3ed2d78090"*/}
                {/*          onVerify={(val,idk)=>setCreds({*/}
                {/*              ...creds,*/}
                {/*              captcha: val*/}
                {/*          })} theme="dark"/>*/}
                <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] text-lg flex items-center justify-center h-12 rounded-xl flex-1 mt-1 px-4"
                   onClick={aLogin}>{locale.get('login')}</a>
            </div>}
            {backdrop==="forgot" && <div className="bg-[var(--subtle-color)] p-2 rounded-xl"
                                        onClick={(e)=>e.stopPropagation()}>
                <FruitTextField
                    label="Email" type="email" fullWidth
                    value={creds.email}
                    onChange={(evt)=>setCreds({...creds, email: evt.target.value})}
                    className="mb-1"
                />
                {/*<HCaptcha sitekey="c17bb027-5ed7-4e3d-9f67-6f3ed2d78090"*/}
                {/*          onVerify={(val,idk)=>setCreds({*/}
                {/*              ...creds,*/}
                {/*              captcha: val*/}
                {/*          })} theme="dark"/>*/}
                <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-lg flex items-center justify-center h-12 rounded-xl flex-1 mt-1"
                   onClick={aRecover}>{locale.get('forgotAction')}</a>
            </div>}
        </Backdrop>
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