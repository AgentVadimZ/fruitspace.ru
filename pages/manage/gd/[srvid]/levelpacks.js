import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {useRouter} from "next/router";
import * as Gauntlets from "@/assets/gauntlets"

import {Button, Form, Input, Modal, Popconfirm, Select, Table, Slider, InputNumber} from "antd";
import useFiberAPI from "@/fiber/fiber";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation, faPen, faPencil, faPlusCircle, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import useSWR, {mutate} from "swr";
import Tab from "@/components/Tab"
import {Tooltip} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";
import {debounce} from "lodash";
import Loader from "@/components/Loader";
import {deepEqual} from "@/components/Hooks";


const gauntletParams = {
    "Acid":     {id: "23",  icon: Gauntlets.Acid.src,       is22: true},
    "Bonus":    {id: "6",   icon: Gauntlets.Bonus.src,      is22: false},
    "Castle":   {id: "43",  icon: Gauntlets.Castle.src ,    is22: true},
    "Chaos":    {id: "7",   icon: Gauntlets.Chaos.src,      is22: false, note: "Доступен только после нажатия на синий замок в подвале Руб-руба"},
    "Christmas":{id: "38",  icon: Gauntlets.Christmas.src,  is22: true},
    "Crystal":  {id: "10",  icon: Gauntlets.Crystal.src,    is22: false},
    "Cursed":   {id: "41",  icon: Gauntlets.Cursed.src,     is22: true},
    "Cyborg":   {id: "42",  icon: Gauntlets.Cyborg.src,     is22: true},
    "Death":    {id: "15",  icon: Gauntlets.Death.src,      is22: false},
    "Demon":    {id: "8",   icon: Gauntlets.Demon.src,      is22: false, note: "В 2.1 доступен только после освобождения Хранителя Демонов из подвала"},
    "Discord":  {id: "49",  icon: Gauntlets.Discord.src,    is22: true},
    "Doom":     {id: "14",  icon: Gauntlets.Doom.src,       is22: false},
    "Dragon":   {id: "20",  icon: Gauntlets.Dragon.src,     is22: true},
    "Fantasy":  {id: "37",  icon: Gauntlets.Fantasy.src,    is22: true},
    "Fire":     {id: "1",   icon: Gauntlets.Fire.src,       is22: false},
    "Force":    {id: "18",  icon: Gauntlets.Force.src,      is22: true},
    "Forest":   {id: "16",  icon: Gauntlets.Forest.src,     is22: true},
    "Galaxy":   {id: "47",  icon: Gauntlets.Galaxy.src,     is22: true},
    "Gem":      {id: "33",  icon: Gauntlets.Gem.src,        is22: true},
    "Ghost":    {id: "31",  icon: Gauntlets.Ghost.src,      is22: true},
    "Grave":    {id: "44",  icon: Gauntlets.Grave.src,      is22: true},
    "Halloween":{id: "29",  icon: Gauntlets.Halloween.src,  is22: true},
    "Haunted":  {id: "22",  icon: Gauntlets.Haunted.src,    is22: true},
    "Ice":      {id: "2",   icon: Gauntlets.Ice.src,        is22: false},
    "Inferno":  {id: "34",  icon: Gauntlets.Inferno.src,    is22: true},
    "Lava":     {id: "5",   icon: Gauntlets.Lava.src,       is22: false},
    "Magic":    {id: "11",  icon: Gauntlets.Magic.src,      is22: false},
    "Monster":  {id: "13",  icon: Gauntlets.Monster.src,    is22: false},
    "Mystery":  {id: "40",  icon: Gauntlets.Mystery.src,    is22: true},
    "Poison":   {id: "3",   icon: Gauntlets.Poison.src,     is22: false},
    "Portal":   {id: "35",  icon: Gauntlets.Portal.src,     is22: true},
    "Potion":   {id: "26",  icon: Gauntlets.Potion.src,     is22: true},
    "Power":    {id: "25",  icon: Gauntlets.Power.src,      is22: true},
    "Rune":     {id: "17",  icon: Gauntlets.Rune.src,       is22: true},
    "Shadow":   {id: "4",   icon: Gauntlets.Shadow.src,     is22: false},
    "Snake":    {id: "27",  icon: Gauntlets.Snake.src,      is22: true},
    "Spider":   {id: "32",  icon: Gauntlets.Spider.src,     is22: true},
    "Spike":    {id: "12",  icon: Gauntlets.Spike.src,      is22: false},
    "Split":    {id: "50",  icon: Gauntlets.Split.src,      is22: true},
    "Spooky":   {id: "19",  icon: Gauntlets.Spooky.src,     is22: true},
    "Strange":  {id: "36",  icon: Gauntlets.Strange.src,    is22: true},
    "Surprise": {id: "39",  icon: Gauntlets.Surprise.src,   is22: true},
    "Temple":   {id: "45",  icon: Gauntlets.Temple.src,     is22: true},
    "Time":     {id: "9",   icon: Gauntlets.Time.src,       is22: false},
    "Toxic":    {id: "28",  icon: Gauntlets.Toxic.src,      is22: true},
    "Treasure": {id: "30",  icon: Gauntlets.Treasure.src,   is22: true},
    "Universe": {id: "48",  icon: Gauntlets.Universe.src,   is22: true},
    "Water":    {id: "21",  icon: Gauntlets.Water.src,      is22: true},
    "Witch":    {id: "24",  icon: Gauntlets.Witch.src,      is22: true},
    "World":    {id: "46",  icon: Gauntlets.World.src,      is22: true},
}

