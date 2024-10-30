import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import PanelSideNav from "@/components/PanelSideNav";
import PanelContent from "@/components/Global/PanelContent";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import {Input, Form, Menu, Button, Select, Checkbox, List, Modal, Pagination} from "antd";
import {faCircleCheck, faClock, faCopy, faDownload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import toast, {Toaster} from "react-hot-toast";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SettingsIcon from "@/assets/icons/panel_settings.svg"
import Link from "next/link";
import useFiberAPI from "@/fiber/fiber.ts";
import {useEffect, useState} from "react";
import useSWR, {mutate} from "swr";
import {ProfileMobileNav} from "@/components/PanelMobileNav";

const formatMB = (bytes)=>{
    return (bytes/1024/1024).toFixed(1)
}

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

const arches = ["w64", "w32", "l64", "l32", "l64a", "d64", "d64a"]

export default function Particles(props) {

    const [isLoading, setLoading] = useState(props.globalLoader)
    const [page, setPage] = useState(1)
    const [form] = Form.useForm()

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const [particles, setParticles] = useState({particles:[], pages:0})
    const api = useFiberAPI()

    const {data:user, error} = useSWR("puser", ()=>api.particles.get_user())

    const {data:cli_version} = useSWR("https://s3.m41den.com/particle_releases/ver", (url)=>fetch(url).then(r=>r.text()))

    const downloadCLI = ({arch}) => {
        if (arch[0]==="w")
            arch+=".exe"
        window?.open(`https://s3.m41den.com/particle_releases/particle-${arch}`,"_blank")
    }

    const searchParticles = async (d, page=1) => {
        setLoading(true)
        api.particles.search({...d, page: page}).then(res=>{
            setLoading(false)
            if (res.status!=="ok") {
                toast.error(res.message, {
                    duration: 1000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
                return
            }
            setParticles(res)
            setPage(page)
        })
    }

    useEffect(() => {
        searchParticles({})
    }, []);

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

    return <>
        <GlobalHead title={locale.get('nav')}/>
        <GlobalNav />
        <PanelSideNav />
        <ProfileMobileNav />
        <Toaster />
        <PanelContent>
            <div className="grid grid-cols-1 ipad:grid-cols-3 desktop:grid-cols-4 gap-4 w-full">
                <div className="flex flex-col gap-4">
                    <div className="bg-[var(--subtle-color)] rounded-xl p-4 relative flex flex-col gap-2">
                        <span className="text-xs absolute top-2 left-2 bg-[var(--bkg-color)] rounded-lg px-2 py-0.5">Пользователь</span>
                        <span className="mt-3 block"></span>
                        <Form labelCol={{span: 8}} wrapperCol={{span: ''}} className="flex flex-col gap-2">
                            <Form.Item label="Аккаунт" className="mb-0">
                                <Input disabled value={user?.username} className="border-0" />
                            </Form.Item>
                            <Form.Item label="Токен" className="mb-0">
                                <Input.Password value={user?.token} className="!cursor-default"
                                addonAfter={<FontAwesomeIcon className="cursor-pointer hover:text-white" icon={faCopy}
                                        onClick={()=>copyValue(user?.token,"Токен скопирован")} />} />
                            </Form.Item>
                            <Form.Item label="Исп. место" className="mb-0">
                                <Input disabled value={`${formatMB(user?.used_size)}/${formatMB(user?.max_allowed_size)} MB`} className="border-0" />
                            </Form.Item>
                        </Form>
                        <Menu items={[]} />
                    </div>
                    <div className="bg-[var(--subtle-color)] rounded-xl p-4 relative">
                        <span className="text-xs absolute top-2 left-2 bg-[var(--bkg-color)] rounded-lg px-2 py-0.5">Поиск</span>
                        <span className="mt-3 block"></span>
                        <Form layout="vertical" className="flex flex-col gap-2"
                        onFinish={(d)=>searchParticles(d, 1)} form={form}>
                            <Form.Item label="Поиск" className="mb-0" name="query">
                                <Input placeholder="" className="border-0" />
                            </Form.Item>
                            <Form.Item label="Архитектура" className="mb-0" name="arch">
                                <Select placeholder="Любая" className="border-0" mode="multiple" options={arches.map(val=>({value: val, label: formatArch(val)}))} />
                            </Form.Item>
                            <Form.Item className="mb-0" name="is_official" valuePropName="checked">
                                <Checkbox>Официальные партиклы</Checkbox>
                            </Form.Item>
                            <div className="flex justify-between">
                                <Form.Item name="sort" className="mb-0">
                                    <Select defaultValue="downloads" options={[
                                        {value: "downloads", label: "Сначала популярные"},
                                        {value: "updated_at", label: "Сначала новые"},
                                    ]} />
                                </Form.Item>
                                <Button className="ml-auto" type="primary" htmlType="submit">Поиск</Button>
                            </div>
                        </Form>
                    </div>
                    <div className="bg-[var(--subtle-color)] rounded-xl p-4 relative">
                        <span className="text-xs absolute top-2 left-2 bg-[var(--bkg-color)] rounded-lg px-2 py-0.5">Загрузка CLI</span>
                        <span className="mt-3 block"></span>
                        <Form labelCol={{span: 8}} wrapperCol={{span: ''}} className="flex flex-col gap-2" onFinish={downloadCLI}>
                            <Form.Item label="Архитектура" className="mb-0" name="arch" required>
                                <Select placeholder="Выберите архитектуру" className="border-0" options={arches.map(val=>({value: val, label: formatArch(val)}))} />
                            </Form.Item>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">v{cli_version}</span>
                                <Button type="primary" htmlType="submit">Скачать</Button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="bg-[var(--subtle-color)] rounded-xl p-4 col-span-1 ipad:col-span-2 desktop:col-span-3">
                    {particles.particles.length?
                        <>
                        <List itemLayout="vertical" dataSource={particles.particles} renderItem={(item,i) => (
                        <Link href={`/particles/v/${item.author}/${item.name}`} legacyBehavior>
                            <List.Item key={i} className="mb-4 !p-4 cursor-pointer bg-[rgba(255,255,255,0.08)] hover:bg-[var(--btn-hover)] rounded-lg">
                                <List.Item.Meta avatar={<AutoAwesomeIcon className="h-8 w-8 fill-amber-300" />}
                                                title={<span className="font-normal font-mono flex flex-col laptop:flex-row gap-2 laptop:items-center">
                                                    {item.name}
                                                    <span className="flex items-center gap-2">
                                                        <span
                                                            className="text-sm font-normal px-2 py-1 rounded-md bg-[var(--subtle-color)]">{item.author}</span>
                                                        {item.is_official && <span
                                                            className="flex items-center gap-1 bg-[var(--success-color)] px-1 py-0.5 rounded-md">
                                                            <FontAwesomeIcon className="text-lg" icon={faCircleCheck} />
                                                            <span className="text-xs">Official</span>
                                                        </span>}
                                                    </span>
                                </span>} description={<div className="flex flex-col gap-2">
                                    <span className="flex gap-2 items-center flex-wrap">
                                        <SettingsIcon className="h-4"/> {item.arch.split(",").map(val => <span
                                        key={val}
                                        className="text-xs font-normal px-2 py-1 rounded-md bg-[var(--subtle-color)]">{formatArch(val)}</span>)}
                                    </span>
                                    <span className="flex gap-2 items-center">
                                        <span><FontAwesomeIcon icon={faDownload}/> {formatStat(item.downloads)}</span>
                                        {/*•*/}
                                        {/*<span><FontAwesomeIcon icon={faHeart}/> {formatStat(item.likes)}</span>*/}
                                        •
                                        <span><FontAwesomeIcon icon={faClock}/> {new Date(item.UpdatedAt).toLocaleDateString("ru-RU")}</span>
                                    </span>

                                </div>}/>
                            </List.Item>
                        </Link>
                    )}/>
                            <Pagination current={page} onChange={(p)=>searchParticles(form.getFieldsValue(true), p)} total={particles.count} defaultPageSize={10} />
                        </>
                        :<span className="flex flex-col items-center justify-center gap-4 h-full">
                            <AutoAwesomeIcon className="h-8 w-8 fill-amber-300" />
                            Кажется мы ничего не нашли
                        </span>
                    }
                </div>
            </div>
        </PanelContent>
        <Modal open={user?.status==="error"} title="Присоединиться к программе Particle Engine"
               onCancel={()=>props.router.push("/profile")} onOk={()=>{
                   api.particles.get_user(true).then(()=>{
                       mutate("puser")
                   })
        }} okText="Присоединиться" cancelText="Отмена">
            <p>🎉 Спасибо, что решили присоединиться к бета-тесту Particle Engine!</p>
            <p>✨ Particle Engine позволяет создавать сборки игр и приложений, воспроизводимые на любой системе.
                Будьте уверены в целостности файлов, отсутствии конфликтов и соответсвии версий у вас и ваших игроков.</p>
            <p>Это официальный репозиторий партиклов FruitSpace. Присоединяясь, вы подтверждаете, что ознакомились со следующим:</p>
            <ul className="list-disc list-inside">
                <li>Создастся аккаунт Particle Hub</li>
                <li>Вы получите 512MB места для хранения ваших партиклов</li>
                <li>Во избежание проблем совместимости изменить имя аккаунта нельзя</li>
                <li>Модерация хостинга имеет право удалять партиклы, в случае жалоб на авторские права или наличия непристойных, нелегальных и пр. материалов в них</li>
            </ul>
        </Modal>
    </>
}

Particles.RequireAuth = true