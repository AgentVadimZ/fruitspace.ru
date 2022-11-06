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
    return (
        <>
            <GlobalHead title="Мои серверы"/>
            <GlobalNav />
            <PanelSideNav />
            <PanelContent>
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)}
                              className={"serversWindow"}>
                    <TabsList>
                        <Tab value="gd">GD</Tab>
                        <Tab value="mc">MC</Tab>
                        <Tab value="gta">GTA</Tab>
                        <TabButton><ExpandMoreIcon/></TabButton>
                    </TabsList>
                    <TabPanel value="gd">
                        {/*<ServerItem type="gd" name="TestDash" plan="Press Start" desc="3 игрока, 8 уровней" uuid="000S"/>*/}
                        {/*<ServerItem type="gd" name="xHydra" plan="Takeoff" desc="15 игроков, 23 уровня"/>*/}
                        {/*<ServerItem type="gd" name="Walugi" plan="Press Start" desc="0 игроков, 0 уровней"/>*/}
                        <ServerItem type="gd" add/>
                    </TabPanel>
                    <TabPanel value="mc">
                        {/*<ServerItem type="mc"/>*/}
                        {/*<ServerItem type="mc"/>*/}
                        {/*<ServerItem type="mc"/>*/}
                        <ServerItem type="mc" add/>
                    </TabPanel>
                    <TabPanel value="gta">
                        {/*<ServerItem type="gta"/>*/}
                        {/*<ServerItem type="gta"/>*/}
                        {/*<ServerItem type="gta"/>*/}
                        <ServerItem type="gta" add/>
                    </TabPanel>
                </TabsUnstyled>
            </PanelContent>
        </>
    )
}

Servers.RequireAuth = true