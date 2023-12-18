import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import BannerMC from "../../components/assets/BannerMC.png";
import ProductHeader from "../../components/Global/ProductHeader";
import {
    ListItem,
    ListItemIcon,
    ListItemText,Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";

import HelpIcon from '@mui/icons-material/Help';
import {TabsList, TabPanel, Tab, TabButton} from "../../components/Global/Tab";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {useState} from "react";

import useLocale from "../../locales/useLocale";

import MemoryIcon from '@mui/icons-material/Memory';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import StorageIcon from '@mui/icons-material/Storage';
import ProductCardMC from "../../components/Cards/ProductCardMC";
import discordLogo from "../../components/assets/social/discord.png";
import vkLogo from "../../components/assets/social/vkontakte.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CoreVanilla from "../../components/assets/logos/minecraft.png"
import CorePaper from "../../components/assets/logos/mccore/paper.png"
import CoreSpigot from "../../components/assets/logos/mccore/spigot.png"
import CoreFabric from "../../components/assets/logos/mccore/fabric.png"
import CoreQuilt from "../../components/assets/logos/mccore/quilt.png"
import CoreForge from "../../components/assets/logos/mccore/forge.png"
import CoreSponge from "../../components/assets/logos/mccore/sponge.png"
import CoreFolia from "../../components/assets/logos/mccore/folia.png"
import CorePurpur from "../../components/assets/logos/mccore/purpur.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPuzzlePiece} from "@fortawesome/free-solid-svg-icons";

export default function MC(props) {
    const locale = useLocale(props.router)
    const [tab, setTab] = useState("dynamic")

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav mainpage />
            <div className={styles.main}>
            <ProductHeader img={BannerMC} title={locale.get('prodmc.title')} text={locale.get('prodmc.titletext')}
                primaryText={locale.get('prodmc.titlecloud')} primaryLink="#cloud"/>
                <h2 className="text-center mt-12 mb-8 text-white text-3xl">{locale.get('prodmc.tariffs')}</h2>
                <p className="text-center">Ресурсы</p>
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)} class=" w-fit mx-auto">
                    <TabsList className="mx-auto text-center">
                        <Tab value="dynamic" className="!w-fit">Динамические</Tab>
                        <Tab value="static" className="!w-fit">Статические</Tab>
                    </TabsList>
                    <TabPanel value="dynamic" className="border-none !p-0">
                        <div className="bg-[var(--active-color)] glassb rounded-xl flex mx-auto justify-around gap-4 lg:gap-2 flex-col w-2/3 md:w-[61rem] md:flex-row p-2">
                            <div className="flex flex-col flex-1 gap-2">
                                <p className="text-lg text-center my-0 gap-2">🤔 Что это такое?</p>
                                <span className="ml-2">
                                    Мы заставляем Minecraft-сервера отдавать неиспользуемую память,что позволяет серверам без
                                    игроков потреблять меньше ресурсов и отдавать их тем, кому они действительно нужны.
                                </span>
                                <span className="ml-2">
                                    Например при выборе тарифа <b>Reforged</b>:<br/>
                                    вы получите 2 выделенных ядра под ваш сервер и 4➝8 ГБ ОЗУ (4 ГБ гарантированно и 8 ГБ
                                    максимум)
                                </span>
                            </div>
                            <div className="flex flex-col flex-1 gap-2">
                                <p className="text-lg text-center my-0">🤨 Подойдет ли мне это?</p>
                                <span className="ml-2">
                                    ✅ Вам данные тарифы подойдут в большинстве случаев, позволяя сэкономить деньги за ресурсы,
                                    которыми вы не пользуетесь.
                                </span>
                                <span className="ml-2">
                                    ❌ Если вы хотите создать технический сервер и использовать субтиковую механику Minecraft,
                                    асинхронные линии или lazy-чанки, то вам лучше подойдут тарифы со статическими ресурсами.
                                </span>
                            </div>
                            <div className="flex flex-col flex-1 gap-2">
                                <p className="text-lg text-center my-0">🤒 Какие есть минусы?</p>
                                <span className="ml-2">🐢 Новые чанки могут загружаться медленнее (не влияет на чанки, где вы были хоть раз)</span>
                                <span className="ml-2">???</span>
                            </div>
                        </div>
                        <div className={`${styles.productCardGrid} ${styles.productCardGridMC}`} id="cloud">
                            {tariffs.dynamic.map((tariff, i)=>{
                                return <ProductCardMC key={i} title={tariff.title} id={tariff.id} btnText={`${tariff.price}₽/мес`} link={`order/mc?t=d${i+1}`}>
                                    <ListItem>
                                        <ListItemIcon><MemoryIcon/></ListItemIcon>
                                        <ListItemText primary={`${tariff.cpus} ${corePrint(tariff.cpus)}`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                                        <ListItemText primary={`${tariff.minRam} ➝ ${tariff.maxRam} ГБ RAM`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><StorageIcon/></ListItemIcon>
                                        <ListItemText primary={`NVMe SSD на ${tariff.ssd} ГБ`}/>
                                    </ListItem>
                                </ProductCardMC>
                            })}
                            <img src="https://purepng.com/public/uploads/large/purepng.com-donutdonutdoughnutsweetsnack-1411527416158xueuy.png"
                            className="saturate-0 opacity-10 w-80 hidden lg:block" />
                        </div>
                    </TabPanel>
                    <TabPanel value="static" className="border-none !p-0">
                        <div className={`${styles.productCardGrid} ${styles.productCardGridMC}`} id="cloud">
                            {tariffs.static.map((tariff, i)=>{
                                return <ProductCardMC key={i} title={tariff.title} id={tariff.id} btnText={`${tariff.price}₽/мес`} link={`order/mc?t=s${i+1}`}>
                                    <ListItem>
                                        <ListItemIcon><MemoryIcon/></ListItemIcon>
                                        <ListItemText primary={`${tariff.cpus} ${corePrint(tariff.cpus)}`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                                        <ListItemText primary={`${tariff.maxRam} ГБ RAM`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon><StorageIcon/></ListItemIcon>
                                        <ListItemText primary={`NVMe SSD на ${tariff.ssd} ГБ`}/>
                                    </ListItem>
                                </ProductCardMC>
                            })}
                        </div>
                    </TabPanel>
                </TabsUnstyled>
            </div>

            <p className="text-center">Дополнительные услуги:</p>

            <div className="flex flex-col lg:flex-row w-fit gap-4 mx-auto justify-around">
                <div className="bg-[var(--active-color)] glassb rounded-xl flex mx-auto flex-col xl:m-0 w-80">
                    <p className="m-2">Выделенный IP + Порт 25565 = 100p</p>
                </div>
                <div className="bg-[var(--active-color)] glassb rounded-xl flex mx-auto flex-col xl:m-0 w-80">
                    <p className="m-2">База Данных = бесплатно</p>
                </div>
                <div className="bg-[var(--active-color)] glassb rounded-xl flex mx-auto flex-col xl:m-0 w-80">
                    <p className="m-2">+10ГБ на SSD = 50р</p>
                </div>
            </div>



            <h3 className="mt-8 text-center mb-0">Не знаете какой тариф выбрать? Мы тоже!</h3>
            <p className="text-center">Напишите нам в поддержку и мы поможем вам с выбором</p>
            <div className="m-2 flex flex-col items-center justify-center lg:flex-row">
                <a className="flex gap-2 justify-center items-center box-border border-2 border-transparent hover:border-white transition-all duration-300 border-solid rounded-lg pr-2 m-2"
                   href="https://discord.gg/fruitspace">
                    <img className="invert h-10" src={discordLogo.src} alt="discord"/>
                    <div className="flex flex-col">
                        <span>FruitSpace</span>
                        <span className="text-xs ml-1 text-gray-400">/tickets</span>
                    </div>
                </a>
                <a className="flex gap-2 justify-center items-center box-border border-2 border-transparent hover:border-white transition-all duration-300 border-solid rounded-lg pr-2 m-2"
                   href="https://vk.com/fruit_space">
                    <img className="invert h-10" src={vkLogo.src} alt="discord"/>
                    <div className="flex flex-col">
                        <span>FruitSpace</span>
                        <span className="text-xs ml-1 text-gray-400">лс паблика</span>
                    </div>
                </a>
            </div>

            <h2 className="text-center mt-12 mb-8 text-white text-3xl">FAQ</h2>
            <div className="mx-4 rounded-xl mb-24">
                <Accordion className="bg-[var(--active-color)] text-white !rounded-xl glassb">
                    <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} className="text-lg">Какое ядро мне выбрать?</AccordionSummary>
                    <AccordionDetails className="bg-[var(--bkg-color)] rounded-lg m-2 flex flex-col gap-4">
                        <div className="flex gap-4">
                            <img src={CoreVanilla.src} className="saturate-[25%] w-16 h-16" />
                            <div className="mt-2">
                                <p className="text-3xl my-0 font-[Coolvetica]">Vanilla</p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreSpigot.src} className="opacity-80 w-12 h-12 m-2" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex items-baseline gap-2">Spigot <PluginBadge/></p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CorePaper.src} className="saturate-[50%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex items-baseline gap-2">Paper <PluginBadge/></p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CorePurpur.src} className="saturate-[50%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex items-baseline gap-2">Purpur <PluginBadge/></p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreFolia.src} className="saturate-[75%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex items-baseline gap-2">Folia</p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <img src={CoreFabric.src} className="saturate-[75%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex items-baseline gap-2">Fabric <ForgeBadge/></p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreForge.src} className="saturate-[50%] w-12 h-12 m-2" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex items-baseline gap-2">Forge <ForgeBadge/></p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreQuilt.src} className="saturate-[25%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex items-baseline gap-2">Quilt <ForgeBadge/></p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreSponge.src} className="saturate-[50%] w-12 h-12 m-2" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex items-baseline gap-2">Sponge Vanilla <PluginBadge/></p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreSponge.src} className="saturate-[50%] w-12 h-12 m-2" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex items-baseline gap-2">Sponge Forge <PluginBadge/> <ForgeBadge/></p>
                                <p className="ml-2 my-0">fefergege</p>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>



            <Footer router={props.router}/>
        </>
    )
}

const PluginBadge = ()=>{
    return <span className="cursor-pointer hover:w-20 transition-all w-4 overflow-hidden rounded-md px-1 bg-yellow-600 h-6 flex items-center font-sans text-sm gap-2">
        <FontAwesomeIcon className="ml-0.5" icon={faPuzzlePiece} /> Плагины
    </span>
}

const ForgeBadge = ()=>{
    return <span className="cursor-pointer hover:w-16 transition-all w-4 overflow-hidden rounded-md px-1 bg-green-700 h-6 flex items-center font-sans text-sm gap-2">
        <svg className="!w-4 !h-4 inline min-w-[1rem] fill-white" viewBox="0 0 256 256">
            <path d="M248,91.3V67H80v8H9c0,0,10.7,40.6,67.3,40.6c30.3,0,34.4,12.7,34.4,19.1c0,8.4-5.1,21.9-36.7,32.8V191h38.7c6.8-5.2,15.3-8.2,24.5-8.2s17.7,3.1,24.5,8.2H201c0,0,0-15.1,0-22.9c-23.4-7.7-38.7-20.4-38.7-34.8C162.3,110.6,200.1,92.5,248,91.3z M80,87c-52,0-52-4-52-4h52C80,83,80,85.4,80,87z M88,79v-4h152v4H88z"/>
        </svg> Моды
    </span>
}

const corePrint = (n) => {
    n%=10
    if (n==1) return "ядро"
    if (1<n && n<5) return "ядра"
    return "ядер"
}


const tariffs = {}
tariffs.dynamic = [
    {
        title: "Next ⋙",
        id: "D-1 S",
        price: 350,
        cpus: 1,
        minRam: 2,
        maxRam: 4,
        ssd: 20
    },
    {
        title: "Reforged",
        id: "D-2 S+",
        price: 700,
        cpus: 2,
        minRam: 4,
        maxRam: 8,
        ssd: 30
    },
    {
        title: "EverPeak",
        id: "D-3 M",
        price: 1300,
        cpus: 3,
        minRam: 8,
        maxRam: 12,
        ssd: 45
    },
    {
        title: "Orbital",
        id: "D-4 M+",
        price: 1700,
        cpus: 4,
        minRam: 8,
        maxRam: 16,
        ssd: 60
    },
    {
        title: "Horizon",
        id: "D-5 L",
        price: 2600,
        cpus: 5,
        minRam: 16,
        maxRam: 24,
        ssd: 100
    },
]

tariffs.static = [
    {
        title: "Air",
        id: "S-1 S~",
        price: 550,
        cpus: 1,
        maxRam: 4,
        ssd: 30
    },
    {
        title: "Viper",
        id: "S-2 S++",
        price: 1000,
        cpus: 2,
        maxRam: 8,
        ssd: 40
    },
    {
        title: "Carbon",
        id: "S-3 M~",
        price: 1500,
        cpus: 3,
        maxRam: 12,
        ssd: 60
    },
    {
        title: "Proton",
        id: "S-4 M++",
        price: 2300,
        cpus: 4,
        maxRam: 16,
        ssd: 80
    },
    {
        title: "Warp",
        id: "S-5 L+",
        price: 3200,
        cpus: 5,
        maxRam: 24,
        ssd: 120
    },
]