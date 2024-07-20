import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import GDNavBar from "@/components/Manage/NavBars/GDNavBar";
import PanelContent from "@/components/Global/PanelContent";
import {useRouter} from "next/router";
import * as Gauntlets from "@/assets/gauntlets"

import {Button, Form, Input, Modal, Popconfirm, Select, Table, Slider, InputNumber, ColorPicker} from "antd";
import useFiberAPI from "@/fiber/fiber.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBrush,
    faExclamation, faPaintbrush,
    faPen,
    faPencil,
    faPlusCircle,
    faSave,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
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

const diffs= ["auto", "easy", "normal", "hard", "harder", "insane", "demon-easy", "demon-medium", "demon-hard", "demon-insane", "demon-extreme"]
const demonize = (id, upl=false) => {
    if (upl) {
        id = (5<id&&id<9) ? 6+(id+1)%3 : id
    } else {
        id = (5<id&&id<9) ? 6+(id-1)%3 : id
    }
    return id
}

const formatRgb = ({r,g,b}) => `${r},${g},${b}`

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
                <div className="flex-col w-full laptop:p-2 box-border">
                    <Tab addbtn={<Button type="primary" className="flex gap-2 items-center" onClick={()=>setShowModal(true)}>
                        <FontAwesomeIcon icon={faPlusCircle}/>
                        <span className="!hidden tablet:!inline">Создать новый</span>
                    </Button>} tabs={[
                        {
                            label: "Гаунтлеты",
                            key: "gau",
                            children: gaunts?.packs
                                ? <div className="grid tablet:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-5 p-2 gap-2">
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
                                </div>
                                : (lvlpackloading
                                    ? <div className="flex justify-center p-8"><Loader size={24}/></div>
                                    : <span className="p-8 block text-center">Тут пока ничего нет</span>
                                )
                        }
                    ]} onChange={setMode}/>
                </div>
            </PanelContent>
        {mode=="gau"
            ? <Modal title={`Добавить ${mode=="gau"?"гаунтлет":"маппак"}`} open={showModal} onOk={()=>{packForm.submit()}} onCancel={()=>setShowModal(false)}
            okText="Добавить" cancelText="Отмена">
                <GauCreateModal packs={gaunts?.packs||[]} api={api} form={packForm} srvid={srv.Srv.srvid} setShowModal={setShowModal} />
            </Modal>
            : <MapPackModal open={showModal} onCancel={() => setShowModal(false)} api={api} srvid={srv.Srv.srvid}  isnew/>}
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


