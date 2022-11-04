import Head from "next/head";
import GlobalNav from "../../components/GlobalNav";
import SideBar from "../../components/NavBar/SideBar";
import NavItem from "../../components/NavBar/NavItem";

import WalletIcon from '@mui/icons-material/Wallet';
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";



export default function Index(props){
    return (
        <>
            <GlobalHead title="Панель"/>
            <GlobalNav profilePic={<img src="https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"/>} />
            <PanelSideNav />

        </>
    )
}

Index.RequireAuth = true