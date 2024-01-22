import {Button, List} from "@mui/material";
import Link from "next/link";



export default function ProductCardGD(props) {
    return (
        <div className="bg-[var(--active-color)] glassb rounded-xl flex mx-auto flex-col xl:m-0 w-80">
        <div className="flex items-center justify-center text-white">
            {props.logo && <img className="w-16 mx-2" alt="prod.logo" src={props.logo} /> }
            <h1>{props.title}</h1>
        </div>
        <div className="text-[#cacad0] rounded-lg m-2">
            <List>
                {props.children}
            </List>
        </div>
        <Link href={props.link?("/product/"+props.link):"#"} legacyBehavior>
            <Button variant="contained" className="m-2 mt-auto rounded-lg bg-[#0d6efd] h-12 disabled:!text-gray-500" disabled={props.disabled}>
                {props.btnText}
            </Button>
        </Link>
        {props.btnTopText && <Link href={props.link?("/top/"+props.link):"#"} legacyBehavior>
            <Button variant="contained" className="m-2 mt-auto rounded-lg bg-[#0d6efd] h-12 disabled:!text-gray-500" disabled={props.disabled} style={{marginTop:"0"}}>
                {props.btnTopText}
            </Button>
        </Link>}
    </div>
    ); 
}