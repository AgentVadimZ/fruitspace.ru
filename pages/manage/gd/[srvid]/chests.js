import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import styles from "../../../../components/Manage/GDManage.module.css"
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {styled} from "@mui/system";
import {Button, IconButton, Switch, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";

import shardFire from "../../../../components/assets/shards/fire.webp"
import shardIce from "../../../../components/assets/shards/ice.webp"
import shardLava from "../../../../components/assets/shards/lava.webp"
import shardPoison from "../../../../components/assets/shards/poison.webp"
import shardShadow from "../../../../components/assets/shards/shadow.webp"
import orbsIcon from "../../../../components/assets/shards/orbs.webp"
import keysIcon from "../../../../components/assets/shards/keys.webp"
import diamondsIcon from "../../../../components/assets/shards/diamonds.webp"
import timeIcon from "../../../../components/assets/shards/time.png"
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import toast, {Toaster} from "react-hot-toast";
import useLocale from "../../../../locales/useLocale";
import useFiberAPI from "../../../../fiber/fiber";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function ChestsGD(props) {
    const [chestConfig, setChestConfig] = useState({
        ChestSmallOrbsMin: 200,
        ChestSmallOrbsMax: 400,
        ChestSmallDiamondsMin: 2,
        ChestSmallDiamondsMax: 10,
        ChestSmallShards: [1,2,3,4,5,6],
        ChestSmallKeysMin: 1,
        ChestSmallKeysMax: 6,
        ChestSmallWait: 3600,

        ChestBigOrbsMin: 2000,
        ChestBigOrbsMax: 4000,
        ChestBigDiamondsMin: 20,
        ChestBigDiamondsMax: 100,
        ChestBigShards: [1,2,3,4,5,6],
        ChestBigKeysMin: 1,
        ChestBigKeysMax: 6,
        ChestBigWait: 14400,
    });

    let s = dayjs('2000-01-01 00:00:00').second(chestConfig.ChestSmallWait);
    let sb = dayjs('2000-01-01 00:00:00').second(chestConfig.ChestBigWait);

    const toSeconds = (time)=>{
        return time.hour()*3600+time.minute()*60+time.second()
    }
    const locale = useLocale(props.router)

    const api = useFiberAPI()

    const [srv, setSrv] = api.servers.useGDPS()


    const saveChests = ()=>{
        api.gdps_manage.updateChests(srv.Srv.srvid, chestConfig).then((resp)=>{
            if(resp.status==="ok") {
                toast.success(locale.get("updSuccess"),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
                setSrv({...srv, CoreConfig: {...srv.CoreConfig, ChestConfig: chestConfig}})
            }else{
                toast.error(locale.get("updFailed"),{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }
        })
    }



    useEffect(()=>{
        srv.CoreConfig&&setChestConfig(srv.CoreConfig.ChestConfig)
    }, [srv])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GlobalHead title={locale.get("nav")}/>
            <GlobalNav />
            <GDNavBar />
            <Toaster/>
            <PanelContent>
                <ThemeProvider theme={darkTheme}>
                <div className={styles.CardGrid}>
                    <div className={styles.CardBox}>
                        <h3>{locale.get("small")}</h3>
                        <div className={styles.SettingsPlato}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={orbsIcon.src} style={{height:"1em"}}/></IconButton>{locale.get("drop")[0]}</span>
                            <span>
                                <FruitThinField label={locale.get("minMax")[0]} value={chestConfig.ChestSmallOrbsMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestSmallOrbsMin: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={locale.get("minMax")[1]} value={chestConfig.ChestSmallOrbsMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestSmallOrbsMax: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={diamondsIcon.src} style={{height:"1em"}}/></IconButton>{locale.get("drop")[1]}</span>
                            <span>
                                <FruitThinField label={locale.get("minMax")[0]} value={chestConfig.ChestSmallDiamondsMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestSmallDiamondsMin: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={locale.get("minMax")[1]} value={chestConfig.ChestSmallDiamondsMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestSmallDiamondsMax: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={keysIcon.src} style={{height:"1em"}}/></IconButton>{locale.get("drop")[2]}</span>
                            <span>
                                <FruitThinField label={locale.get("minMax")[0]} value={chestConfig.ChestSmallKeysMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestSmallKeysMin: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={locale.get("minMax")[1]} value={chestConfig.ChestSmallKeysMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestSmallKeysMax: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={shardIce.src} style={{height:"1em"}}/></IconButton>{locale.get("drop")[3]}</span>
                            <FruitToggleButtonGroup
                                size={"small"}
                                sx={{backgroundColor:"var(--bkg-color)", width:"fit-content", borderRadius: "8px"}}
                                value={chestConfig.ChestSmallShards}
                                onChange={(e,val)=>{setChestConfig({
                                    ...chestConfig, ChestSmallShards: val
                                })}}>
                                <ToggleButton value={1}>
                                    <img src={shardFire.src} />
                                </ToggleButton>
                                <ToggleButton value={2}>
                                    <img src={shardIce.src} />
                                </ToggleButton>
                                <ToggleButton value={3}>
                                    <img src={shardPoison.src} />
                                </ToggleButton>
                                <ToggleButton value={4}>
                                    <img src={shardShadow.src} />
                                </ToggleButton>
                                <ToggleButton value={5}>
                                    <img src={shardLava.src} />
                                </ToggleButton>
                            </FruitToggleButtonGroup>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={timeIcon.src} style={{height:"1em"}}/></IconButton>{locale.get("timeout")}</span>
                                <TimePicker
                                    ampm={false}
                                    openTo="hours"
                                    views={['hours', 'minutes', 'seconds']}
                                    inputFormat={locale.get('timeFormat').input}
                                    mask={locale.get('timeFormat').mask}
                                    label={locale.get('timeFormat').title}
                                    value={s}
                                    onChange={(val) => {
                                        setChestConfig({...chestConfig, ChestSmallWait: toSeconds(val)})
                                    }}
                                    showToolbar
                                    renderInput={(params) => <FruitThinField {...params} />}
                                />
                        </div>
                    </div>


                    <div className={styles.CardBox}>
                        <h3>{locale.get("big")}</h3>
                        <div className={styles.SettingsPlato}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={orbsIcon.src} style={{height:"1em"}}/></IconButton>{locale.get("drop")[0]}</span>
                            <span>
                                <FruitThinField label={locale.get("minMax")[0]} value={chestConfig.ChestBigOrbsMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestBigOrbsMin: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={locale.get("minMax")[1]} value={chestConfig.ChestBigOrbsMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestBigOrbsMax: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={diamondsIcon.src} style={{height:"1em"}}/></IconButton>{locale.get("drop")[1]}</span>
                            <span>
                                <FruitThinField label={locale.get("minMax")[0]} value={chestConfig.ChestBigDiamondsMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestBigDiamondsMin: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={locale.get("minMax")[1]} value={chestConfig.ChestBigDiamondsMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestBigDiamondsMax: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={keysIcon.src} style={{height:"1em"}}/></IconButton>{locale.get("drop")[2]}</span>
                            <span>
                                <FruitThinField label={locale.get("minMax")[0]} value={chestConfig.ChestBigKeysMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestBigKeysMin: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={locale.get("minMax")[1]} value={chestConfig.ChestBigKeysMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestBigKeysMax: Number(evt.target.value.replaceAll(/[^0-9]/g,''))
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={shardIce.src} style={{height:"1em"}}/></IconButton>{locale.get("drop")[3]}</span>
                            <FruitToggleButtonGroup
                                size={"small"}
                                sx={{backgroundColor:"var(--bkg-color)", width:"fit-content", borderRadius: "8px"}}
                                value={chestConfig.ChestBigShards}
                                onChange={(e,val)=>{setChestConfig({
                                    ...chestConfig, ChestBigShards: val
                                })}}>
                                <ToggleButton value={1}>
                                    <img src={shardFire.src} />
                                </ToggleButton>
                                <ToggleButton value={2}>
                                    <img src={shardIce.src} />
                                </ToggleButton>
                                <ToggleButton value={3}>
                                    <img src={shardPoison.src} />
                                </ToggleButton>
                                <ToggleButton value={4}>
                                    <img src={shardShadow.src} />
                                </ToggleButton>
                                <ToggleButton value={5}>
                                    <img src={shardLava.src} />
                                </ToggleButton>
                            </FruitToggleButtonGroup>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={timeIcon.src} style={{height:"1em"}}/></IconButton>{locale.get("timeout")}</span>
                            <TimePicker
                                ampm={false}
                                openTo="hours"
                                views={['hours', 'minutes', 'seconds']}
                                inputFormat={locale.get('timeFormat').input}
                                mask={locale.get('timeFormat').mask}
                                label={locale.get('timeFormat').title}
                                value={sb}
                                onChange={(val) => {
                                    setChestConfig({...chestConfig, ChestBigWait: toSeconds(val)})
                                }}
                                showToolbar
                                renderInput={(params) => <FruitThinField {...params} />}
                            />
                        </div>
                    </div>
                </div>
                </ThemeProvider>

                <Button variant="contained" className={styles.SlimButton}
                        style={{marginTop:"2rem"}}
                        onClick={saveChests}>{locale.get("save")}</Button>
            </PanelContent>
        </LocalizationProvider>
    );
}

ChestsGD.RequireAuth=true



const FruitThinField = styled(TextField)({
    marginTop:".5rem",
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

const FruitToggleButtonGroup = styled(ToggleButtonGroup)({
    '& .MuiToggleButtonGroup-grouped': {
        margin: "0",
        backgroundColor: "var(--btn-color)",
        borderRadius: "8px",
        '&.Mui-disabled': {
            border: 0,
        },
        '&.Mui-selected': {
            backgroundColor: "var(--primary-color)",
        },
        '& img': {
            height: "2.5rem",
        }
    },
})

const FruitIconButton = styled(IconButton)({
    borderRadius: "0",
    '&:hover': {
        backgroundColor: "var(--primary-color)"
    },
    '&:first-of-type': {
        borderRadius: "8px 0 0 8px"
    },
    '&:last-child': {
        borderRadius: "0 8px 8px 0"
    },
})

const FruitSwitch = styled(Switch)({
    height: 46,
    width: 70,
    padding: 8,
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            transform: 'translateX(24px)',
            // color: 'var(--success-color)'
        },
    },
    '& .MuiSwitch-track': {
        borderRadius: 22,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="white" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="white" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 24,
        height: 24,
        margin: 2,
    },
});