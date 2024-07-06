import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {createContext, ReactNode, Ref, useState} from "react";

const SideBarContext = createContext(null)

type SideBarProps = {
    children: ReactNode
    sref: Ref<any>
}

export default function SideBar(props: SideBarProps) {

    const [isOpen, setOpen] = useState(false)

    return (
        <div ref={props.sref} className={`flex flex-col items-start h-[calc(100%-var(--nav-height))] fixed top-[var(--nav-height)]
        transition-all duration-300 left-0 z-50 bg-active ${isOpen?"w-48":"w-[var(--nav-height)]"}`}>
            <SideBarContext.Provider value={isOpen}>
                {props.children}
            </SideBarContext.Provider>
            <li className={`h-[calc(var(--nav-height)*2/3)] mt-auto mb-2 ml-[calc(var(--nav-height)*1/6)] overflow-hidden
            hover:bg-btn cursor-pointer transition-all duration-150 rounded-xl flex select-none
            items-center ${!isOpen&&"bg-subtle"} ${isOpen?"w-[calc(100%-var(--nav-height)*1/3)]":"w-[calc(var(--nav-height)*2/3)]"}`}
            onClick={()=>setOpen(!isOpen)}>
                <span className="flex aspect-square h-full justify-center items-center">
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <span className="">Свернуть</span>
            </li>
        </div>
    )
}

export {SideBarContext}