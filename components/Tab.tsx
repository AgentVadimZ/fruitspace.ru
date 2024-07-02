import {Segmented} from "antd";
import {ReactNode, useState} from "react";


type TabProps = {
    addbtn?: ReactNode
    defaultTab?: string
    onChange?: (value: string) => void
    tabs?: {
        key: string
        label: string
        icon?: ReactNode
        children: ReactNode
        disabled?: boolean
    }[]
}

const Tab = ({addbtn, defaultTab, onChange, tabs}: TabProps) => {

    const tabItems = tabs?.map((tab)=>{
        return {
            value: tab.key,
            label: tab.label,
            icon: tab.icon,
            disabled: tab.disabled
        }
    })||[]

    const contentItems = tabs?.reduce((prev, cur)=>({...prev, [cur.key]: cur.children}), {})||{}

    const [activeTab, setActiveTab] = useState(defaultTab||tabItems[0].value)

    return (
        <div className="w-full glassb rounded-2xl">
            <div className="bg-active flex justify-between items-center p-3 border-subtle border-solid border-1 rounded-t-2xl border-b-0">
                <Segmented rootClassName="bg-btn select-none" options={tabItems}
                           defaultValue={defaultTab} onChange={(value) => {
                    setActiveTab(value);
                    onChange && onChange(value)
                }}/>
                {addbtn && addbtn}
            </div>
            <div className="bg-active border-subtle rounded-b-2xl border-solid border-1 border-t-0">
                <div className="w-full rounded-2xl bg-subtle border-solid border-t-[1px] border-0 border-btn">
                    {contentItems[activeTab]}
                </div>
            </div>
        </div>
    )
}

export default Tab