import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import PanelContent from "@/components/Global/PanelContent";
import PanelSideNav from "@/components/PanelSideNav";
import {Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faGlobe,faServer
} from "@fortawesome/free-solid-svg-icons";

export default function NetworkMC(props) {
    return <>
        <GlobalHead title="babka" />
        <GlobalNav/>
        <PanelSideNav/>

        <PanelContent>
            <div className="w-full ipad:w-3/4 bg-active glassb rounded-2xl p-4 mx-auto">
            <div className="flex flex-row justify-between">
                <div className="flexaitems-center">
                    <p className="text-lg bg-subtle glassb p-2 rounded-xl w-fit">AterHaven</p>
                </div>
                <div className="flex ">
                    <div className="text-lg bg-subtle glassb p-2 rounded-xl w-fit">
                        <FontAwesomeIcon icon={faGlobe}/>
                        <span className="flex">-</span>
                    </div>
                </div>
            </div>

            </div>
        </PanelContent>
    </>
}

NetworkMC.RequireAuth = true