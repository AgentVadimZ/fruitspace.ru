import GlobalHead from "@/components/GlobalHead";
import {Toaster} from "react-hot-toast";
import PanelContent from "@/components/Global/PanelContent";
import GlobalGDPSNav from "@/components/UserZone/GlobalGDPSNav";
import styles from "@/components/Manage/GDManage.module.css";
import {useRecoilState} from "recoil";
import GDServer from "@/states/gd_server";
import {GDUserState} from "@/states/gd_user";
import GDPSNavBar from "@/components/UserZone/GDPSSIdeBar";


export default function FrontPage(props) {

    const [srv, setSrv] = useRecoilState(GDServer)
    const [user, setUser] = useRecoilState(GDUserState)

    const fastIconLink = (type, id) => "https://cdn.fruitspace.one/assets/icons/"+type+"/"+id+".png"

    return <>
        <GlobalHead title="DefaultGDPS"/>
        <GlobalGDPSNav name={"DefaultGDPS"}/>
        <GDPSNavBar/>
        <Toaster/>
        <PanelContent>
            <div className={styles.CardGrid}>
                <div className={styles.CardBox}>
                    <h3 style={{display:"flex", alignItems:"center",margin:".5rem auto"}}>
                        <img src={fastIconLink(getIconTypeById(user.icon_type),user.vessels[getIconTypeById(user.icon_type)])}
                             className={styles.GDPSTransportIcon} style={{width:"2rem", margin:"0 .5rem 0 0"}} />
                        {user.uname}
                    </h3>

                    <div className={styles.GDPSTransportBox}>
                        <img src={fastIconLink("cube",user.vessels.cube)} className={styles.GDPSTransportIcon} />
                        <img src={fastIconLink("ship",user.vessels.ship)} className={styles.GDPSTransportIcon} />
                        <img src={fastIconLink("ball",user.vessels.ball)} className={styles.GDPSTransportIcon} />
                        <img src={fastIconLink("ufo",user.vessels.ufo)} className={styles.GDPSTransportIcon} />
                        <img src={fastIconLink("wave",user.vessels.wave)} className={styles.GDPSTransportIcon} />
                        <img src={fastIconLink("robot",user.vessels.robot)} className={styles.GDPSTransportIcon} />
                        <img src={fastIconLink("spider",user.vessels.spider)} className={styles.GDPSTransportIcon} />
                        <img src={fastIconLink("swing",user.vessels.swing)} className={styles.GDPSTransportIcon} />
                    </div>
                </div>
            </div>
        </PanelContent>
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