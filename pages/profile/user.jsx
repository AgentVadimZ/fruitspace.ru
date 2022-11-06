import GlobalNav from "../../components/GlobalNav";
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import PanelContent from "../../components/Global/PanelContent";
import UserProfileCard from "../../components/Panel/UserProfileCard";
import {Toaster} from "react-hot-toast";


export default function User(props) {
    return (
        <>
            <GlobalHead title="Аккаунт"/>
            <GlobalNav />
            <PanelSideNav />
            <div><Toaster/></div>
            <PanelContent>
                <UserProfileCard/>
            </PanelContent>
        </>
    )
}

User.RequireAuth = true