const undupe = (arr)=> [...new Map(arr.map(i=>[i.value, i])).values()]


export default function LevelpackGD(props) {
    const router = useRouter()

    const [showModal, setShowModal] = useState(false)
    const GauForm = Form.useForm()

    const api = useFiberAPI()
    const [srv, setSrv] = api.servers.useGDPS()

    const {data: gaunts, isLoading: gauntloading} = useSWR("gaus", async ()=> await api.gdps_manage.getLevelPacks(srv.Srv.srvid, true))
    const {data: lvlpacks, isLoading: lvlpackloading} = useSWR("lvlpacks", async ()=> await api.gdps_manage.getLevelPacks(srv.Srv.srvid, false))

    useEffect(()=>{
        mutate("gaus")
        mutate("lvlpacks")
    }, [srv])

    const [mode, setMode] = useState("gau")

    const [packForm] = Form.useForm()

    return <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <Toaster/>
            <PanelContent>
                <div className="flex-col w-full p-2 box-border">
                    <Tab addbtn={<Button type="primary" className="flex gap-2 items-center" onClick={()=>setShowModal(true)}>
                        <FontAwesomeIcon icon={faPlusCircle}/>
                        <span className="!hidden sm:!inline">Создать новый</span>
                    </Button>} tabs={[
                        {
                            label: "Гаунтлеты",
                            key: "gau",
                            children: gaunts?.packs
                                ? <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 p-2 gap-2">
                                    {gaunts?.packs?.map((gaunt, i) => {
                                        return <GauntletItem pack={gaunt} api={api} srvid={srv.Srv.srvid} key={i}/>
                                    })}
                                </div>
                                : (gauntloading
                                    ? <div className="flex justify-center p-8"><Loader size={24}/></div>
                                    : <span className="p-8 block text-center">Тут пока ничего нет</span>
                                )
                        },
                        {
                            label: "Маппаки",
                            key: "mappacks",
                            children: lvlpacks?.packs
                                ? <div className="flex flex-col h-full">
                                    <MappackView api={api} srvid={srv.Srv.srvid} packs={lvlpacks.packs} />
                                    {lvlpacks?.packs?.map((pack, i) => <pre
                                        key={i}>{JSON.stringify(pack, null, 4)}</pre>)}
                                </div>
                                : (lvlpackloading
                                    ? <div className="flex justify-center p-8"><Loader size={24}/></div>
                                    : <span className="p-8 block text-center">Тут пока ничего нет</span>
                                )
                        }
                    ]} onChange={setMode}/>
                </div>
            </PanelContent>
            <Modal title={`Добавить ${mode=="gau"?"гаунтлет":"маппак"}`} open={showModal} onOk={()=>{packForm.submit()}} onCancel={()=>setShowModal(false)}
            okText="Добавить" cancelText="Отмена">
                {mode=="gau"?<GauCreateModal packs={gaunts?.packs||[]} api={api} form={packForm} srvid={srv.Srv.srvid} setShowModal={setShowModal} />:<MappackCreateModal/>}
            </Modal>
        </>
}

