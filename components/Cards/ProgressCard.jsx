

export default function ProgressCard(props) {
    let width = Math.max(Math.floor(props.now/props.max*100),0)
    let clr = "#0d6efd"
    if(props.date) {
        width = 100-width
    }
    if (props.color) {
        width>=20 ? clr="var(--success-color)": null
        width>=75 ? clr="rgb(249 115 22)": null
        width>=90 ? clr="#f04747": null
        width>=100 ? clr=`repeating-linear-gradient(
            -45deg,
            var(--error-color),
            var(--error-color) 10px,
            var(--btn-color) 10px,
            var(--btn-color) 15px
    )`:null
    }
    if (props.max===-1) {
        width = 100
        clr = "var(--success-color)"
    }




    return (
        <div className="mx-1 my-1.5 md:m-3 w-auto p-3 rounded-xl" style={{backgroundColor: "var(--active-color)"}}>
            <div className="h-3 rounded-xl" style={{backgroundColor: "var(--btn-color)"}}>
                <div className="h-full rounded-xl" style={{background: clr, width: width+"%"}} />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center">
                {props.date
                    ?<p className="text-gray-400 m-2 text-lg">{props.text}</p>
                :<><h2 className="text-gray-400 m-2 text-3xl flex items-center">{props.now}/{props.max===-1
                        ?<span className={"text-5xl inline-block"} style={{margin:"-0.5rem 0"}}>∞</span>:props.max}</h2>
                    <p className="text-gray-400 m-2 text-lg">{props.text}</p></>}
            </div>
        </div>
    )
}