import GlobalNav from "@/components/GlobalNav";
import PanelSideNav from "@/components/PanelSideNav";
import GlobalHead from "@/components/GlobalHead";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import {Tab, TabPanel, TabsList} from "@/components/Global/Tab";
import PanelContent from "@/components/Global/PanelContent";
import {useEffect, useState} from "react";
import {Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import styles from "@/components/Index.module.css"

import toast, {Toaster} from "react-hot-toast";
import {Router} from "next/router";
import PayBox from "@/components/Panel/PayBox";
import Link from "next/link";
import useEffectOnce from "@/components/Hooks";
import useLocale from "@/locales/useLocale";
import useFiberAPI from "@/fiber/fiber.ts";
import {ProfileMobileNav} from "@/components/PanelMobileNav";


export default function Billing(props) {

    const api = useFiberAPI()
    const [tab, setTab] = useState("wallet")

    const [transactions, setTransactions] = useState([])

    const locale = useLocale(props.router)

    useEffectOnce(()=>{
        toast.dismiss()
    })

    useEffect(()=>{
        api.payments.get().then((resp)=>{
            if (resp.status==="ok") {
                setTransactions(resp.transactions?resp.transactions:[])
            }
        })
    },[Router.pathname])


    const prettyPrint = (num)=>new Intl.NumberFormat(false?'en-US':'ru-RU',
        {style: 'currency',currency: false?"USD":"RUB"}).format(num).replace(/[.|,]00/g, '')

    return <>
        <GlobalHead title={locale.get('nav')}/>
        <GlobalNav />
        <PanelSideNav />
        <ProfileMobileNav />
        <Toaster/>
        <PanelContent>
            <PayBox router={props.router} api={api}/>

            {transactions.length===0
                ?(<p style={{textAlign:"center",fontSize:"14pt"}}>{locale.get('noPayments')}</p>)
                :(<List className={styles.MrWhite}>
                        {transactions.map((tr, i)=>(
                            <ListItem className={styles.buttonHover} key={i} secondaryAction={
                                tr.is_active&&<Link href={tr.go_pay_url} legacyBehavior><IconButton edge="end"><SendIcon /></IconButton></Link>}>
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
        </PanelContent>
    </>;
}

Billing.RequireAuth = true