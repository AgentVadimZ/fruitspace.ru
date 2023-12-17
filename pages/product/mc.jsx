import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import BannerMC from "../../components/assets/BannerMC.png";
import ProductHeader from "../../components/Global/ProductHeader";
import ProductCard from "../../components/Cards/ProductCard";

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

export default function MC(props) {
    const router = useRouter()
    const locale = useLocale(props.router)
    const {s} = router.query;
    var route = "dynamic";
    const [tab, setTab] = useState(route)
    useEffect(()=>{setTab(s?s:"dynamic")},[s])
    return (
        
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
            <div className={styles.main}>
            <ProductHeader img={BannerMC} title={locale.get('prodmc.title')} text={locale.get('prodmc.titletext')}
                primaryText={locale.get('prodmc.titlecloud')} primaryLink="#cloud"/>
                    <h2 style={{textAlign:'center',margin:"3rem 0",color:"white"}}>
                        {locale.get('prodmc.tariffs')}
                    <Tooltip title={locale.get('tarifftip')[0]}>
                        <IconButton><HelpIcon className="text-white"/></IconButton>
                    </Tooltip>
                    </h2>
                <div class="mx-auto">
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)} class="my-8 w-fit mx-auto">
                    <TabsList classname="mx-auto text-center" style={{ display: "flex", justifyContent: "center" }} className="mx-auto">
                        <Tab value="dynamic">Dynamic</Tab>
                        <Tab value="static">Static</Tab>
                    </TabsList>
                    <TabPanel value="dynamic" className="border-none !p-0">
                        <div className={`${styles.productCardGrid} ${styles.productCardGridMC}`} id="cloud">
                            <ProductCard type="mc" title={locale.get('mcPlansDynamic')[0]} btnText={locale.get('tPricesDynamic')[0]} link="order/mc?t=1">
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
                            </ProductCard>
                            <ProductCard type="mc" title={locale.get('mcPlansDynamic')[1]} btnText={locale.get('tPricesDynamic')[1]} link="order/mc?t=2">
                            <ListItem>
                                <ListItemIcon><MemoryIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic2')[0]}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic2')[1]}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><StorageIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic2')[2]}/>
                            </ListItem>
                            </ProductCard>
                            <ProductCard type="mc" title={locale.get('mcPlansDynamic')[2]} btnText={locale.get('tPricesDynamic')[2]} link="order/mc?t=3">
                            <ListItem>
                                <ListItemIcon><MemoryIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic3')[0]}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic3')[1]}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><StorageIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic3')[2]}/>
                            </ListItem>
                            </ProductCard>
                            <ProductCard type="mc" title={locale.get('mcPlansDynamic')[3]} btnText={locale.get('tPricesDynamic')[3]} link="order/mc?t=4">
                            <ListItem>
                                <ListItemIcon><MemoryIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic4')[0]}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic4')[1]}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><StorageIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic4')[2]}/>
                            </ListItem>
                            </ProductCard>
                            <ProductCard type="mc" title={locale.get('mcPlansDynamic')[4]} btnText={locale.get('tPricesDynamic')[4]} link="order/mc?t=5">
                            <ListItem>
                                <ListItemIcon><MemoryIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic5')[0]}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic5')[1]}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon><StorageIcon/></ListItemIcon>
                                <ListItemText primary={locale.get('tPlanDynamic5')[2]}/>
                            </ListItem>
                            </ProductCard>
                            </div> 
                    </TabPanel>
                    <TabPanel value="static" className="border-none !p-0">
                    <div className={`${styles.productCardGrid} ${styles.productCardGridMC}`} id="cloud">
                    <ProductCard type="mc" title={locale.get('mcPlansStatic')[0]} btnText={locale.get('tPricesStatic')[0]} link="order/mc?t=6">
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
                    </ProductCard>
                    <ProductCard type="mc" title={locale.get('mcPlansStatic')[1]} btnText={locale.get('tPricesStatic')[1]} link="order/mc?t=7">
                    <ListItem>
                            <ListItemIcon><MemoryIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlanStatic2')[0]}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('tPlanStatic2')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlanStatic2')[2]}/>
                        </ListItem>
                    </ProductCard>
                    <ProductCard type="mc" title={locale.get('mcPlansStatic')[2]} btnText={locale.get('tPricesStatic')[2]} link="order/mc?t=8">
                    <ListItem>
                            <ListItemIcon><MemoryIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlanStatic3')[0]}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('tPlanStatic3')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlanStatic3')[2]}/>
                        </ListItem>
                    </ProductCard>
                    <ProductCard type="mc" title={locale.get('mcPlansStatic')[3]} btnText={locale.get('tPricesStatic')[3]} link="order/mc?t=9">
                    <ListItem>
                            <ListItemIcon><MemoryIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlanStatic4')[0]}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('tPlanStatic4')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlanStatic4')[2]}/>
                        </ListItem>
                    </ProductCard>
                    <ProductCard type="mc" title={locale.get('mcPlansStatic')[4]} btnText={locale.get('tPricesStatic')[4]} link="order/mc?t=10">
                    <ListItem>
                            <ListItemIcon><MemoryIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlanStatic5')[0]}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('tPlanStatic5')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlanStatic5')[2]}/>
                        </ListItem>
                    </ProductCard>
                    </div>
                    </TabPanel>
                </TabsUnstyled> 
                </div> 
                </div>
            <h3 class="mt-8" style={{color:"white", textAlign:'center', margin:"3  3rem 1rem"}}>{locale.get('tariffInfo')}</h3>
            <Footer router={props.router}/>
        </>
    )
}