const GauCreateModal = ({packs, api, srvid, form, setShowModal}) => {

    const existingTypes = packs.map(gau=>{
        return gau.pack_name
    })

    const options = [...Object.keys(gauntletParams).filter(gau_n=>{
        return !existingTypes.includes(gauntletParams[gau_n].id)
    }), "Unknown"].map(e => {
        return {
            label: `${e} Gauntlet`,
            value: gauntletParams[e]?.id||"0"
        }
    })

    const [isLoading, setIsLoading] = useState(false)
    const [selectedLevels, setSelectedLevels] = useState([])
    const [availLevels, setAvailLevels] = useState([])

    const search = async (query) => {
        setIsLoading(true)
        let data = await api.gdps_manage.searchLevels(srvid, query)
        let newlevels = data?.levels?.map((lvl)=>{
            return {
                label: `[${lvl.id}] ${lvl.name}`,
                value: lvl.id
            }
        })||[]
        setAvailLevels(newlevels)
        setIsLoading(false)
        return data
    }
    const searchDebounced = debounce(search, 500)

    return <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 16}}
                 onFinish={async ()=>{
                     const res = await api.gdps_manage.createLevelpack(srvid, {
                         pack_type: 1,
                         pack_name: form.getFieldValue("pack_name"),
                         levels: selectedLevels.map(l=>({id: l.value})),

                     })
                     if (res.status=="ok") {
                         toast.success("Гаунтлет добавлен", {
                             duration: 1000,
                             style: {
                                 color: "white",
                                 backgroundColor: "var(--btn-color)"
                             }
                         })
                         mutate("gaus")
                         form.resetFields()
                         setShowModal(false)
                     } else {
                         toast.error("Ошибка при добавлении", {
                             duration: 1000,
                             style: {
                                 color: "white",
                                 backgroundColor: "var(--btn-color)"
                             }
                         })}
                 }}
                 autoComplete="off">
        <Form.Item
            label="Гаунтлет"
            name="pack_name"
            rules={[
                {
                    required: true,
                    message: "Выберите гаунтлет"
                },
            ]}>
            <Select options={options} />
        </Form.Item>
        <Form.Item
            label="Уровни"
            name="levels"
            rules={[
                {
                    required: true,
                    len: 5,
                    type: "array",
                    message: "Укажите ровно 5 уровней"
                },
            ]}>
            <Select options={undupe([...selectedLevels, ...availLevels])} value={selectedLevels}
                    className="flex-1" mode="multiple" placeholder="Уровни" maxCount={5} filterOption={false}
                    onSearch={(val)=>{searchDebounced(val)}} loading={isLoading} onChange={(e,v)=>{
                setSelectedLevels(v);
                setAvailLevels([])
            }}/>
        </Form.Item>
    </Form>
}

const MappackCreateModal = (props) => {
    return <></>
}

