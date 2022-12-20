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
import {faCompactDisc, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {Slider, Pagination, TextField, InputAdornment, IconButton, Backdrop, Button} from "@mui/material";
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
import vkLogo from "../../../../components/assets/social/vkontakte.png";
import DeleteIcon from "@mui/icons-material/Delete";
import discordLogo from "../../../../components/assets/social/discord.png";

export default function MusicGD(props) {
    const [srv, setSrv] = useRecoilState(GDServer)
    const [cookies, setCookie, delCookie] = useCookies(["token"])
    const playerRef = useRef(null)
    const [playerData, setPlayerData] = useState({
        title: "Выберите трек",
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
    const formatTime = (value)=>{
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    const searchMusic = () => {
        fetch("https://api.fruitspace.one/v1/manage/gd/get_music",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({id: srv.srvid, page: page, query: search})}).then(resp=>resp.json()).then((resp)=>{
            if(resp.status==="ok") {
                setMusic(resp.music)
                setPageCount(Math.ceil(resp.total/10))
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



    useEffect(()=>{
        srv.srvid&&searchMusic()
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
                        <img src={LogoNG.src} />
                        {srv.tariffConfig && srv.tariffConfig.Music.YouTube && <img src={LogoYT.src} /> }
                        {srv.tariffConfig && srv.tariffConfig.Music.Deezer &&<img src={LogoDZ.src} /> }
                        {srv.tariffConfig && srv.tariffConfig.Music.VK &&<img src={LogoVK.src} /> }
                        {srv.tariffConfig && srv.tariffConfig.Music.Files &&<img src={LogoDBox.src} /> }
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
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <FruitThinField label="Поиск"
                                        value={search} onChange={(evt)=>setSearch(evt.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={searchMusic}>
                                                        <Search />
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }} />
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
                {backdrop==="add-ng" && <div className={styles.BackdropBox} onClick={(e)=>e.stopPropagation()}>
                    <h3>💬 Ссылки на медиа</h3>
                    <p>Инвайт для Discord сервера генерируйте <b style={{color:"var(--primary-color)"} }>бессрочным</b></p>
                    <FruitThinField fullWidth label="Паблик ВКонтакте" value={settings.description.vk||''}
                                    onChange={(evt)=>setSettings({...settings, description: {
                                            ...settings.description, vk: evt.target.value
                                        }})}
                                    placeholder="fruit_space"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"><IconButton>
                                                <img src={vkLogo.src} className={styles.adornments}/>
                                            </IconButton><p>vk.com/</p></InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={()=>{setSettings({...settings, description: {
                                                        ...settings.description, vk: ""
                                                    }})}}>
                                                    <DeleteIcon className={styles.redsvg}/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}/>
                    <FruitThinField fullWidth label="Сервер Discord" value={settings.description.discord||''}
                                    onChange={(evt)=>setSettings({...settings, description: {
                                            ...settings.description, discord: evt.target.value
                                        }})}
                                    placeholder="fruitspace"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"><IconButton>
                                                <img src={discordLogo.src} className={styles.adornments}/>
                                            </IconButton><p>discord.gg/</p></InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" onClick={()=>{setSettings({...settings, description: {
                                                        ...settings.description, discord: ""
                                                    }})}}>
                                                    <DeleteIcon className={styles.redsvg}/>
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}/>
                    <div className={styles.CardBottom}>
                        <Button variant="contained" className={styles.cardButton}
                                onClick={()=>setBackdrop("none")}>Готово</Button>
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

