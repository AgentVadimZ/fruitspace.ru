import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import styles from "../../../../components/Manage/GDManage.module.css"
import {useCookies} from "react-cookie";
import ParseError from "../../../../components/ErrParser";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {styled} from "@mui/system";
import {Button, CssBaseline, IconButton, Switch, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
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
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import useEffectOnce from "../../../../components/Hooks";
import {useRecoilState} from "recoil";
import GDServer from "../../../../states/gd_server";
import toast from "react-hot-toast";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function ChestsGD(props) {

    const [srv, setSrv] = useRecoilState(GDServer)
    const [cookies, setCookie, delCookie] = useCookies(["token"])
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

    const saveChests = ()=>{
        fetch("https://api.fruitspace.one/v1/manage/gd/set_chests",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify({id:srv.srvid, chests: chestConfig})}).then(resp=>resp.json()).then((resp)=>{
            if(resp.status==="ok") {
                toast.success("Сундуки успешно обновлены",{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
                setSrv({...srv, coreConfig: {...srv.coreConfig, ChestConfig: chestConfig}})
            }else{
                toast.error("Не удалось обновить сундуки",{style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }})
            }
        })
    }

    useEffect(()=>{
        srv.coreConfig&&setChestConfig(srv.coreConfig.ChestConfig)
    }, [srv])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <PanelContent>
                <ThemeProvider theme={darkTheme}>
                <div className={styles.CardGrid}>
                    <div className={styles.CardBox}>
                        <h3>Малый сундук</h3>
                        <div className={styles.SettingsPlato}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={orbsIcon.src} style={{height:"1em"}}/></IconButton>Орбы</span>
                            <span>
                                <FruitThinField label={"Минимум"} value={chestConfig.ChestSmallOrbsMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestSmallOrbsMin: evt.target.value.replaceAll(/[^0-9]/g,'')
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={"Максимум"} value={chestConfig.ChestSmallOrbsMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestSmallOrbsMax: evt.target.value.replaceAll(/[^0-9]/g,'')
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={diamondsIcon.src} style={{height:"1em"}}/></IconButton>Алмазы</span>
                            <span>
                                <FruitThinField label={"Минимум"} value={chestConfig.ChestSmallDiamondsMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestSmallDiamondsMin: evt.target.value.replaceAll(/[^0-9]/g,'')
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={"Максимум"} value={chestConfig.ChestSmallDiamondsMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestSmallDiamondsMax: evt.target.value.replaceAll(/[^0-9]/g,'')
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={keysIcon.src} style={{height:"1em"}}/></IconButton>Ключи</span>
                            <span>
                                <FruitThinField label={"Минимум"} value={chestConfig.ChestSmallKeysMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestSmallKeysMin: evt.target.value.replaceAll(/[^0-9]/g,'')
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={"Максимум"} value={chestConfig.ChestSmallKeysMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestSmallKeysMax: evt.target.value.replaceAll(/[^0-9]/g,'')
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={shardIce.src} style={{height:"1em"}}/></IconButton>Шарды</span>
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
                            <span style={{fontSize:"13pt"}}><IconButton><img src={timeIcon.src} style={{height:"1em"}}/></IconButton>Таймаут</span>
                                <TimePicker
                                    ampm={false}
                                    openTo="hours"
                                    views={['hours', 'minutes', 'seconds']}
                                    inputFormat="HHч mmм ssс"
                                    mask="__ч __м __с"
                                    label="Таймаут"
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
                        <h3>Большой сундук</h3>
                        <div className={styles.SettingsPlato}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={orbsIcon.src} style={{height:"1em"}}/></IconButton>Орбы</span>
                            <span>
                                <FruitThinField label={"Минимум"} value={chestConfig.ChestBigOrbsMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChesBigOrbsMin: evt.target.value.replaceAll(/[^0-9]/g,'')
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={"Максимум"} value={chestConfig.ChestBigOrbsMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestBigOrbsMax: evt.target.value.replaceAll(/[^0-9]/g,'')
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={diamondsIcon.src} style={{height:"1em"}}/></IconButton>Алмазы</span>
                            <span>
                                <FruitThinField label={"Минимум"} value={chestConfig.ChestBigDiamondsMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestBigDiamondsMin: evt.target.value.replaceAll(/[^0-9]/g,'')
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={"Максимум"} value={chestConfig.ChestBigDiamondsMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestBigDiamondsMax: evt.target.value.replaceAll(/[^0-9]/g,'')
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={keysIcon.src} style={{height:"1em"}}/></IconButton>Ключи</span>
                            <span>
                                <FruitThinField label={"Минимум"} value={chestConfig.ChestBigKeysMin}
                                                onChange={(evt)=>setChestConfig({...chestConfig,
                                                    ChestBigKeysMin: evt.target.value.replaceAll(/[^0-9]/g,'')
                                                })}/>
                                <span style={{margin:".5rem"}} />
                            <FruitThinField label={"Максимум"} value={chestConfig.ChestBigKeysMax}
                                            onChange={(evt)=>setChestConfig({...chestConfig,
                                                ChestBigKeysMax: evt.target.value.replaceAll(/[^0-9]/g,'')
                                            })}/>
                            </span>
                        </div>
                        <div className={styles.SettingsPlato} style={{marginTop:"1rem"}}>
                            <span style={{fontSize:"13pt"}}><IconButton><img src={shardIce.src} style={{height:"1em"}}/></IconButton>Шарды</span>
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
                            <span style={{fontSize:"13pt"}}><IconButton><img src={timeIcon.src} style={{height:"1em"}}/></IconButton>Таймаут</span>
                            <TimePicker
                                ampm={false}
                                openTo="hours"
                                views={['hours', 'minutes', 'seconds']}
                                inputFormat="HHч mmм ssс"
                                mask="__ч __м __с"
                                label="Таймаут"
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
                        onClick={saveChests}>Сохранить</Button>
            </PanelContent>
        </LocalizationProvider>
    )
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