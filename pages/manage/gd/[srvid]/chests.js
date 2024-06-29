import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import GDNavBar from "@/components/Manage/NavBars/GDNavBar";
import PanelContent from "@/components/Global/PanelContent";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useEffect, useState} from "react";

import shardIce from "@/assets/shards/ice.webp"
import orbsIcon from "@/assets/shards/orbs.webp"
import keysIcon from "@/assets/shards/keys.webp"
import diamondsIcon from "@/assets/shards/diamonds.webp"
import timeIcon from "@/assets/shards/time.png"
import dayjs from "dayjs";
import toast, {Toaster} from "react-hot-toast";
import useLocale from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber.ts";
import {InputNumber, TimePicker, Button} from "antd";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function ChestsGD(props) {
    const [chestConfig, setChestConfig] = useState({
        ChestSmallOrbsMin: 200,
        ChestSmallOrbsMax: 400,
        ChestSmallDiamondsMin: 2,
        ChestSmallDiamondsMax: 10,
        ChestSmallShards: [1,2,3,4,5,6],
        ChestSmallKeysMin: 1,
        ChestSmallKeysMax: 6,
        ChestSmallWait: 3600,

        ChestBigOrbsMin: 2000,
        ChestBigOrbsMax: 4000,
        ChestBigDiamondsMin: 20,
        ChestBigDiamondsMax: 100,
        ChestBigShards: [1,2,3,4,5,6],
        ChestBigKeysMin: 1,
        ChestBigKeysMax: 6,
        ChestBigWait: 14400,
    });

    let s = dayjs('2000-01-01 00:00:00').second(chestConfig.ChestSmallWait);
    let sb = dayjs('2000-01-01 00:00:00').second(chestConfig.ChestBigWait);

    const toSeconds = (time)=>{
        return time.hour()*3600+time.minute()*60+time.second()
    }
    const locale = useLocale(props.router)

    const api = useFiberAPI()

    const [srv, setSrv] = api.servers.useGDPS()


    const saveChests = ()=>{
        api.gdps_manage.updateChests(srv.Srv.srvid, chestConfig).then((resp)=>{
            if(resp.status==="ok") {
                toast.success(locale.get("updSuccess"),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
                setSrv({...srv, CoreConfig: {...srv.CoreConfig, ChestConfig: chestConfig}})
            }else{
                toast.error(locale.get("updFailed"),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }
        })
    }



    useEffect(()=>{
        srv.CoreConfig&&setChestConfig(srv.CoreConfig.ChestConfig)
    }, [srv])

    return (
        <>
            <GlobalHead title={locale.get("nav")}/>
            <GlobalNav />
            <GDNavBar />
            <Toaster/>
            <PanelContent>
                <div className="flex flex-col lg:flex-row gap-8 w-full xl:w-5/6">
                    <div className="p-4 rounded-xl bg-active glassb flex flex-col gap-4 flex-1">
                        <p className="rounded-md px-1.5 py-0.5 glassb w-fit">Малый сундук</p>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={orbsIcon.src} className="h-6 "/></div>
                                Орбы
                            <span className="lg:flex-1 w-full"/>
                            от
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestSmallOrbsMin}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestSmallOrbsMin: val
                                         })}/>
                            до
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestSmallOrbsMax}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestSmallOrbsMax: val
                                         })}/>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={diamondsIcon.src} className="h-6"/></div>
                                Алмазы
                            <span className="lg:flex-1 w-full"/>
                            от
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestSmallDiamondsMin}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestSmallDiamondsMin: val
                                         })}/>
                            до
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestSmallDiamondsMax}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestSmallDiamondsMax: val
                                         })}/>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={keysIcon.src} className="h-6"/></div>
                                Ключи
                            <span className="lg:flex-1 w-full"/>
                            от
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestSmallKeysMin}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestSmallKeysMin: val
                                         })}/>
                            до
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestSmallKeysMax}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestSmallKeysMax: val
                                         })}/>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={shardIce.src} className="h-6"/></div>
                                Шарды
                            <span className="lg:flex-1 w-full"/>
                            Факт дня: их больше нельзя настраивать в 2.2
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={timeIcon.src} className="h-6"/></div>
                                Таймаут
                            <span className="lg:flex-1 w-full"/>
                            <TimePicker onChange={(val) => {
                                setChestConfig({...chestConfig, ChestSmallWait: toSeconds(val)})
                            }} value={s} allowClear={false} showNow={false}/>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-active glassb flex flex-col gap-4 flex-1">
                        <p className="rounded-md px-1.5 py-0.5 glassb w-fit">Большой сундук</p>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={orbsIcon.src} className="h-6 "/></div>
                                Орбы
                            <span className="lg:flex-1 w-full"/>
                            от
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestBigOrbsMin}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestBigOrbsMin: val
                                         })}/>
                            до
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestBigOrbsMax}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestBigOrbsMax: val
                                         })}/>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={diamondsIcon.src} className="h-6"/></div>
                                Алмазы
                            <span className="lg:flex-1 w-full"/>
                            от
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestBigDiamondsMin}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestBigDiamondsMin: val
                                         })}/>
                            до
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestBigDiamondsMax}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestBigDiamondsMax: val
                                         })}/>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={keysIcon.src} className="h-6"/></div>
                                Ключи
                            <span className="lg:flex-1 w-full"/>
                            от
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestBigKeysMin}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestBigKeysMin: val
                                         })}/>
                            до
                            <InputNumber className="w-16 lg:w-auto" value={chestConfig.ChestBigKeysMax}
                                         onChange={(val) => setChestConfig({
                                             ...chestConfig,
                                             ChestBigKeysMax: val
                                         })}/>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={shardIce.src} className="h-6"/></div>
                                Шарды
                            <span className="lg:flex-1 w-full"/>
                            Факт дня: их больше нельзя настраивать в 2.2
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="w-12"><img src={timeIcon.src} className="h-6"/></div>
                            Таймаут
                            <span className="lg:flex-1 w-full"/>
                            <TimePicker onChange={(val) => {
                                setChestConfig({...chestConfig, ChestBigWait: toSeconds(val)})
                            }} value={sb} allowClear={false} showNow={false}/>
                        </div>
                    </div>
                </div>

                <Button type="primary" className="my-8" onClick={saveChests}>Сохранить</Button>
            </PanelContent>
        </>
    );
}

ChestsGD.RequireAuth = true