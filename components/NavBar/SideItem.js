import {useContext} from "react";
import {SideBarContext} from "./SideBar";
import React from "react"


const SideItem = React.forwardRef((props,ref)=> {

    const isOpen = useContext(SideBarContext)

    return <li className={`h-[calc(var(--nav-height)*2/3)] mt-3 ml-[calc(var(--nav-height)*1/6)] overflow-hidden
            cursor-pointer transition-all duration-150 rounded-xl flex select-none
            items-center ${props.active? "bg-[var(--primary-color)]":"bg-subtle hover:bg-btn"} 
            ${isOpen ? "w-[calc(100%-var(--nav-height)*1/3)]" : "w-[calc(var(--nav-height)*2/3)]"} text-gray-300`}
    onClick={props.onClick}>
                <span className="flex aspect-square h-full justify-center items-center">
                    {props.icon}
                </span>
        <span className="whitespace-nowrap ml-0.5">{props.text}</span>
    </li>
})

SideItem.displayName = 'SideItem'

export default SideItem;