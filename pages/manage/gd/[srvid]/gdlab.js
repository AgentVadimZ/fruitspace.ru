// noinspection ES6UnusedImports

import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {Router, useRouter} from "next/router";


export default function ProfileGD(props) {
    const router = useRouter()
    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <PanelContent>
                TBD
            </PanelContent>
        </>
    )
}

ProfileGD.RequireAuth=true