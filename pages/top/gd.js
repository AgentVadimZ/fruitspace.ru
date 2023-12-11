import useLocale, {useGlobalLocale} from "../../locales/useLocale";
import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from '../../components/Cards/ServerItem.module.css'
import {Tab, TabPanel, TabsList} from "../../components/Global/Tab";
import useFiberAPI from "../../fiber/fiber";
import {useEffect, useState} from "react";
import ServerTopItem from "../../components/Cards/ServerTopItem";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import PanelContent from "../../components/Global/PanelContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Footer from "../../components/Global/Footer";

export default function GD(props) {
    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const [servers, setServers] = useState([])
    const [page, setPage] = useState(0)

    const api = useFiberAPI()
    const ParseDesc = localeGlobal.get('funcLvlPlayerServer')

    const fetchMore =()=> {
        api.fetch.gdpsTop(page).then(res=>{
            setServers([...servers, ...res.servers])
            setPage(page+10)
        })
    }

    useEffect(()=>{
        fetchMore()
    }, [])

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav router={props.router}/>
            <PanelContent nocorner>
                <div className={"serversWindow"}>
                    <h1>{locale.get("top_servers")}</h1>
                    <p className="text-center text-lg">{locale.get("top_text")[0]} <br/>
                        {locale.get("top_text")[1]}</p>
                </div>
                <TabsUnstyled value="gdps" className={"serversWindow"}>
                    <TabsList>
                        <Tab value="gdps">GDPS</Tab>
                    </TabsList>
                    <TabPanel value="gdps">
                        {servers.map((val, i)=>(
                            <ServerTopItem key={i} place={i} type="gdps" name={val.srv_name} router={props.router}
                                           desc={ParseDesc(val.user_count, val.level_count)} uuid={val.srvid} icon={val.icon} />
                        ))}
                        <div className="bg-[var(--active-color)] rounded-xl p-3 flex items-center cursor-pointer hover:bg-[var(--btn-color)]" onClick={()=>fetchMore()}>
                            <AddCircleIcon className="h-12 w-12 ml-2"/>
                            <h3 className="mx-auto my-0">{localeGlobal.get('loadmore')}</h3>
                        </div>
                    </TabPanel>
                </TabsUnstyled>

                <p className="text-xs text-gray-400 mt-2">{locale.get("top_note")[0]}<br/>
                    {locale.get("top_note")[1]}</p>
            </PanelContent>
            <Footer router={props.router}/>
        </>
    )
}
