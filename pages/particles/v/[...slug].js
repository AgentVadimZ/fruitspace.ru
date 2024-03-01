import GlobalHead from "../../../components/GlobalHead";
import GlobalNav from "../../../components/GlobalNav";
import PanelSideNav from "../../../components/PanelSideNav";
import toast, {Toaster} from "react-hot-toast";
import PanelContent from "../../../components/Global/PanelContent";
import useLocale, {useGlobalLocale} from "../../../locales/useLocale";
import useFiberAPI from "../../../fiber/fiber";
import useSWR from "swr";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faClock, faCopy, faDownload} from "@fortawesome/free-solid-svg-icons";
import {Input, Menu} from "antd";
import SettingsIcon from "@/assets/icons/panel_settings.svg";
import Markdown from "react-markdown";

const formatArch = (arch) => {
    switch (arch) {
        case "w64":
            return "Windows x64"
        case "w32":
            return "Windows x86"
        case "l64":
            return "Linux x64"
        case "l32":
            return "Linux x86"
        case "l64a":
            return "Linux arm64"
        case "d64":
            return "macOS x64"
        case "d64a":
            return "macOS arm64"
        default:
            return "Unknown"
    }
}

const formatStat = (num) => {
    if (num<1000) {
        return num
    } else if (num<1000000) {
        return (num/1000).toFixed(1) + "K"
    } else if (num<1000000000) {
        return (num/1000000).toFixed(1) + "M"
    } else {
        return "1B+"
    }
}

const formatMB = (bytes)=>{
    return (bytes/1024/1024).toFixed(1)
}

export default function ParticleView(props) {

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const api = useFiberAPI()

    if (props.router.query.slug.length!==2) {
        props.router.push("/particles")
    }
    const slug = props.router.query.slug

    const {data} = useSWR('particle', ()=>api.particles.get_particle(slug[0],slug[1]))

    const copyValue = (val, msg="Скопировано")=>{
        navigator.clipboard?.writeText(val)
        toast.success(msg, {
            duration: 1000,
            style: {
                color: "white",
                backgroundColor: "var(--btn-color)"
            }
        })
    }


    return data&&<>
        <GlobalHead title={locale.get('nav')}/>
        <GlobalNav/>
        <PanelSideNav/>
        <Toaster/>
        <PanelContent>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                <div className="flex flex-col gap-4">
                    <div className="bg-[var(--subtle-color)] rounded-xl p-4 relative flex flex-col gap-2 relative">
                        <span className="text-xs absolute top-2 left-2 bg-[var(--bkg-color)] rounded-lg px-2 py-0.5">Версии</span>
                        <span className="mt-3 block"></span>
                        <Input className="text-sm text-mono" value={`$ particle pull ${data.author}/${data.name}`}
                               addonAfter={<FontAwesomeIcon className="cursor-pointer hover:text-white" icon={faCopy}
                                                            onClick={()=>copyValue(`particle pull ${data.author}/${data.name}`)} />}/>
                        <Menu mode="inline" className="!rounded-lg !border-none" items={Object.keys(data.branches).map((key)=>({
                                label: <span className="text-mono">{key}</span>,
                                key: key,
                                children: data.branches[key].map((arch) => ({
                                    label: <span className="text-mono flex items-center gap-2">
                                        <SettingsIcon className="h-4"/> {formatArch(arch.arch)}
                                        <span className="text-xs font-normal px-2 py-0.5 rounded-md bg-[var(--active-color)]">{formatMB(arch.size)}MB</span>
                                    </span>,
                                    key: arch.arch,
                                    onClick: () => props.router.push(`/particles/l/${arch.id}`)
                                }))
                            }))} />
                    </div>
                </div>
                <div className="bg-[var(--subtle-color)] rounded-xl p-4 col-span-1 md:col-span-2 xl:col-span-3">
                    <div className="flex items-center gap-4">
                        <AutoAwesomeIcon className="h-12 w-12 fill-amber-300"/>
                        <div className="flex flex-col gap-2">
                            <span className="text-mono text-lg flex items-center gap-2">
                                {data.name}
                                {data.is_official && <span
                                    className="flex items-center gap-1 bg-[var(--success-color)] px-1 py-0.5 rounded-md">
                                        <FontAwesomeIcon className="text-lg" icon={faCircleCheck}/>
                                        <span className="text-xs">Official</span>
                                    </span>}
                            </span>
                            <span className="flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center">
                                <span
                                    className="w-fit text-sm font-normal px-2 py-1 rounded-md bg-[var(--active-color)]">by @{data.author}</span>
                                <span className="flex items-center gap-2">
                                    <span><FontAwesomeIcon icon={faDownload}/> {formatStat(data.downloads)}</span>
                                •
                                <span>
                                    <FontAwesomeIcon
                                        icon={faClock}/> {new Date(data.UpdatedAt).toLocaleDateString("ru-RU")}</span>
                                </span>
                                </span>
                        </div>
                    </div>

                    <Markdown className="px-4">
                        {data.description}
                    </Markdown>

                </div>
            </div>
        </PanelContent>
    </>

}

ParticleView.RequireAuth = true