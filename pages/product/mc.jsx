import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import BannerMC from "../../components/assets/BannerMC.png";
import ProductHeader from "../../components/Global/ProductHeader";
import ProductCardGD from "../../components/Cards/ProductCardGD";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    IconButton
} from "@mui/material";

import HelpIcon from '@mui/icons-material/Help';
import {TabsList, TabPanel, Tab, TabButton} from "../../components/Global/Tab";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import CloudDoneIcon from "@mui/icons-material/CloudDone";

import useLocale, {useGlobalLocale} from "../../locales/useLocale";

import MemoryIcon from '@mui/icons-material/Memory';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import StorageIcon from '@mui/icons-material/Storage';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import ProductCardMC from "../../components/Cards/ProductCardMC";

export default function MC(props) {
    const locale = useLocale(props.router)
    const [tab, setTab] = useState("dynamic")
    
    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <div className={styles.main}>
            <ProductHeader img={BannerMC} title={locale.get('prodmc.title')} text={locale.get('prodmc.titletext')}
                primaryText={locale.get('prodmc.titlecloud')} primaryLink="#cloud"/>
                    <h2 style={{textAlign:'center',margin:"3rem 0",color:"white"}}>
                        {locale.get('prodmc.tariffs')}
                        {/*<Tooltip title={locale.get('tarifftip')[0]}>*/}
                        {/*    <IconButton><HelpIcon className="text-white"/></IconButton>*/}
                        {/*</Tooltip>*/}
                    </h2>
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)} class="my-8 w-fit mx-auto">
                    <TabsList classname="mx-auto text-center" style={{ display: "flex", justifyContent: "center" }} className="mx-auto">
                        <Tab value="dynamic">Dynamic</Tab>
                        <Tab value="static">Static</Tab>
                    </TabsList>
                    <TabPanel value="dynamic" className="border-none !p-0">
                        <div className={`${styles.productCardGrid} ${styles.productCardGridMC}`} id="cloud">
                            <ProductCardMC title={locale.get('mcPlansDynamic')[0]} btnText={locale.get('tPricesDynamic')[0]} link="order/mc?t=1">
                                <ListItem>
                                    <ListItemIcon><MemoryIcon/></ListItemIcon>
                                    <ListItemText primary={locale.get('tPlanDynamic1')[0]}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                                    <ListItemText primary={locale.get('tPlanDynamic1')[1]}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><StorageIcon/></ListItemIcon>
                                    <ListItemText primary={locale.get('tPlanDynamic1')[2]}/>
                                </ListItem>
                            </ProductCardMC>
                        </div>
                    </TabPanel>
                    <TabPanel value="static" className="border-none !p-0">
                        <div className={`${styles.productCardGrid} ${styles.productCardGridMC}`} id="cloud">
                            <ProductCardMC title={locale.get('mcPlansStatic')[0]} btnText={locale.get('tPricesStatic')[0]} link="order/mc?t=6">
                                <ListItem>
                                    <ListItemIcon><MemoryIcon/></ListItemIcon>
                                    <ListItemText primary={locale.get('tPlanStatic1')[0]}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                                    <ListItemText primary={locale.get('tPlanStatic1')[1]}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><StorageIcon/></ListItemIcon>
                                    <ListItemText primary={locale.get('tPlanStatic1')[2]}/>
                                </ListItem>
                            </ProductCardMC>
                        </div>
                    </TabPanel>
                </TabsUnstyled>
            </div>
            <h3 className="mt-8" style={{color:"white", textAlign:'center', margin:"3  3rem 1rem"}}>{locale.get('tariffInfo')}</h3>
            <Footer router={props.router}/>
        </>
    )
}