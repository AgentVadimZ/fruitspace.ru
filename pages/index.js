import Script from "next/script";

import GlobalNav from "../components/GlobalNav";
import MetaCard from "../components/Cards/MetaCard";
import Carousel from "../components/Global/Carousel";
import {CarouselItem} from "../components/Global/Carousel";
import ProductCard from "../components/Cards/ProductCard";
import LineCard from "../components/Cards/LineCard";

import styles from "../components/Index.module.css"

import NightR from "../components/assets/NightRider.webp"
import ProtoFlicker from "../components/assets/ProtoFlicker.png"
import sImg from "../components/assets/img.png"
import MinecraftLogo from "../components/assets/logos/minecraft.png"
import GDLogo from "../components/assets/logos/geometrydash.png"
import RockstarLogo from "../components/assets/logos/rockstargames.png"

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WebhookIcon from '@mui/icons-material/Webhook';
import BoltIcon from '@mui/icons-material/Bolt';
import BuildIcon from '@mui/icons-material/Build';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import StorageIcon from '@mui/icons-material/Storage';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LanguageIcon from '@mui/icons-material/Language';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AppleIcon from '@mui/icons-material/Apple';


import Footer from "../components/Global/Footer";
import GlobalHead from "../components/GlobalHead";
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";

export default function Home() {
  return (
    <>
        <GlobalHead title="Игровой хостинг"/>
        {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
        <GlobalNav profilePic={<img src="https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"/>} />

        <div className={styles.main}>
            <Carousel>
                <CarouselItem image="https://media.wired.com/photos/60f0f10db3e52be52fcdc042/master/w_1600%2Cc_limit/Minecraft_Middle_Earth_Minas_Tirith_render_SOURCE_Minecraft_Middle-Earth.png"
                              link="#" title="Title" text="A sample text that goes below 1" />
                <CarouselItem image="https://media.wired.com/photos/60f0f10db3e52be52fcdc042/master/w_1600%2Cc_limit/Minecraft_Middle_Earth_Minas_Tirith_render_SOURCE_Minecraft_Middle-Earth.png"
                              link="#" title="Title" text="A sample text that goes below 2" />
                <CarouselItem image="https://media.wired.com/photos/60f0f10db3e52be52fcdc042/master/w_1600%2Cc_limit/Minecraft_Middle_Earth_Minas_Tirith_render_SOURCE_Minecraft_Middle-Earth.png"
                              link="#" title="Title" text="A sample text that goes below 3" />
                <CarouselItem image="https://media.wired.com/photos/60f0f10db3e52be52fcdc042/master/w_1600%2Cc_limit/Minecraft_Middle_Earth_Minas_Tirith_render_SOURCE_Minecraft_Middle-Earth.png"
                              link="#" title="Title" text="A sample text that goes below 4" />
            </Carousel>

            <div className={styles.productCardGrid}>
                <ProductCard logo={MinecraftLogo.src} title="Minecraft" startPrice="" disabled>
                    <ListItem>
                        <ListItemIcon><BoltIcon/></ListItemIcon>
                        <ListItemText primary="Быстрые сервера"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><BuildIcon/></ListItemIcon>
                        <ListItemText primary="Легкая установка плагинов"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CloudDoneIcon/></ListItemIcon>
                        <ListItemText primary="Автоматические резервные копии"/>
                    </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary="Виртуальная сеть для нескольких серверов"/>
                        </ListItem>
                    <ListItem>
                        <ListItemIcon><EqualizerIcon/></ListItemIcon>
                        <ListItemText primary="Динамические ресурсы, которые позволяют вам сэкономить"/>
                    </ListItem>
                </ProductCard>
                <ProductCard logo={GDLogo.src} title="GDPS" btnText="От 0₽" link="/product/gd">
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
                        <ListItemText primary="Лучший антибот из существующих"/>
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
                </ProductCard>
                <ProductCard logo={RockstarLogo.src} title="GTA SA/IV/V" disabled>
                    <ListItem>
                        <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                        <ListItemText primary="Неограниченное количество слотов"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><BuildIcon/></ListItemIcon>
                        <ListItemText primary="Легкая установка плагинов"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CloudDoneIcon/></ListItemIcon>
                        <ListItemText primary="Автоматичесие резервные копии"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StorageIcon/></ListItemIcon>
                        <ListItemText primary="Поддержка FTP и MySQL"/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><LanguageIcon/></ListItemIcon>
                        <ListItemText primary="Кастомный IP и порт"/>
                    </ListItem>
                </ProductCard>
            </div>

            <div className={styles.productUtilsBox}>
                <LineCard logo={<WebhookIcon/>} title="FruitSpace API"/>
                <LineCard logo={<MonetizationOnIcon/>} title="Рекламная сеть"/>
            </div>

        </div>

        <h2 style={{textAlign:'center',margin:"3rem 0",color:"white"}}>Майден делает сайт...</h2>




        <div style={{display:"flex", justifyContent:"center"}}>
            <MetaCard double image={NightR.src}></MetaCard>
            <MetaCard double image={"https://i.imgur.com/8KV0PjH.jpg"}></MetaCard>
            <MetaCard image={"https://www.gamerevolution.com/wp-content/uploads/sites/2/2019/04/GTAO-XBWire-HeroMain-940x528-hero.jpg"}></MetaCard>
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
            <MetaCard image={sImg.src}></MetaCard>
            <MetaCard double image={ProtoFlicker.src}></MetaCard>
            <MetaCard double image={"https://media.wired.com/photos/60f0f10db3e52be52fcdc042/master/w_1600%2Cc_limit/Minecraft_Middle_Earth_Minas_Tirith_render_SOURCE_Minecraft_Middle-Earth.png"}></MetaCard>
        </div>
        <Footer/>
    </>
  )
}