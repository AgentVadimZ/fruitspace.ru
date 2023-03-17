import List from "@mui/material/List";


export default function TariffCard(props) {


    return (
        <div className="w-full flex flex-col lg:w-80 rounded-xl bg-[var(--subtle-color)] border-solid border-2
        border-[var(--bkg-color)] hover:border-[var(--primary-color)]">
            <div className="rounded-lg h-36 bg-cover m-1.5" style={{backgroundImage:`url('${props.img}')`}}>
                <div className="flex justify-end items-center flex-col h-full rounded-lg bg-gradient-to-b from-transparent to-gray-600">
                    <span className="text-4xl p-2 text-white flex items-center">{props.name}</span>
                    <span className="text-2xl p-2 text-white flex items-center">
                        {props.price>0 ?<>{props.price}{props.i}</>:props.card.free} {props.discount>0 && props.price>0 && <span
                        className="text-base font-normal ml-2 rounded-md px-1.5 py-0.5 bg-[var(--success-color)]">-{props.discount}%</span>}
                    </span>
                </div>
            </div>
            <div className="rounded-xl mt-3 py-2 px-4 bg-[var(--subtle-color)]">
                <p className="m-0 text-base">{props.desc}</p>
                <p className="font-bold text-base mb-0">➔ {props.card.what}</p>
                <List className="text-white">
                    {props.children}
                </List>
            </div>
            <a className="bg-[var(--primary-color)] hover:bg-blue-800 cursor-pointer flex justify-center rounded-lg py-2 text-lg m-2 mt-auto"
            onClick={props.onClick}>{props.card.select}
            </a>
        </div>
    )
}