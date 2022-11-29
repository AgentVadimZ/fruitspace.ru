import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import PanelContent from "../../../../components/Global/PanelContent";
import {Router, useRouter} from "next/router";

import styles from "../../../../components/Manage/GDManage.module.css"
import {styled} from "@mui/system";
import {Button, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import Link from "next/link";
import {useRecoilState} from "recoil";
import GDServer from "../../../../states/gd_server";
import toast, {Toaster} from "react-hot-toast";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

export default function SettingsGD(props) {
    const router = useRouter()
    const [srv, setSrv] = useRecoilState(GDServer)
    const [showPass, setShowPass] = useState(false)

    const copyValueR=()=>{
        toast.success("Скопировано", {
            duration: 1000,
            style: {
                color: "white",
                backgroundColor: "var(--btn-color)"
            }
        })
    }

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            <GlobalNav />
            <GDNavBar />
            <Toaster/>
            <PanelContent>
                <div className={styles.CardGrid}>
                    <div className={styles.CardBox}>
                        <h3>База данных</h3>
                        <div className={styles.CardInbox}>
                            <FruitTextField fullWidth label="Логин" value={"halgd_"+srv.srvid}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end" onClick={()=>{navigator.clipboard.writeText("halgd_"+srv.srvid);copyValueR()}}>
                                                            <ContentPasteIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            disabled/>
                            <FruitTextField fullWidth label="Пароль" type={showPass?"text":"password"}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton edge="end" onClick={()=>setShowPass(!showPass)}>
                                                            {showPass ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                        <IconButton edge="end" onClick={()=>{navigator.clipboard.writeText(srv.dbPassword);copyValueR()}}>
                                                            <ContentPasteIcon/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            value={srv.dbPassword}
                            disabled/>
                        </div>
                        <div className={styles.CardBottom}>
                            {/*<Button variant="contained" className={`${styles.cardButton} ${styles.btnError}`}>Сбросить пароль</Button>*/}
                            <Link href="https://db.fruitspace.one">
                                <Button variant="contained" className={styles.cardButton}>Перейти в БД</Button>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.CardBox}>
                        <h3>Настройки</h3>
                        <p>Если ты это читаешь, то поздравляю. Разраб больше не разраб.</p>
                        <p></p>
                    </div>
                </div>

            </PanelContent>
        </>
    )
}

SettingsGD.RequireAuth=true



const FruitTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#0d6efd',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
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
        // backgroundColor: "var(--btn-color)",
        marginBottom: "1rem"
    },
});