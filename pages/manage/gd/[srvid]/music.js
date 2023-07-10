import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {Router, useRouter} from "next/router";
import styles from "../../../../components/Manage/GDManage.module.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LogoNG from '../../../../components/assets/logos/ng-logo.jpeg'
import LogoYT from '../../../../components/assets/logos/yt-logo.jpeg'
import LogoVK from '../../../../components/assets/logos/vk-logo.png'
import LogoDZ from '../../../../components/assets/logos/dz-logo.png'
import LogoDBox from '../../../../components/assets/logos/dbox-logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDown19,
    faArrowDownAZ,
    faArrowDownWideShort,
    faCompactDisc,
    faPause,
    faPlay
} from "@fortawesome/free-solid-svg-icons";
import {
    Slider,
    Pagination,
    TextField,
    InputAdornment,
    IconButton,
    Backdrop,
    Button,
    ClickAwayListener, ButtonGroup, MenuList, MenuItem
} from "@mui/material";
import {PauseRounded, PlayArrowRounded, Search, VolumeUpRounded} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";
import {styled} from "@mui/system";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ListItem from "@mui/material/ListItem";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import toast from "react-hot-toast";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import BackupBox from "../../../../components/assets/icons/backup_box.svg";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import useEffectOnce from "../../../../components/Hooks";
import {useCookies} from "react-cookie";
import {useRecoilState} from "recoil";
import GDServer from "../../../../states/gd_server";
import ReactPlayer from "react-player";
import {LoadingButton} from "@mui/lab";
import {Tooltip} from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useLocale from "../../../../locales/useLocale";
import useFiberAPI from "../../../../fiber/fiber";


