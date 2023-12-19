import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import styles from "../../../../components/Manage/GDManage.module.css"
import {useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {styled} from "@mui/system";
import {
    TextField
} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";
import useEffectOnce from "../../../../components/Hooks";
import useLocale from "../../../../locales/useLocale";
import ProgressCard from "../../../../components/Cards/ProgressCard";
import GDPSCard, {DownloadCard} from "../../../../components/Cards/GDPSCard";
import useFiberAPI from "../../../../fiber/fiber";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);







export default function ManageGD(props) {

    const [userStatTab, setUserStatTab] = useState("7d")
    const [lvlStatTab, setLvlStatTab] = useState("7d")

    const api = useFiberAPI()
    const [srv, setSrv] = api.servers.useGDPS()

    useEffectOnce(()=>{
        toast.dismiss()
    })

    const locale = useLocale(props.router)


    let expire = new Date(srv.Srv.expire_date)
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
            <GDNavBar />
            <Toaster/>
            <PanelContent>
                {/*<div className={styles.Smallbanner}>*/}
                {/*    <div></div>*/}
                {/*    <p>{locale.get("development")}</p>*/}
                {/*</div>*/}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full md:w-auto">
                    <GDPSCard name={srv.Srv.srv_name} planid={srv.Srv.plan} plan={GetGDPlan(srv.Srv.plan)} id={<span style={{color:"white"}} className={styles.CodeBlock}>{srv.Srv.srvid}</span>}
                              icon={"https://cdn.fruitspace.one/server_icons/"+srv.Srv.icon} onClick={()=>props.router.push("/product/order/gd?id="+srv.Srv.srvid)}/>
                    <ProgressCard color max={srv.CoreConfig&&srv.CoreConfig.ServerConfig.MaxUsers} now={srv.Srv.user_count} text={locale.get('chips')[0]} />
                    <ProgressCard color max={srv.CoreConfig&&srv.CoreConfig.ServerConfig.MaxLevels} now={srv.Srv.level_count} text={locale.get('chips')[1]} />
                    <ProgressCard color date max={preMax>30?365:30} now={expireDate} text={locale.get('chips')[2]+expireText} />
                    <DownloadCard api={api} srvid={srv.Srv.srvid} locale={locale} srv={srv.Srv} copyR={copyValueR} />
                </div>

                <div className={styles.CardBox}>
                    <h3>{locale.get("nav")}</h3>
                    <div className={styles.CardInbox}>
                        <p className="text-sm" dangerouslySetInnerHTML={{__html: locale.get("note")}}></p>
                        <a href=" https://fruitspace.gitbook.io/gdps_docs/"
                           style={{
                               padding: ".75rem 2rem",
                               background: "linear-gradient(135deg, #8e388e,#5a00ff 70%, #0d6efd)",
                               borderRadius: "8px",
                               margin: "0 auto",
                           }}>{locale.get("docs")}</a>
                    </div>
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
            </PanelContent>

        </>
    )
}

ManageGD.RequireAuth=true



function FruitCharts(props) {

    let data = {
        labels: props.labels,
        datasets: [{
            fill: true,
            label: 'Всего',
            data: props.dataAll,
            borderColor: "#919195",
            backgroundColor: "#91919588",
            cubicInterpolationMode: "monotone",
            order: 3
        },
            {
                fill: true,
                label: 'Активные',
                data: props.dataActive,
                borderColor: "#0d6efd",
                backgroundColor: "#0d6efd88",
                cubicInterpolationMode: "monotone",
                order: 2
            },
            {
                fill: true,
                label: 'Новые',
                data: props.dataNew,
                borderColor: "#fff",
                backgroundColor: "#ffffff88",
                cubicInterpolationMode: "monotone",
                order: 1
            }
        ]
    }


    return (
        <Line options={{
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: "white",
                        font: {size: 14, weight:"bold"}
                    }
                }
            },
            interaction: {intersect: false, mode: "index"},
            elements:{point:{pointRadius:0}},
            layout: {padding: 0},
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {display: true, color: "white", text:"Игроков", font:{weight:"bold"}},
                    ticks:{mirror:true, color: "#dedede", z:20, font:{weight:"bold"}},
                    grid: {display: false}
                },
                x: {ticks: {color: "white"}, grid: {display: false}}
            }
        }}  data={data} redraw className={styles.chart}/>
    )
}

function FruitChartLevels(props) {

    let data = {
        labels: props.labels,
        datasets: [{
            fill: true,
            label: 'Всего',
            data: props.dataAll,
            borderColor: "#919195",
            backgroundColor: "#91919588",
            cubicInterpolationMode: "monotone",
            order: 3
        },
            {
                fill: true,
                label: 'Новые',
                data: props.dataNew,
                borderColor: "#fff",
                backgroundColor: "#ffffff88",
                cubicInterpolationMode: "monotone",
                order: 1
            }
        ]
    }


    return (
        <Line options={{
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: "white",
                        font: {size: 14, weight:"bold"}
                    }
                }
            },
            interaction: {intersect: false, mode: "index"},
            elements:{point:{pointRadius:0}},
            layout: {padding: 0},
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {display: true, color: "white", text:"Уровней", font:{weight:"bold"}},
                    ticks:{mirror:true, color: "#dedede", z:20 , font: {weight: "bold",}},
                    grid: {display: false}
                },
                x: {ticks: {color: "white"}, grid: {display: false}}
            }
        }}  data={data} redraw className={styles.chart}/>
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
        // backgroundColor: "var(--btn-color)",
        marginBottom: "1rem"
    },
});

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