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
import useLocale, {useGlobalLocale} from "../locales/useLocale";

export default function Home(props) {

    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    return (
    <>
        <GlobalHead title={localeGlobal.get('navName')}/>
        <GlobalNav router={props.router} />

        <div className={styles.main}>
            <Carousel>
                <CarouselItem image={ProtoFlicker.src}
                              link="/product/gd/" title={locale.get('carousel.1.title')} text={locale.get('carousel.1.content')}/>

                <CarouselItem image="https://media.wired.com/photos/60f0f10db3e52be52fcdc042/master/w_1600%2Cc_limit/Minecraft_Middle_Earth_Minas_Tirith_render_SOURCE_Minecraft_Middle-Earth.png"
                              link="#" title={locale.get('carousel.2.title')} text={locale.get('carousel.2.content')} />
                <CarouselItem image="https://cdn.mos.cms.futurecdn.net/HGJSsb2UnhV2xTYaa9GLGB.png"
                              link="#" title={locale.get('carousel.3.title')} text={locale.get('carousel.3.content')} />
                {/*<CarouselItem image="https://media.wired.com/photos/60f0f10db3e52be52fcdc042/master/w_1600%2Cc_limit/Minecraft_Middle_Earth_Minas_Tirith_render_SOURCE_Minecraft_Middle-Earth.png"*/}
                {/*              link="#" title="Title" text="A sample text that goes below 4" />*/}
            </Carousel>

            <div className={styles.productCardGrid}>
                <ProductCard logo={MinecraftLogo.src} title="Minecraft" btnText={locale.get('soon')} disabled>
                    <ListItem>
                        <ListItemIcon><BoltIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardMinecraft')[0]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><BuildIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardMinecraft')[1]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CloudDoneIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardMinecraft')[2]}/>
                    </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('cardMinecraft')[3]}/>
                        </ListItem>
                    <ListItem>
                        <ListItemIcon><EqualizerIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardMinecraft')[4]}/>
                    </ListItem>
                </ProductCard>
                <ProductCard logo={GDLogo.src} title="GDPS" btnText={locale.get('startingZero')} link="/product/gd">
                    <ListItem>
                        <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGDPS')[0]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGDPS')[1]}/>
                        {/*Soundcloud*/}
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><SmartToyIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGDPS')[2]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CloudDoneIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGDPS')[3]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><PrecisionManufacturingIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGDPS')[4]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><AppleIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGDPS')[5]}/>
                    </ListItem>
                </ProductCard>
                <ProductCard logo={RockstarLogo.src} title="GTA SA/IV/V" btnText={locale.get('soon')} disabled>
                    <ListItem>
                        <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGTA')[0]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><BuildIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGTA')[1]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><CloudDoneIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGTA')[2]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><StorageIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGTA')[3]}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><LanguageIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('cardGTA')[4]}/>
                    </ListItem>
                </ProductCard>
            </div>

            <div className={styles.productUtilsBox}>
                <LineCard logo={<WebhookIcon/>} title={locale.get('apiButton')}/>
                <LineCard logo={<MonetizationOnIcon/>} title={locale.get('adButton')}/>
            </div>

        </div>





        {/*<div style={{display:"flex", justifyContent:"center"}}>*/}
        {/*    <MetaCard double image={NightR.src}></MetaCard>*/}
        {/*    <MetaCard double image={"https://i.imgur.com/8KV0PjH.jpg"}></MetaCard>*/}
        {/*    <MetaCard image={"https://www.gamerevolution.com/wp-content/uploads/sites/2/2019/04/GTAO-XBWire-HeroMain-940x528-hero.jpg"}></MetaCard>*/}
        {/*</div>*/}
        {/*<div style={{display:"flex", justifyContent:"center"}}>*/}
        {/*    <MetaCard image={sImg.src}></MetaCard>*/}
        {/*    <MetaCard double image={ProtoFlicker.src}></MetaCard>*/}
        {/*    <MetaCard double image={"https://media.wired.com/photos/60f0f10db3e52be52fcdc042/master/w_1600%2Cc_limit/Minecraft_Middle_Earth_Minas_Tirith_render_SOURCE_Minecraft_Middle-Earth.png"}></MetaCard>*/}
        {/*</div>*/}
        <Footer router={props.router}/>
    </>
  )
}