function MapPackModal({isnew, open, onCancel, api, srvid}) {

    const [selected, setSelected] = useState(open.pack_name?open:{pack_coins:0,pack_stars:0})
    const [selectedLevels, setSelectedLevels] = useState(open?.levels?.map((lvl)=>({
        label: `[${lvl.id}] ${lvl.name}`,
        value: lvl.id
    }))||[])
    const [availLevels, setAvailLevels] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [form] = Form.useForm()

    useEffect(()=>{
        setSelected(open)
        const sel = open?.levels?.map((lvl)=>({
            label: `[${lvl.id}] ${lvl.name}`,
            value: lvl.id
        }))||[]
        setSelectedLevels(sel)
        form.setFieldsValue({...open, levels: sel, pack_color: `rgb(${open.pack_color})`})
    }, [open])

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

    const savePack = async (val) => {
        let clr = val.pack_color
        switch (typeof clr) {
            case "string":
                clr = clr.length===0
                    ? formatRgb({r:255,g:255,b:255})
                    : clr.replace("rgb(", "").replace(")", "")
                break
            case "object":
                clr = formatRgb(clr.toRgb())
                break
            default:
                clr = formatRgb({r:255,g:255,b:255})
        }
        let d = await api.gdps_manage.editLevelpack(srvid, selected.id, {
            ...selected, ...val,
            pack_difficulty: demonize(val.pack_difficulty, true),
            pack_color: clr,
            levels: selectedLevels.map((lvl)=>({id:lvl.value}))
        })
        if (d.status=="ok") {
            toast.success(`${val.pack_name} сохранен`, {
                duration: 1000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            mutate("lvlpacks")
            onCancel()
        }
    }


    return <Modal title={isnew?"Создать маппак":`Редактировать ${selected.pack_name}`} open={open} onOk={form.submit}
                  onCancel={()=>{
                      onCancel()
                  }}
                  okText="Сохранить" cancelText="Отмена">
        <Form form={form} className="flex flex-col gap-4" onFinish={(values)=>{
            console.log(values)
            savePack(values)
        }}>
            <div className="flex items-center gap-4">
                {(() => {
                    const vtype = diffs[demonize(selected.pack_difficulty)] || "unrated"
                    return <img src={`https://cdn.fruitspace.one/assets/bot_icons/lvl/${vtype}.png`}
                                className="w-24"/>
                })()}
                <div className="rounded-xl bg-subtle bg-opacity-50 backdrop-blur p-2 flex-1">
                    <Form.Item label="Название" name="pack_name" rules={[
                        {
                            required: true,
                            message: "Укажите название маппака"
                        }
                    ]} initialValue={selected.pack_name}>
                        <Input/>
                    </Form.Item>

                    <div className="flex gap-3 items-center">
                        <img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/unrated.png"
                             className="w-4"/>
                        <Form.Item name="pack_difficulty" className="mb-0 flex-1">
                            <Slider min={0} max={10} defaultValue={selected.pack_difficulty}
                                    onChange={(v) => setSelected({...selected, pack_difficulty: v})}
                                    className="flex-1"/>
                        </Form.Item>
                        <img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/demon-extreme.png"
                             className="w-4"/>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-subtle bg-opacity-50 backdrop-blur p-2 flex items-center justify-between">
                <Form.Item label={<img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/star.png"
                                       className="w-4"/>} name="pack_stars"
                           className="mb-0">
                    <InputNumber min={0} contols defaultValue={selected.pack_stars}
                                 onChange={(e, v) => setSelected({...selected, pack_stars: v})}/>
                </Form.Item>
                <Form.Item label={<img src="https://cdn.fruitspace.one/assets/bot_icons/lvl/silvercoin.png"
                                       className="w-4"/>} name="pack_coins"
                           className="mb-0">
                    <InputNumber min={0} contols defaultValue={selected.pack_coins} onChange={(e,v)=>setSelected({...selected, pack_coins: v})}/>
                </Form.Item>
                <Form.Item label={<FontAwesomeIcon icon={faPaintbrush} />} name="pack_color"
                           className="mb-0">
                    <ColorPicker format="rgb" disabledAlpha/>
                </Form.Item>
            </div>

            <div className="rounded-xl bg-subtle bg-opacity-50 backdrop-blur p-2 flex items-center justify-between">
                <Form.Item label="Уровни" name="levels" rules={[
                    {
                        required: true,
                        message: "Укажите хотя бы 1 уровень",
                        min: 1,
                        type: "array"
                    }
                ]} className="mb-0 w-full" initialValue={selectedLevels}>
                    <Select options={undupe([...selectedLevels, ...availLevels])} value={selectedLevels}
                            defaultValue={selectedLevels}
                            className="flex-1" mode="multiple" placeholder="Уровни" filterOption={false}
                            onSearch={searchDebounced} loading={isLoading} onChange={(e,v)=>{
                        setSelectedLevels(v);
                        setAvailLevels([])
                    }}/>
                </Form.Item>
            </div>
        </Form>
    </Modal>;
}

const MappackView = ({api, srvid, packs}) => {

    const [editModpackOpen, setEditModpackOpen] = useState(false)

    const deletePack = async (pack) => {
        let d = await api.gdps_manage.deleteLevelpack(srvid, pack.id)
        if (d.status=="ok") {
            toast.success(`${pack.pack_name} удален`, {
                duration: 1000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            mutate("lvlpacks")
        }
    }


    const structure = [
        {
            dataIndex: "pack_difficulty",
            key: "pack_difficulty",
            render: (val)=> {
                const vtype = diffs[demonize(val)]||"unrated"
                return <img src={`https://cdn.fruitspace.one/assets/bot_icons/lvl/${vtype}.png`} className="w-12" />
            }
        },
        {
            title: "Название",
            dataIndex: "pack_name",
            render: (val, entry) => <span className="font-semibold" style={{color:`rgb(${entry.pack_color})`}}>{val}</span>
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
            render: (_, entry) => <div className="flex w-fit gap-2 items-center">
                <Button type="primary" className="rounded-md aspect-square flex justify-center items-center" onClick={()=>{
                    setEditModpackOpen(entry)
                }}>
                    <FontAwesomeIcon icon={faPen} />
                </Button>
                <Popconfirm
                    title="Удалить маппак"
                    description={`Вы точно хотите удалить ${entry.pack_name}?`}
                    okText="Да" okType="danger"
                    cancelText="Нет"
                    onConfirm={()=>deletePack(entry)}>
                    <Button type="primary" danger className="rounded-md aspect-square flex justify-center items-center !shadow-none">
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Popconfirm>
            </div>
        }
    ]




    return <>
        <Table columns={structure} dataSource={packs} className="bg-transparent bg-opacity-20 rounded-2xl overflow-y-scroll"
               pagination={false}/>
        <MapPackModal api={api} srvid={srvid} open={editModpackOpen} onCancel={() => setEditModpackOpen(false)} />
    </>
}

const GauntletItem = ({pack, api, srvid}) => {
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

    return <div className={`rounded-xl p-2 bg-dark flex flex-col items-center box-border ${deepEqual(selectedLevels, levels)?"border-[#ffffff40]":"border-red-600"} border-1 border-solid`}>
        <img src={pdata ? gauntletParams[pdata].icon : Gauntlets.Unknown.src} className="h-24 laptop:h-48 select-none"/>
        <span className="text-white laptop:text-lg flex gap-2 items-center justify-center select-none">
            {pdata || "Unknown"} {(!pdata || gauntletParams[pdata].is22) && <span className="text-xs laptop:text-sm bg-primary rounded-md px-1.5">2.2+</span>}
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