const MappackView = ({api, srvid, packs}) => {

    const [editModpackOpen, setEditModpackOpen] = useState(false)
    const [selected, setSelected] = useState({})

    const [form] = Form.useForm()

    const [selectedLevels, setSelectedLevels] = useState([])
    const [availLevels, setAvailLevels] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const structure = [
        {
            dataIndex: "pack_difficulty",
            key: "pack_difficulty",
            render: (val)=> {
                const vtype = ["unrated","auto","easy","normal","hard","hard","harder","harder","insane","insane","demon-hard"][val]||"unrated"
                return <img src={`https://cdn.fruitspace.one/assets/bot_icons/lvl/${vtype}.png`} className="w-12" />
            }
        },
        {
            title: "Название",
            dataIndex: "pack_name",
            render: (val, entry) => <span className="font-bold" style={{color:`rgb(${entry.pack_color})`}}>{val}</span>
        },
        {
            title: "Звезды",
            dataIndex: "pack_stars",
            render: (val) => <span className="flex items-center gap-1 font-semibold">
                <img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/star.png" className="w-4"/>
                {val}
            </span>
        },
        {
            title: "Монеты",
            dataIndex: "pack_coins",
            render: (val) => <span className="flex items-center gap-1 font-semibold">
                <img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/silvercoin.png" className="w-4"/>
                {val}
            </span>
        },
        {
            title: "Уровни",
            dataIndex: "levels",
            render: (lvls) => <div className="flex items-center gap-1.5 overflow-ellipsis">
                {lvls.map(lvl=><span key={lvl.id} className="flex items-center gap-1 px-2 py-0.5 bg-dark rounded-lg">
                    {lvl.name}
                </span>)}
            </div>
        },
        {
            render: (_, entry) => <FontAwesomeIcon icon={faPen} onClick={()=>{
                form.resetFields()
                setSelected(entry)
                setSelectedLevels(entry.levels.map(lvl=>({
                    label: `[${lvl.id}] ${lvl.name}`,
                    value: lvl.id
                })))
                setEditModpackOpen(true)
            }} className="rounded-full bg-primary cursor-pointer hover:bg-opacity-80 p-2" />
        }
    ]


    const search = async (query) => {
        setIsLoading(true)
        let data = await api.gdps_manage.searchLevels(srvid, query)
        let newlevels = data?.levels?.map((lvl)=>{
            return {
                label: `[${lvl.id}] ${lvl.name}`,
                value: lvl.id
            }
        })||[]
        setAvailLevels(newlevels)
        setIsLoading(false)
        return data
    }
    const searchDebounced = debounce(search, 500)

    return <>
        <Table columns={structure} dataSource={packs} className="bg-transparent bg-opacity-20 rounded-2xl" pagination={false} />
        <Modal title={`Редактировать ${selected.pack_name}`} open={editModpackOpen} onOk={()=>{form.submit()}} onCancel={()=>setEditModpackOpen(false)}
               okText="Сохранить" cancelText="Отмена">
            <Form form={form} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    {(() => {
                        const vtype = ["unrated", "auto", "easy", "normal", "hard", "hard", "harder", "harder", "insane", "insane", "demon-hard"][selected.pack_difficulty] || "unrated"
                        return <img src={`https://cdn.fruitspace.one/assets/bot_icons/lvl/${vtype}.png`}
                                    className="w-24"/>
                    })()}
                    <div className="rounded-lg bg-subtle bg-opacity-50 backdrop-blur p-2 flex-1">
                        <Form.Item label="Название" name="pack_name" rules={[
                            {
                                required: true,
                                message: "Укажите название маппака"
                            }
                        ]} initialValue={selected.pack_name}>
                            <Input/>
                        </Form.Item>
                        <Form.Item initialValue={selected.pack_difficulty} name="pack_difficulty" className="mb-0">
                            <div className="flex gap-3 items-center">
                                <img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/unrated.png"
                                     className="w-4"/>
                                <Slider min={0} max={10} defaultValue={selected.pack_difficulty}
                                        onChange={(v) => setSelected({...selected, pack_difficulty: v})}
                                        className="flex-1"/>
                                <img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/demon-hard.png"
                                     className="w-4"/>
                            </div>
                        </Form.Item>
                    </div>
                </div>

                <div className="rounded-lg bg-subtle bg-opacity-50 backdrop-blur p-2 flex items-center justify-between">
                    <Form.Item label={<span className="flex items-center gap-1">
                            <img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/star.png"
                                 className="w-4"/> Звезды
                        </span>} name="pack_stars" initialValue={selected.pack_stars}
                               className="mb-0">
                        <InputNumber min={0} contols/>
                    </Form.Item>
                    <Form.Item label={<span className="flex items-center gap-1">
                            <img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/silvercoin.png"
                                 className="w-4"/> Монеты
                        </span>} name="pack_coins" initialValue={selected.pack_coins}
                               className="mb-0">
                        <InputNumber min={0} contols/>
                    </Form.Item>
                </div>

                <div className="rounded-lg bg-subtle bg-opacity-50 backdrop-blur p-2 flex items-center justify-between">
                    <Form.Item label="Уровни" name="levels" rules={[
                        {
                            required: true,
                            message: "Укажите хотя бы 1 уровень",
                            min: 1,
                            type: "array"
                        }
                    ]} initialValue={selectedLevels} className="mb-0">
                        <Select options={undupe([...selectedLevels, ...availLevels])} value={selectedLevels}
                                className="flex-1" mode="multiple" placeholder="Уровни" maxCount={5} filterOption={false}
                                onSearch={(val)=>{searchDebounced(val)}} loading={isLoading} onChange={(e,v)=>{
                            setSelectedLevels(v);
                            setAvailLevels([])
                        }}/>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    </>
}

