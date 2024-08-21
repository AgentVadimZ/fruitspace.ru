import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import PanelContent from "@/components/Global/PanelContent";
import PanelSideNav from "@/components/PanelSideNav";
import {Button, Popover} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faChartSimple, faCirclePlus,
    faCloud, faCog,
    faGlobe, faHardDrive, faMicrochip, faServer, faZap
} from "@fortawesome/free-solid-svg-icons";
import {ProfileMobileNav} from "@/components/PanelMobileNav";

import Octopus from "@/assets/octopus.svg"

export default function NetworkMC(props) {

    const plan = {
        title: "Orbital",
        id: "D-4 M+",
        price: 1700,
        cpus: 4,
        minRam: 8,
        maxRam: 16,
        ssd: 60
    }
    const server = {
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
    }

    return <>
        <GlobalHead title="babka" />
        <GlobalNav/>
        <PanelSideNav/>
        <ProfileMobileNav/>

        <PanelContent>
            <div className="w-full ipad:w-3/4 bg-active glassb rounded-2xl p-4 mx-auto">
                <div className="flex flex-row justify-between">
                    <div className="flex items-center">
                        <span className="bg-subtle glassb p-2 py-1 rounded-xl w-fit">AterHaven</span>
                    </div>
                    <div className="flex flex-row">
                        <div className="text-lg bg-subtle glassb px-2 rounded-xl w-fit py-1 flex items-center gap-1">
                            <FontAwesomeIcon icon={faGlobe}/>
                            <span className="flex w-4 bg-white h-0.5"></span>
                            <FontAwesomeIcon icon={faCloud}/>
                            <span className="flex w-4 bg-white h-0.5"></span>
                            <FontAwesomeIcon icon={faServer}/>
                        </div>
                    </div>

                </div>
                <div className="flex justify-center mt-4 flex-col items-center">
                    <div
                        className="text-lg bg-subtle glassb w-full desktop:w-1/3 p-2 rounded-xl flex flex-col justify-between">
                        <span className="text-xl">Прокси</span>
                        <div className="flex justify-start mt-2 mb-2 flex-col gap-2 w-full">
                            <div className="glassb bg-subtle p-1.5 rounded-lg flex items-center gap-1">
                                <FontAwesomeIcon icon={faGlobe} size={"sm"}/>
                                <p>mc.aterhaven.org</p>
                            </div>
                            <div className="glassb bg-subtle p-1.5 rounded-lg flex items-center gap-1">
                                <FontAwesomeIcon icon={faCloud} size={"sm"}/>
                                <p>172.0.16.1/24</p>
                                <Popover placement="bottom" rootClassName="thin-popover" content={
                                    <span className="text-xs">
                        Используется встроенный балансировщик для защиты сети
                    </span>
                                }>
                                    <p className="flex cursor-pointer items-center gap-1 bg-gradient-to-br from-primary to-85% to-subtle rounded px-1.5 py-0.5">
                                        <FontAwesomeIcon className="w-2" icon={faZap}/>
                                        <span className="text-xs">CubeShield</span>
                                    </p>
                                </Popover>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button className="bg-btn" type="text" iconPosition="start"
                                    icon={<FontAwesomeIcon icon={faCog}/>}>
                                Настройки
                            </Button>
                        </div>
                    </div>

                    <Octopus/>
                    <div className="w-full rounded-xl flex flex-col justify-between relative">
                        <span
                            className="absolute left-1/2 transform -translate-x-1/2 -top-8 px-1.5 py-0.5 bg-subtle rounded-lg glassb">
                            Серверааааааааааааа блять
                        </span>
                        <div className="grid grid-cols-1 ipad:grid-cols-2 laptop:grid-cols-3 w-full gap-4 mt-4">
                            <div className="bg-subtle glassb p-4 w-auto rounded-xl">
                                <FontAwesomeIcon icon={faServer} size={"2x"}/>
                                <h1>Lobby</h1>
                                <div className="mx-auto flex items-center gap-4 mt-3">
                                    <div
                                        className="aspect-square h-16 rounded-lg glassb relative flex flex-col items-center justify-end p-1">
                                        <div
                                            className="absolute top-0 left-0 w-full h-full rounded-lg z-0 flex flex-col justify-end">
                                            <div
                                                className="rounded-md bg-amber-600 bg-opacity-50 w-full transition-all duration-300"
                                                style={{
                                                    height: `${Math.min((server.cpu / (plan.cpus * 100)) * 100, 100)}%`
                                                }}/>
                                        </div>
                                        <FontAwesomeIcon
                                            className={`z-10 opacity-50 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                        ${((server.cpu / (plan.cpus * 100)) * 100) > 85 ? "text-error opacity-75" : ""}`}
                                            icon={faMicrochip}/>
                                        <p className="text-[10px] -mb-1">{server.cpu}%</p>
                                    </div>
                                    <div
                                        className="aspect-square h-16 rounded-lg glassb relative flex flex-col items-center justify-end p-1">
                                        <FontAwesomeIcon
                                            className={`z-10 opacity-50 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                        ${((server.ram / plan.maxRam) * 100) > 85 ? "text-error opacity-75" : ""}`}
                                            icon={faChartSimple}/>
                                        <div
                                            className="absolute top-0 left-0 w-full h-full rounded-lg z-0 flex flex-col justify-end">
                                            <div
                                                className="rounded-lg bg-success bg-opacity-50 w-full transition-all duration-300"
                                                style={{
                                                    height: `${Math.min((server.ram / plan.maxRam) * 100, 100)}%`
                                                }}/>
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
                            </div>
                            <div className="bg-subtle glassb p-4 w-auto rounded-xl">
                                <FontAwesomeIcon icon={faServer} size={"2x"}/>
                                <h1>Lobby</h1>
                                <div className="mx-auto flex items-center gap-4 mt-3">
                                    <div
                                        className="aspect-square h-16 rounded-lg glassb relative flex flex-col items-center justify-end p-1">
                                        <div
                                            className="absolute top-0 left-0 w-full h-full rounded-lg z-0 flex flex-col justify-end">
                                            <div
                                                className="rounded-lg bg-amber-600 bg-opacity-50 w-full transition-all duration-300"
                                                style={{
                                                    height: `${Math.min((server.cpu / (plan.cpus * 100)) * 100, 100)}%`
                                                }}/>
                                        </div>
                                        <FontAwesomeIcon
                                            className={`z-10 opacity-50 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                        ${((server.cpu / (plan.cpus * 100)) * 100) > 85 ? "text-error opacity-75" : ""}`}
                                            icon={faMicrochip}/>
                                        <p className="text-[10px] -mb-1">{server.cpu}%</p>
                                    </div>
                                    <div
                                        className="aspect-square h-16 rounded-lg glassb relative flex flex-col items-center justify-end p-1">
                                        <FontAwesomeIcon
                                            className={`z-10 opacity-50 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                        ${((server.ram / plan.maxRam) * 100) > 85 ? "text-error opacity-75" : ""}`}
                                            icon={faChartSimple}/>
                                        <div
                                            className="absolute top-0 left-0 w-full h-full rounded-lg z-0 flex flex-col justify-end">
                                            <div
                                                className="rounded-lg bg-success bg-opacity-50 w-full transition-all duration-300"
                                                style={{
                                                    height: `${Math.min((server.ram / plan.maxRam) * 100, 100)}%`
                                                }}/>
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
                            </div>
                            <div className="bg-subtle glassb p-4 w-auto rounded-xl justify-center flex flex-col items-center gap-3 hover:bg-btn transition-all duration-300 cursor-pointer">
                                <FontAwesomeIcon icon={faCirclePlus} size={"2x"}/>
                                <h1 className="text-xl">Заказать</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </PanelContent>
    </>
}

NetworkMC.RequireAuth = true