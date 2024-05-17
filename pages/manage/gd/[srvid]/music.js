import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import styles from "../../../../components/Manage/GDManage.module.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LogoNG from '../../../../assets/logos/ng-logo.jpeg'
import LogoYT from '../../../../assets/logos/yt-logo.jpeg'
import LogoVK from '../../../../assets/logos/vk-logo.png'
import LogoDZ from '../../../../assets/logos/dz-logo.png'
import LogoDBox from '../../../../assets/logos/dbox-logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDown19,
    faArrowDownAZ,
    faArrowDownWideShort,
    faCompactDisc, faDownload,
    faPause,
    faPlay, faQuestion, faSearch, faVolumeLow
} from "@fortawesome/free-solid-svg-icons";
import {
    TextField,
    InputAdornment,
    IconButton,
    Backdrop,
    Button,
    ClickAwayListener, MenuList, MenuItem
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {styled} from "@mui/system";
import ReactPlayer from "react-player";
import {LoadingButton} from "@mui/lab";
import useLocale from "../../../../locales/useLocale";
import useFiberAPI from "../../../../fiber/fiber";
import {MusicTour} from "@/locales/tours/manage/gd";
import {FloatButton, Input, Select, Tour, Slider, Pagination} from "antd";
import {debounce} from "lodash";


export default function MusicGD(props) {
    const refs = useRef({})
    const tourSteps = MusicTour.map((v,i)=>({
        ...v, target: ()=>refs.current[v.target],
        nextButtonProps: {children: <span>Далее</span>},
        prevButtonProps: {children: <span>Назад</span>},
        className: "w-fit lg:w-[520px]"
    }))
    const [tourOpen, setTourOpen] = useState(!!props.router.query.tour)


    const playerRef = useRef(null)
    const [playerData, setPlayerData] = useState({
        title: "Hmmmmmm",
        artist: "FruitSpace ft. Fruce",
        id: 0,
        src: "",
        volume: 100,
        position: 0,
        duration: 1, // in seconds
        playing: false,
        seeking: false
    })

    const [music, setMusic] = useState([])
    const [pageCount, setPageCount] = useState(10)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")
    const [backdrop, setBackdrop] = useState("none")
    const [loading, setLoading] = useState(false)
    const [musUrl, setMusUrl] = useState({
        ng: "", yt: "", dz: "", vk: "", db: ""
    })
    const [musUploadData, setMusUploadData] = useState({
        id: 0, name: "", artist: ""
    })
    const formatTime = (value)=>{
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const api = useFiberAPI()
    const [srv, setSrv] = api.servers.useGDPS()

    const [sortShow, setSortShow] = useState(false)
    const [sortMode, setSortModeX] = useState("downloads")
    const setSortMode=(mode)=>{
        setSortModeX(mode)
        searchMusic(mode)
        setSortShow(false)
    }

    const locale = useLocale(props.router)

    const searchMusic = (query, mode=sortMode) => {
            api.gdps_manage.getMusic(srv.Srv.srvid, mode, query||search, page).then((resp)=>{
            if(resp.status==="ok") {
                setMusic(resp.music)
                setPageCount(Math.ceil(resp.count/10))
            }else{
                console.error(resp)
            }
        })
    }

    const updateMusic = ({playedSeconds})=>{
        if(playerRef.current===null || playerData.seeking) return
        setPlayerData({
            ...playerData, duration: Math.floor(playerRef.current.getDuration()),
            position: Math.floor(playedSeconds),
        })
    }


    const addMusic = (type) => {
        let url=""
        switch (type) {
            case "ng": url=musUrl.ng; break;
            case "yt": url=musUrl.yt; break;
            case "dz": url=musUrl.dz; break;
            case "vk": url=musUrl.vk; break;
            case "db": url=musUrl.db; break;
        }
        setLoading(true)
        api.gdps_manage.addMusic(srv.Srv.srvid, type, url).then((resp)=>{
            if(resp.status==="ok") {
                setMusUploadData({id: resp.music.id, name: resp.music.name, artist: resp.music.artist})
            }else{
                setMusUploadData({id: resp.error})
                console.error(resp)
            }
            setLoading(false)
        })
    }



    useEffect(()=>{
        srv.Srv.srvid&&searchMusic()
    },[srv, page])

    const searchDebounced = debounce(searchMusic, 500)


    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <Tour open={tourOpen} onClose={()=>setTourOpen(false)} steps={tourSteps}/>
            <FloatButton
                shape="square"
                type="primary"
                style={{right: 20, bottom: 20}}
                onClick={() => setTourOpen(true)}
                icon={<FontAwesomeIcon icon={faQuestion} />}
            />
            <PanelContent>

                <div
                    className="flex flex-col gap-4 justify-center items-center xl:items-end w-full xl:w-2/3 xl:flex-row">
                    <ReactPlayer style={{display: "none"}} url={playerData.src || ''} playing={playerData.playing}
                                 volume={playerData.volume / 100} progressInterval={250} onProgress={updateMusic}
                                 onEnded={() => setPlayerData({...playerData, playing: false})} ref={playerRef}
                                 onSeek={(val) => setPlayerData({...playerData, position: val})}/>
                    <div>
                        <p className="bg-active text-sm rounded-t-lg px-2 w-fit border-1 border-b-active border-solid border-white border-opacity-25
                                        relative z-20 -mb-[1px]">Загрузить музыку</p>
                        <div
                            className="bg-active flex gap-2 items-center p-2 rounded-xl rounded-tl-none border-1 border-white border-opacity-25 z-10">
                            <img src={LogoNG.src} className="w-12 xl:w-16 rounded-lg cursor-pointer"
                                 onClick={() => setBackdrop("add-ng")}/>
                            {srv.Srv.plan > 1 && <img src={LogoYT.src} className="w-12 xl:w-16 rounded-lg cursor-pointer"
                                                  onClick={() => setBackdrop("add-yt")}/>}
                            {srv.Srv.plan > 2 && <img src={LogoDZ.src} className="w-12 xl:w-16 rounded-lg cursor-pointer"
                                                  onClick={() => setBackdrop("add-dz")}/>}
                            {srv.Srv.plan > 2 && <img src={LogoVK.src} className="w-12 xl:w-16 rounded-lg cursor-pointer"
                                                  onClick={() => setBackdrop("add-vk")}/>}
                            {srv.Srv.plan > 1 && <img src={LogoDBox.src} className="w-12 xl:w-16 rounded-lg cursor-pointer"
                                                  onClick={() => setBackdrop("add-db")}/>}
                        </div>
                    </div>

                    <div
                        className="flex-1 w-full xl:w-auto bg-active flex items-center gap-4 nextborder h-20 rounded-xl px-4 py-2">
                        <p className="w-10 h-10 rounded-full bg-white hover:bg-gray-300 cursor-pointer flex items-center justify-center"
                           onClick={() => setPlayerData({
                               ...playerData,
                               playing: !playerData.playing
                           })}>
                            <FontAwesomeIcon icon={playerData.playing ? faPause : faPlay}
                                             className="text-lg text-active aspect-square"/>
                        </p>
                        <div className="flex-1">
                            <p className="flex items-center gap-2">
                                <span
                                    className="text-ellipsis overflow-hidden text-nowrap max-w-40 xl:max-w-lg">{playerData.title}</span>
                                <span className="bg-btn rounded text-sm px-1.5">ID {playerData.id}</span>
                            </p>
                            <p className="text-xs text-gray-300">{playerData.artist}</p>
                            <div className="flex items-center gap-4 -mr-2">
                                <Slider className="m-0 flex-1" value={playerData.position} min={0} step={1}
                                        max={playerData.duration}
                                        onChange={(val) => playerRef.current.seekTo(val)} tooltip={{
                                    formatter: formatTime,
                                    placement: "bottom"
                                }}/>
                                <div className="flex items-center gap-2 w-24 nextborder rounded-lg px-2 py-1">
                                    <FontAwesomeIcon icon={faVolumeLow}/>
                                    <Slider className="m-0 flex-1 mr-1" value={playerData.volume} min={0} step={1}
                                            max={100}
                                            onChange={(val) => setPlayerData({...playerData, volume: val})} tooltip={{
                                        formatter: val => `${val}%`,
                                        placement: "bottom"
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mt-4 flex flex-col gap-4 rounded-xl bg-active nextborder p-4 w-full xl:w-2/3">
                    <div className="flex flex-col xl:flex-row items-center gap-2">
                        <Select value={sortMode} options={[
                            {
                                label: <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faArrowDownAZ}/>
                                    По алфавиту
                                </span>, value: "alpha"
                            },
                            {
                                label: <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faArrowDown19}/>
                                    По ID
                                </span>, value: "id"
                            },
                            {
                                label: <span className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faArrowDownWideShort}/>
                                    По загрузкам
                                </span>, value: "downloads"
                            }
                        ]} onChange={(val) => setSortMode(val)}/>
                        <Input placeholder="Поиск" value={search} prefix={<FontAwesomeIcon icon={faSearch}/>}
                               rootClassName="xl:w-64 "
                               onChange={(e) => {
                                   setSearch(e.target.value)
                                   searchDebounced(e.target.value)
                               }}/>
                        <Pagination rootClassName="ml-auto" total={pageCount} current={page + 1}
                                    onChange={(val) => setPage(val - 1)} showSizeChanger={false}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        {music && music.map((val, i) => (
                            <div className="flex items-center rounded-lg py-2 px-4 gap-4 cursor-pointer hover:bg-btn"
                                 key={i}
                                 onClick={() => {
                                     if (val.id === playerData.id) setPlayerData({
                                         ...playerData,
                                         playing: !playerData.playing
                                     })
                                     else setPlayerData({
                                         ...playerData,
                                         playing: true,
                                         title: val.name,
                                         artist: val.artist,
                                         id: val.id,
                                         src: val.url,
                                         position: 0,
                                         duration: 1
                                     })
                                 }}>
                                <FontAwesomeIcon icon={faCompactDisc} className="text-4xl"/>
                                <div>
                                    <p className="text-ellipsis overflow-hidden text-nowrap max-w-40 xl:max-w-[64rem]">{val.name}</p>
                                    <p className="text-sm text-gray-300 flex flex-col xl:flex-row xl:items-center gap-2">
                                        {val.artist}
                                        <p className="flex items-center gap-2">
                                            <span
                                                className="rounded px-1.5 text-xs bg-btn text-white">ID {val.id}</span>
                                            <span className="rounded px-1.5 text-xs bg-btn text-white">
                                            <FontAwesomeIcon icon={faDownload}/> {val.downloads}
                                        </span>
                                        </p>
                                    </p>
                                </div>
                                <FontAwesomeIcon
                                    icon={(playerData.playing && playerData.id === val.id) ? faPause : faPlay}
                                    className="ml-auto"/>
                            </div>
                        ))}
                    </div>
                </div>

               </PanelContent>

            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={backdrop != "none"} onClick={() => setBackdrop("none")}>
                {backdrop === "add-ng" &&
                    <div className={styles.BackdropBox} style={{minWidth: "20rem", padding: ".5rem"}}
                         onClick={(e) => e.stopPropagation()}>
                        <div className={styles.UploadMusicBox}>
                            <img src={LogoNG.src}/>
                            <h3>NewGrounds</h3>
                        </div>
                        <FruitThinField fullWidth label={locale.get("url")} value={musUrl.ng || ''}
                                        onChange={(evt) => setMusUrl({...musUrl, ng: evt.target.value})}/>
                        <p style={{textAlign: "center"}}>{locale.get("oruse")[0]}<span
                            className={styles.CodeBlock}>hal:ng:&lt;ID&gt;</span>{locale.get("oruse")[1]}</p>
                        {musUploadData.id !== 0 && <div className={styles.UploadTrackBox}>
                            <div>
                                <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg}
                                                 style={{marginRight: "1rem", height: "3rem"}}/>
                                <h3>ID: {musUploadData.id}</h3>
                            </div>
                            <p>{musUploadData.name} — {musUploadData.artist}</p>
                        </div>}
                        <div className={styles.CardBottom}>
                            <LoadingButton loading={loading} variant="contained" className={styles.cardButton}
                                           style={{width: "100%", margin: "0"}}
                                           onClick={() => addMusic("ng")}>{locale.get("upload")}</LoadingButton>
                        </div>
                    </div>}

                {backdrop === "add-yt" &&
                    <div className={styles.BackdropBox} style={{minWidth: "20rem", padding: ".5rem"}}
                         onClick={(e) => e.stopPropagation()}>
                        <div className={styles.UploadMusicBox}>
                            <img src={LogoYT.src}/>
                            <h3>YouTube</h3>
                        </div>
                        <FruitThinField fullWidth label={locale.get("videolink")} value={musUrl.yt || ''}
                                        onChange={(evt) => setMusUrl({...musUrl, yt: evt.target.value})}/>
                        <p style={{textAlign: "center"}}>{locale.get("oruse")[0]}<span
                            className={styles.CodeBlock}>hal:yt:&lt;ID&gt;</span>{locale.get("oruse")[1]}</p>
                        {musUploadData.id !== 0 && <div className={styles.UploadTrackBox}>
                            <div>
                                <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg}
                                                 style={{marginRight: "1rem", height: "3rem"}}/>
                                <h3>ID: {musUploadData.id}</h3>
                            </div>
                            <p>{musUploadData.name} — {musUploadData.artist}</p>
                        </div>}
                        <div className={styles.CardBottom}>
                            <LoadingButton loading={loading} variant="contained" className={styles.cardButton}
                                           style={{width: "100%", margin: "0"}}
                                           onClick={() => addMusic("yt")}>{locale.get("upload")}</LoadingButton>
                        </div>
                    </div>}

                {backdrop === "add-dz" &&
                    <div className={styles.BackdropBox} style={{minWidth: "20rem", padding: ".5rem"}}
                         onClick={(e) => e.stopPropagation()}>
                        <div className={styles.UploadMusicBox}>
                            <img src={LogoDZ.src}/>
                            <h3>Deezer</h3>
                        </div>
                        <FruitThinField fullWidth label={locale.get("url")} value={musUrl.dz || ''}
                                        onChange={(evt) => setMusUrl({...musUrl, dz: evt.target.value})}/>
                        <p style={{textAlign: "center"}}>{locale.get("oruse")[0]} <span
                            className={styles.CodeBlock}>hal:dz:&lt;ID&gt;</span>{locale.get("oruse")[1]}</p>
                        {musUploadData.id !== 0 && <div className={styles.UploadTrackBox}>
                            <div>
                                <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg}
                                                 style={{marginRight: "1rem", height: "3rem"}}/>
                                <h3>ID: {musUploadData.id}</h3>
                            </div>
                            <p>{musUploadData.name} — {musUploadData.artist}</p>
                        </div>}
                        <div className={styles.CardBottom}>
                            <LoadingButton loading={loading} variant="contained" className={styles.cardButton}
                                           style={{width: "100%", margin: "0"}}
                                           onClick={() => addMusic("dz")}>{locale.get("upload")}</LoadingButton>
                        </div>
                    </div>}

                {backdrop === "add-vk" &&
                    <div className={styles.BackdropBox} style={{minWidth: "20rem", padding: ".5rem"}}
                         onClick={(e) => e.stopPropagation()}>
                        <div className={styles.UploadMusicBox}>
                            <img src={LogoVK.src}/>
                            <h3>VK</h3>
                        </div>
                        <p style={{textAlign: "center"}}>{locale.get("bot")}</p>
                        <p style={{textAlign: "center"}}>{locale.get("oruse")[0]}<span
                            className={styles.CodeBlock}>hal:vk:&lt;ID&gt;</span>{locale.get("oruse")[1]}</p>
                        {musUploadData.id !== 0 && <div className={styles.UploadTrackBox}>
                            <div>
                                <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg}
                                                 style={{marginRight: "1rem", height: "3rem"}}/>
                                <h3>ID: {musUploadData.id}</h3>
                            </div>
                            <p>{musUploadData.name} — {musUploadData.artist}</p>
                        </div>}
                        <div className={styles.CardBottom}>
                            <LoadingButton loading={loading} variant="contained" className={styles.cardButton}
                                           style={{width: "100%", margin: "0"}}
                                           onClick={() => addMusic("vk")}
                                           disabled>{locale.get("upload")}</LoadingButton>
                        </div>
                    </div>}

                {backdrop === "add-db" &&
                    <div className={styles.BackdropBox} style={{minWidth: "20rem", padding: ".5rem"}}
                         onClick={(e) => e.stopPropagation()}>
                        <div className={styles.UploadMusicBox}>
                            <img src={LogoDBox.src}/>
                            <h3>Dropbox</h3>
                        </div>
                        <FruitThinField fullWidth label={locale.get("filelink")} value={musUrl.db || ''}
                                        onChange={(evt) => setMusUrl({...musUrl, db: evt.target.value})}/>
                        <p style={{textAlign: "center"}}>{locale.get("oruse")[0]}<span
                            className={styles.CodeBlock}>&lt;URL&gt;</span>{locale.get("oruse")[1]}</p>
                        {musUploadData.id !== 0 && <div className={styles.UploadTrackBox}>
                            <div>
                                <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg}
                                                 style={{marginRight: "1rem", height: "3rem"}}/>
                                <h3>ID: {musUploadData.id}</h3>
                            </div>
                            <p>{musUploadData.name} — {musUploadData.artist}</p>
                        </div>}
                        <div className={styles.CardBottom}>
                            <LoadingButton loading={loading} variant="contained" className={styles.cardButton}
                                           style={{width: "100%", margin: "0"}}
                                           onClick={() => addMusic("db")}>{locale.get("upload")}</LoadingButton>
                        </div>
                    </div>}

            </Backdrop>
        </>
    )
}

MusicGD.RequireAuth = true


const FruitThinField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#0d6efd',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiInputLabel-root[data-shrink="false"]:not(.Mui-focused)': {
        transform: "translate(14px, 10px) scale(1)"
    },
    '& .MuiOutlinedInput-root': {
        height: 40,
        '& fieldset': {
            borderColor: 'white !important',
        },
        '&:hover fieldset': {
            borderColor: '#cacad0',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0d6efd',
        },
        borderRadius: "8px",
        color: "white",
    },
});

