import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import styles from "@/components/Index.module.css";
import Footer from "@/components/Global/Footer";
import BannerMC from "@/assets/BannerMC.png";
import {
    ListItem,
    ListItemIcon,
    ListItemText,Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";

import {useState} from "react";

import useLocale from "@/locales/useLocale";

import MemoryIcon from '@mui/icons-material/Memory';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import StorageIcon from '@mui/icons-material/Storage';
import ProductCardMC from "@/components/Cards/ProductCardMC";
import discordLogo from "@/assets/social/discord.png";
import vkLogo from "@/assets/social/vkontakte.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CoreVanilla from "@/assets/logos/minecraft.png"
import CorePaper from "@/assets/logos/mccore/paper.png"
import CoreSpigot from "@/assets/logos/mccore/spigot.png"
import CoreFabric from "@/assets/logos/mccore/fabric.png"
import CoreQuilt from "@/assets/logos/mccore/quilt.png"
import CoreForge from "@/assets/logos/mccore/forge.png"
import CoreSponge from "@/assets/logos/mccore/sponge.png"
import CoreFolia from "@/assets/logos/mccore/folia.png"
import CorePurpur from "@/assets/logos/mccore/purpur.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBarsProgress,
    faCogs,
    faDatabase,
    faFloppyDisk, faForward, faHardDrive,
    faInfinity, faMemory, faMicrochip,
    faPuzzlePiece,
    faServer,
    faZap
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {Button, Segmented} from "antd";
import Script from "next/script";
import {faItunesNote} from "@fortawesome/free-brands-svg-icons";

export default function MC(props) {
    const locale = useLocale(props.router)
    const [tab, setTab] = useState("dynamic")

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav mainpage />
            <div className={styles.main}>

                <div className="rounded-t-2xl h-112 relative select-none">
                    <Image className="rounded-t-2xl" src={BannerMC} fill="object-fit" objectFit="cover" layout="fill"
                           quality={100}/>
                    <div
                        className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-dark from-15% to-transparent flex flex-col gap-2">
                        <p className="text-3xl">Хостинг Minecraft</p>
                        <p>
                            Вам нужен стабильный сервер для игры с друзьями, или вы хотите создать крупную сеть серверов
                            на несколько сотен человек? С FruitSpace это проще, чем вы думаете.
                        </p>
                        <div className="flex flex-col laptop:flex-row gap-4">
                            <Button className="uppercase font-semibold" type="primary" size="large"
                                    icon={<FontAwesomeIcon icon={faZap}/>}
                                    onClick={() => orderRef.current.scrollIntoView({behavior: 'smooth'})}>
                                заказать на fruitspace
                            </Button>
                        </div>
                    </div>
                </div>
                <h2 className="text-center mt-12 text-5xl uppercase font-semibold">Тарифы</h2>
                <p className="text-center font-mono">на любой вкус</p>

                <div className="mt-4 flex justify-center">
                    <Segmented rootClassName="bg-btn select-none glassb" options={[
                        {value: "dynamic", label: "Динамические"},
                        {value: "static", label: "Статические"}
                    ]} defaultValue={tab} onChange={setTab}/>
                </div>

                {tab === "dynamic" &&
                    <div className={`${styles.productCardGrid} ${styles.productCardGridMC}`} id="cloud">
                        <div
                            className="p-4 bg-active glassb rounded-2xl flex mx-auto justify-around gap-4 w-fit ipad:w-[62rem] flex-col ipad:flex-row col-span-1 ipad:col-span-3">
                            <div className="flex flex-col flex-1 gap-4">
                                <p className="text-lg text-center my-0 gap-2">🤔 Что это такое?</p>
                                <span className="ml-2 text-sm">
                                    Мы заставляем Minecraft-сервера отдавать неиспользуемую память, что позволяет серверам без
                                    игроков потреблять меньше ресурсов и отдавать их тем, кому они действительно нужны.
                                </span>
                                <span className="ml-2 text-sm">
                                    Например при выборе тарифа <b>Reforged</b>:<br/>
                                    вы получите 2 выделенных ядра под ваш сервер и 4➝8 ГБ ОЗУ (4 ГБ гарантированно и 8 ГБ
                                    максимум)
                                </span>
                            </div>
                            <div className="flex flex-col flex-1 gap-4">
                                <p className="text-lg text-center my-0">🤨 Подойдет ли мне это?</p>
                                <span className="ml-2 text-sm">
                                    ✅ Вам данные тарифы подойдут в большинстве случаев, позволяя сэкономить деньги за ресурсы,
                                    которыми вы не пользуетесь.
                                </span>
                                <span className="ml-2 text-sm">
                                    ❌ Если вы хотите создать технический сервер и использовать субтиковую механику Minecraft,
                                    асинхронные линии или lazy-чанки, то вам лучше подойдут тарифы со статическими ресурсами.
                                </span>
                            </div>
                        </div>
                        {tariffs.dynamic.map((tariff, i) => {
                            return <ProductCardMC key={i} title={tariff.title} id={tariff.id} about={tariff.about}
                                                  btnText={`${tariff.price}₽/мес`} link={`order/mc?t=d${i + 1}`}>
                                {[
                                    [faMicrochip, `${tariff.cpus} ${corePrint(tariff.cpus)}`],
                                    [faMemory, `${tariff.minRam} ➝ ${tariff.maxRam} ГБ RAM`],
                                    [faHardDrive, `SSD на ${tariff.ssd} ГБ`],
                                ].map((e, i) => <span className="flex gap-4 items-center" key={i}>
                                    <div className="flex justify-center !w-8">
                                        <FontAwesomeIcon className="text-2xl" icon={e[0]}/>
                                    </div> <span className="flex-1">{e[1]}</span>
                                </span>)}
                            </ProductCardMC>
                        })}
                    </div>
                }
                {tab === "static" &&
                    <div className={`${styles.productCardGrid} ${styles.productCardGridMC}`} id="cloud">
                        {tariffs.static.map((tariff, i) => {
                            return <ProductCardMC key={i} title={tariff.title} id={tariff.id}
                                                  btnText={`${tariff.price}₽/мес`} link={`order/mc?t=s${i + 1}`}>
                                {[
                                    [faMicrochip, `${tariff.cpus} ${corePrint(tariff.cpus)}`],
                                    [faMemory, `${tariff.maxRam} ГБ RAM`],
                                    [faHardDrive, `NVMe SSD на ${tariff.ssd} ГБ`],
                                ].map((e, i) => <span className="flex gap-4 items-center" key={i}>
                                    <div className="flex justify-center !w-8">
                                        <FontAwesomeIcon className="text-2xl" icon={e[0]}/>
                                    </div> <span className="flex-1">{e[1]}</span>
                                </span>)}
                            </ProductCardMC>
                        })}
                        <img
                            src="https://purepng.com/public/uploads/large/purepng.com-donutdonutdoughnutsweetsnack-1411527416158xueuy.png"
                            className="saturate-0 opacity-10 w-80 hidden laptop:block"
                            aria-description="Не задавайте вопросы. Это пончик"/>
                    </div>
                }
            </div>

            <p className="mt-16 text-center font-mono">Дополнительные услуги</p>

            <div className="mt-4 flex flex-col laptop:flex-row w-fit gap-4 mx-auto justify-around">
                <div className="bg-active glassb rounded-2xl mx-auto desktop:m-0 w-80 relative">
                    <div className="flex flex-col gap-2 m-4">
                        <div className="flex items-center gap-4">
                            <FontAwesomeIcon icon={faServer} className="!w-12 !h-12"/>
                            <p>Порт 25565</p>
                        </div>
                        <div className="mt-auto flex items-center gap-4 justify-between">
                            <span className="text-xs text-gray-300">При заказе сервера</span>
                            <p className="text-nowrap px-2 py-1 rounded-lg bg-primary w-fit select-none">100
                                ₽/мес</p>
                        </div>
                    </div>
                </div>
                <div className="bg-active glassb rounded-2xl mx-auto desktop:m-0 w-80">
                    <div className="flex flex-col gap-2 m-4">
                        <div className="flex items-center gap-4">
                            <FontAwesomeIcon icon={faDatabase} className="!w-12 !h-12"/>
                            <p>База данных MySQL</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                            <span className="text-xs text-gray-300">Доступно по умолчанию</span>
                            <p className="text-nowrap px-2 py-1 rounded-lg bg-primary w-fit select-none">0 ₽/мес</p>
                        </div>
                    </div>
                </div>
                <div className="bg-active glassb rounded-2xl mx-auto desktop:m-0 w-80">
                    <div className="flex flex-col gap-2 m-4">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faFloppyDisk} className="!w-12 !h-12" />
                            <p className="m-2">Доп. диск +10 ГБ</p>
                        </div>
                        <div className="mt-auto flex items-center gap-4 justify-between">
                            <span className="text-xs text-gray-300">Добавляйте сколько угодно места</span>
                            <p className="text-nowrap px-2 py-1 rounded-lg bg-primary w-fit select-none">50 ₽/мес</p>
                        </div>
                    </div>
                </div>
            </div>



            <h3 className="mt-8 text-center mb-0">Не знаете какой тариф выбрать?</h3>
            <p className="text-center">Напишите нам в поддержку и мы поможем вам с выбором</p>
            <div className="m-2 flex flex-col items-center justify-center laptop:flex-row">
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
            <div className="mx-4 rounded-xl mb-24 flex flex-col gap-4">
                <Accordion className="bg-[var(--active-color)] text-white !rounded-xl glassb">
                    <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} className="text-lg">Какое ядро мне выбрать?</AccordionSummary>
                    <AccordionDetails className="bg-[var(--bkg-color)] rounded-lg m-2 flex flex-col gap-4">
                        <div className="flex gap-4">
                            <img src={CoreVanilla.src} className="saturate-[25%] w-16 h-16" />
                            <div className="mt-2">
                                <p className="text-3xl my-0 font-[Coolvetica]">Vanilla</p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Стандартное ядро Minecraft, предоставляемое Mojang. Рекомендуется для игры с лицензионными клиентами
                                    и включенным белым списком, так как нету возможности сделать вход по паролю (Без BungeeCord и подобных).
                                    Плагины и моды не поддерживаются, есть поддержка датапаков.
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreSpigot.src} className="opacity-80 w-12 h-12 m-2" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex flex-col laptop:flex-row items-baseline gap-2">Spigot <PluginBadge/></p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Универсальное решение для вашего сервера. Данное ядро поддерживает плагины, но при этом оставляет
                                    все баги и особенности ванильного Minecraft, которые можно использовать в своих целях: удаление портала
                                    в энд с помощью гриба, &quot;правильная&quot; прогрузка lazy-чанков, area-/memory- баны и многое другое.
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CorePaper.src} className="saturate-[50%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex flex-col laptop:flex-row items-baseline gap-2">Paper <PluginBadge/></p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Золотой стандарт среди ядер. Ядро поддерживает все плагины для Spigot и Paper, а также применяет множество
                                    оптимизаций и фиксов для улучшения производительности. С этим ядром ваш сервер будет быстрее и безопаснее,
                                    однако если вы используете баги Minecraft для своих целей, выберите Spigot.
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CorePurpur.src} className="saturate-[50%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex flex-col laptop:flex-row items-baseline gap-2">Purpur <PluginBadge/></p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Представьте Paper, но быстрее, с большей гибкостью и огромным количеством настроек. Представили? Это оно.
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreFolia.src} className="saturate-[75%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex flex-col laptop:flex-row items-baseline gap-2">Folia</p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Разработчики Paper оптимизировали ядро насколько возможно, но уперлись в ограничения самой игры:
                                    Minecraft почти все действия выполняет на одном ядре процессора. Поэтому они переписали сервер с нуля,
                                    чтобы улучшить производительность еще сильнее, и им удалось. Например, 2B2T смог обновиться до 1.19
                                    именно благодаря Folia. Однако это чудо-ядро не поддерживает плагины Paper и Spigot и требует от разрабочиков
                                    плагинов специальной поддержки многопоточности.
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <img src={CoreFabric.src} className="saturate-[75%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex flex-col laptop:flex-row items-baseline gap-2">Fabric <ForgeBadge/></p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Современный движок модов для Minecraft. Ставьте все те моды, которые вы использовали у себя на ПК
                                    прямо на сервер (игрокам тоже нужно будет установить Fabric). Но есть и минусы: это ядро не
                                    поддерживает плагины.
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreForge.src} className="saturate-[50%] w-12 h-12 m-2" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex flex-col laptop:flex-row items-baseline gap-2">Forge <ForgeBadge/></p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Этот движок для модов одним из первых позволил модифицировать Minecraft от версии 1.1 до последней.
                                    Хоть он и считается устаревшим, он используется до сих пор и имеет огромное количество поддерживаемых
                                    модов для вашей любимой игры.
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreQuilt.src} className="saturate-[25%] w-16 h-16" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex flex-col laptop:flex-row items-baseline gap-2">Quilt <ForgeBadge/></p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Свежий движок для модов, созданный для высокой производительности и модульности. Однако он
                                    все еще в бете и может быть нестабилен, а количество модов пока небольшое, но растет.
                                    Используйте на свой страх и риск.
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreSponge.src} className="saturate-[50%] w-12 h-12 m-2" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex flex-col laptop:flex-row items-baseline gap-2">Sponge Vanilla <PluginBadge/></p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Еще одна команда решила создать ядро, использующее свою систему плагинов. Используйте его,
                                    если знаете что делаете.
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <img src={CoreSponge.src} className="saturate-[50%] w-12 h-12 m-2" />
                            <div className="">
                                <p className="text-3xl my-0 font-[Coolvetica] flex flex-col laptop:flex-row items-baseline gap-2">Sponge Forge <PluginBadge/> <ForgeBadge/></p>
                                <span className="ml-2 my-0 text-gray-300">
                                    Почему нельзя установить и плагины, и моды? Разработчики данного ядра подумали тоже самое и сделали
                                    SpongeForge, основанный на Sponge и его экосистеме плагинов, но с поддержкой модов Forge.
                                </span>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion className="bg-[var(--active-color)] text-white !rounded-xl glassb">
                    <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} className="text-lg">Что за мутная схема с динамическими ресурсами?</AccordionSummary>
                    <AccordionDetails className="bg-[var(--bkg-color)] rounded-lg m-2 flex flex-col">
                        <p className="text-gray-300">
                            Мы рады, что вы беспокоитесь о своем сервере. Чтобы объяснить что такое динамические ресурсы,
                            необходимо объяснить, как работает хостинг. Но сначала цитата из описания:
                        </p>
                        <p className="m-0 py-2 border-l-2 border-0 border-solid border-white pl-2 text-gray-300 text-sm">
                            Мы заставляем Minecraft-сервера отдавать неиспользуемую память, что позволяет серверам без игроков потреблять меньше ресурсов и отдавать их тем, кому они действительно нужны.
                        </p>
                        <p className="text-gray-300">
                            Когда вы арендуете сервер, он размещается вместе с другими серверами на физической машине, которая делит ресурсы между ними.
                            Но будем честны, большинство игроков играет днем, а ночью сервер стоит почти пустой. Minecraft, к сожалению, не отдает
                            оперативную память даже когда сервер пустой.
                        </p>
                        <p className="my-0 text-gray-300">
                            Например, трое друзей решило на выходных взорвать 200К динамита, в результате чего сервер использовал 14GB RAM,
                            и все будни сервер оставался пустым, не отдавая память никому. Не очень эффективно, не правда ли? Это можно решить
                            перезапуском сервера, но зачем?
                        </p>
                        <p className="text-gray-300">
                            Столкнувшись с этой проблемой, мы решили посмотреть, как с этим справляются другие. Мы арендовали серверы у 11 популярных
                            Minecraft-хостингов на месяц и выяснили следующее: 8 из 11 хостингов похоже устанавливают лимит оперативной памяти в 150%
                            или 200% в надежде, что серверы не будут использовать всю память, данную тарифом. Результаты ожидаемые: регулярные лаги и ошибки
                            OutOfMemory, хотя по конфигурации свободной памяти должно было хватать...
                        </p>
                        <p className="my-0 text-gray-300">
                            Мы так делать не собирались, поэтому в результате долгих поисков решили проблему по-другому. Оказывается Minecraft отдает память,
                            проблема находится в Java VM, на которой работает Minecraft - именно она не отдает память. А с этим зверем у нас опыт уже был.
                            Свое решение мы испытывали 3 месяца всем, чем только можно: от обычной игры и быстрой прогрузки чанков до лаг-машин и тяжелых плагинов.
                        </p>
                        <p className="text-gray-300">
                            Так и появилась система динамических ресурсов. А благодаря нашей секретной методике Честность™, вы тоже знаете как это работает.
                            Теперь к сути, как это выглядит с вашей стороны?
                        </p>
                        <p className="my-0 text-gray-300">
                            Покупая тариф Orbital, вы получаете 3 ядра процессора, 8 Гб RAM минимум и 16 Гб RAM максимум. 8 Гб ваши навсегда, их хостинг не тронет
                            даже если ваш сервер пустой. Остальные <span className="whitespace-nowrap">16-8=8 Гб</span> будут доступны в зависимости от нагрузки
                            остальных серверов. Поэтому у вас в панели может регулярно меняться количество доступной ОЗУ. Прежде чем отдать или забрать лишнюю память,
                            сервер получает предупреждение, поэтому это не приводит к крашам и ошибкам.
                        </p>
                        <p className="text-gray-300">
                            &quot;Зачем такие сложности??? Вы можете просто хостить сервера нормально с фиксированным количеством ресурсов?&quot; — конечно, для этого у нас есть
                            тарифы со статическими ресурсами, они полностью ваши и хостятся на отдельных машинах чтобы гарантировать это. Однако используя
                            динамические ресурсы, вы экономите деньги за то, чем не пользуетесь. Если ваши игроки из Камчатки выходят из игры на ночь, то это
                            позволяет серверам с игроками из европейской зоны получить больше ресурсов, которые им нужны. В то же время это позволяет нам разместить
                            больше серверов на текущем оборудовании, имея время на закупку нового (доставка бывает долгой, а никто не хочет смотреть на надпись об
                            отсутствии доступных ресурсов для создания сервера)
                        </p>
                        <p className="my-0 text-gray-300">
                            Появилось больше вопросов чем ответов? Напишите нам в тех.поддержку в ВК или Discord и мы вам все расскажем)
                        </p>
                    </AccordionDetails>
                </Accordion>
            </div>



            <Footer router={props.router}/>
        </>
    )
}

