import Link from "next/link";
import {Button} from "antd"
import {ReactNode} from "react";

type ProductCardMCProps = {
    id: string|number
    logo: string
    title: string
    about: string
    children?: ReactNode
    link?: string
    disabled?: boolean
    btnText: string
    btnTopText?: string
}

export default function ProductCardMC(props: ProductCardMCProps) {
    return (
        <div
            className="p-4 bg-active glassb rounded-2xl flex items-center flex-col mx-auto gap-4 min-h-80 desktop:m-0 w-80 relative">
            <p className="absolute top-4 right-4 my-0 ml-2 px-1.5 py-0.5 rounded-md bg-btn text-gray-300 text-xs">{props.id}</p>
            <div className="flex items-center justify-center text-white">
                {props.logo && <img className="w-16 mx-2" alt="prod.logo" src={props.logo}/>}
                <h1 className="transtext bg-gradient-to-t from-red-300 to-blue-500 font-[Coolvetica] text-4xl text-transparent bg-clip-text text-white">{props.title}</h1>
            </div>
            <span className="text-sm text-center">{props.about}</span>
            <div className="flex flex-col gap-4 p-4">
                {props.children}
            </div>
            <Link href={props.link ? ("/product/" + props.link) : "#"} legacyBehavior>
                <Button type="primary" size="large" className="w-full mt-auto" disabled={props.disabled}>
                    {props.btnText}
                </Button>
            </Link>
            {props.btnTopText && <Link href={props.link ? ("/top/" + props.link) : "#"} legacyBehavior>
                <Button type="primary" size="large" className="w-full mt-auto " disabled={props.disabled}>
                    {props.btnTopText}
                </Button>
            </Link>}
        </div>
    );
}