import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import BannerGD from "../../assets/BannerGD.png"
import ProductHeader from "../../components/Global/ProductHeader";
import ProductCardGD from "../../components/Cards/ProductCardGD";
import {
    Button as MuiButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import CloudDoneIcon from "@mui/icons-material/CloudDone";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AppleIcon from "@mui/icons-material/Apple";
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';

import FeatureCard from "../../components/Cards/FeatureCard";

import FeatureCoreImg from "../../assets/features/core_3d-sm.png"
import FeatureShieldImg from "../../assets/features/shield_3d-sm.png"
import FeatureSetupImg from "../../assets/features/autosetup_3d-sm.png"
import FeatureMusicImg from "../../assets/features/music_3d-sm.png"
import useLocale, {useGlobalLocale} from "../../locales/useLocale";
import discordLogo from "@/assets/social/discord.png";
import GitHubIcon from "../../assets/logos/GithubIcon.png";
import Image from "next/image";
import {Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCog,
    faCogs,
    faDownload, faEllipsis,
    faGem, faListDots,
    faMap,
    faMask, faPaintbrush, faPen,
    faServer,
    faTheaterMasks,
    faZap
} from "@fortawesome/free-solid-svg-icons";
import {useRef} from "react";

import ScreenshotGaus from "@/assets/screenshots/gd_gaus2.png"
import ScreenshotPacks from "@/assets/screenshots/gd_editpacks.png"



export default function GD(props) {
    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const orderRef = useRef(null)
    const selfRef = useRef(null)

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav mainpage router={props.router} />
            <div className={styles.main}>
                <div className="rounded-t-2xl h-112 relative select-none">
                    <Image className="rounded-t-2xl" src={BannerGD} fill="object-fit" objectFit="cover" layout="fill"
                           quality={100}/>
                    <div
                        className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-dark from-15% to-transparent flex flex-col gap-2">
                        <p className="text-3xl">Хостинг GDPS</p>
                        <p>Уютное место для игры с друзьями или крупнейший сервер в РК. Мощности хватит на все.</p>
                        <div className="flex flex-col lg:flex-row gap-4">
                            <Button className="uppercase font-semibold" type="primary" size="large"
                                    icon={<FontAwesomeIcon icon={faZap}/>}
                                    onClick={() => orderRef.current.scrollIntoView({behavior: 'smooth'})}>
                                заказать на fruitspace
                            </Button>
                            <Button className="uppercase font-semibold" size="large"
                                    icon={<FontAwesomeIcon icon={faServer}/>}
                                    onClick={() => selfRef.current.scrollIntoView({behavior: 'smooth'})}>
                                запустить на своем сервере
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse lg:flex-row">
                    <div className="flex flex-col p-8 flex-1">
                        <p className="font-mono">простая и функиональная</p>
                        <p className="text-5xl uppercase font-semibold">панель</p>
                        <div className="border-l-4 border-white h-96 p-4 text-lg max-w-3xl flex flex-col gap-4">
                            <p>
                                Забудьте про головную боль с настройкой через PHP файлы и БД. Сосредоточьтесь на своем сообществе,
                                а мы позаботимся обо всем остальном
                            </p>
                            <p>
                                Что можно настроить?
                                <ul className="list-none list-inside text-base">
                                    {[
                                        [faGem, "Лут сундуков"],
                                        [faMap, "Маппаки и гаунтлеты"],
                                        [faTheaterMasks, "Роли модераторов и косметические роли"],
                                        [faDownload, "Страницу загрузки"],
                                        [faCog, "Моды и текстуры (прямо в панели!)"],
                                        [faPaintbrush, "Дейли и задания"],
                                        [faEllipsis, "...и много чего еще"]
                                    ].map((e,i)=> <li className="flex gap-2 items-center" key={i}><FontAwesomeIcon className="w-4" icon={e[0]} /> {e[1]}</li>)}
                                </ul>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col relative flex-1">
                        <img src={ScreenshotGaus.src} className="lg:object-none object-left-top object-cover h-64 lg:h-full" />
                        {/*<div className="absolute h-full w-full z-10 bg-gradient-to-t from-dark from-15% to-50%"></div>*/}
                        {/*<div className="absolute h-full w-full z-10 bg-gradient-to-l from-dark to-50%"></div>*/}
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-center font-mono">полный</p>
                    <p className="text-5xl uppercase font-semibold text-center">кастом</p>
                    <p className="text-center ">хостинг построен с нуля специально для Geometry Dash</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        <div className="flex gap-4 bg-active border-subtle rounded-2xl border-solid border-[1px]">
                            <img src={FeatureCoreImg.src} className="w-[17rem]"/>
                            <div className="flex flex-col gap-2 p-4 text-sm">
                                <p className="text-2xl font-semibold rainbow mb-2">Ядро GhostCore</p>
                                <p className="text-base">Написано с нуля на Go и быстрее Cvolton в 8-15 раз</p>
                                <p>Встроенный рейт-бот, антиспам, антинакрутка и антибот</p>
                                <p>А еще изменяемый размер топа, гибкая система ролей и поддержка версий 1.9-2.2</p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-active border-subtle rounded-2xl border-solid border-[1px]">
                            <img src={FeatureShieldImg.src} className="w-[17rem]"/>
                            <div className="flex flex-col gap-2 p-4 text-sm">
                                <p className="text-2xl font-semibold rainbow mb-2">Защита от DDoS</p>
                                <p className="text-base">Выращен в антиутопии и закален огнем</p>
                                <p>Весной 2024 наша система выдержала атаку в 150K+ RPS, летом 2023 атаку в 10Гбит/с</p>
                                <p>Ежедневно на нас совершаются DDoS атаки мощностью 10K+ RPS. Короче надежно, с нами не пропадете</p>
                            </div>
                        </div>

                        <div className="flex gap-4 bg-active border-subtle rounded-2xl border-solid border-[1px]">
                            <img src={FeatureMusicImg.src} className="w-[17rem]"/>
                            <div className="flex flex-col gap-2 p-4 text-sm">
                                <p className="text-2xl font-semibold rainbow mb-2">Библиотека музыки</p>
                                <p className="text-base">Ваш сервер - ваша музыка</p>
                                <p>Загружайте музыку из <span className="text-amber-600 font-semibold">NewGrounds</span>,
                                     <span className="text-red-600 font-semibold">YouTube</span>, <span
                                    className="text-blue-600 font-semibold">ВКонтакте</span> и <span
                                    className="text-green-600 font-semibold">Deezer</span> прямо в панели
                                </p>
                                <p>Вдохновение приходит и уходит, а наша библиотека музыки остается с вами навсегда</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 ref={orderRef} className="text-center my-12 text-white text-3xl">{locale.get('prodgd.tariffs')}</h2>
                <div className={styles.productCardGrid} id="cloud">
                    <ProductCardGD title="Press Start" btnText={locale.get('freeA')} link="order/gd?t=1">
                        <ListItem>
                            <ListItemIcon><PersonIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPressStart')[0]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPressStart')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CloseIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPressStart')[2]}/>
                        </ListItem>
                    </ProductCardGD>
                    <ProductCardGD title="Singularity" btnText={locale.get('tSingularityPrice')} link="order/gd?t=2">
                        <ListItem>
                            <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tSingualrity')[0]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tSingualrity')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><PrecisionManufacturingIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tSingualrity')[2]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tSingualrity')[3]}/>
                        </ListItem>
                    </ProductCardGD>
                    <ProductCardGD title="Takeoff" btnText={locale.get('tTakeoffPrice')} link="order/gd?t=3">
                        <ListItem>
                            <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[0]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><PrecisionManufacturingIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[2]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[3]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CloudDoneIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[4]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><AppleIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[5]}/>
                        </ListItem>
                    </ProductCardGD>
                </div>
                <p style={{textAlign: 'center', margin: "0  1rem 1rem"}}>{locale.get('onlyOneGDPS')}</p>


                {/*<h2 style={{textAlign:'center',margin:"3rem 0",color:"white"}} id="selfhosted">Наши преимущества</h2>*/}

                <span className={styles.hyperSpan}></span>
                <h2 style={{textAlign: 'center', margin: "3rem 0", color: "white"}}
                    ref={selfRef}>{locale.get('selfHost')}</h2>
                <p className="text-center mx-auto max-w-3xl">{locale.get('selfHostText')}
                </p>
                <TableContainer sx={{
                    borderRadius: "12px",
                    backgroundColor: "var(--btn-color)",
                    width: "fit-content",
                    maxWidth: "100%",
                    margin: "0 auto"
                }} className={styles.MrWhite}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right"><b>FruitSpace</b></TableCell>
                                <TableCell align="right"><b>{locale.get('selfHostTableHeader')}</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[0]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[1]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right">{locale.get('selfHostTableAdd')[0]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[2]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[3]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[4]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[5]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[6]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[7]}</TableCell>
                                <TableCell align="right">GhostCore</TableCell>
                                <TableCell align="right">HalogenCore</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[8]}</TableCell>
                                <TableCell align="right">{locale.get('selfHostTableAdd')[1]}</TableCell>
                                <TableCell align="right">{locale.get('selfHostTableAdd')[2]}</TableCell>
                            </TableRow>
                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[9]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right">{locale.get('selfHostTableAdd')[3]}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <p className="mx-auto text-center max-w-2xl">
                    {locale.get('selfHostLinks')}
                </p>
                <div className="flex mx-auto gap-2 justify-center mb-2">
                    <Button variant="contained"
                            className="m-2 mt-auto font-bold rounded-lg bg-[#6e5494] h-12 hover:bg-[#5f4980]"
                            onClick={() => window.open("https://github.com/FruitSpace/HalogenGDPSCore", "_blank")}>
                        <img className="invert h-10 mr-3 h-3/4 rounded" src={GitHubIcon.src} alt="github"/>
                        HalogenCore Github
                    </Button>
                    <Button variant="contained"
                            className="m-2 mt-auto font-bold rounded-lg bg-[#7289da] h-12 hover:bg-[#5f73b8]"
                            onClick={() => window.open("https://discord.gg/HgBQmMRKTB", "_blank")}>
                        <img className="invert h-10 mr-3 h-3/4" src={discordLogo.src} alt="discord"/>
                        HalogenCore Discord
                    </Button>

                </div>

            </div>
            <Footer router={props.router}/>
        </>
    )
}