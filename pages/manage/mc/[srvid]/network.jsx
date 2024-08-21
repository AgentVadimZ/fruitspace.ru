import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import PanelContent from "@/components/Global/PanelContent";
import PanelSideNav from "@/components/PanelSideNav";
import {Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function NetworkMC(props) {
    return <>
        <GlobalHead title="babka" />
        <GlobalNav/>
        <PanelSideNav/>

        <PanelContent>
            <div className="w-full ipad:w-3/4 bg-active glassb rounded-2xl p-4 mx-auto">
            <div className="">
                <div className="flexaitems-center justify-between">
                    <p className="text-lg bg-subtle glassb p-2 rounded-xl w-fit">AterHaven</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-lg bg-subtle glassb p-2 rounded-xl w-fit">AterHaven</p>
                </div>
            </div>
            </div>
        </PanelContent>
    </>
}

NetworkMC.RequireAuth = true