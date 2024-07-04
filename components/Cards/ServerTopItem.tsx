import GDLogo from '@/assets/logos/geometrydash.png'
import MCLogo from '@/assets/logos/minecraft.png'
import GTALogo from '@/assets/logos/rockstargames.png'
import QuestionMark from '@/assets/icons/cross.png'
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCrown, faDownload} from "@fortawesome/free-solid-svg-icons";

type ServerTopItemProps = {
    place: number
    name: string
    desc: string
    type: "gd" | "mc" | "gta"
    uuid: string
    icon?: string
}

export default function ServerTopItem(props: ServerTopItemProps) {

    const Types = {
        "gd": GDLogo.src,
        "mc": MCLogo.src,
        "gta": GTALogo.src
    }
    const colors = [
        "#d4af37",
        "#aaa9ad",
        "#cd7f32",
        "#8e388e",
        "#5a00ff"
    ]
    const color = props.place<5?colors[props.place]:"#0d63fd"

    return (
        <div className="bg-active rounded-xl p-2 flex items-center cursor-pointer hover:bg-btn mb-2">
            <img className="mr-4 w-16 h-16 rounded-lg bg-btn" src={props.icon?props.icon:(Types[props.type]||QuestionMark.src)} />
            <div className="flex flex-1 flex-col justify-center">
                <h3 className="m-1">
                        <span className={`inline-flex justify-center items-center rounded-full h-6 min-w-[1rem] px-1`} style={{backgroundColor:color}}
                        >{props.place+1}</span> {props.name} {props.place==0&&<FontAwesomeIcon icon={faCrown} color={colors[0]} />}
                </h3>
                <p className="mx-4 my-1">{props.desc}</p>
            </div>
            {(props.place<5&&<Link href={`https://gofruit.space/${props.type}/${props.uuid}`} legacyBehavior>
                <FontAwesomeIcon icon={faDownload} className="!w-6 !h-6 p-2 rounded-lg bg-[#0d6efd] hover:bg-blue-700"/>
            </Link>)}
        </div>
    );
}