import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {useRouter} from "next/router";
import styles from "../../../../components/Manage/GDManage.module.css"
import {Tab, TabPanel, TabsList} from "../../../../components/Global/TinyTab";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {useMemo, useState} from "react";
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
    const router = useRouter()

    const [userStatTab, setUserStatTab] = useState("7d")
    const [lvlStatTab, setLvlStatTab] = useState("7d")

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <PanelContent>
                <div className={styles.chartBox}>
                    <h3>Игроки</h3>
                    <TabsUnstyled value={userStatTab} onChange={(e,val)=>setUserStatTab(val)} className={styles.floatSelector}>
                        <TabsList>
                            <Tab value="7d">7d</Tab>
                            <Tab value="30d">30d</Tab>
                            <Tab value="1y">1y</Tab>
                            <Tab value="all">all</Tab>
                        </TabsList>
                    </TabsUnstyled>
                    <FruitCharts dataAll={[100,120,190,190,250]} dataActive={[50,120,40,70,90]} dataNew={[0,20,70,0,60]}
                                 labels={['S1', 'S2', 'S3', 'S4', 'S5']}/>
                </div>
                <div className={styles.chartBox}>
                    <h3>Уровни</h3>
                    <TabsUnstyled value={lvlStatTab} onChange={(e,val)=>setLvlStatTab(val)} className={styles.floatSelector}>
                        <TabsList>
                            <Tab value="7d">7d</Tab>
                            <Tab value="30d">30d</Tab>
                            <Tab value="1y">1y</Tab>
                            <Tab value="all">all</Tab>
                        </TabsList>
                    </TabsUnstyled>
                    <FruitChartLevels dataAll={[100,120,190,190,250]} dataActive={[50,120,40,70,90]} dataNew={[0,20,70,0,60]}
                                 labels={['S1', 'S2', 'S3', 'S4', 'S5']}/>
                </div>
            </PanelContent>
        </>
    )
}




function FruitCharts(props) {

    let data = {
        labels: props.labels,
        datasets: [{
            fill: true,
            label: 'Всего',
            data: props.dataAll,
            borderColor: "#919195",
            backgroundColor: "#919195",
            cubicInterpolationMode: "monotone",
            order: 3
        },
            {
                fill: true,
                label: 'Активные',
                data: props.dataActive,
                borderColor: "#0d6efd",
                backgroundColor: "#0d6efd",
                cubicInterpolationMode: "monotone",
                order: 2
            },
            {
                fill: true,
                label: 'Новые',
                data: props.dataNew,
                borderColor: "#fff",
                backgroundColor: "#fff",
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
            backgroundColor: "#919195",
            cubicInterpolationMode: "monotone",
            order: 3
        },
            {
                fill: true,
                label: 'Новые',
                data: props.dataNew,
                borderColor: "#fff",
                backgroundColor: "#fff",
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