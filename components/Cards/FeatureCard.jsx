export default function FeatureCard(props) {

    return <div className="bg-[var(--active-color)] glassb rounded-xl flex flex-col xl:flex-row items-center">
        <img className="w-80 h-80" src={props.img}/>
        <div className="text-[#cacad0] m-2 flex flex-col">
            <h2 className="text-2xl m-0 rainbow">{props.title}</h2>
            <p>{props.text}</p>
            {/*<span><Link href={"#"}>ССЫЛКА</Link> ➔</span>*/}
            <span className="pl-4 text-sm mt-auto">{props.subtext}</span>
        </div>
    </div>
}