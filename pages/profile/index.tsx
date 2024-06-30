import GlobalNav from "@/components/GlobalNav";
import PanelSideNav from "@/components/PanelSideNav";
import GlobalHead from "@/components/GlobalHead";
import useEffectOnce from "@/components/Hooks";
import toast, {Toaster} from "react-hot-toast";
import PanelContent from "@/components/Global/PanelContent";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faChevronRight, faMessage, faRefresh, faShop, faWallet} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {Modal} from "antd";
import {Notification} from "@/fiber/fiber.model";


export default function Index(props: any){

    const api = useFiberAPI()

    const [user,setUser] = api.user.useUser()

    const [notifications, setNotifications] = useState<Notification[]>([])

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)


    const [viewPost, setViewPost] = useState<Notification|boolean|any>(false)

    const prettyPrint = (num: number) => new Intl.NumberFormat(user.usd ? 'en-US' : 'ru-RU',
        {style: 'currency', currency: user.usd ? "USD" : "RUB"}).format(num).replace(/[.|,]00/g, '')


    const getNotifications = ()=>{
        api.user.getNotifications().then((res)=>{
            setNotifications(res.notifications||[])
        })
    }

    useEffect(() => {
        getNotifications()
    }, [user]);

    useEffectOnce(()=>{
        toast.dismiss()
    })

    return <>
        <GlobalHead title={locale.get('nav')}/>
        <GlobalNav />
        <PanelSideNav />
        <Toaster/>
        <PanelContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full lg:w-3/4 mx-auto">
                <div className="glassb bg-active rounded-2xl p-4 flex flex-col gap-4">
                    <div className="flex justify-between gap-4 items-center">
                        <p className="glassb rounded-lg w-fit px-1.5 py-0.5">Это я 😺</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <img src={user.profile_pic} className="w-20 h-20 rounded-xl" />
                        <div className="flex flex-col gap-2">
                            <p className="font-mono text-lg">@{user.uname}</p>
                            <div className="glassb rounded-xl p-2 flex">
                                <span className="flex items-center gap-2 px-1.5 py-1 border-r-[1px]
                                    border-white border-opacity-25 flex-1">
                                            <FontAwesomeIcon icon={faWallet}/>
                                            <span className="text-sm">{prettyPrint(user.balance)}</span>
                                        </span>
                                <span className="flex items-center gap-2 px-1.5 py-1 flex-1">
                                            <FontAwesomeIcon icon={faShop}/>
                                            <span className="text-sm">{prettyPrint(user.shop_balance)}</span>
                                        </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="glassb bg-active rounded-2xl p-4 flex flex-col gap-4">
                    <div className="flex justify-between gap-4 items-center">
                        <p className="glassb rounded-lg w-fit px-1.5 py-0.5">Уведомления</p>
                        <FontAwesomeIcon onClick={getNotifications} icon={faRefresh}
                                         className="p-2 rounded-lg cursor-pointer hover:bg-btn"/>
                    </div>
                    <div className="flex flex-col">
                        {notifications && notifications.length > 0
                            ? notifications.map((post, i) => (
                                <div key={i} className="select-none border-1 border-transparent hover:border-white hover:border-opacity-25
                             hover:cursor-pointer relative flex gap-4 items-center p-4 rounded-lg overflow-x-hidden"
                            onClick={()=>setViewPost(post)}>
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xs gray-300">
                                    {dayjs(post.send_date).format("DD.MM.YYYY HH:mm")}
                                </span>
                                <FontAwesomeIcon className={post.user_read?"text-gray-5 00":"text-white"} icon={post.target_uid===0?faBell:faMessage} />
                                <div>
                                    <p className="text-sm text-ellipsis overflow-hidden text-nowrap w-72">{post.title}</p>
                                    <p className="text-xs text-gray-300 mt-1.5 line-clamp-2">{post.text}</p>
                                </div>
                                <FontAwesomeIcon className="ml-auto" icon={faChevronRight} />
                            </div>
                        ))
                        : <p className="mx-auto my-4 text-gray-300">Новых уведомлений нет</p>}
                    </div>
                </div>
            </div>
        </PanelContent>
        <Modal open={viewPost} title={viewPost?.title} onCancel={()=>setViewPost(false)}
        footer={null}>
            <div className="flex flex-col gap-4">
                {viewPost.img && <img src={viewPost.img} className="w-full rounded-lg"/>}
                <div className="flex justify-between items-center">
                    <p className="text-gray-300 text-xs px-2 py-1 rounded-full glassb">
                        {viewPost.send_date && dayjs(viewPost.send_date).format("DD.MM.YYYY HH:mm")}
                    </p>
                    <p className="text-gray-300 text-sm">
                        {viewPost.target_uid===0?"Уведомление":"Сообщение"}
                    </p>
                </div>
                <p className="w-3/4 h-[1px] bg-white bg-opacity-25 mx-auto" />
                <p className="whitespace-pre text-wrap text-sm text-gray-300">{viewPost.text}</p>
            </div>
        </Modal>
    </>;
}

Index.RequireAuth = true