export default function MusicGD(props) {
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

    const searchMusic = (mode) => {
            api.gdps_manage.getMusic(srv.Srv.srvid, mode, search, page).then((resp)=>{
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
        srv.Srv.srvid&&searchMusic(sortMode)
    },[srv, page])

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <PanelContent>
                <div className={`${styles.CardBox} ${styles.MusicSlider}`}>
                    <ReactPlayer style={{display:"none"}} url={playerData.src||''} playing={playerData.playing}
                                 volume={playerData.volume/100} progressInterval={250} onProgress={updateMusic}
                    onEnded={()=>setPlayerData({...playerData,playing: false})} ref={playerRef}
                    onSeek={(val)=>setPlayerData({...playerData, position: val})}/>
                    <div className={styles.MusicSliderSelector}>
                        <AddCircleIcon />
                        <KeyboardArrowRightIcon />
                        <img src={LogoNG.src} onClick={()=>setBackdrop("add-ng")} />
                        {srv.Tariff && srv.Tariff.Music.YouTube && <img src={LogoYT.src} onClick={()=>setBackdrop("add-yt")} /> }
                        {srv.Tariff && srv.Tariff.Music.Deezer &&<img src={LogoDZ.src} onClick={()=>setBackdrop("add-dz")} /> }
                        {srv.Tariff && srv.Tariff.Music.VK &&<img src={LogoVK.src} onClick={()=>setBackdrop("add-vk")} /> }
                        {srv.Tariff && srv.Tariff.Music.Files &&<img src={LogoDBox.src} onClick={()=>setBackdrop("add-db")} /> }
                    </div>
                    <span className={styles.SliderDelimiter} />
                    <div className={styles.MusicSliderPlayer}>
                        <div aria-label='top'>
                            {playerData.playing
                            ? <FontAwesomeIcon icon={faPause} onClick={()=>setPlayerData({...playerData, playing: !playerData.playing})} />
                            : <FontAwesomeIcon icon={faPlay} onClick={()=>setPlayerData({...playerData, playing: !playerData.playing})} />}
                            <div className={styles.MusicPlayerText}>
                                <h3>{playerData.title}</h3>
                                <p>{playerData.artist}</p>
                            </div>
                            <p className={styles.MusicPlayerID}>ID {playerData.id}</p>
                        </div>
                        <div aria-label='bottom'>
                            <div style={{flex:1}}>
                                <Slider
                                    aria-label="time-indicator"
                                    size="small"
                                    value={playerData.position}
                                    min={0}
                                    step={1}
                                    max={playerData.duration}
                                    onChange={(_, val) => playerRef.current.seekTo(val)}
                                    sx={{
                                        color: '#fff',
                                        height: 4,
                                        padding: "0",
                                        minWidth: "8rem",
                                        '& .MuiSlider-thumb': {
                                            width: 8,
                                            height: 8,
                                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                            '&:before': {
                                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                            },
                                            '&:hover, &.Mui-focusVisible': {
                                                boxShadow: `0px 0px 0px 8px rgb(255 255 255 / 16%)`,
                                            },
                                            '&.Mui-active': {
                                                width: 20,
                                                height: 20,
                                            },
                                        },
                                        '& .MuiSlider-rail': {
                                            opacity: 0.28,
                                        },
                                    }}
                                />
                                <div className={styles.PlayerTimelineText}>
                                    <span>{formatTime(playerData.position)}</span>
                                    <span>{formatTime(playerData.duration)}</span>
                                </div>
                            </div>
                            <div className={styles.PlayerVolumeBox}>
                                <VolumeUpRounded />
                                <Slider
                                    aria-label="Volume"
                                    defaultValue={100}
                                    value={playerData.volume}
                                    max={100}
                                    onChange={(_,val)=>setPlayerData({...playerData, volume: val})}
                                    sx={{
                                        color: '#fff',
                                        marginLeft:".5rem",
                                        '& .MuiSlider-track': {
                                            border: 'none',
                                        },
                                        '& .MuiSlider-thumb': {
                                            width: 16,
                                            height: 16,
                                            backgroundColor: '#fff',
                                            '&:before': {
                                                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                            },
                                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                                boxShadow: 'none',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>




                <div className={styles.CardBox} style={{marginTop:"2rem"}}>
                    <div className={styles.MusicSearchBox}>
                        <div className={styles.MusicSearchSlick}>
                            <ClickAwayListener onClickAway={()=>setSortShow(false)}>
                                <div>
                            <Tooltip
                                open={sortShow}
                                disableFocusListener disableHoverListener disableTouchListener
                                title={
                                    <MenuList>
                                        <MenuItem selected={false} style={{borderRadius:"4px", backgroundColor: (sortMode==="alpha"?"#0d6efd":"none")}}
                                            onClick={()=>setSortMode("alpha")}>
                                            <Button style={{color: "white"}} variant="text"
                                                    startIcon={<FontAwesomeIcon icon={faArrowDownAZ} style={{height:"1.5rem"}}/>}>
                                                {locale.get("sort")[0]}
                                            </Button>
                                        </MenuItem>
                                        <MenuItem selected={false} style={{borderRadius:"4px", backgroundColor: (sortMode==="id"?"#0d6efd":"none")}}
                                                  onClick={()=>setSortMode("id")}>
                                            <Button style={{color: "white"}} variant="text"
                                                    startIcon={<FontAwesomeIcon icon={faArrowDown19} style={{height:"1.5rem"}}/>}>
                                                {locale.get("sort")[1]}
                                            </Button>
                                        </MenuItem>
                                        <MenuItem selected={false} style={{borderRadius:"4px", backgroundColor: (sortMode==="downloads"?"#0d6efd":"none")}}
                                                  onClick={()=>setSortMode("downloads")}>
                                            <Button style={{color: "white"}} variant="text"
                                                    startIcon={<FontAwesomeIcon icon={faArrowDownWideShort} style={{height:"1.5rem"}}/>}>
                                                {locale.get("sort")[2]}
                                            </Button>
                                        </MenuItem>
                                    </MenuList>
                                }>
                                <Button onClick={()=>setSortShow(!sortShow)} className={styles.SlimButton}
                                style={{margin: "0 .5rem 0 0", color: "white"}}>
                                    {sortMode==="alpha"&&<FontAwesomeIcon icon={faArrowDownAZ} style={{height:"1.5rem"}}/>}
                                    {sortMode==="id"&&<FontAwesomeIcon icon={faArrowDown19} style={{height:"1.5rem"}}/>}
                                    {sortMode==="downloads"&&<FontAwesomeIcon icon={faArrowDownWideShort} style={{height:"1.5rem"}}/>}
                                    <KeyboardArrowDownIcon style={{height:"1rem"}} />
                                </Button>
                            </Tooltip>
                                </div>
                            </ClickAwayListener>

                            <FruitThinField label={locale.get('search')}
                                            value={search} onChange={(evt)=>setSearch(evt.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end" onClick={()=>searchMusic(sortMode)}>
                                                            <Search />
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }} />
                        </div>
                        <Pagination count={pageCount} page={page+1} onChange={(e,val)=>setPage(val-1)} shape="rounded" sx={{"& *": {color:"white !important"}}} />
                    </div>
                    <List>
                        {music&&music.map((val,i)=>(
                            <ListItem key={i} className={styles.hoverable} secondaryAction={
                                <IconButton edge="end" onClick={()=>{
                                    if (val.id===playerData.id) setPlayerData({...playerData, playing: !playerData.playing})
                                    else setPlayerData({...playerData, playing: true,
                                        title: val.name, artist: val.artist, id: val.id, src: val.url, position: 0, duration: 1})
                                }} >
                                    {(playerData.playing&&playerData.id===val.id)? <PauseRounded/> :<PlayArrowRounded/> }
                                </IconButton>}>
                                <ListItemAvatar>
                                    <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg} style={{marginRight:"1rem", height:"3rem"}}/>
                                </ListItemAvatar>
                                <ListItemText primary={<>{val.name} <span className={styles.MusicPlayerID}>ID {val.id}</span></>}
                                              secondary={<p style={{margin:0}}>{val.artist}</p>}/>
                            </ListItem>
                        ))}

                    </List>
                </div>
            </PanelContent>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop!="none"} onClick={()=>setBackdrop("none")}>
                {backdrop==="add-ng" && <div className={styles.BackdropBox} style={{minWidth:"20rem",padding:".5rem"}} onClick={(e)=>e.stopPropagation()}>
                    <div className={styles.UploadMusicBox}>
                        <img src={LogoNG.src} />
                        <h3>NewGrounds</h3>
                    </div>
                    <FruitThinField fullWidth label={locale.get("url")} value={musUrl.ng||''}
                                    onChange={(evt)=>setMusUrl({...musUrl,ng:evt.target.value})} />
                    <p style={{textAlign:"center"}}>{locale.get("oruse")[0]}<span className={styles.CodeBlock}>hal:ng:&lt;ID&gt;</span>{locale.get("oruse")[1]}</p>
                    {musUploadData.id!==0 && <div className={styles.UploadTrackBox}>
                        <div>
                            <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg} style={{marginRight:"1rem", height:"3rem"}}/>
                            <h3>ID: {musUploadData.id}</h3>
                        </div>
                        <p>{musUploadData.name} — {musUploadData.artist}</p>
                    </div>}
                    <div className={styles.CardBottom}>
                        <LoadingButton loading={loading} variant="contained" className={styles.cardButton} style={{width:"100%",margin:"0"}}
                                       onClick={()=>addMusic("ng")}>{locale.get("upload")}</LoadingButton>
                    </div>
                </div>}

                {backdrop==="add-yt" && <div className={styles.BackdropBox} style={{minWidth:"20rem",padding:".5rem"}} onClick={(e)=>e.stopPropagation()}>
                    <div className={styles.UploadMusicBox}>
                        <img src={LogoYT.src} />
                        <h3>YouTube</h3>
                    </div>
                    <FruitThinField fullWidth label={locale.get("videolink")} value={musUrl.yt||''}
                                    onChange={(evt)=>setMusUrl({...musUrl,yt:evt.target.value})} />
                    <p style={{textAlign:"center"}}>{locale.get("oruse")[0]}<span className={styles.CodeBlock}>hal:yt:&lt;ID&gt;</span>{locale.get("oruse")[1]}</p>
                    {musUploadData.id!==0 && <div className={styles.UploadTrackBox}>
                        <div>
                            <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg} style={{marginRight:"1rem", height:"3rem"}}/>
                            <h3>ID: {musUploadData.id}</h3>
                        </div>
                        <p>{musUploadData.name} — {musUploadData.artist}</p>
                    </div>}
                    <div className={styles.CardBottom}>
                        <LoadingButton loading={loading} variant="contained" className={styles.cardButton} style={{width:"100%",margin:"0"}}
                                       onClick={()=>addMusic("yt")}>{locale.get("upload")}</LoadingButton>
                    </div>
                </div>}

                {backdrop==="add-dz" && <div className={styles.BackdropBox} style={{minWidth:"20rem",padding:".5rem"}} onClick={(e)=>e.stopPropagation()}>
                    <div className={styles.UploadMusicBox}>
                        <img src={LogoDZ.src} />
                        <h3>Deezer</h3>
                    </div>
                    <FruitThinField fullWidth label={locale.get("url")} value={musUrl.dz||''}
                                    onChange={(evt)=>setMusUrl({...musUrl,dz:evt.target.value})} />
                    <p style={{textAlign:"center"}}>{locale.get("oruse")[0]} <span className={styles.CodeBlock}>hal:dz:&lt;ID&gt;</span>{locale.get("oruse")[1]}</p>
                    {musUploadData.id!==0 && <div className={styles.UploadTrackBox}>
                        <div>
                            <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg} style={{marginRight:"1rem", height:"3rem"}}/>
                            <h3>ID: {musUploadData.id}</h3>
                        </div>
                        <p>{musUploadData.name} — {musUploadData.artist}</p>
                    </div>}
                    <div className={styles.CardBottom}>
                        <LoadingButton loading={loading} variant="contained" className={styles.cardButton} style={{width:"100%",margin:"0"}}
                                       onClick={()=>addMusic("dz")}>{locale.get("upload")}</LoadingButton>
                    </div>
                </div>}

                {backdrop==="add-vk" && <div className={styles.BackdropBox} style={{minWidth:"20rem",padding:".5rem"}} onClick={(e)=>e.stopPropagation()}>
                    <div className={styles.UploadMusicBox}>
                        <img src={LogoVK.src} />
                        <h3>VK</h3>
                    </div>
                    <p style={{textAlign:"center"}}>{locale.get("bot")}</p>
                    <p style={{textAlign:"center"}}>{locale.get("oruse")[0]}<span className={styles.CodeBlock}>hal:vk:&lt;ID&gt;</span>{locale.get("oruse")[1]}</p>
                    {musUploadData.id!==0 && <div className={styles.UploadTrackBox}>
                        <div>
                            <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg} style={{marginRight:"1rem", height:"3rem"}}/>
                            <h3>ID: {musUploadData.id}</h3>
                        </div>
                        <p>{musUploadData.name} — {musUploadData.artist}</p>
                    </div>}
                    <div className={styles.CardBottom}>
                        <LoadingButton loading={loading} variant="contained" className={styles.cardButton} style={{width:"100%",margin:"0"}}
                                       onClick={()=>addMusic("vk")} disabled>{locale.get("upload")}</LoadingButton>
                    </div>
                </div>}

                {backdrop==="add-db" && <div className={styles.BackdropBox} style={{minWidth:"20rem",padding:".5rem"}} onClick={(e)=>e.stopPropagation()}>
                    <div className={styles.UploadMusicBox}>
                        <img src={LogoDBox.src} />
                        <h3>Dropbox</h3>
                    </div>
                    <FruitThinField fullWidth label={locale.get("filelink")} value={musUrl.db||''}
                                    onChange={(evt)=>setMusUrl({...musUrl,db:evt.target.value})} />
                    <p style={{textAlign:"center"}}>{locale.get("oruse")[0]}<span className={styles.CodeBlock}>&lt;URL&gt;</span>{locale.get("oruse")[1]}</p>
                    {musUploadData.id!==0 && <div className={styles.UploadTrackBox}>
                        <div>
                            <FontAwesomeIcon icon={faCompactDisc} className={styles.bluesvg} style={{marginRight:"1rem", height:"3rem"}}/>
                            <h3>ID: {musUploadData.id}</h3>
                        </div>
                        <p>{musUploadData.name} — {musUploadData.artist}</p>
                    </div>}
                    <div className={styles.CardBottom}>
                        <LoadingButton loading={loading} variant="contained" className={styles.cardButton} style={{width:"100%",margin:"0"}}
                                       onClick={()=>addMusic("db")}>{locale.get("upload")}</LoadingButton>
                    </div>
                </div>}

            </Backdrop>
        </>
    )
}

MusicGD.RequireAuth=true



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

