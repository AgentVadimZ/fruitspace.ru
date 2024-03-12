import {Segmented} from "antd";
import {useState} from "react";
import {ConfigProvider, theme} from "antd";


const Tab = ({addbtn, defaultTab, onChange, tabs}) => {

    const tabItems = tabs?.map((tab)=>{
        return {
            value: tab.key,
            label: tab.label,
            icon: tab.icon,
            disabled: tab.disabled
        }
    })||[]

    const contentItems = tabs?.reduce((prev,cur)=>({...prev, [cur.key]: cur.children}), {})||{}

    const [activeTab, setActiveTab] = useState(defaultTab||tabItems[0].value)

    return (
        <div className="w-full">
            <div className="bg-active flex justify-between items-center p-3 border-subtle border-solid border-[1px] rounded-t-xl border-b-0">
                <Segmented rootClassName="bg-btn select-none" options={tabItems}
                           defaultValue={defaultTab} onChange={(value) => {
                    setActiveTab(value);
                    onChange && onChange(value)
                }}/>
                {addbtn && addbtn}
            </div>
            <div className="bg-active border-subtle rounded-b-2xl border-solid border-[1px] border-t-0">
                <div className="w-full rounded-2xl bg-subtle border-solid border-t-[1px] border-0 border-btn">
                    {contentItems[activeTab]}
                </div>
            </div>
        </div>
    )
}

export default Tab