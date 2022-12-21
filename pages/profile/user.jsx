import GlobalNav from "../../components/GlobalNav";
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import PanelContent from "../../components/Global/PanelContent";
import UserProfileCard from "../../components/Panel/UserProfileCard";
import toast, {Toaster} from "react-hot-toast";
import useEffectOnce from "../../components/Hooks";


export default function User(props) {
    useEffectOnce(()=>{
        toast.dismiss()
    })

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