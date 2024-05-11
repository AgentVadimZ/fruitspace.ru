import styles from './DropDown.module.css'

export function DropdownMenu(props) {
    return (
        <div className={`${props.centered?styles.dropdownCentered:styles.dropdown} flex flex-col gap-2`}>
            {props.children}
        </div>
    )
}


export function DropdownItem(props) {
    return (
        <p className={styles.menuItem} onClick={props.onClick}>
            <span className={styles.iconButton}>{props.leftIcon}</span>
            {props.children}
            <span className={styles.iconRight}>{props.rightIcon}</span>
        </p>
    )
}
