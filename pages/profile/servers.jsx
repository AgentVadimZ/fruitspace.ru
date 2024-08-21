import GlobalNav from "@/components/GlobalNav";
import PanelSideNav from "@/components/PanelSideNav";
import GlobalHead from "@/components/GlobalHead";
import PanelContent from "@/components/Global/PanelContent";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ServerItem from "@/components/Cards/ServerItem";
import useEffectOnce from "@/components/Hooks";
import toast, {Toaster} from "react-hot-toast";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAtom, faChartSimple,
    faChevronRight, faCircleNodes, faCloud,
    faCog, faCube, faGaugeHigh, faGlobe,
    faHardDrive,
    faMemory,
    faMicrochip,
    faPlusCircle, faRecordVinyl, faServer, faShield, faUser, faZap
} from "@fortawesome/free-solid-svg-icons";
import {ProfileMobileNav} from "@/components/PanelMobileNav";
import {Button, Popover, Segmented} from "antd";

import MinecraftSimpleLogo from "@/assets/icons/minecraft.svg"
import GDSimpleLogo from "@/assets/icons/geometrydash.svg"


export default function Servers(props) {
    const router = useRouter()
    const {s} = router.query;
    const route = "mc";
    const [tab, setTab] = useState(route)

    const api = useFiberAPI()

    const [servers, setServers] = useState({
        gd: [],
        mc: [],
        cs: []
    })

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const ParseDesc = localeGlobal.get('funcLvlPlayerServer')

    useEffectOnce(()=>{
        toast.dismiss()
    })

    useEffectOnce(()=>{
        api.servers.list().then((resp)=>{
            if (resp.status==="ok") {
                setServers(resp)
            }
        })
    })

    useEffect(()=>{setTab(s?s:"mc")},[s])
    return (
        <>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <PanelSideNav />
            <ProfileMobileNav />
            <Toaster/>
            <PanelContent>

                <Segmented rootClassName="ipad:mt-16 glassb bg-btn select-none" size="large" options={[
                    {
                        label: <p className="flex items-center gap-1">
                            <MinecraftSimpleLogo className="w-6 h-6 inline" /> Minecraft
                        </p>,
                        value: "mc",
                    },
                    {
                        label: <p className="flex items-center gap-1">
                            <GDSimpleLogo className="w-6 h-6 inline" /> Geometry Dash
                        </p>,
                        value: "gd",
                    }
                ]} value={tab} onChange={setTab}/>

                {
                    tab==="mc" && <ServerView addbtn={
                        <Button type="primary" icon={<FontAwesomeIcon icon={faPlusCircle}/>}> Создать</Button>
                    } title="Проекты Minecraft">
                        <div className="flex flex-col gap-2">
                            <div className="rounded-xl p-4 bg-active">
                                <div className="flex items-center justify-between pb-2 pl-2">
                                    <p className="text-lg">AterHaven</p>
                                    <Button className="group" type="text" iconPosition="end"
                                            icon={<FontAwesomeIcon icon={faCog}/>}>
                                        <span
                                            className="text-sm w-0 group-hover:w-28 overflow-hidden transition-all duration-500">Настроить сеть</span>
                                    </Button>
                                </div>
                                <MinecraftNetworkTree domain="mc.aterhaven.org" shield="France" cidr="172.0.16.1/24"
                                                      router_type="gate"
                                                      servers={[
                                                          {
                                                              id: "babca",
                                                              name: "AterLobby",
                                                              players: 163,
                                                              max_players: 1000,
                                                              ip: "172.0.16.43",
                                                              online: true,
                                                              core: "spigot",
                                                              version: "1.20.4",
                                                              plan: "d4",
                                                              ram: 12,
                                                              cpu: 240,
                                                              disk: 8,
                                                              add_disk: 20
                                                          },
                                                      ]}/>
                            </div>
                            <div className="rounded-xl p-4 bg-active">
                                <div className="flex items-center justify-between pb-2 pl-2">
                                    <p className="text-lg">AterHaven</p>
                                    <span className="font-mono text-sm">mc.aterhaven.org</span>
                                    <Button className="group" type="text" iconPosition="end"
                                            icon={<FontAwesomeIcon icon={faCog}/>}>
                                        <span
                                            className="text-sm w-0 group-hover:w-28 overflow-hidden transition-all duration-1000">Настроить сеть</span>
                                    </Button>
                                </div>
                                <MinecraftNetworkTree domain="mc.aterhaven.org" shield="France" cidr="172.0.16.1/24"
                                                      router_type="gate"
                                                      servers={[
                                                          {
                                                              id: "babca",
                                                              name: "AterLobby",
                                                              players: 163,
                                                              max_players: 1000,
                                                              ip: "172.0.16.43",
                                                              online: true,
                                                              core: "spigot",
                                                              version: "1.20.4",
                                                              plan: "d4",
                                                              ram: 12,
                                                              cpu: 240,
                                                              disk: 8,
                                                              add_disk: 20
                                                          },
                                                          {
                                                              id: "babca",
                                                              name: "AterLobby",
                                                              players: 163,
                                                              max_players: 1000,
                                                              ip: "172.0.16.43",
                                                              online: true,
                                                              core: "spigot",
                                                              version: "1.20.4",
                                                              plan: "d4",
                                                              ram: 12,
                                                              cpu: 240,
                                                              disk: 8,
                                                              add_disk: 20
                                                          },
                                                      ]}/>
                            </div>
                            <div className="rounded-xl p-4 bg-active">
                                <div className="flex items-center justify-between pb-2 pl-2">
                                    <p className="text-lg">AterHaven</p>
                                    <span className="font-mono text-sm">mc.aterhaven.org</span>
                                    <Button className="group" type="text" iconPosition="end"
                                            icon={<FontAwesomeIcon icon={faCog}/>}>
                                        <span
                                            className="text-sm w-0 group-hover:w-28 overflow-hidden transition-all duration-1000">Настроить сеть</span>
                                    </Button>
                                </div>
                                <MinecraftNetworkTree domain="mc.aterhaven.org" shield="France" cidr="172.0.16.1/24"
                                                      router_type="gate"
                                                      servers={[
                                                          {
                                                              id: "babca",
                                                              name: "AterLobby",
                                                              players: 163,
                                                              max_players: 1000,
                                                              ip: "172.0.16.43",
                                                              online: true,
                                                              core: "spigot",
                                                              version: "1.20.4",
                                                              plan: "d4",
                                                              ram: 12,
                                                              cpu: 240,
                                                              disk: 8,
                                                              add_disk: 20
                                                          },

                                                          {
                                                              id: "cambria",
                                                              name: "AterPrivate",
                                                              players: 0,
                                                              max_players: 20,
                                                              ip: "172.0.16.17",
                                                              online: false,
                                                              core: "vanilla",
                                                              version: "1.21.1",
                                                              plan: "d4",
                                                              ram: 0,
                                                              cpu: 0,
                                                              disk: 3,
                                                              add_disk: 0
                                                          },

                                                          {
                                                              id: "fifoid",
                                                              name: "AterPrivate",
                                                              players: 0,
                                                              max_players: 20,
                                                              ip: "172.0.16.17",
                                                              online: false,
                                                              core: "vanilla",
                                                              version: "1.21.1",
                                                              plan: "d4",
                                                              ram: 0,
                                                              cpu: 0,
                                                              disk: 3,
                                                              add_disk: 0
                                                          }
                                                      ]}/>
                            </div>
                            <div className="rounded-xl p-4 bg-active">
                                <div className="flex items-center justify-between pb-2 pl-2">
                                    <p className="text-lg">AterHaven</p>
                                    <span className="font-mono text-sm">mc.aterhaven.org</span>
                                    <Button className="group" type="text" iconPosition="end"
                                            icon={<FontAwesomeIcon icon={faCog}/>}>
                                        <span
                                            className="text-sm w-0 group-hover:w-28 overflow-hidden transition-all duration-1000">Настроить сеть</span>
                                    </Button>
                                </div>
                                <MinecraftNetworkTree domain="mc.aterhaven.org" shield="France" cidr="172.0.16.1/24"
                                                      router_type="gate"
                                                      servers={[
                                                          {
                                                              id: "babca",
                                                              name: "AterLobby",
                                                              players: 163,
                                                              max_players: 1000,
                                                              ip: "172.0.16.43",
                                                              online: true,
                                                              core: "spigot",
                                                              version: "1.20.4",
                                                              plan: "d4",
                                                              ram: 12,
                                                              cpu: 240,
                                                              disk: 8,
                                                              add_disk: 20
                                                          },

                                                          {
                                                              id: "cambria",
                                                              name: "AterPrivate",
                                                              players: 0,
                                                              max_players: 20,
                                                              ip: "172.0.16.17",
                                                              online: false,
                                                              core: "vanilla",
                                                              version: "1.21.1",
                                                              plan: "d4",
                                                              ram: 0,
                                                              cpu: 0,
                                                              disk: 3,
                                                              add_disk: 0
                                                          },

                                                          {
                                                              id: "fifoid",
                                                              name: "AterPrivate",
                                                              players: 0,
                                                              max_players: 20,
                                                              ip: "172.0.16.17",
                                                              online: false,
                                                              core: "vanilla",
                                                              version: "1.21.1",
                                                              plan: "d4",
                                                              ram: 0,
                                                              cpu: 0,
                                                              disk: 3,
                                                              add_disk: 0
                                                          },

                                                          {
                                                              id: "fifoid",
                                                              name: "AterPrivate",
                                                              players: 0,
                                                              max_players: 20,
                                                              ip: "172.0.16.17",
                                                              online: false,
                                                              core: "vanilla",
                                                              version: "1.21.1",
                                                              plan: "d4",
                                                              ram: 0,
                                                              cpu: 0,
                                                              disk: 3,
                                                              add_disk: 0
                                                          }
                                                      ]}/>
                            </div>
                            <div className="rounded-xl p-4 bg-active">
                                <div className="flex items-center justify-between pb-2 pl-2">
                                    <p className="text-lg">AterHaven</p>
                                    <span className="font-mono text-sm">mc.aterhaven.org</span>
                                    <Button className="group" type="text" iconPosition="end"
                                            icon={<FontAwesomeIcon icon={faCog}/>}>
                                        <span
                                            className="text-sm w-0 group-hover:w-28 overflow-hidden transition-all duration-1000">Настроить сеть</span>
                                    </Button>
                                </div>
                                <MinecraftNetworkTree domain="mc.aterhaven.org" shield="France" cidr="172.0.16.1/24"
                                                      router_type="gate"
                                                      servers={[
                                                          {
                                                              id: "babca",
                                                              name: "AterLobby",
                                                              players: 163,
                                                              max_players: 1000,
                                                              ip: "172.0.16.43",
                                                              online: true,
                                                              core: "spigot",
                                                              version: "1.20.4",
                                                              plan: "d4",
                                                              ram: 12,
                                                              cpu: 240,
                                                              disk: 8,
                                                              add_disk: 20
                                                          },

                                                          {
                                                              id: "cambria",
                                                              name: "AterPrivate",
                                                              players: 0,
                                                              max_players: 20,
                                                              ip: "172.0.16.17",
                                                              online: false,
                                                              core: "vanilla",
                                                              version: "1.21.1",
                                                              plan: "d4",
                                                              ram: 0,
                                                              cpu: 0,
                                                              disk: 3,
                                                              add_disk: 0
                                                          },{
                                                              id: "cambria",
                                                              name: "AterPrivate",
                                                              players: 0,
                                                              max_players: 20,
                                                              ip: "172.0.16.17",
                                                              online: false,
                                                              core: "vanilla",
                                                              version: "1.21.1",
                                                              plan: "d4",
                                                              ram: 0,
                                                              cpu: 0,
                                                              disk: 3,
                                                              add_disk: 0
                                                          },

                                                          {
                                                              id: "fifoid",
                                                              name: "AterPrivate",
                                                              players: 0,
                                                              max_players: 20,
                                                              ip: "172.0.16.17",
                                                              online: false,
                                                              core: "vanilla",
                                                              version: "1.21.1",
                                                              plan: "d4",
                                                              ram: 0,
                                                              cpu: 0,
                                                              disk: 3,
                                                              add_disk: 0
                                                          },

                                                          {
                                                              id: "fifoid",
                                                              name: "AterPrivate",
                                                              players: 0,
                                                              max_players: 20,
                                                              ip: "172.0.16.17",
                                                              online: false,
                                                              core: "vanilla",
                                                              version: "1.21.1",
                                                              plan: "d4",
                                                              ram: 0,
                                                              cpu: 0,
                                                              disk: 3,
                                                              add_disk: 0
                                                          }
                                                      ]}/>
                            </div>
                        </div>
                    </ServerView>
                }

                {
                    tab==="gd" && <ServerView addbtn={
                        <Button onClick={() => router.push("/product/order/gd")} type="primary" icon={<FontAwesomeIcon icon={faPlusCircle}/>}> Создать</Button>
                    } title="Ваши GDPS">
                        {servers.gd ? servers.gd.map((val, i) => (
                            <ServerItem key={i} type="gd" name={val.srv_name} plan={GetGDPlan(val.plan)}
                                        router={props.router}
                                        desc={ParseDesc(val.user_count, val.level_count)} uuid={val.srvid}
                                        icon={val.icon}/>
                        )) : ""}
                    </ServerView>
                }
            </PanelContent>
        </>
    )
}

