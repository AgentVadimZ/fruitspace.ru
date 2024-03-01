import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";
import BannerGD from "../../components/assets/BannerGD.png"
import ProductHeader from "../../components/Global/ProductHeader";
import ProductCardGD from "../../components/Cards/ProductCardGD";
import {
    Button,
    ListItem,
    ListItemIcon,
    ListItemText,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import CloudDoneIcon from "@mui/icons-material/CloudDone";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AppleIcon from "@mui/icons-material/Apple";
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';

import FeatureCard from "../../components/Cards/FeatureCard";

import FeatureCoreImg from "../../components/assets/features/core_3d-sm.png"
import FeatureShieldImg from "../../components/assets/features/shield_3d-sm.png"
import FeatureSetupImg from "../../assets/features/autosetup_3d-sm.png"
import FeatureMusicImg from "../../assets/features/music_3d-sm.png"
import useLocale, {useGlobalLocale} from "../../locales/useLocale";
import discordLogo from "@/assets/social/discord.png";
import GitHubIcon from "../../components/assets/logos/GithubIcon.png";



export default function GD(props) {
    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    return (
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav mainpage router={props.router} />
            <div className={styles.main}>
                <ProductHeader img={BannerGD} title={locale.get('prodgd.title')} text={locale.get('prodgd.titletext')}
                primaryText={locale.get('prodgd.titlecloud')} primaryLink="#cloud"
                secondaryText={locale.get('prodgd.titleselfhosted')} secondaryLink="#selfhosted"/>
                {/*Insert Halogen Counter*/}

                <h2 className="text-center my-12 text-white text-3xl">{locale.get('prodgd.tariffs')}</h2>
                <div className={styles.productCardGrid} id="cloud">
                    <ProductCardGD title="Press Start" btnText={locale.get('freeA')} link="order/gd?t=1">
                        <ListItem>
                            <ListItemIcon><PersonIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPressStart')[0]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPressStart')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CloseIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tPressStart')[2]}/>
                        </ListItem>
                    </ProductCardGD>
                    <ProductCardGD title="Singularity" btnText={locale.get('tSingularityPrice')} link="order/gd?t=2">
                        <ListItem>
                            <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tSingualrity')[0]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tSingualrity')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><PrecisionManufacturingIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tSingualrity')[2]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tSingualrity')[3]}/>
                        </ListItem>
                    </ProductCardGD>
                    <ProductCardGD title="Takeoff" btnText={locale.get('tTakeoffPrice')} link="order/gd?t=3">
                        <ListItem>
                            <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[0]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><MusicNoteIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[1]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><PrecisionManufacturingIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[2]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><DesktopMacIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[3]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CloudDoneIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[4]}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><AppleIcon/></ListItemIcon>
                            <ListItemText primary={locale.get('tTakeoff')[5]}/>
                        </ListItem>
                    </ProductCardGD>
                </div>
                <p style={{textAlign:'center', margin:"0  1rem 1rem"}}>{locale.get('onlyOneGDPS')}</p>


                {/*<h2 style={{textAlign:'center',margin:"3rem 0",color:"white"}} id="selfhosted">Наши преимущества</h2>*/}
                <div className={styles.featuresCardGrid}>
                    <FeatureCard img={FeatureCoreImg.src} title={locale.get('featGhostCore')} text={locale.get('featGhostCoreText')}
                                 subtext={locale.get('featGhostCoreMini')} />
                    <FeatureCard img={FeatureShieldImg.src} title={locale.get('featDDoSProtection')} text={locale.get('featDDoSProtectionText')}
                                 subtext={locale.get('featDDoSProtectionMini')} />
                    <FeatureCard img={FeatureSetupImg.src} title={locale.get('featEasyConfig')} text={locale.get('featEasyConfigText')}
                                 subtext={locale.get('featEasyConfigMini')} />
                    <FeatureCard img={FeatureMusicImg.src} title={locale.get('featCustomMusic')} text={locale.get('featCustomMusicText')}
                                 subtext={locale.get('featCustomMusicMini')} />
                </div>

                <span className={styles.hyperSpan}></span>
                <h2 style={{textAlign:'center',margin:"3rem 0",color:"white"}} id="selfhosted">{locale.get('selfHost')}</h2>
                <p className="text-center mx-auto max-w-3xl">{locale.get('selfHostText')}
                </p>
                <TableContainer sx={{borderRadius:"12px",backgroundColor:"var(--btn-color)", width:"fit-content", maxWidth:"100%", margin:"0 auto"}} className={styles.MrWhite}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right"><b>FruitSpace</b></TableCell>
                                <TableCell align="right"><b>{locale.get('selfHostTableHeader')}</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[0]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[1]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right">{locale.get('selfHostTableAdd')[0]}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[2]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[3]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[4]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[5]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[6]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right"><CloseIcon/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[7]}</TableCell>
                                <TableCell align="right">GhostCore</TableCell>
                                <TableCell align="right">HalogenCore</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[8]}</TableCell>
                                <TableCell align="right">{locale.get('selfHostTableAdd')[1]}</TableCell>
                                <TableCell align="right">{locale.get('selfHostTableAdd')[2]}</TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{locale.get('selfHostTable')[9]}</TableCell>
                                <TableCell align="right"><CheckIcon/></TableCell>
                                <TableCell align="right">{locale.get('selfHostTableAdd')[3]}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <p className="mx-auto text-center max-w-2xl">
                    {locale.get('selfHostLinks')}
                </p>
                <div className="flex mx-auto gap-2 justify-center mb-2">
                <Button variant="contained" className="m-2 mt-auto font-bold rounded-lg bg-[#6e5494] h-12 hover:bg-[#5f4980]" onClick={() => window.open("https://github.com/FruitSpace/HalogenGDPSCore", "_blank")}>
                    <img className="invert h-10 mr-3 h-3/4 rounded" src={GitHubIcon.src} alt="github"/>
                    HalogenCore Github
                </Button>
                <Button variant="contained" className="m-2 mt-auto font-bold rounded-lg bg-[#7289da] h-12 hover:bg-[#5f73b8]"  onClick={() => window.open("https://discord.gg/HgBQmMRKTB", "_blank")}>
                    <img className="invert h-10 mr-3 h-3/4" src={discordLogo.src} alt="discord"/>
                    HalogenCore Discord
                </Button>

                </div>

            </div>
            <Footer router={props.router}/>
        </>
    )
}