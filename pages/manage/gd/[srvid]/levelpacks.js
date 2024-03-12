import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {useRouter} from "next/router";
import * as Gauntlets from "@/assets/gauntlets"

import {Button, Form, Modal, Select} from "antd";
import useFiberAPI from "@/fiber/fiber";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation, faPlusCircle, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import useSWR from "swr";
import Tab from "@/components/Tab"
import {Tooltip} from "@mui/material";


const gauntletParams = {
    "Acid":     {id: "23",  icon: Gauntlets.Acid.src,       is22: true},
    "Bonus":    {id: "6",   icon: Gauntlets.Bonus.src,      is22: false},
    "Castle":   {id: "43",  icon: Gauntlets.Castle.src ,    is22: true},
    "Chaos":    {id: "7",   icon: Gauntlets.Chaos.src,      is22: false, note: "Доступен только после нажатия на синий замок в подвале руб-руба"},
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


export default function LevelpackGD(props) {
    const router = useRouter()

    const [showModal, setShowModal] = useState(false)
    const GauForm = Form.useForm()

    const api = useFiberAPI()
    const [srv, setSrv] = api.servers.useGDPS()

    const {data: gaunts} = useSWR("gaus", async ()=> await api.gdps_manage.getLevelPacks(srv.Srv.srvid, true))
    const {data: lvlpacks} = useSWR("lvlpacks", async ()=> await api.gdps_manage.getLevelPacks(srv.Srv.srvid, false))

    return <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <PanelContent>
                <div className="flex-col w-full p-2 box-border">
                    <Tab addbtn={<Button type="primary" className="flex gap-2 items-center" onClick={()=>setShowModal(true)}>
                        <FontAwesomeIcon icon={faPlusCircle}/>
                        <span className="!hidden sm:!inline">Создать новый</span>
                    </Button>} tabs={[
                        {
                            label: "Гаунтлеты",
                            key: "gau",
                            children: <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 p-2 gap-2">
                                {gaunts?.packs?.map((gaunt, i)=>{
                                    return <GauntletItem pack={gaunt} api={api} key={i} />
                                })}
                            </div>
                        },
                        {
                            label: "Маппаки",
                            key: "mappacks",
                            children: <div className="flex justify-center items-center h-full">2</div>
                        }
                    ]}/>
                </div>
            </PanelContent>
            <Modal title="Добавить гаунтлет" open={showModal} onOk={()=>{}} onCancel={()=>setShowModal(false)}
            okText="Добавить" cancelText="Отмена">
                <Form labelCol={{span: 8}} wrapperCol={{span: 16}}
                    initialValues={{}}
                    onFinish={()=>{}}
                    autoComplete="off">
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}>
                        <Select options={[]} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
}

const GauntletItem = ({pack, api}) => {
    const pdata = Object.keys(gauntletParams).filter(k=>gauntletParams[k].id==pack.pack_name)[0]
    const gau = gauntletParams[pdata]
    const levels = pack.levels.map((lvl)=>{
        return {
            label: `[${lvl.id}] ${lvl.name}`,
            value: lvl.id
        }
    })
    const [availLevels, setAvailLevels] = useState(levels)

    return <div className="rounded-xl p-2 bg-dark flex flex-col items-center box-border">
        <img src={pdata ? gauntletParams[pdata].icon : Gauntlets.Unknown.src} className="h-24 lg:h-48"/>
        <span className="text-white lg:text-lg flex gap-2 items-center justify-center">
            {pdata || "Unknown"} {(!pdata || gauntletParams[pdata].is22) && <span className="text-xs lg:text-sm bg-primary rounded-md px-1.5">2.2+</span>}
        </span>
        <Select options={levels} defaultValue={[...levels]} className="flex-1" mode="multiple" placeholder="Уровни" maxCount={5}
                onSearch={(val)=>{}}/>
        <div className="flex justify-end w-full gap-2 mt-2">
            {pdata&&gau.note&&<Tooltip title={gau.note} arrow placement="bottom" >
                <Button type="primary" warning className="rounded-md"><FontAwesomeIcon icon={faExclamation} /></Button>
            </Tooltip>}
            <Button type="primary" danger className="rounded-md"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
    </div>

}

LevelpackGD.RequireAuth = true