import GlobalNav from "@/components/GlobalNav";
import PanelSideNav from "@/components/PanelSideNav";
import GlobalHead from "@/components/GlobalHead";
import PanelContent from "@/components/Global/PanelContent";
import UserProfileCard from "@/components/Panel/UserProfileCard";
import toast, {Toaster} from "react-hot-toast";
import useEffectOnce from "@/components/Hooks";
import useLocale from "@/locales/useLocale";
import {NextRouter} from "next/router";
import {ProfileMobileNav} from "@/components/PanelMobileNav";

export default function User(props: {router: NextRouter}) {
    useEffectOnce(()=>{
        toast.dismiss()
    })

    const locale = useLocale(props.router)

    return (
        <>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <PanelSideNav />
            <ProfileMobileNav />
            <div><Toaster/></div>
            <PanelContent>
                <UserProfileCard router={props.router}/>
            </PanelContent>
        </>
    )
}

User.RequireAuth = true