MC.jivo = true

const PluginBadge = ()=>{
    return <span className="cursor-pointer laptop:hover:w-20 transition-all w-20 laptop:w-4 overflow-hidden rounded-md px-1 bg-yellow-600 h-6 flex items-center font-sans text-sm gap-2">
        <FontAwesomeIcon className="ml-0.5" icon={faPuzzlePiece} /> Плагины
    </span>
}

const ForgeBadge = ()=>{
    return <span className="cursor-pointer laptop:hover:w-16 transition-all w-16 laptop:w-4 overflow-hidden rounded-md px-1 bg-green-700 h-6 flex items-center font-sans text-sm gap-2">
        <svg className="!w-4 !h-4 inline min-w-[1rem] fill-white" viewBox="0 0 256 256">
            <path d="M248,91.3V67H80v8H9c0,0,10.7,40.6,67.3,40.6c30.3,0,34.4,12.7,34.4,19.1c0,8.4-5.1,21.9-36.7,32.8V191h38.7c6.8-5.2,15.3-8.2,24.5-8.2s17.7,3.1,24.5,8.2H201c0,0,0-15.1,0-22.9c-23.4-7.7-38.7-20.4-38.7-34.8C162.3,110.6,200.1,92.5,248,91.3z M80,87c-52,0-52-4-52-4h52C80,83,80,85.4,80,87z M88,79v-4h152v4H88z"/>
        </svg> Моды
    </span>
}

