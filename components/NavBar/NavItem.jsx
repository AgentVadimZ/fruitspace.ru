import {useState} from "react";
import styles from "./NavItem.module.css"
import React from "react"


const NavItem = React.forwardRef((props,ref)=>{
    const [open, setOpen] = useState(false);
    return (
        <li className={styles.navItem}>
            <p className={`${props.profile?styles.iconProfileButton:styles.iconButton} ${props.active && styles.active}`}
               style={props.square?{borderRadius:"12px"}:{}} onClick={props.acetone?props.onClick:()=>setOpen(!open)} ref={ref}>
                {props.icon}
            </p>

            {open && props.children}
        </li>
    )
})

export default NavItem;