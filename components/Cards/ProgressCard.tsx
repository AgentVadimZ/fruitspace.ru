import {ReactNode} from "react";


type ProgressCardProps = {
    now: number
    max: number
    color?: boolean
    date?: boolean
    text?: ReactNode
    bottom?: ReactNode
}

export default function ProgressCard(props: ProgressCardProps) {
    let width = Math.max(Math.floor(props.now/props.max*100),0)
    let clr = "#0d6efd"
    if(props.date) {
        width = 100-width
    }
    if (props.color) {
        width>=20 ? clr="var(--success-color)": null
        width>=75 ? clr="rgb(249 115 22)": null
        width>=90 ? clr="#f04747": null
        width>=100 ? clr=`repeating-linear-gradient(
            -45deg,
            var(--error-color),
            var(--error-color) 10px,
            var(--btn-color) 10px,
            var(--btn-color) 15px
    )`:null
    }
    if (props.max===-1) {
        width = 100
        clr = "var(--success-color)"
    }




    return (
        <div className="p-2 laptop:p-4 rounded-xl bg-active glassb h-36 flex flex-col">
            <div className="h-3 rounded-full" style={{backgroundColor: "var(--btn-color)"}}>
                <div className="h-full rounded-full" style={{background: clr, width: width + "%"}}/>
            </div>
            {props.date
                ? <p className="text-gray-300 m-2 text-xl laptop:text-2xl">{props.text}</p>
                : <p className="text-gray-300 m-2 text-3xl flex items-center">
                    {props.now}/{props.max === -1
                    ? <span className="text-3xl laptop:text-5xl">∞</span>
                    : props.max}
                </p>}
            <span className="mt-auto text-sm">{props.bottom}</span>
        </div>
    )
}