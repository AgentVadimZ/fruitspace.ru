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
        "gdps": GDLogo.src,
        "mc": MCLogo.src,
        "gta": GTALogo.src
    }
    const colors = [
        "#d4af37", // Gold - 1st place
        "#aaa9ad", // Silver - 2nd place
        "#cd7f32", // Bronze - 3rd place
        "#8e388e", // Purple - 4th place
        "#5a00ff"  // Blue/Purple - 5th place
    ]
    const color = props.place<5?colors[props.place]:"#0d63fd"
    
    // Badge styles based on position
    const getBadgeStyle = () => {
        if (props.place === 0) return "bg-yellow-500 text-yellow-900 border-yellow-300 shadow-yellow-400/20";
        if (props.place === 1) return "bg-gray-300 text-gray-700 border-gray-200 shadow-gray-400/20";
        if (props.place === 2) return "bg-amber-600 text-amber-100 border-amber-500 shadow-amber-400/20";
        return "bg-blue-600 text-white border-blue-500 shadow-blue-400/20";
    }

    return (
        <div className="bg-active hover:bg-opacity-80 rounded-xl p-4 flex items-center transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/10 border border-subtle hover:border-blue-700/30">
            <div className="relative">
                {props.place < 3 && (
                    <div className="absolute -top-2 -left-2 w-6 h-6 flex items-center justify-center rounded-full bg-opacity-90 z-10 shadow-md" style={{backgroundColor: colors[props.place]}}>
                        <FontAwesomeIcon icon={faCrown} className="text-xs text-white" />
                    </div>
                )}
                <img 
                    className="mr-4 w-16 h-16 rounded-lg object-cover border border-subtle" 
                    src={props.icon ? props.icon : (Types[props.type] || QuestionMark.src)} 
                    alt={props.name}
                />
            </div>
            
            <div className="flex-1 ml-2">
                <div className="flex items-center mb-1">
                    <span className={`inline-flex justify-center items-center rounded-full h-6 min-w-[1.5rem] px-2 mr-2 text-sm font-medium border ${getBadgeStyle()}`}>
                        {props.place + 1}
                    </span>
                    <h3 className="font-semibold text-lg">{props.name}</h3>
                </div>
                <p className="text-gray-300 text-sm">{props.desc}</p>
            </div>
            
            <Link 
                href={`https://gofruit.space/${props.type}/${props.uuid}`} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center"
            >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                <span>Download</span>
            </Link>
        </div>
    );
}