const GauntletItem = ({
    pack, api, srvid
}) => {
    const [isLoading, setIsLoading] = useState(false)

    const pdata = Object.keys(gauntletParams).filter(k => gauntletParams[k].id == pack.pack_name)[0]
    const gau = gauntletParams[pdata]
    const levels = pack.levels.map((lvl) => {
        return {
            label: `[${lvl.id}] ${lvl.name}`,
            value: lvl.id
        }
    })
    const [selectedLevels, setSelectedLevels] = useState(levels||[])
    const [availLevels, setAvailLevels] = useState([])
    
    const search = async (query) => {
        setIsLoading(true)
        let data = await api.gdps_manage.searchLevels(srvid, query)
        let newlevels = data?.levels?.map((lvl)=>{
            return {
                label: `[${lvl.id}] ${lvl.name}`,
                value: lvl.id
            }
        })||[]
        setAvailLevels(newlevels)
        setIsLoading(false)
        return data
    }
    const searchDebounced = debounce(search, 500)

    const saveGauntlet = async () => {
        let d = await api.gdps_manage.editLevelpack(srvid, pack.id, {...pack, levels: selectedLevels.map((lvl)=>({id:lvl.value}))})
        if (d.status=="ok") {
            toast.success(`${pdata || "Unknown"} Gauntlet сохранен`, {
                duration: 1000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            mutate("gaus")
        }
    }

    const deleteGauntlet = async () => {
        let d = await api.gdps_manage.deleteLevelpack(srvid, pack.id)
        if (d.status=="ok") {
            toast.success(`${pdata || "Unknown"} Gauntlet удален`, {
                duration: 1000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            mutate("gaus")
        }
    }

    return <div className={`rounded-xl p-2 bg-dark flex flex-col items-center box-border ${deepEqual(selectedLevels, levels)?"border-[#ffffff40]":"border-red-600"} border-[1px] border-solid`}>
        <img src={pdata ? gauntletParams[pdata].icon : Gauntlets.Unknown.src} className="h-24 lg:h-48 select-none"/>
        <span className="text-white lg:text-lg flex gap-2 items-center justify-center select-none">
            {pdata || "Unknown"} {(!pdata || gauntletParams[pdata].is22) && <span className="text-xs lg:text-sm bg-primary rounded-md px-1.5">2.2+</span>}
        </span>
        <Select options={undupe([...selectedLevels, ...availLevels])} defaultValue={levels} value={selectedLevels}
                className="flex-1" mode="multiple" placeholder="Уровни" maxCount={5} filterOption={false}
                onSearch={(val)=>{searchDebounced(val)}} loading={isLoading} onChange={(e,v)=>{
                    setSelectedLevels(v);
                    setAvailLevels([])
                }}/>
        <div className="flex justify-end w-full gap-2 mt-2">
            {pdata&&gau.note&&<Tooltip title={gau.note} arrow placement="bottom" >
                <Button type="dashed" className="rounded-md">
                    <FontAwesomeIcon icon={faExclamation} />
                </Button>
            </Tooltip>}
            <Button type="primary" warning className="rounded-md aspect-square flex justify-center items-center" onClick={saveGauntlet}>
                <FontAwesomeIcon icon={faSave} />
            </Button>
            <Popconfirm
                title="Удалить гаунтлет"
                description={`Вы точно хотите удалить ${pdata || "Unknown"} Gauntlet?`}
                okText="Да" okType="danger"
                cancelText="Нет"
                onConfirm={deleteGauntlet}>
                <Button type="primary" danger className="rounded-md aspect-square flex justify-center items-center">
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Popconfirm>
        </div>
    </div>

}

LevelpackGD.RequireAuth = true