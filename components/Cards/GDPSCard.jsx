import {faAndroid, faApple, faWindows} from "@fortawesome/free-brands-svg-icons";
import {faArrowUpFromBracket, faDownload, faGem, faLink, faZap} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useSWR from "swr";
import {CircularProgress, circularProgressClasses} from "@mui/material";
import {Button, Dropdown} from "antd";


export default function GDPSCard(props) {
    let bg = "var(--primary-color)"
    let hover = "blue-800"
    let icon = faArrowUpFromBracket
    switch (props.planid) {
        case 2:
            bg = "var(--success-color)"
            hover = "[green]"
            icon = faZap
            break
        case 3:
            bg = "magenta"
            hover = "[#a400a4]"
            icon = faGem
            break
    }

    return (
        <div ref={props.sref} className="col-span-2 p-2 lg:p-4 rounded-2xl flex gap-4 items-center bg-active glassb">
            <img src={props.icon} className="rounded-lg h-20" />
            <div className="flex flex-col gap-1">
                <p className="text-lg text-nowrap text-ellipsis overflow-hidden max-w-64">{props.name}</p>
                <p className="m-0 text-gray-400 flex items-center gap-2">
                    {props.id} •
                    <span ref={props.tref} className={`text-white rounded-lg cursor-pointer flex gap-2 items-center group border-solid box-border border-2 hover:!border-${hover}`}
                          style={{borderColor: bg}} onClick={props.onClick}>
                        <FontAwesomeIcon icon={icon} className={`rounded-l-md p-1.5 aspect-square group-hover:!bg-${hover}`} style={{backgroundColor: bg}} />
                        <span className="inline pr-2 text-sm md:text-base">{props.plan}</span>
                    </span>
                </p>
            </div>
        </div>
    )
}

export function DownloadCard(props) {
    const api = props.api
    const {data, isLoading, error} = useSWR(props.srvid, api.gdps_manage.fetchBuildStatus, {refreshInterval:3000})

    return (
        <div ref={props.sref} className="flex flex-col p-2 lg:p-4 rounded-xl bg-active glassb">
            <Dropdown.Button type="primary" icon={<FontAwesomeIcon icon={faLink} />} menu={{
                items: [
                    {
                        label: "Скопировать ссылку"
                    }
                ],
                onClick: (key) => {
                    navigator.clipboard.writeText(`https://gofruit.space/gdps/${props.srvid}`)
                    props.copyR()
                },
            }} buttonsRender={(btns)=> {
                btns[0] = <Button type="primary" className="w-full" onClick={()=>props.router.push(`https://gofruit.space/gdps/${props.srvid}`)}
                                  icon={<FontAwesomeIcon icon={faDownload} />}>
                    <span className="!hidden xl:!inline">Скачать</span>
                </Button>
                return btns
            }}>
                <FontAwesomeIcon icon={faDownload}/> Скачать
            </Dropdown.Button>
            <div className="mt-auto">
                <p className="bg-active text-sm rounded-t-lg px-2 w-fit border-1 border-b-active border-solid border-white border-opacity-25
                                        relative z-20 -mb-[1px]">
                    Платформы
                </p>
                <div className="bg-active p-1 rounded-lg rounded-tl-none border-1 border-solid border-white border-opacity-25 text-md whitespace-normal leading-tight mt-0
                                        relative z-10 flex items-center justify-between">
                    {(data && data.message !== "") ? <span className="flex items-center justify-center h-8 gap-2 text-sm">
                    <CircularProgress
                        variant="indeterminate"
                        disableShrink
                        sx={{
                            color: '#fff',
                            animationDuration: '550ms',
                            left: 0,
                            [`& .${circularProgressClasses.circle}`]: {
                                strokeLinecap: 'round',
                            },
                        }}
                        size={20}
                        thickness={6}
                    />
                        {data.message == "waiting" && "Ждем сборки"}
                        {data.message == "building" && "Идет сборка"}
                </span> : (<>
                        {props.srv.client_windows_url && <FontAwesomeIcon
                            className="rounded-md p-2 hover:bg-primary cursor-pointer aspect-square"
                            icon={faWindows}
                            onClick={() => window.location.href = props.srv.client_windows_url}/>}
                        {props.srv.client_android_url && <FontAwesomeIcon
                            className="rounded-md p-2 hover:bg-primary cursor-pointer aspect-square"
                            icon={faAndroid}
                            onClick={() => window.location.href = props.srv.client_android_url}/>}
                        {props.srv.client_ios_url && <FontAwesomeIcon
                            className="rounded-md p-2 hover:bg-primary cursor-pointer aspect-square"
                            icon={faApple}
                            onClick={() => window.location.href = props.srv.client_ios_url}/>}
                        {props.srv.client_macos_url && <img src="/macbook-48.png"
                                                            className="rounded-lg h-[1.75em] p-0.5 hover:bg-[var(--primary-color)] cursor-pointer aspect-square"
                                                            onClick={() => window.location.href = props.srv.client_macos_url}/>}
                    </>)}
                </div>
            </div>

        </div>
    )
}