import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Segmented} from "antd";

const useOrderModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);


    return {
        openModal,
        closeModal,
        Modal: isOpen ? <ProductOrder closeModal={closeModal} /> : null,
    };
};

export function ProductOrder({ closeModal }: { closeModal: () => void }) {
    const [tab, setTab] = useState("dynamic")
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-24">
            <div className="bg-active glassb p-8 rounded-lg relative w-full h-full">
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
                <button onClick={closeModal} className="absolute right-1.5 top-1">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>,
        document.body
    );
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

tariffs.static = [
    {
        title: "Air",
        id: "S-1 S+",
        price: 550,
        cpus: 1,
        maxRam: 4,
        ssd: 30
    },
    {
        title: "Viper",
        id: "S-2 M+",
        price: 1000,
        cpus: 2,
        maxRam: 8,
        ssd: 40
    },
    {
        title: "Carbon",
        id: "S-3 L+",
        price: 1500,
        cpus: 3,
        maxRam: 12,
        ssd: 60
    },
    {
        title: "Proton",
        id: "S-4 XL+",
        price: 2300,
        cpus: 4,
        maxRam: 16,
        ssd: 80
    },
    {
        title: "Warp",
        id: "S-5 XXL+",
        price: 3200,
        cpus: 5,
        maxRam: 24,
        ssd: 120
    },
]
const corePrint = (n) => {
    n%=10
    if (n==1) return "ядро"
    if (n<1 || 1<n && n<5) return "ядра"
    return "ядер"
}

export default useOrderModal;
