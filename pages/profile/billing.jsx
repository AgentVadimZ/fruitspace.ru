import GlobalNav from "../../components/GlobalNav";
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {Tab, TabButton, TabPanel, TabsList} from "../../components/Global/Tab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ServerItem from "../../components/Cards/ServerItem";
import PanelContent from "../../components/Global/PanelContent";
import {useState} from "react";
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";


export default function Billing(props) {
    const [tab, setTab] = useState("wallet")
    const [user,setUser] = useRecoilState(UserState)


    const prettyPrint = (num)=>new Intl.NumberFormat(user.usd?'en-US':'ru-RU',
        {style: 'currency',currency: user.usd?"USD":"RUB"}).format(num).replace(/[.|,]00/g, '')

    return (
        <>
            <GlobalHead title="Биллинг"/>
            <GlobalNav />
            <PanelSideNav />
            <PanelContent>
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)}
                              className={"serversWindow"}>
                    <TabsList>
                        <Tab value="wallet">Баланс</Tab>
                        <Tab value="shops">Магазины</Tab>
                    </TabsList>
                    <TabPanel value="wallet">
                        <ServerItem type="gd" add/>
                        {}
                    </TabPanel>
                    <TabPanel value="shops">
                        <p style={{textAlign:"center"}}>Типа возможность вывода баланса магазина. Но пока нет</p>
                    </TabPanel>
                </TabsUnstyled>
            </PanelContent>
        </>
    )
}

Billing.RequireAuth = true