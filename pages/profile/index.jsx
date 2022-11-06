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
            <GlobalNav />
            <PanelSideNav />

        </>
    )
}

Index.RequireAuth = true