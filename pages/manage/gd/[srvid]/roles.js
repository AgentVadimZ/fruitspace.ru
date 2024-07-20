import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import GDNavBar from "@/components/Manage/NavBars/GDNavBar";
import PanelContent from "@/components/Global/PanelContent";
import {useEffect, useRef, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBan, faCircleCheck, faCircleDot, faCircleQuestion, faCircleXmark, faClock, faEdit, faEnvelope, faHashtag,
    faPlusCircle, faQuestion, faQuestionCircle, faRefresh, faTrash, faUser
} from "@fortawesome/free-solid-svg-icons";

import modBadge from "@/assets/gd/mod.png"
import modElderBadge from "@/assets/gd/mod-elder.png"
import modListBadge from "@/assets/gd/mod-leaderboard.png"
import toast, {Toaster} from "react-hot-toast";
import dynamic from "next/dynamic";
import useFiberAPI from "@/fiber/fiber.ts";
import {
    Button,
    FloatButton,
    Modal,
    Segmented,
    Tour,
    Switch,
    InputNumber,
    ColorPicker,
    Popover,
    Select,
    Input, Pagination
} from "antd";
import {RolesTour} from "@/locales/tours/manage/gd";
import Tab from "@/components/Tab";
import {debounce} from "lodash";

const SketchPicker = dynamic(() => import("react-color").then((mod)=>mod.SketchPicker), { ssr: false });

const fromRGB = (vals) => {
    return `${vals.r},${vals.g},${vals.b}`
}
const toRGB = (vals) => {
    let u = vals.split(",")
    return {
        r: parseInt(u[0]),
        g: parseInt(u[1]),
        b: parseInt(u[2])
    }
}

