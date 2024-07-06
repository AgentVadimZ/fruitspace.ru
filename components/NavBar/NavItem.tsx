import {ReactNode, useState} from "react";
import styles from "./NavItem.module.css"
import React from "react"

type NavItemProps = {
    setOpen?: (v: boolean) => void
    open?: string | boolean
    name?: string
    acetone?: boolean
    profile?: boolean
    square?: boolean
    active?: boolean
    onClick?: () => void

    onMouseEnter?: () => void
    onMouseLeave?: () => void

    icon: ReactNode
    children: ReactNode
}

export default function NavItem(props: NavItemProps) {

    const [uopen, usetOpen] = useState(false);
    const open = props.setOpen? props.open===props.name : uopen;
    const setOpen = props.setOpen? (v)=> {props.setOpen(v?props.name:v)} : usetOpen;
    return (
        <li className="w-[calc(var(--nav-height)*0.8)] flex justify-center items-center">
            <p className={`${props.profile?styles.iconProfileButton:styles.iconButton} ${props.active && styles.active}`}
               style={props.square?{borderRadius:"12px"}:{}} onClick={props.acetone?props.onClick:()=>setOpen(!open)}
               onMouseEnter={props.acetone?()=>setOpen(true):props.onMouseEnter}
               onMouseLeave={props.acetone?()=>setOpen(false):props.onMouseLeave}>
                {props.icon}
            </p>

            {open && props.children}
        </li>
    )
}