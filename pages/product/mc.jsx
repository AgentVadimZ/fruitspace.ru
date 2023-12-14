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
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import CloudDoneIcon from "@mui/icons-material/CloudDone";

import useLocale, {useGlobalLocale} from "../../locales/useLocale";

import MemoryIcon from '@mui/icons-material/Memory';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import StorageIcon from '@mui/icons-material/Storage';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PodcastsIcon from '@mui/icons-material/Podcasts';

export default function MC(props) {
    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    return (
        
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
            <div className={styles.main}>
            <ProductHeader img={BannerMC} title={locale.get('prodmc.title')} text={locale.get('prodmc.titletext')}
                primaryText={locale.get('prodmc.titlecloud')} primaryLink="#cloud"/>
                <h2 style={{textAlign:'center',margin:"3rem 0",color:"white"}}>{locale.get('prodmc.tariffs')}</h2>
                <div className={`${styles.productCardGrid} ${styles.productCardGrid4}`} id="cloud">
                    <ProductCard title={locale.get('mcplans')[0]} btnText={locale.get('tPrices')[0]} link="order/mc?t=1">
                        <ListItem>
                            <ListItemIcon><MemoryIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan1')[0]}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('tPlan1')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan1')[2]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan1')[3]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><TravelExploreIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan1')[4]}/>
                        </ListItem>
                    </ProductCard>
                    <ProductCard title={locale.get('mcplans')[1]} btnText={locale.get('tPrices')[1]} link="order/mc?t=2">
                    <ListItem>
                            <ListItemIcon><MemoryIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan2')[0]}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('tPlan2')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan2')[2]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan2')[3]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><TravelExploreIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan2')[4]}/>
                        </ListItem>
                    </ProductCard>
                    <ProductCard  title={locale.get('mcplans')[2]} btnText={locale.get('tPrices')[2]} link="order/mc?t=3">
                    <ListItem>
                            <ListItemIcon><MemoryIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan3')[0]}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('tPlan3')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan3')[2]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan3')[3]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><TravelExploreIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan3')[4]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><PodcastsIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan3')[5]}/>
                        </ListItem>
                    </ProductCard>
                    <ProductCard  title={locale.get('mcplans')[3]} btnText={locale.get('tPrices')[3]} link="order/mc?t=4">
                    <ListItem>
                            <ListItemIcon><MemoryIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan4')[0]}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon><ElectricBoltIcon/></ListItemIcon>
                        <ListItemText primary={locale.get('tPlan4')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan4')[2]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan4')[3]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><TravelExploreIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan4')[4]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><PodcastsIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan4')[5]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CloudDoneIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPlan4')[6]}/>
                        </ListItem>
                    </ProductCard>
                    
                </div>
                <p style={{textAlign:'center', margin:"0  1rem 1rem"}}>{locale.get('onlyOneGDPS')}</p>
            </div>
            <Footer router={props.router}/>
        </>
    )
}