import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import useFiberAPI from "@/fiber/fiber.ts";
import {useEffect, useState} from "react";
import ServerTopItem from "@/components/Cards/ServerTopItem";
import Footer from "@/components/Global/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faMedal, faServer, faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function GD(props) {
    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const [servers, setServers] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)

    const api = useFiberAPI()
    const ParseDesc = localeGlobal.get('funcLvlPlayerServer')

    const fetchMore = () => {
        if (loading) return
        setLoading(true)
        api.fetch.gdpsTop(page).then(res => {
            setServers([...servers, ...res.servers])
            setPage(page + 10)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchMore()
    }, [])

    return (
        <>
            <GlobalHead title={`${locale.get("top_servers")} - ${localeGlobal.get('navName')}`}/>
            <GlobalNav router={props.router} mainpage />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 text-5xl" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
                        {locale.get("top_servers")}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        {locale.get("top_text")[0]} <br/>
                        {locale.get("top_text")[1]}
                    </p>
                </div>
                
                {/* Server List */}
                <div className="bg-active rounded-2xl p-6 shadow-xl mb-8">
                    <div className="flex items-center mb-6">
                        <FontAwesomeIcon icon={faServer} className="text-blue-500 text-xl mr-3" />
                        <h2 className="text-2xl font-semibold">GDPS Серверы</h2>
                    </div>
                    
                    <div className="space-y-4">
                        {servers.map((val, i) => (
                            <ServerTopItem 
                                key={i} 
                                place={i} 
                                type="gdps" 
                                name={val.srv_name} 
                                router={props.router}
                                desc={ParseDesc(val.user_count, val.level_count)} 
                                uuid={val.srvid} 
                                icon={val.icon} 
                            />
                        ))}
                    </div>
                    
                    <button 
                        onClick={fetchMore}
                        disabled={loading}
                        className="w-full mt-6 py-3 px-4 bg-btn hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <FontAwesomeIcon icon={faArrowDown} className="mr-2" />
                                {localeGlobal.get('loadmore')}
                            </span>
                        )}
                    </button>
                </div>
                
                <div className="text-center text-sm text-gray-400 max-w-3xl mx-auto">
                    <p>{locale.get("top_note")[0]}</p>
                    <p>{locale.get("top_note")[1]}</p>
                </div>
            </div>
            
            <Footer router={props.router}/>
        </>
    )
}
