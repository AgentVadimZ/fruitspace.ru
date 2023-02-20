import GlobalNav from "../../components/GlobalNav";
import PanelSideNav from "../../components/PanelSideNav";
import GlobalHead from "../../components/GlobalHead";
import PanelContent from "../../components/Global/PanelContent";
import UserProfileCard from "../../components/Panel/UserProfileCard";
import toast, {Toaster} from "react-hot-toast";
import useEffectOnce from "../../components/Hooks";
import useLocale from "../../locales/useLocale";


export default function User(props) {
    useEffectOnce(()=>{
        toast.dismiss()
    })

    const locale = useLocale(props.router)

    return (
        <>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <PanelSideNav />
            <div><Toaster/></div>
            <PanelContent>
                <UserProfileCard router={props.router}/>
            </PanelContent>
        </>
    )
}

User.RequireAuth = true