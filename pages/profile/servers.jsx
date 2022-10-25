import GlobalNav from "../../components/GlobalNav";
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import PanelContent from "../../components/Global/PanelContent";
import {TabsList, TabPanel, Tab, TabButton} from "../../components/Global/Tab";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ServerItem from "../../components/Cards/ServerItem";


export default function Servers(props) {
    const router = useRouter()
    const {s} = router.query;
    var route = "gd";
    const [tab, setTab] = useState(route);
    useEffect(()=>{setTab(s?s:"gd")},[s])
    console.log(s, tab)
    return (
        <>
            <GlobalHead title="Мои сервера"/>
            <GlobalNav profilePic={<img src="https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"/>} />
            <PanelSideNav />
            <PanelContent>
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)}
                              style={{display:"flex",alignItems:'center',flexDirection:"column",minWidth:"40rem"}}>
                    <TabsList>
                        <Tab value="gd">GD</Tab>
                        <Tab value="mc">MC</Tab>
                        <Tab value="gta">GTA</Tab>
                        <TabButton><ExpandMoreIcon/></TabButton>
                    </TabsList>
                    <TabPanel value="gd">
                        <ServerItem type="gd" name="TestDash" plan="Press Start" desc="3 игрока, 8 уровней"/>
                        <ServerItem type="gd" name="xHydra" plan="Takeoff" desc="15 игроков, 23 уровня"/>
                        <ServerItem type="gd" name="Walugi" plan="Press Start" desc="0 игроков, 0 уровней"/>
                        <ServerItem type="add"/>
                    </TabPanel>
                    <TabPanel value="mc">
                        <ServerItem type="mc"/>
                        <ServerItem type="mc"/>
                        <ServerItem type="mc"/>
                    </TabPanel>
                    <TabPanel value="gta">
                        <ServerItem type="gta"/>
                        <ServerItem type="gta"/>
                        <ServerItem type="gta"/>
                    </TabPanel>
                </TabsUnstyled>
            </PanelContent>
        </>
    )
}