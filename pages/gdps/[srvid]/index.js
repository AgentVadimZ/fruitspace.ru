import {useGlobalLocale} from "../../../locales/useLocale";
import {faCircleInfo, faFloppyDisk, faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAndroid, faApple, faDiscord, faVk, faWindows} from "@fortawesome/free-brands-svg-icons";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {styled} from "@mui/system";
import {Backdrop, TextField} from "@mui/material";
import styles from "../../../components/Manage/GDManage.module.css";
import useGDPSLogin from "../../../components/GDPSLogin";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast, {Toaster} from "react-hot-toast";


export default function DownloadPage(props) {

    const router = useRouter()

    const localeGlobal = useGlobalLocale(router)
    const showPlayers = localeGlobal.get('funcLvlPlayerServer')
    const srvid = router.query.srvid
    const [srv, setSrv] = useState({})

    const [user, userCreds, idk] = useGDPSLogin(srvid)

    const [creds, setCreds] = useState({login:"", password:"", captcha:""})
    const [backdrop, setBackdrop] = useState("none")
    const [showLogin, setShowLogin] = useState(false)

    useEffect(()=>{
        if (srvid==null) return
        fetch("https://api.fruitspace.one/v1/gdpshub/getgdps?id="+srvid,
            {credentials:"include", method: "GET"}).then(resp=>resp.json()).then((resp)=>{
            if(resp.id) setSrv(resp);
            else router.push("/");
        })
    },[srvid])

    return (<>
            <Toaster/>
            <div className="h-[100vh] flex justify-center items-center flex-col">
                <div className="w-fit max-w-full lg:max-w-xl">
                    <div className="bg-[var(--subtle-color)] p-2 rounded-2xl">
                        <div className="flex items-center flex-col lg:flex-row">
                            <img className="h-40 rounded-xl" src={srv.icon}/>
                            <div className="ml-4 text-center lg:text-left">
                                <h2 className="text-2xl my-2">{srv.name}</h2>
                                <span>
                                {showPlayers(srv.players,srv.levels)}
                                    <span className="py-0.5 px-2 bg-[var(--primary-color)] ml-2 rounded-md">by {srv.owner}</span>
                            </span>
                            </div>
                        </div>
                        <pre className="bg-[var(--active-color)] p-2 rounded-xl mt-2 text-sm whitespace-normal">
                    {srv.desc}
                    </pre>
                        <div className="flex items-center justify-between flex-col lg:flex-row">
                            <p className="my-0 mx-4 text-lg">Скачать</p>
                            {srv.downloads &&
                                <span className="flex">
                            {srv.downloads.windows && <span className="flex rounded-lg bg-[var(--primary-color)] p-3 cursor-pointer mx-2 hover:bg-blue-800 first:ml-0 last:mr-0"
                                                            onClick={()=>window.location.href=srv.downloads.windows}><FontAwesomeIcon icon={faWindows} className="mr-2" /> Windows
                            </span>}
                                    {srv.downloads.android && <span className="flex rounded-lg bg-[var(--primary-color)] p-3 cursor-pointer mx-2 hover:bg-blue-800 first:ml-0 last:mr-0"
                                                                    onClick={()=>window.location.href=srv.downloads.android}>
                                <FontAwesomeIcon icon={faAndroid} className="mr-2" /> Android
                            </span>}
                                    {srv.downloads.ios && <span className="flex rounded-lg bg-[var(--primary-color)] p-3 cursor-pointer mx-2 hover:bg-blue-800 first:ml-0 last:mr-0"
                                                                onClick={()=>window.location.href=srv.downloads.ios}>
                                <FontAwesomeIcon icon={faApple} className="mr-2" /> iOS
                            </span>}

                        </span>}
                        </div>
                    </div>
                    <div className="bg-[var(--subtle-color)] p-2 w-[available] flex rounded-2xl mt-4">
                        <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-lg flex items-center justify-center h-12 rounded-xl flex-1 mr-2 last:mr-0"
                           onClick={()=>{
                               if(user.uid>0) router.push(srvid+"/panel")
                               else setShowLogin(true)
                           }}>Войти в панель</a>

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
                                label={"Логин"}
                                value={creds.login}
                                onChange={(evt)=>setCreds({...creds, login: evt.target.value})}
                                className="mr-0 mb-2 lg:mr-2 lg:mb-0 flex-1"
                            />
                            <FruitTextField
                                label={"Пароль"} type="password"
                                value={creds.password}
                                onChange={(evt)=>setCreds({...creds, password: evt.target.value})}
                                className="mr-0 mb-2 lg:mr-2 lg:mb-0 flex-1"
                            />
                            <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block flex items-center justify-center rounded-xl h-14 aspect-square"
                               onClick={()=>setBackdrop("login")}><FontAwesomeIcon icon={faRightToBracket} className="!h-6"/></a>

                        </div>

                        {/*<div className="bg-[var(--subtle-color)] p-1 w-[available] flex flex-col lg:flex-row rounded-xl mt-4">*/}
                        {/*    <a className="hover:bg-red-800 cursor-pointer bg-[var(--error-color)] block text-base flex items-center p-1.5 lg:p-0 justify-center h-8 rounded-lg flex-1 mr-0 lg:mr-2 mb-2 lg:mb-0"*/}
                        {/*       onClick={()=>router.push(srvid+"/panel")}>Я забыл логин</a>*/}
                        {/*    <a className="hover:bg-red-800 cursor-pointer bg-[var(--error-color)] block text-base flex items-center p-1.5 lg:p-0 justify-center h-8 rounded-lg flex-1 mr-0"*/}
                        {/*       onClick={()=>router.push(srvid+"/panel")}>Я забыл пароль</a>*/}
                        {/*</div>*/}
                    </>}

                    <div className="p-2 w-[available] flex mt-4 items-center justify-center">
                        <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                        Для активации аккаунта требуется войти в панель хотя бы один раз
                    </div>
                </div>
            </div>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={backdrop!="none"} onClick={()=>setBackdrop("none")}>
            {backdrop==="login" && <div className="bg-[var(--subtle-color)] p-2 rounded-xl"
                                        onClick={(e)=>e.stopPropagation()}>
                <HCaptcha sitekey="c17bb027-5ed7-4e3d-9f67-6f3ed2d78090"
                          onVerify={(val,idk)=>setCreds({
                              ...creds,
                              captcha: val
                          })} theme="dark"/>
                <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-lg flex items-center justify-center h-12 rounded-xl flex-1 mt-1"
                   onClick={()=>{
                       toast.error("Такого функционала еще нет")
                   }}>Войти в панель</a>
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