import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import styles from "../../../../components/Manage/GDManage.module.css"
import {useRef, useState} from "react";

import toast, {Toaster} from "react-hot-toast";
import useEffectOnce from "../../../../components/Hooks";
import useLocale from "../../../../locales/useLocale";
import ProgressCard from "../../../../components/Cards/ProgressCard";
import GDPSCard, {DownloadCard} from "../../../../components/Cards/GDPSCard";
import useFiberAPI from "../../../../fiber/fiber";
import {mutate} from "swr";
import {IndexTour} from "@/locales/tours/manage/gd";
import {FloatButton, Tour} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faHourglassHalf, faQuestion} from "@fortawesome/free-solid-svg-icons";

export default function ManageGD(props) {
    const refs = useRef({})
    const tourSteps = IndexTour.map((v,i)=>({
        ...v, target: ()=>refs.current[v.target],
        nextButtonProps: {children: <span>Далее</span>},
        prevButtonProps: {children: <span>Назад</span>},
        className: "w-fit lg:w-[520px]"
    }))
    const [tourOpen, setTourOpen] = useState(!!props.router.query.tour)


    const api = useFiberAPI()
    const [srv, setSrv] = api.servers.useGDPS()

    useEffectOnce(()=>{
        toast.dismiss()
    })

    const locale = useLocale(props.router)


    let expire = new Date(srv?.Srv?.expire_date)
    let expireDate = (expire.getTime() - new Date().getTime()) /1000/60/60/24
    let expireText = `${expire.getDate()}.${expire.getMonth()+1}.${expire.getFullYear()}`+(expireDate<=0?" ❄️":"")
    let preMax = Math.min(expireDate,365)

    const copyValueR=()=>{
        toast.success(locale.get('copied'), {
            duration: 1000,
            position: "bottom-center",
            style: {
                color: "white",
                backgroundColor: "var(--btn-color)"
            }
        })
    }


    return (
        <>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <GDNavBar sref={r=>refs.current["nav"] = r} />
            <Toaster/>
            <Tour open={tourOpen} onClose={()=>setTourOpen(false)} steps={tourSteps}/>
            <FloatButton
                shape="square"
                type="primary"
                style={{right: 20, bottom: 20}}
                onClick={() => setTourOpen(true)}
                icon={<FontAwesomeIcon icon={faQuestion} />}
            />
            {srv.Srv&&<PanelContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <GDPSCard sref={r=>refs.current["servcard"] = r} tref={r=>refs.current["servtariff"] = r} name={srv.Srv.srv_name} planid={srv.Srv.plan} plan={GetGDPlan(srv.Srv.plan)} id={<span style={{color:"white"}} className={styles.CodeBlock}>{srv.Srv.srvid}</span>}
                                  icon={"https://cdn.fruitspace.one/server_icons/"+srv.Srv.icon} onClick={()=>props.router.push("/product/order/gd?id="+srv.Srv.srvid)}/>
                        <ProgressCard color max={srv.CoreConfig&&srv.CoreConfig.ServerConfig.MaxUsers} now={srv.Srv.user_count} bottom="Игроки" />
                        <ProgressCard color max={srv.CoreConfig&&srv.CoreConfig.ServerConfig.MaxLevels} now={srv.Srv.level_count} bottom="Уровни" />
                        <ProgressCard color date max={preMax>30?365:30} text={expireText.endsWith("2050")?"Навсегда":expireText} bottom="Действует до" />
                        <DownloadCard sref={r=>refs.current["build"] = r} api={api} srvid={srv.Srv.srvid} locale={locale} srv={srv.Srv} copyR={copyValueR} />
                    </div>
                    <div className="crossx col-span-2 rounded-2xl bg-active glassb p-4 flex flex-col gap-4 items-center justify-center">
                        <FontAwesomeIcon icon={faHourglassHalf} className="text-3xl" />
                        <span className="text-lg">Полная аналитика скоро</span>
                    </div>
                </div>

                <div className={styles.CardBox} ref={r=>refs.current["cardbox"]=r}>
                </div>


                {/*<div className={styles.chartBox}>*/}
                {/*    <h3>Игроки</h3>*/}
                {/*    <TabsUnstyled value={userStatTab} onChange={(e,val)=>setUserStatTab(val)} className={styles.floatSelector}>*/}
                {/*        <TabsList>*/}
                {/*            <Tab value="7d">7d</Tab>*/}
                {/*            <Tab value="30d">30d</Tab>*/}
                {/*            <Tab value="1y">1y</Tab>*/}
                {/*            <Tab value="all">all</Tab>*/}
                {/*        </TabsList>*/}
                {/*    </TabsUnstyled>*/}
                {/*    <FruitCharts dataAll={[100,120,190,190,250]} dataActive={[50,120,40,70,90]} dataNew={[2,20,70,2,60]}*/}
                {/*                 labels={['S1', 'S2', 'S3', 'S4', 'S5']}/>*/}
                {/*</div>*/}
                {/*<div className={styles.chartBox}>*/}
                {/*    <h3>Уровни</h3>*/}
                {/*    <TabsUnstyled value={lvlStatTab} onChange={(e,val)=>setLvlStatTab(val)} className={styles.floatSelector}>*/}
                {/*        <TabsList>*/}
                {/*            <Tab value="7d">7d</Tab>*/}
                {/*            <Tab value="30d">30d</Tab>*/}
                {/*            <Tab value="1y">1y</Tab>*/}
                {/*            <Tab value="all">all</Tab>*/}
                {/*        </TabsList>*/}
                {/*    </TabsUnstyled>*/}
                {/*    <FruitChartLevels dataAll={[100,120,190,190,250]} dataNew={[2,20,70,2,60]}*/}
                {/*                 labels={['S1', 'S2', 'S3', 'S4', 'S5']}/>*/}
                {/*</div>*/}
            </PanelContent>}

        </>
    )
}

ManageGD.RequireAuth=true


const GetGDPlan=(plan)=> {
    switch (plan) {
        case 0:
        case 1: return "Press Start"
        case 2: return "Singularity"
        case 3: return "Takeoff"
        case 4: return "Overkill"
        default: return "???"
    }
}