import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faArrowLeft,
    faArrowRight,
    faCheckCircle,
    faFlag,
    faMicrochip, faMemory, faHardDrive
} from "@fortawesome/free-solid-svg-icons";
import {Button, Segmented} from "antd";
import ProductCardMC from "@/components/Cards/ProductCardMC";


const MinecraftOrderModal = (props: any) => {
    const defaultControls = useState<boolean>(true)
    const [openModal, setOpenModal] = props.modalControls ?? defaultControls
    const [page, setPage] = useState(0)
    const maxPages = 4

    return openModal &&
        <div className="fixed z-[1000] h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center"
             onClick={() => setOpenModal(false)}>
            <div className="w-full ipad:w-4/5 flex flex-col ipad:flex-row gap-8 h-[75%]"
                 onClick={(e) => e.stopPropagation()}>
                <div className="bg-active glassb p-4 rounded-2xl flex-1 flex flex-col">
                    {page == 0 && (
                        <div>
                            <h1 className="text-xl">Создание Minecraft сервера</h1>

                        </div>
                    )}
                    <div className="mt-auto flex items-center justify-end gap-8">
                        <div className="flex justify-center items-center gap-2 flex-1">
                            <FontAwesomeIcon icon={faFlag}/>
                            {Array.from({length: maxPages}, (_, i) => i).map((i,v)=>{
                                return <div key={i} className={`rounded-full h-2 w-16 ${i<=page?"bg-success":"bg-btn"}`} />
                            })}
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </div>
                        <Button size="large" type="text" disabled={page === 0} onClick={() => setPage(page - 1)} icon={<FontAwesomeIcon icon={faArrowLeft}/>}>Назад</Button>
                        <Button size="large" type="primary" iconPosition="end" disabled={page===maxPages-1} onClick={() => setPage(page + 1)} icon={<FontAwesomeIcon icon={faArrowRight}/>}>Вперед</Button>
                    </div>
                </div>
                <div className="bg-active glassb p-4 rounded-2xl w-72">
                    <h1 className="text-2xl mb-4">Мы вас грабим</h1>
                    <div>
                        <h1>
                            Horizon
                        </h1>
                        <p className="text-right">
                            2599₽/мес
                        </p>
                        <hr className="border-1 glassb mt-1 mb-1"/>
                    </div>

                </div>
            </div>
        </div>
}

export default MinecraftOrderModal


// fifoid

export function ProductOrder({closeModal}: { closeModal: () => void }) {
    const [tab, setTab] = useState("dynamic")
    return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-24 z-10">
        <div className="bg-active glassb p-8 rounded-2xl relative w-full h-full p-4">
            <h1 className="text-2xl">Создание нового Minecraft сервера</h1>
            <div className="flex justify-center mt-2">
                <Segmented rootClassName="bg-btn select-none glassb" options={[
                    {value: "dynamic", label: "Динамические"},
                    {value: "static", label: "Статические"}
                ]} defaultValue={tab} onChange={setTab}/>

            </div>
            {tab === "dynamic" &&
                <div className="flex justify-center mt-2">

                </div>
            }
            {tab === "static" &&
                <div>

                </div>
            }
            <button onClick={closeModal} className="absolute right-3 top-2">
                <FontAwesomeIcon icon={faXmark}/>
            </button>
        </div>
    </div>
}

const corePrint = (n) => {
    n%=10
    if (n==1) return "ядро"
    if (n<1 || 1<n && n<5) return "ядра"
    return "ядер"
}


const tariffs = {}
tariffs.dynamic = [
    {
        title: "Slingshot",
        about: "Для Bungeecord и мини-лобби",
        id: "Lite",
        price: 149,
        cpus: 0.25,
        minRam: 0.5,
        maxRam: 2,
        ssd: 5
    },
    {
        title: "Next ⋙",
        about: "Мы знаем, что вы выберите его",
        id: "D-1 S",
        price: 349,
        cpus: 1,
        minRam: 2,
        maxRam: 4,
        ssd: 20
    },
    {
        title: "Reforged",
        about: "Выкован для новых версий",
        id: "D-2 M",
        price: 699,
        cpus: 2,
        minRam: 4,
        maxRam: 8,
        ssd: 30
    },
    {
        title: "EverPeak",
        about: "Для высоких амбиций — высокие требования",
        id: "D-3 L",
        price: 1299,
        cpus: 3,
        minRam: 8,
        maxRam: 12,
        ssd: 45
    },
    {
        title: "Orbital",
        about: "Для публичных серверов с непостоянной нагрузкой",
        id: "D-4 XL",
        price: 1699,
        cpus: 4,
        minRam: 8,
        maxRam: 16,
        ssd: 60
    },
    {
        title: "Horizon",
        about: "Превосходный выбор.",
        id: "D-5 XXL",
        price: 2599,
        cpus: 5,
        minRam: 16,
        maxRam: 24,
        ssd: 100
    },
]