export default function RolesGD(props) {
    const refs = useRef({})
    const tourSteps = RolesTour.map((v,i)=>({
        ...v, target: ()=>refs.current[v.target],
        nextButtonProps: {children: <span>Далее</span>},
        prevButtonProps: {children: <span>Назад</span>},
        className: "w-fit laptop:w-[520px]"
    }))
    const [tourOpen, setTourOpen] = useState(!!props.router.query.tour)

    const [tab, setTab] = useState("roles")

    const [roles, setRoles] = useState([])

    const [roleid, setRoleid] = useState(-1)
    const [crole, setCRole] = useState(roles[roleid])

    const [queryUsers, setQueryUsers] = useState([])
    const [searchingRN, setSearchingRN] = useState(false)
    const [uPage, setUPage] = useState(0)
    const [users, setUsers] = useState([])
    const [userCount, setUserCount] = useState(0)

    const api = useFiberAPI()

    const [srv, setSrv] = api.servers.useGDPS()

    const getRoles = async ()=> {
        let proles = await api.gdps_manage.getRoles(srv.Srv.srvid)
        proles.roles&&setRoles(proles.roles)
    }

    const update_role = async () => {
        // fetch stuff
        let resp = await api.gdps_manage.setRole(srv.Srv.srvid, crole)
        if(resp.status==="ok") {
            toast.success("Роль сохранена",{style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }})
        }else{
            toast.error("Ошибочка: "+resp.message,{style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }})
            return
        }
        roles[roleid] = crole
        setRoles(roles)
        setRoleid(-1)
    }

    const enqueueUserSearch = async (val)=> {
        if (val.length<3) return
        setSearchingRN(true)
        let r = await api.gdps_manage.searchUsers(srv.Srv.srvid, val)
        r.users&&setQueryUsers(r.users)
        setSearchingRN(false)
    }

    const enqueueUserSearchDebounced = debounce(enqueueUserSearch, 500)

    const getUserList = async (page=uPage) => {
        let r = await api.gdps_manage.getUserList(srv.Srv.srvid, page)
        r.users&&setUsers(r.users)
        r.count&&setUserCount(r.count)
    }

    useEffect(()=>{
        srv.Srv?.srvid&&getRoles()
        srv.Srv?.srvid&&getUserList()
    },[srv])
    let el_icon = (lvl)=>{
        switch(lvl) {
            case 0:
                return <FontAwesomeIcon icon={faBan} className="w-8 !h-6 p-2 rounded-lg"/>
            case 1:
                return <img src={modBadge.src} className="w-12 !h-12 p-2 rounded-lg" />
            case 2:
                return <img src={modElderBadge.src} className="w-12 !h-12 p-2 rounded-lg" />
            case 3:
                return <img src={modListBadge.src} className="w-12 !h-12 p-2 rounded-lg" />
            default:
                return <FontAwesomeIcon icon={faCircleDot} className="w-8 !h-6 p-2 rounded-lg" />
        }
    }

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <Toaster/>
            <Tour open={tourOpen} onClose={()=>setTourOpen(false)} steps={tourSteps}/>
            <FloatButton
                shape="square"
                type="primary"
                style={{right: 20, bottom: 20}}
                onClick={() => setTourOpen(true)}
                icon={<FontAwesomeIcon icon={faQuestion} />}
            />
            <PanelContent>
                <div className="flex-col w-full desktop:w-2/3 laptop:p-2">
                    <Tab addbtn={<div className="flex gap-2">
                        {tab==="roles"&&<Button type="primary" className="flex gap-2 items-center" onClick={
                            ()=>{
                                setRoleid(roles.length)
                                roles.push({
                                    id: roles.length + 1,
                                    role_name: "New role",
                                    mod_level: 1,
                                    comment_color: "255,0,0",
                                    privs: {},
                                    users: []
                                })
                                setRoles(roles)
                                setCRole(roles[roles.length - 1])
                            }
                        }>
                            <FontAwesomeIcon icon={faPlusCircle}/>
                            <span className="!hidden tablet:!inline">Создать</span>
                        </Button>}
                        <Button icon={<FontAwesomeIcon icon={faRefresh} />} onClick={()=>{
                            switch (tab) {
                                case "roles":
                                {
                                    srv.Srv.srvid&&getRoles()
                                    return
                                }
                                case "players": {
                                    srv.Srv.srvid&&getUserList()
                                    return
                                }
                            }
                        }} />
                    </div>} tabs={[
                        {
                            label: "Роли",
                            key: "roles",
                            children: <div className="laptop:p-4 flex flex-col overflow-x-scroll laptop:overflow-x-auto">
                                {roles.map((v, i) => (
                                    <div className="flex items-center p-4 gap-4
                                    border-b-1 last:border-b-0 border-white border-opacity-25" key={i}>
                                        {el_icon(v.mod_level)}
                                        <div>
                                            <p className="flex gap-2 items-center text-sm laptop:text-base">
                                                <p className="w-3 h-3 rounded border-1 border-white border-opacity-75" style={{
                                                    backgroundColor: `rgb(${v.comment_color})`
                                                }}></p>
                                                {v.role_name}
                                            </p>
                                            <p className="text-gray-300 text-xs flex items-center gap-2">
                                                {[
                                                    [faHashtag, v.id],
                                                    [faUser, v.users.length]
                                                ].map((item, i)=><span className="rounded bg-active px-1.5 py-0.5 text-nowrap" key={i}>
                                        <FontAwesomeIcon icon={item[0]} /> {item[1]}</span>
                                                )}
                                            </p>
                                        </div>
                                        <Button className="ml-auto text-gray-300 hover:!text-white aspect-square" size="large" icon={<FontAwesomeIcon icon={faEdit} />}
                                                onClick={() => {
                                                    setRoleid(i)
                                                    setCRole(roles[i])
                                                }}/>
                                    </div>
                                ))}
                            </div>
                        },
                        {
                            label: "Игроки",
                            key: "players",
                            children: <div className="p-4 flex flex-col overflow-x-scroll laptop:overflow-x-auto">
                                {users.map((user, i)=>(
                                    <div className="flex items-center p-2 laptop:p-4 gap-4
                                    border-b-1 last:border-b-0 border-white border-opacity-25" key={i}>
                                        <img src={fastIconLink("cube", 1)} className="w-8"/>
                                        <div>
                                            <p className="flex gap-2 items-center">
                                                {user.uname}
                                                <span className="text-xs rounded-sm px-1.5 py-0.5 bg-active text-nowrap">
                                                    <FontAwesomeIcon icon={faHashtag}/> {user.uid}
                                                </span>
                                                {
                                                    user.is_banned === 2
                                                        ? <span className="text-xs rounded px-1.5 py-0.5 bg-red-700 text-nowrap">
                                                            <FontAwesomeIcon icon={faCircleXmark}/> Забанен
                                                        </span>
                                                        : (
                                                            user.is_banned === 1
                                                                ? <span className="text-xs rounded px-1.5 py-0.5 bg-amber-700 text-nowrap">
                                                                    <FontAwesomeIcon icon={faClock}/> Не подтвержден
                                                                </span>
                                                                : <span className="text-xs rounded px-1.5 py-0.5 bg-active text-nowrap">
                                                                    <FontAwesomeIcon icon={faCircleCheck}/> Активирован
                                                                </span>
                                                        )
                                                }
                                            </p>
                                            <p className="text-gray-300 text-xs flex items-center gap-2">
                                            <FontAwesomeIcon icon={faEnvelope}/> {user.email}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <Pagination rootClassName="mx-auto" responsive current={uPage} total={userCount} onChange={(page)=>{
                                    setUPage(page)
                                    getUserList(page-1)
                                }} showSizeChanger={false} />
                            </div>
                        }
                    ]} onChange={setTab} />
                </div>
                <Modal title={`Изменить роль ${crole?.role_name}`} open={roleid > -1} onCancel={()=>{
                    setRoleid(-1)
                    setCRole(roles[roleid])
                }} okText="Сохранить" cancelText="Отмена" onOk={update_role}>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                            <p className="w-20">Название</p>
                            <Input placeholder="Название роли" value={crole?.role_name} onChange={(e)=>setCRole({...crole, role_name: e.target.value})} />
                        </div>
                        <div className="flex gap-2 laptop:items-center">
                            <p className="w-20">Значок</p>
                            <div className="flex flex-col laptop:flex-row gap-2 laptop:items-center">
                                <Segmented rootClassName="bg-subtle select-none" options={[
                                    {
                                        value: 0,
                                        icon: <FontAwesomeIcon icon={faBan} className="text-lg"/>
                                    },
                                    {
                                        value: 1,
                                        icon: <div className="flex items-center justify-center h-7">
                                            <img src={modBadge.src} className="h-6"/>
                                        </div>
                                    },
                                    {
                                        value: 2,
                                        icon: <div className="flex items-center justify-center h-7">
                                            <img src={modElderBadge.src} className="h-6"/>
                                        </div>
                                    },
                                    {
                                        value: 3,
                                        icon: <div className="flex items-center justify-center h-7">
                                            <img src={modListBadge.src} className="h-6"/>
                                        </div>
                                    },
                                ]} value={crole?.mod_level} onChange={(val) => {
                                    setCRole({...crole, mod_level: val})
                                }}/>
                                <InputNumber className="w-24" addonBefore="ID" min={0} placeholder="значка"
                                             value={crole?.mod_level} onChange={(val) => {
                                    setCRole({...crole, mod_level: val})
                                }}/>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="w-20">Цвет роли</p>
                            <ColorPicker disabledAlpha showText format="hex"
                                         value={toRGB(crole?.comment_color || "0,0,0")}
                                         onChange={(color) => setCRole({
                                             ...crole,
                                             comment_color: fromRGB(color.toRgb())
                                         })}
                                         rootClassName="bg-subtle"/>
                        </div>
                        <div>
                            <p className="bg-active text-sm rounded-t-lg px-2 w-fit border-1 border-b-active border-solid border-white border-opacity-25
                                        relative z-20 -mb-[1px]">
                                Команды
                            </p>
                            <div className="bg-active p-4 rounded-lg rounded-tl-none border-1 border-solid border-white border-opacity-25 text-md whitespace-normal leading-tight mt-0
                                        relative z-10 flex flex-col gap-2">
                                {[
                                    {
                                        text: "!rate <diff/reset>",
                                        field: "cRate"
                                    },
                                    {
                                        text: "!feature/!unfeature",
                                        field: "cFeature"
                                    },
                                    {
                                        text: "!epic/!unepic",
                                        field: "cEpic"
                                    },
                                    {
                                        text: "!coins <verify/reset>",
                                        field: "cVerCoins"
                                    },
                                    {
                                        text: "!daily [reset]",
                                        field: "cDaily"
                                    },
                                    {
                                        text: "!weekly [reset]",
                                        field: "cWeekly"
                                    },
                                    {
                                        text: <>
                                            Управление уровнем <Popover title="Доступны следующие команды"
                                                                        content={<pre>
                                                    !lvl rename &lt;new_name&gt;<br/>
                                                    !lvl chown &lt;lvl_id&gt; &lt;new_username&gt;<br/>
                                                    !lvl desc &lt;description&gt;<br/>
                                                    !lvl list<br/>
                                                    !lvl unlist
                                        </pre>} rootClassName="glassb rounded-lg">
                                            <FontAwesomeIcon icon={faQuestionCircle} className="cursor-pointer"/>
                                        </Popover>
                                        </>,
                                        field: "cLvlAccess"
                                    },
                                    {
                                        text: "!lvl delete <lvl_id>",
                                        field: "cDelete"
                                    }
                                ].map((v, i) => <p key={i} className="flex gap-2 items-center justify-between">
                                    <span className="font-mono text-sm">{v.text}</span>
                                    <Switch checked={crole?.privs[v.field] > 0} onChange={(checked) => setCRole({
                                        ...crole,
                                        privs: {...crole.privs, [v.field]: checked ? 1 : 0}
                                    })}/>
                                </p>)}
                            </div>
                        </div>
                        <div>
                            <p className="bg-active text-sm rounded-t-lg px-2 w-fit border-1 border-b-active border-solid border-white border-opacity-25
                                        relative z-20 -mb-[1px]">
                                <Popover title="Что это?"
                                         content="Весь функционал модератора, появляющийся в игре после нажатия на Settings → Help → Req."
                                         rootClassName="glassb rounded-lg">
                                    Действия <FontAwesomeIcon icon={faCircleQuestion} className="cursor-pointer"/>
                                </Popover>
                            </p>
                            <div className="bg-active p-4 rounded-lg rounded-tl-none border-1 border-solid border-white border-opacity-25 text-md whitespace-normal leading-tight mt-0
                                        relative z-10 flex flex-col gap-2">
                                {[
                                    {
                                        text: "Интерфейс модератора (необходим)",
                                        field: "aReqMod"
                                    },
                                    {
                                        text: "Оценка на звезды",
                                        field: "aRateStars"
                                    },
                                    {
                                        text: "╰ Отправлять рейт вместо оценки",
                                        field: "aRateReq"
                                    },
                                    {
                                        text: "× Запретить оценку на демона (10⭐)",
                                        field: "aRateNoDemon"
                                    },
                                    {
                                        text: "Оценка демонов",
                                        field: "aRateDemon"
                                    },
                                ].map((v, i) => <p key={i} className="flex gap-2 items-center justify-between">
                                    <span className="font-mono text-sm">{v.text}</span>
                                    <Switch checked={crole?.privs[v.field] > 0} onChange={(checked) => setCRole({
                                        ...crole,
                                        privs: {...crole.privs, [v.field]: checked ? 1 : 0}
                                    })}/>
                                </p>)}
                            </div>
                        </div>
                        <div>
                            <p className="bg-active text-sm rounded-t-lg px-2 w-fit border-1 border-b-active border-solid border-white border-opacity-25
                                        relative z-20 -mb-[1px]">
                                Назначенные игроки
                            </p>
                            <div className="bg-active p-4 rounded-lg rounded-tl-none border-1 border-solid border-white border-opacity-25 text-md whitespace-normal leading-tight mt-0
                                        relative z-10 flex flex-col gap-4">
                                <p className="flex items-center gap-2">
                                    <Select options={queryUsers} showSearch
                                            className="flex-1" placeholder="Поиск игроков" filterOption={false}
                                            onSearch={enqueueUserSearchDebounced} loading={searchingRN}
                                            onChange={(uid) => {
                                                if (crole.users.find(v => v.uid === uid)) return
                                                let delta = crole.users
                                                delta.push(queryUsers.find(v => v.uid === uid))
                                                setCRole({...crole, users: delta})
                                            }} fieldNames={{
                                        label: "uname",
                                        value: "uid"
                                    }}/>
                                </p>
                                {crole?.users.map((v, i) => <p key={i} className="flex items-center gap-2">
                                    <span className="font-mono text-sm rounded bg-btn px-1.5">
                                        <FontAwesomeIcon icon={faHashtag}/> {v.uid}
                                    </span>
                                    {v.uname}
                                    <Button icon={<FontAwesomeIcon icon={faTrash}/>} onClick={() => {
                                        crole.users.splice(i, 1)
                                        setCRole({...crole})
                                    }} type="text" className="ml-auto"/>
                                </p>)}
                            </div>
                        </div>
                    </div>
                </Modal>
            </PanelContent>
        </>
    )
}

RolesGD.RequireAuth = true


const getIconTypeById = (id)=>{
    switch (id) {
        case 1: return "ship"
        case 2: return "ball"
        case 3: return "ufo"
        case 4: return "wave"
        case 5: return "robot"
        case 6: return "spider"
        case 7: return "swing"
        default: return "cube"
    }
}

const fastIconLink = (type, id) => {
    id = Math.max(1, id)
    return "https://cdn.fruitspace.one/assets/icons/" + type + "/" + id + ".png"
}