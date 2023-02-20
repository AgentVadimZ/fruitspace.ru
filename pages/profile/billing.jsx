import GlobalNav from "../../components/GlobalNav";
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {Tab, TabButton, TabPanel, TabsList} from "../../components/Global/Tab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ServerItem from "../../components/Cards/ServerItem";
import PanelContent from "../../components/Global/PanelContent";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import styles from "../../components/Index.module.css"

import toast, {Toaster} from "react-hot-toast";
import {useCookies} from "react-cookie";
import {Router} from "next/router";
import PayBox from "../../components/Panel/PayBox";
import Link from "next/link";
import useEffectOnce from "../../components/Hooks";
import useLocale from "../../locales/useLocale";


export default function Billing(props) {
    const [tab, setTab] = useState("wallet")
    const [user,setUser] = useRecoilState(UserState)
    const [cookies, setCookie, delCookie] = useCookies(["token"])

    const [transactions, setTransactions] = useState([])

    const locale = useLocale(props.router)

    useEffectOnce(()=>{
        toast.dismiss()
    })

    useEffect(()=>{
        fetch("https://api.fruitspace.one/v1/user/payments",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]}}
        ).then(resp=>resp.json()).then((resp)=>{
            if (resp.status==="ok") {
                setTransactions(resp.transactions?resp.transactions:[])
            }
        })
    },[user,Router.pathname])


    const prettyPrint = (num)=>new Intl.NumberFormat(user.usd?'en-US':'ru-RU',
        {style: 'currency',currency: user.usd?"USD":"RUB"}).format(num).replace(/[.|,]00/g, '')

    return (
        <>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <PanelSideNav />
            <Toaster/>
            <PanelContent>
                <TabsUnstyled value={tab} onChange={(e,val)=>setTab(val)}
                              className={"vServersWindow"}>
                    <TabsList>
                        <Tab value="wallet">{locale.get('tabs')[0]}</Tab>
                        <Tab value="shops">{locale.get('tabs')[1]}</Tab>
                    </TabsList>
                    <TabPanel value="wallet">
                        <PayBox router={props.router}/>

                        {transactions.length===0
                            ?(<p style={{textAlign:"center",fontSize:"14pt"}}>{locale.get('noPayments')}</p>)
                        :(<List className={styles.MrWhite}>
                                {transactions.map((tr, i)=>(
                                        <ListItem className={styles.buttonHover} key={i} secondaryAction={
                                            tr.is_active&&<Link href={tr.gopay_url}><IconButton edge="end"><SendIcon /></IconButton></Link>}>
                                            <ListItemAvatar>
                                                <Avatar style={{backgroundColor:"var(--btn-color)"}}>
                                                    {tr.is_active?<TimerIcon/>:<CreditScoreIcon/>}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={locale.get('amount')[0]+`${prettyPrint(tr.amount)} (№${tr.id})`}
                                                secondary={locale.get('amount')[1]+`${tr.method}`}
                                            />
                                        </ListItem>
                                    ))}
                            </List>
                            )}
                    </TabPanel>
                    <TabPanel value="shops">
                        <p style={{textAlign:"center"}}>{locale.get('withdraw')}</p>
                    </TabPanel>
                </TabsUnstyled>
            </PanelContent>
        </>
    )
}

Billing.RequireAuth = true