const corePrint = (n) => {
    n%=10
    if (n==1) return "ядро"
    if (n<1 || 1<n && n<5) return "ядра"
    return "ядер"
}


const tariffs = {}
tariffs.dynamic = [
    {
        title: "Slingshot",
        about: "Для Bungeecord и мини-лобби",
        id: "Lite",
        price: 149,
        cpus: 0.25,
        minRam: 0.5,
        maxRam: 2,
        ssd: 5
    },
    {
        title: "Next ⋙",
        about: "Мы знаем, что вы выберите его",
        id: "D-1 S",
        price: 349,
        cpus: 1,
        minRam: 2,
        maxRam: 4,
        ssd: 20
    },
    {
        title: "Reforged",
        about: "Выкован для новых версий",
        id: "D-2 M",
        price: 699,
        cpus: 2,
        minRam: 4,
        maxRam: 8,
        ssd: 30
    },
    {
        title: "EverPeak",
        about: "Для высоких амбиций — высокие требования",
        id: "D-3 L",
        price: 1299,
        cpus: 3,
        minRam: 8,
        maxRam: 12,
        ssd: 45
    },
    {
        title: "Orbital",
        about: "Для публичных серверов с непостоянной нагрузкой",
        id: "D-4 XL",
        price: 1699,
        cpus: 4,
        minRam: 8,
        maxRam: 16,
        ssd: 60
    },
    {
        title: "Horizon",
        about: "Превосходный выбор.",
        id: "D-5 XXL",
        price: 2599,
        cpus: 5,
        minRam: 16,
        maxRam: 24,
        ssd: 100
    },
]

tariffs.static = [
    {
        title: "Air",
        id: "S-1 S+",
        price: 550,
        cpus: 1,
        maxRam: 4,
        ssd: 30
    },
    {
        title: "Viper",
        id: "S-2 M+",
        price: 1000,
        cpus: 2,
        maxRam: 8,
        ssd: 40
    },
    {
        title: "Carbon",
        id: "S-3 L+",
        price: 1500,
        cpus: 3,
        maxRam: 12,
        ssd: 60
    },
    {
        title: "Proton",
        id: "S-4 XL+",
        price: 2300,
        cpus: 4,
        maxRam: 16,
        ssd: 80
    },
    {
        title: "Warp",
        id: "S-5 XXL+",
        price: 3200,
        cpus: 5,
        maxRam: 24,
        ssd: 120
    },
]