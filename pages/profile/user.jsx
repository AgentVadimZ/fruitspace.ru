import GlobalNav from "../../components/GlobalNav";
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import PanelContent from "../../components/Global/PanelContent";
import UserProfileCard from "../../components/Panel/UserProfileCard";


export default function User(props) {
    return (
        <>
            <GlobalHead title="Аккаунт"/>
            <GlobalNav profilePic={<img src="https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"/>} />
            <PanelSideNav />
            <PanelContent>
                <UserProfileCard/>
            </PanelContent>
        </>
    )
}

User.RequireAuth = true