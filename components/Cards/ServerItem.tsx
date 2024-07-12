import GDLogo from '@/assets/logos/geometrydash.png'
import MCLogo from '@/assets/logos/minecraft.png'
import CSLogo from '@/assets/logos/counterstrike.png'
import QuestionMark from '@/assets/icons/cross.png'
import RightSvg from "@/assets/icons/right.svg";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from "next/link";
import {useGlobalLocale} from "@/locales/useLocale";
import {NextRouter} from "next/router";


type ServerItemProps = {
    router: NextRouter
    add?: boolean
    type: "gd" | "mc" | "cs"
    name: string
    desc: string
    plan: string
    icon?: string
    uuid: string
}

export default function ServerItem(props: ServerItemProps) {

    const localeGlobal = useGlobalLocale(props.router)

    const Types = {
        "gd": GDLogo.src,
        "mc": MCLogo.src,
        "cs": CSLogo.src,

    }
    return props.add?(
        <Link href={"/product/order/"+props.type} legacyBehavior>
            <div className="bg-active rounded-xl p-3 flex items-center cursor-pointer hover:bg-[var(--btn-color)]">
                <AddCircleIcon className="h-12 w-12 ml-2"/>
                <h3 className="mx-auto my-0 text-lg">{localeGlobal.get('create')}</h3>
            </div>
        </Link>
    ):(
        <Link href={"/manage/"+props.type+"/"+props.uuid} legacyBehavior>
            <div className="bg-active rounded-lg p-2 flex items-center cursor-pointer hover:bg-btn mb-2">
                <img className="mr-4 w-16 h-16 rounded-lg bg-subtle glassb" src={props.icon?props.icon:(Types[props.type]||QuestionMark.src)} />
                <div className="flex flex-1 flex-col justify-center">
                    <h3 className="m-1 text-lg text-white">{props.name}</h3>
                    <p className="mx-4 my-1 flex items-center gap-1 text-gray-300"><b>{props.plan}</b> → {props.desc}</p>
                </div>
                <RightSvg className="w-8"/>
            </div>
        </Link>
    );
}