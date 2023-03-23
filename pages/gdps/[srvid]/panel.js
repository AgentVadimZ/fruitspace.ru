import GlobalHead from "../../../components/GlobalHead";
import {Toaster} from "react-hot-toast";
import PanelContent from "../../../components/Global/PanelContent";
import GlobalGDPSNav from "../../../components/UserZone/GlobalGDPSNav";
import GDPSNavBar from "../../../components/UserZone/GDPSSIdeBar";
import {useEffect, useState} from "react";
import useGDPSLogin from "../../../components/GDPSLogin";
import {useRouter} from "next/router";
import starImg from "../../../components/assets/gd/star.png"
import trophyImg from "../../../components/assets/gd/trophy.png"
import cpImg from "../../../components/assets/gd/cp.png"
import ucoinImg from "../../../components/assets/gd/browncoin.png"
import coinImg from "../../../components/assets/gd/silvercoin.png"
import diamondsImg from "../../../components/assets/gd/diamond.png"
import orbsImg from "../../../components/assets/gd/orbs.png"
import demonImg from "../../../components/assets/gd/demon.png"
import playImg from "../../../components/assets/gd/play.png"

export default function FrontPage(props) {

    const router = useRouter()

    const srvid = router.query.srvid
    const [srv, setSrv] = useState({})

    const [user, isAuthDone, doLogin, doExec] = useGDPSLogin(srvid)

    const fastIconLink = (type, id) => {
        id = Math.max(1, id)
        return "https://cdn.fruitspace.one/assets/icons/" + type + "/" + id + ".png"
    }

    useEffect(()=>{
        if (srvid==null) return
        fetch("https://api.fruitspace.one/v1/gdpshub/getgdps?id="+srvid,
            {credentials:"include", method: "GET"}).then(resp=>resp.json()).then((resp)=>{
            if(resp.id) setSrv(resp);
            else router.push("/");
        })
    },[srvid])

    const type = getIconTypeById(user.icon_type)

    return <>
        <GlobalHead title={srv.name}/>
        <GlobalGDPSNav name={srv.name} icon={srv.icon}/>
        <GDPSNavBar music={srv.t>1}/>
        <Toaster/>
        {isAuthDone && <PanelContent>
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
                            <img src={fastIconLink("cube",user.cube)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="cube"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("ship",user.ship)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="ship"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("ball",user.ball)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="ball"&&"bg-[var(--primary-color)]"}`} />
                        </span>

                        <span className="flex">
                            <img src={fastIconLink("ufo",user.ufo)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="ufo"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("wave",user.wave)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="wave"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("robot",user.robot)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="robot"&&"bg-[var(--primary-color)]"}`} />
                        </span>

                        <span className="flex">
                            <img src={fastIconLink("spider",user.spider)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="spider"&&"bg-[var(--primary-color)]"}`} />
                        <img src={fastIconLink("swing",user.swing)} className={`w-12 p-2 rounded-lg aspect-square object-contain ${type==="swing"&&"bg-[var(--primary-color)]"}`} />
                        </span>
                         </div>
                </div>
            </div>
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