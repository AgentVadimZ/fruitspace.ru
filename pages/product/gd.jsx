import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import indexStyles from "../../components/Index.module.css"
import Footer from "../../components/Global/Footer";
import BannerGD from "../../components/assets/BannerGD.png"
import ProductHeader from "../../components/Global/ProductHeader";
import ProductCard from "../../components/Cards/ProductCard";
import MinecraftLogo from "../../components/assets/logos/minecraft.png";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper, Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import BuildIcon from "@mui/icons-material/Build";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import StorageIcon from "@mui/icons-material/Storage";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import GDLogo from "../../components/assets/logos/geometrydash.png";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AppleIcon from "@mui/icons-material/Apple";
import RockstarLogo from "../../components/assets/logos/rockstargames.png";
import LanguageIcon from "@mui/icons-material/Language";
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import GhostIcon from "../../components/assets/icons/ghost.svg"


export default function GD(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav profilePic={<img src="https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"/>} />

            <div className={styles.main}>
                <ProductHeader img={BannerGD} title="Хостинг GDPS" text="Уютное место для игры с друзьями или крупнейший сервер в РК. Мощности хватит на все."
                primaryText="Заказать на FruitSpace" primaryLink="#cloud"
                secondaryText="Запустить на своем сервере" secondaryLink="#selfhosted"/>
                {/*Insert Halogen Counter*/}

                <h2 style={{textAlign:'center',margin:"3rem 0",color:"white"}}>Тарифы</h2>
                <div className={indexStyles.productCardGrid} id="cloud">
                    <ProductCard title="Press Start" btnText="Бесплатно*" link="/product/order/gd/1">
                        <ListItem>
                            <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                            <ListItemText primary="Неограниченное количество игроков/уровней"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                            <ListItemText primary="Музыка из NewGrounds без ограничений"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><SmartToyIcon/></ListItemIcon>
                            <ListItemText primary="AntiDDoS / AntiBot"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><GhostIcon style={{height:"1.5em"}}/></ListItemIcon>
                            <ListItemText primary="Быстрое ядро GhostCore"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CloseIcon/></ListItemIcon>
                            <ListItemText primary="Панель с ограниченными возможностями"/>
                        </ListItem>
                    </ProductCard>
                    <ProductCard title="Singularity" btnText="50₽/мес" link="/product/order/gd/2">
                        <ListItem>
                            <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                            <ListItemText primary="Неограниченное количество игроков/уровней"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                            <ListItemText primary="Музыка из NewGrounds, YouTube и Soundcloud"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><SmartToyIcon/></ListItemIcon>
                            <ListItemText primary="AntiDDoS / AntiBot"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><GhostIcon style={{height:"1.5em"}}/></ListItemIcon>
                            <ListItemText primary="Быстрое ядро GhostCore"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><PrecisionManufacturingIcon/></ListItemIcon>
                            <ListItemText primary="Конфигуратор установщиков: иконки и 2.2"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary="Удобная и функциональная панель"/>
                        </ListItem>
                    </ProductCard>
                    <ProductCard  title="Takeoff" btnText="100₽/мес" link="/product/order/gd/3">
                        <ListItem>
                            <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                            <ListItemText primary="Неограниченное количество игроков/уровней"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                            <ListItemText primary="Музыка из NewGrounds, YouTube, Soundcloud, Deezer, VK и из файлов"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><SmartToyIcon/></ListItemIcon>
                            <ListItemText primary="AntiDDoS / AntiBot"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><GhostIcon style={{height:"1.5em"}}/></ListItemIcon>
                            <ListItemText primary="Быстрое ядро GhostCore"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CloudDoneIcon/></ListItemIcon>
                            <ListItemText primary="Автоматичесие резервные копии"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><PrecisionManufacturingIcon/></ListItemIcon>
                            <ListItemText primary="Конфигуратор установщиков: иконки, текстурпаки и 2.2"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><AppleIcon/></ListItemIcon>
                            <ListItemText primary="Полная поддержка iOS"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary="Удобная и функциональная панель"/>
                        </ListItem>
                    </ProductCard>
                </div>
                <p style={{textAlign:'center', margin:"0  1rem 1rem"}}>*Разрешен только 1 бесплатный GDPS на аккаунт</p>


                <h2 style={{textAlign:'center',margin:"3rem 0",color:"white"}} id="selfhosted">Запустить на своем сервере</h2>
                <p style={{textAlign:'center', margin:"0  5rem 1rem"}}>Возможно, вы захотите установить ядро на свой сервер,
                    будь то веб-хостинг или VDS. Это дает возможность более тонко настроить приватный сервер, модифицировать ядро
                    и просто не зависить от FruitSpace. Однако теперь вам придется самостоятельно настраивать веб-сервер, php и
                    необходимые модули, защиту от DDoS и сервис базы данных. Для работы с музыкой FruitSpace необходимо будет
                    получить API-ключ, а поддержка 2.2 может появиться значительно позже, чем на FruitSpace. Также вы можете
                    ознакомиться со сравнительной таблицей ниже, чтобы выбрать оптимальный для вас вариант.
                </p>
                <TableContainer sx={{borderRadius:"12px",backgroundColor:"var(--btn-color)", width:"fit-content", maxWidth:"100%", margin:"0 auto"}} className={indexStyles.MrWhite}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right"><b>FruitSpace</b></TableCell>
                                <TableCell align="right"><b>Самостоятельный хостинг</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Неограниченное количество игроков/уровней</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Кастомная музыка (кроме NewGrounds)</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right">Через FruitSpace API</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">AntiBot</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">AntiDDoS</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Пользовательская панель</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Конфигуратор установщиков</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Резервные копии</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Ядро</TableCell>
                                <TableCell align="right">GhostCore</TableCell>
                                <TableCell align="right">HalogenCore</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Минимальные затраты на работу</TableCell>
                                <TableCell align="right">От 0₽</TableCell>
                                <TableCell align="right">Хостинг (от 250₽/мес) и домен (от 200₽/год)</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Поддержка разработчиками</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right">Поддержка сообществом на GitHub</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <p style={{margin:"1rem auto", maxWidth:"320px"}}>
                    На данный момент вы не можете использовать HalogenCore, т.к. мы его дорабатываем
                    для возможности работы отдельных приватных серверов за пределами хостинга.
                </p>

            </div>
            <Footer/>
        </>
    )
}