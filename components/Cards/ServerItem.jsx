import GDLogo from '../assets/logos/geometrydash.png'
import MCLogo from '../assets/logos/minecraft.png'
import CSLogo from '../assets/logos/counterstrike.png'
import QuestionMark from '../assets/icons/cross.png'
import RightSvg from "../assets/icons/right.svg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from "next/link";
import {useGlobalLocale} from "../../locales/useLocale";


export default function ServerItem(props) {

    const localeGlobal = useGlobalLocale(props.router)

    const Types = {
        "gd": GDLogo.src,
        "mc": MCLogo.src,
        "cs": CSLogo.src
    }
    return props.add?(
        <Link href={"/product/order/"+props.type} legacyBehavior>
            <div className="bg-[var(--active-color)] rounded-xl p-3 flex items-center cursor-pointer hover:bg-[var(--btn-color)]">
                <AddCircleIcon className="h-12 w-12 ml-2"/>
                <h3 className="mx-auto my-0">{localeGlobal.get('create')}</h3>
            </div>
        </Link>
    ):(
        <Link href={"/manage/"+props.type+"/"+props.uuid} legacyBehavior>
            <div className="bg-[var(--active-color)] rounded-xl p-2 flex items-center cursor-pointer hover:bg-[var(--btn-color)] mb-2">
                <img className="mr-4 w-16 h-16 rounded-lg bg-[var(--btn-color)]" src={props.icon?props.icon:(Types[props.type]||QuestionMark.src)} />
                <div className="flex flex-1 flex-col justify-center">
                    <h3 className="m-1">{props.name}</h3>
                    <p className="mx-4 my-1 flex items-center gap-1"><b>{props.plan}</b> → {props.desc}</p>
                </div>
                <RightSvg className="w-8"/>
            </div>
        </Link>
    );
}