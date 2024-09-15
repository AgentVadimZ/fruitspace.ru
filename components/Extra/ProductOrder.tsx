import React, {ReactNode, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faArrowLeft,
    faArrowRight,
    faCheckCircle,
    faFlag,
    faMicrochip, faMemory, faHardDrive
} from "@fortawesome/free-solid-svg-icons";
import {Button, Segmented, Select} from "antd";
import ProductCardMC from "@/components/Cards/ProductCardMC";
import useFiberAPI, {api} from "@/fiber/fiber";


const MinecraftOrderModal = (props: any) => {
    const defaultControls = useState<boolean>(true)
    const [openModal, setOpenModal] = props.modalControls ?? defaultControls
    const [page, setPage] = useState(0)
    const api = useFiberAPI()

    const [config, setConfig] = useState<any>({})


    const maxPages = 4
    const pageNames = ["Выбор тарифа", "2", "3", "4"]

    return openModal &&
        <div className="fixed z-[1000] h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center"
             onClick={() => setOpenModal(false)}>
            <div className="w-full ipad:w-5/6 flex flex-col ipad:flex-row gap-8 h-[75vh]"
                 onClick={(e) => e.stopPropagation()}>
                <div className="bg-active glassb p-4 rounded-2xl flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-1">
                        <p className="text-2xl">Создание Minecraft сервера</p>
                        <p>{pageNames[page]}</p>
                    </div>
                    {page === 0 && <PageServerConfigView api={api}/>}
                    <div className="mt-auto flex items-center justify-end gap-8">
                        <div className="flex justify-center items-center gap-2 flex-1">
                            <FontAwesomeIcon icon={faFlag}/>
                            {Array.from({length: maxPages}, (_, i) => i).map((i, v) => {
                                return <div key={i}
                                            className={`rounded-full h-2 w-16 ${i <= page ? "bg-success" : "bg-btn"}`}/>
                            })}
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </div>
                        <Button size="large" type="text" disabled={page === 0} onClick={() => setPage(page - 1)}
                                icon={<FontAwesomeIcon icon={faArrowLeft}/>}>Назад</Button>
                        <Button size="large" type="primary" iconPosition="end" disabled={page === maxPages - 1}
                                onClick={() => setPage(page + 1)}
                                icon={<FontAwesomeIcon icon={faArrowRight}/>}>Вперед</Button>
                    </div>
                </div>
                <div className="bg-active glassb p-4 rounded-2xl w-72">
                    <div className="flex items-center gap-4">
                        <p className="text-2xl">Мы вас грабим</p>
                        <p className="rounded px-1.5 py-0.5 flex items-center gap-2 bg-subtle text-sm w-fit">
                            <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                            </span> Live
                        </p>
                    </div>

                </div>
            </div>
        </div>
}

export default MinecraftOrderModal


type APITariffData = {
    name: string,
    is_dynamic: boolean,
    short: string,
    description: string,
    cpu: number,
    min_ram_mb: number,
    max_ram_mb: number,
    disk_gb: number,
}

type APIPricingData = {
    id: number
    tariff: APITariffData
    price: number
}


const TariffCard = (props: APIPricingData) => {
    return <div className="w-full bg-subtle">
        <h1 className="transtext bg-gradient-to-t from-red-300 to-blue-500 font-[Coolvetica] text-4xl text-transparent bg-clip-text text-white">{name}</h1>
    </div>
}

// ----------

type PageServerConfigViewProps = {
    api: api
}

type APIRegionData = {
    id: number
    name: string
    location: string
    description: string
}

const PageServerConfigView = ({api}: PageServerConfigViewProps) => {
    const [regions, setRegions] = useState([])
    const [region, setRegion] = useState<{data: APIRegionData, value: string}>()
    const [tariffs, setTariffs] = useState([])


    useEffect(()=> {
        api.fetch.minecraftGetRegions().then(r => {
            setRegions(r?.regions||[])
            setRegion({data: r.regions[0], value: r.regions[0].name})
        })
    }, [null])

    useEffect(() => {
        region.data&&api.fetch.minecraftGetPricing(region.data.id).then(r=>setTariffs(r.tariffs))
    }, [region?.data]);

    const regionRenderer = (props: any) => {
        const data: APIRegionData = props.data?.data || region.data
        const gen = data.name?.split("/").pop()
        return <p className="flex items-center gap-2">
            <img src={`https://flagcdn.com/w40/${data.name.split(".")[0]}.png`} className="h-3" />
            <span>{data.location}</span>
            <span className="bg-btn rounded px-1.5 py-0.5 text-xs">{gen[0].toUpperCase()+gen.slice(1)}</span>
        </p>
    }


    return <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-col gap-1">
            <p className="ml-2 text-lg">Регион</p>
            <Select value={region} onChange={(_, v) => setRegion(v)} className="w-64"
                    options={regions.map(k => ({data: k, value: k.name}))}
                    optionRender={regionRenderer} labelRender={regionRenderer}/>
        </div>
        <TariffCard name={"Slingshot"} cpu="0.25" fromRam={undefined} toRam={} disk={undefined} cost={undefined}/>
    </div>
}

