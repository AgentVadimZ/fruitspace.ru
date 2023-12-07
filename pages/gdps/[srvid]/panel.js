import GlobalHead from "../../../components/GlobalHead";
import toast, {Toaster} from "react-hot-toast";
import PanelContent from "../../../components/Global/PanelContent";
import GlobalGDPSNav from "../../../components/UserZone/GlobalGDPSNav";
import GDPSNavBar from "../../../components/UserZone/GDPSSIdeBar";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import starImg from "../../../components/assets/gd/star.png"
import cpImg from "../../../components/assets/gd/cp.png"
import ucoinImg from "../../../components/assets/gd/browncoin.png"
import coinImg from "../../../components/assets/gd/silvercoin.png"
import diamondsImg from "../../../components/assets/gd/diamond.png"
import orbsImg from "../../../components/assets/gd/orbs.png"
import demonImg from "../../../components/assets/gd/demon.png"
import playImg from "../../../components/assets/gd/play.png"
import useFiberAPI from "../../../fiber/fiber";
import {getBrowserLocale} from "../../../components/Hooks";
import useLocale from "../../../locales/useLocale";
import {Backdrop, TextField} from "@mui/material";
import {styled} from "@mui/system";

export default function FrontPage(props) {

    const router = useRouter()

    const srvid = router.query.srvid
    const [srv, setSrv] = useState({})
    const [user, setUser] = useState({})

    const [backdrop, setBackdrop] = useState("none")

    const api = useFiberAPI(`gdps_token`)
    let tokens = api.authorization||{}
    const defaultId = tokens.default?.[srvid] || 0
    let token = tokens[srvid]?.[defaultId] || ""
    if(router.query.acc) {
        token = router.query.acc
    }
    api.authorization = token

    const [creds, setCreds] = useState({uname:user.uname, password: "", email: user.email})

    useEffect(()=> {
        srvid&&api.gdps_users.get(srvid).then(resp=>{
            if(!resp.uname) router.push(`/gdps/${srvid}/`)
            setUser({...resp, vessels: JSON.parse(resp.vessels||"{}")})
            setCreds({uname:resp.uname, password: "", email: resp.email})
        })
    }, [srvid, router.query.acc])

    const fastIconLink = (type, id) => {
        id = Math.max(1, id)
        return "https://cdn.fruitspace.one/assets/icons/" + type + "/" + id + ".png"
    }

    useEffect(()=>{
        if (srvid==null) return
        api.fetch.gdpsGet(srvid).then((resp)=>{
            if(resp.srvid) setSrv(resp);
            else router.push("/");
        })
    },[srvid, router.query.acc])

    const lang = getBrowserLocale()

    const locale = useLocale(router)
    if (lang!=null) {
        locale.locale = lang==="ru"?"ru":"en"
    }

    const changeLogin = () => {
        api.gdps_users.updateUsername(srvid, creds.uname).then(resp=>{
            if (resp.status==="ok") {
                toast.success(locale.get('success'), {
                    duration: 1000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            } else {
                toast.error(resp.message, {
                    duration: 10000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            }
        })
    }
    const changeEmail = () => {
        api.gdps_users.updateEmail(srvid, creds.email).then(resp=>{
            if (resp.status==="ok") {
                toast.success(locale.get('success'), {
                    duration: 1000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            } else {
                toast.error(resp.message, {
                    duration: 10000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            }
        })
    }
    const changePassword = () => {
        api.gdps_users.updatePassword(srvid, creds.password).then(resp=>{
            if (resp.status==="ok") {
                toast.success(locale.get('success'), {
                    duration: 1000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            } else {
                toast.error(resp.message, {
                    duration: 10000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            }
        })
    }

    const type = getIconTypeById(user.icon_type)

    console.log(user)

    return <>
        <GlobalHead title={srv.srv_name}/>
        <GlobalGDPSNav name={srv.srv_name} icon={srv.icon} users={tokens} />
        <GDPSNavBar music={srv.plan>1}/>
        <Toaster/>
        {user.uname && <PanelContent>
            <div>
                <div className="bg-[var(--subtle-color)] p-2 rounded-xl flex flex-col w-fit">
                    <h3 className="flex items-center mx-auto my-2">
                        {user.uname}
                        <span className="font-normal text-sm ml-2 px-2 py-0.5 rounded-md bg-[var(--btn-color)]">uid:{user.uid}</span>
                    </h3>
                    <div className="flex justify-center items-center mx-auto flex-col lg:flex-row">

                        <span className="flex mb-1">
                            <span className="flex items-center text-lg leading-none bg-[var(--bkg-color)] rounded-lg p-1 mx-1">
                            <img src={starImg.src} className="w-6 aspect-square object-contain mr-1" />
                            <span>{user.stars}</span>
                        </span>
                        <span className="flex items-center text-lg leading-none bg-[var(--bkg-color)] rounded-lg p-1 mx-1">
                            <img src={playImg.src} className="w-6 aspect-square object-contain mr-1" />
                            <span>{user.lvls_completed}</span>
                        </span>
                        <span className="flex items-center text-lg leading-none bg-[var(--bkg-color)] rounded-lg p-1 mx-1">
                            <img src={demonImg.src} className="w-6 aspect-square object-contain mr-1" />
                            <span>{user.demons}</span>
                        </span>
                        </span>

                        <span className="flex mb-1">
                            <span className="flex items-center text-lg leading-none bg-[var(--bkg-color)] rounded-lg p-1 mx-1">
                            <img src={cpImg.src} className="w-6 aspect-square object-contain mr-1" />
                            <span>{user.cpoints}</span>
                        </span>
                        <span className="flex items-center text-lg leading-none bg-[var(--bkg-color)] rounded-lg p-1 mx-1">
                            <img src={coinImg.src} className="w-6 aspect-square object-contain mr-1" />
                            <span>{user.coins}</span>
                        </span>
                        <span className="flex items-center text-lg leading-none bg-[var(--bkg-color)] rounded-lg p-1 mx-1">
                            <img src={ucoinImg.src} className="w-6 aspect-square object-contain mr-1" />
                            <span>{user.ucoins}</span>
                        </span>
                        </span>

                        <span className="flex">
                            <span className="flex items-center text-lg leading-none bg-[var(--bkg-color)] rounded-lg p-1 mx-1">
                            <img src={diamondsImg.src} className="w-6 aspect-square object-contain mr-1" />
                            <span>{user.diamonds}</span>
                        </span>
                        <span className="flex items-center text-lg leading-none bg-[var(--bkg-color)] rounded-lg p-1 mx-1">
                            <img src={orbsImg.src} className="w-6 aspect-square object-contain mr-1" />
                            <span>{user.orbs}</span>
                        </span>
                        </span>
                    </div>

                    <div className="flex justify-center items-center bg-[var(--bkg-color)] rounded-lg mx-auto mt-4 flex-col lg:flex-row">
                        <span className="flex">
                            <img src={fastIconLink("cube",user.vessels.cube)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="cube"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("ship",user.vessels.ship)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="ship"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("ball",user.vessels.ball)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="ball"&&"bg-[var(--primary-color)]"}`} />
                        </span>

                        <span className="flex">
                            <img src={fastIconLink("ufo",user.vessels.ufo)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="ufo"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("wave",user.vessels.wave)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="wave"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("robot",user.vessels.robot)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="robot"&&"bg-[var(--primary-color)]"}`} />
                        </span>

                        <span className="flex">
                            <img src={fastIconLink("spider",user.vessels.spider)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="spider"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("swing",user.vessels.swing)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="swing"&&"bg-[var(--primary-color)]"}`} />
                        </span>
                    </div>
                </div>
                <div className="bg-[var(--subtle-color)] p-1 w-[available] flex flex-col rounded-xl mt-4">
                    <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-base flex items-center m-1 justify-center h-8 rounded-lg flex-1"
                       onClick={()=>setBackdrop("chusername")}>{locale.get('changeUsername')}</a>
                    <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-base flex items-center m-1 justify-center h-8 rounded-lg flex-1"
                       onClick={()=>setBackdrop("chemail")}>{locale.get('changeEmail')}</a>
                    <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-base flex items-center m-1 justify-center h-8 rounded-lg flex-1"
                       onClick={()=>setBackdrop("chpassword")}>{locale.get('changePassword')}</a>
                </div>
            </div>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={backdrop!="none"} onClick={()=>setBackdrop("none")}>

                {backdrop==="chusername" && <div className="bg-[var(--subtle-color)] p-2 rounded-xl"
                                             onClick={(e)=>e.stopPropagation()}>
                    <h3 className="text-center">{locale.get('changeUsername')}</h3>
                    <FruitTextField
                        label="Username" type="text" fullWidth
                        value={creds.uname}
                        onChange={(evt)=>setCreds({...creds, uname: evt.target.value})}
                        className="mb-1"
                    />
                    <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-lg flex items-center justify-center h-12 rounded-xl flex-1 mt-1"
                       onClick={()=>changeLogin()}>{locale.get('change')}</a>
                </div>}
                {backdrop==="chemail" && <div className="bg-[var(--subtle-color)] p-2 rounded-xl"
                                                 onClick={(e)=>e.stopPropagation()}>
                    <h3 className="text-center">{locale.get('changeEmail')}</h3>
                    <FruitTextField
                        label="Email" type="email" fullWidth
                        value={creds.email}
                        onChange={(evt)=>setCreds({...creds, email: evt.target.value})}
                        className="mb-1"
                    />
                    <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-lg flex items-center justify-center h-12 rounded-xl flex-1 mt-1"
                       onClick={()=>changeEmail()}>{locale.get('change')}</a>
                </div>}
                {backdrop==="chpassword" && <div className="bg-[var(--subtle-color)] p-2 rounded-xl"
                    onClick={(e)=>e.stopPropagation()}>
                <h3 className="text-center">{locale.get('changePassword')}</h3>
                <FruitTextField
                    label="Password" type="password" fullWidth
                    value={creds.password}
                    onChange={(evt)=>setCreds({...creds, password: evt.target.value})}
                    className="mb-1"
                />
                <a className="hover:bg-blue-800 cursor-pointer bg-[var(--primary-color)] block text-lg flex items-center justify-center h-12 rounded-xl flex-1 mt-1"
                   onClick={()=>changePassword()}>{locale.get('change')}</a>
            </div>}

            </Backdrop>
        </PanelContent> }
    </>
}

const getIconTypeById = (id)=>{
    switch (id) {
        case 1: return "ship"
        case 2: return "ball"
        case 3: return "ufo"
        case 4: return "wave"
        case 5: return "robot"
        case 6: return "spider"
        case 7: return "swing"
        default: return "cube"
    }
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