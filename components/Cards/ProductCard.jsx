import styles from "./ProductCard.module.css"
import {Button, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import Link from "next/link";



export default function ProductCard(props) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                {props.logo && <img src={props.logo} /> }
                <h1>{props.title}</h1>
            </div>
            <div className={styles.cardContent}>
                <List>
                    {props.children}
                </List>
            </div>
            <Link href={props.link?props.link:"#"}>
                <Button variant="contained" className={styles.cardButton} disabled={props.disabled}>
                    {props.disabled?"Недоступно":props.btnText}
                </Button>
            </Link>
        </div>
    )
}