Servers.RequireAuth = true


const ServerView = (props) => {
    return <div className="w-full mt-4 ipad:mt-8 ipad:w-3/4 glassb rounded-2xl">
        <div
            className="bg-active flex justify-between items-center p-3 border-subtle border-solid border-1 rounded-t-2xl border-b-0">
            <p className="">{props.title}</p>
            {props.addbtn}
        </div>
        <div className="bg-active border-subtle rounded-b-2xl border-solid border-1 border-t-0">
            <div className="w-full rounded-2xl bg-subtle border-solid border-t-[1px] border-0 border-btn p-2">
                {props.children}
            </div>
        </div>
    </div>
}

const MinecraftNetworkTree = (props) => {
    return <div className="flex flex-col items-start gap-1">
    <p className="flex items-center gap-2">
            <FontAwesomeIcon className="w-6" icon={faGlobe}/>
            <span className="font-mono text-sm cursor-pointer hover:underline" onClick={async () => {
                await window?.navigator?.clipboard?.writeText(props.domain)
                toast.success("Ссылка скопирована в буфер обмена")
            }}>{props.domain}</span>
            <p className="flex items-center gap-1 ml-3 rounded bg-btn px-1.5 py-0.5">
                <FontAwesomeIcon className="w-3" icon={faShield}/>
                <span className="font-mono text-xs">{props.shield}</span>
            </p>
        </p>
        <span className="h-3 border-l-2 border-gray-300 border-solid ml-2.5"/>
        <div className="flex gap-2">
            <FontAwesomeIcon className="w-6" icon={faCloud}/>
            <span className="font-mono text-sm">{props.cidr}</span>
            {props.router_type === "gate"
                ? <Popover placement="right" rootClassName="thin-popover" content={
                    <span className="text-xs">
                        Используется встроенный балансировщик для защиты сети
                    </span>
                }>
                    <p className="flex cursor-pointer items-center gap-1 bg-gradient-to-br from-primary to-85% to-subtle rounded px-1.5 py-0.5">
                        <FontAwesomeIcon className="w-2" icon={faZap}/>
                        <span className="text-xs">CubeShield</span>
                    </p>
                </Popover>
                : <p className="flex items-center gap-1 bg-btn rounded px-1.5 py-0.5">
                    <FontAwesomeIcon className="w-2" icon={faCube}/>
                    <span className="text-xs">{props.servers.filter(s => s.id === props.router_type)[0].name}</span>
                </p>
            }
        </div>
        <div className="flex w-full">
            <div className="flex flex-col">
                <span
                    className="h-3 w-3 border-l-2 border-gray-300 border-solid ml-2.5"/>
                <span
                    className="flex-1 min-h-3 w-3 rounded-bl-lg border-l-2 border-b-2 border-gray-300 border-solid ml-2.5"/>
                <span className="flex-1"/>
            </div>
            <div className="flex flex-1 flex-col mt-3">
                {props.servers.map((server, i) => {
                    const plan = GetMCPlan(server.plan)
                    return <div key={i} className="flex group relative">
                        {props.servers.length>1 && <span className="group-last:h-1/2 w-3 group-first:rounded-tl-lg border-l-2 group-first:border-t-2
                        group-last:border-b-2 group-last:rounded-bl-lg group-first:mt-9 border-gray-300 border-solid"/>}

                        <span className="group-first:hidden group-last:hidden w-3 h-1 border-b-2 absolute top-1/2 transform -translate-y-3/4" />

                        <div className="p-2 flex w-full gap-4 items-center rounded-xl glassb-hover h-[76px]">
                            <FontAwesomeIcon className={`text-3xl my-auto text-${server.online ? "success" : "error"}`}
                                             icon={faServer}/>
                            <div className="flex flex-col w-72">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-mono">{server.name}</span>
                                    <p className="flex items-center gap-1 bg-btn rounded px-1.5 py-0.5">
                                        <FontAwesomeIcon className="w-2" icon={faUser}/>
                                        <span className="text-xs">{server.players}/{server.max_players}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 p-3 pl-0 ipad:pl-3">
                                    <p className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faRecordVinyl}/>
                                        <span className="text-xs font-mono">{server.core} {server.version}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faGaugeHigh}/>
                                        <span className="text-xs">{plan.title}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="mx-auto flex items-center gap-4">
                                <div
                                    className="aspect-square h-16 rounded-lg glassb relative flex flex-col items-center justify-end p-1">
                                    <div
                                        className="absolute top-0 left-0 w-full h-full rounded-lg z-0 flex flex-col justify-end">
                                        <div className="rounded-lg bg-amber-600 bg-opacity-50 w-full transition-all duration-300" style={{
                                            height: `${Math.min((server.cpu / (plan.cpus*100)) * 100, 100)}%`
                                        }}/>
                                    </div>
                                    <FontAwesomeIcon
                                        className={`z-10 opacity-50 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                        ${((server.cpu / (plan.cpus*100)) * 100)>85?"text-error opacity-75":""}`}
                                        icon={faMicrochip}/>
                                    <p className="text-[10px] -mb-1">{server.cpu}%</p>
                                </div>
                                <div
                                    className="aspect-square h-16 rounded-lg glassb relative flex flex-col items-center justify-end p-1">
                                    <FontAwesomeIcon
                                        className={`z-10 opacity-50 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                        ${((server.ram / plan.maxRam) * 100)>85?"text-error opacity-75":""}`}
                                        icon={faChartSimple}/>
                                    <div className="absolute top-0 left-0 w-full h-full rounded-lg z-0 flex flex-col justify-end">
                                        <div className="rounded-lg bg-success bg-opacity-50 w-full transition-all duration-300" style={{
                                            height: `${Math.min((server.ram / plan.maxRam) * 100, 100)}%`
                                        }} />
                                    </div>
                                    <p className="text-[10px] -mb-1">{server.ram}/{plan.maxRam}GB</p>
                                </div>

                                <Popover placement="bottom" rootClassName="thin-popover" content={
                                    <p className="text-xs font-mono">
                                        {server.disk}/{plan.ssd + server.add_disk}GB
                                        ({plan.ssd}{server.add_disk ? `+${server.add_disk}` : ''}GB)
                                    </p>
                                }>
                                    <div
                                        className="aspect-square h-16 rounded-lg glassb relative flex flex-col items-center justify-end p-1">
                                        <FontAwesomeIcon
                                            className=" opacity-50 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                            icon={faHardDrive}/>


                                        <div className="flex w-full rounded-full h-2 bg-btn">
                                            <div className="rounded-full h-2 bg-success transition-all duration-300"
                                                 style={{width: `${Math.max(server.disk / (plan.ssd + server.add_disk), 15)}%`}}></div>
                                        </div>

                                    </div>
                                </Popover>

                            </div>
                            <Button type="text" icon={
                                <FontAwesomeIcon icon={faChevronRight}/>} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
}


const GetGDPlan = (plan) => {
    switch (plan) {
        case 0:
        case 1:
            return "Press Start"
        case 2:
            return "Singularity"
        case 3:
            return "Takeoff"
        case 4:
            return "Foundation"
        default:
            return "???"
    }
}

const GetMCPlan = (plan) => {
    return mc_tariffs[plan] || {
        title: "Unknown",
        id: "u",
        cpus: 0,
        minRam: 0,
        maxRam: 0,
        ssd: 0
    }
}

const mc_tariffs = {
    d1: {
        title: "Next ⋙",
        id: "D-1 S",
        price: 350,
        cpus: 1,
        minRam: 2,
        maxRam: 4,
        ssd: 20
    },
    d2: {
        title: "Reforged",
        id: "D-2 S+",
        price: 700,
        cpus: 2,
        minRam: 4,
        maxRam: 8,
        ssd: 30
    },
    d3: {
        title: "EverPeak",
        id: "D-3 M",
        price: 1300,
        cpus: 3,
        minRam: 8,
        maxRam: 12,
        ssd: 45
    },
    d4: {
        title: "Orbital",
        id: "D-4 M+",
        price: 1700,
        cpus: 4,
        minRam: 8,
        maxRam: 16,
        ssd: 60
    },
    d5: {
        title: "Horizon",
        id: "D-5 L",
        price: 2600,
        cpus: 5,
        minRam: 16,
        maxRam: 24,
        ssd: 100
    },
    s1: {
        title: "Air",
        id: "S-1 S~",
        price: 550,
        cpus: 1,
        minRam: 4,
        maxRam: 4,
        ssd: 30
    },
    s2: {
        title: "Viper",
        id: "S-2 S++",
        price: 1000,
        cpus: 2,
        minRam: 8,
        maxRam: 8,
        ssd: 40
    },
    s3: {
        title: "Carbon",
        id: "S-3 M~",
        price: 1500,
        cpus: 3,
        minRam: 12,
        maxRam: 12,
        ssd: 60
    },
    s4: {
        title: "Proton",
        id: "S-4 M++",
        price: 2300,
        cpus: 4,
        minRam: 16,
        maxRam: 16,
        ssd: 80
    },
    s5: {
        title: "Warp",
        id: "S-5 L+",
        price: 3200,
        cpus: 5,
        minRam: 24,
        maxRam: 24,
        ssd: 120
    },
}