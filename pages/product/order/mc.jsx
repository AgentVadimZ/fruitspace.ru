import GlobalHead from "../../../components/GlobalHead";
import GlobalNav from "../../../components/GlobalNav";
import styles from "../../../components/Index.module.css";
import useLocale, {useGlobalLocale} from "../../../locales/useLocale";
import {useRouter} from "next/router";
import {styled} from "@mui/system";
import {ListItem, ListItemIcon, ListItemText, TextField, Button} from "@mui/material";
import MemoryIcon from '@mui/icons-material/Memory';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import StorageIcon from '@mui/icons-material/Storage';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function OrderMC(props){
    const router = useRouter()
    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    // PLACEHOLDERS
    const planName = "planPlaceholder";
    const resources = "resourcesPlaceholder";
    const cpu = "cpuPlaceholder";
    const ram = "ramPlaceholder";
    const ssd = "ssdPlaceholder";
    const something =()=>{
        console.log("Why are we here? Just to suffer?")
    }
    return(
        <>
            <GlobalHead title={localeGlobal.get('navName')}/>
            <GlobalNav mainpage router={props.router} />    
            <div className={styles.main}>
                <p className ="text-center color-white pt-2 text-xl">Создание нового Minecraft сервера</p>
                <div className="glassb rounded-xl flex flex-col mx-auto w-1/2 bg-[var(--subtle-color)]">
                    <p className="text-center color-white text-xl">Вы выбрали тариф <b>{planName}</b>, осталось совсем немного</p>
                    <div className = "mx-auto w-fit grid grid-cols-1 lg:grid-cols-3">
                    <FruitTextField className="col-span-2" label="Введите название сервера" type="text" variant="outlined" style={{margin:"1rem",flex:1}}/>
                    <FruitTextField label="Промокод (если есть)" type="text" variant="outlined" style={{margin:"1rem"}}/>
                    </div>
                    <div className="grid grid-cols-2">
                        <h1 className="color-white, text-left, mt-3 text-2xl ml-8">- Что вы получаете?</h1>
                        <h1 className="color-white, text-end mt-3 text-2xl mr-8">Дополнительные услуги</h1>
                    </div>
                    <div className="ml-2">
                    <ListItem>
                    <ListItemIcon><LocalFireDepartmentIcon className="text-white"/></ListItemIcon>
                    <ListItemText primary={resources}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><MemoryIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={cpu}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><ElectricBoltIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={ram}/>
                    </ListItem>
                    <ListItem>
    <ListItemIcon><StorageIcon className="text-white"/></ListItemIcon>
                        <ListItemText primary={ssd}/>
                    </ListItem>
                    <Button variant="contained" className={styles.SlimButton}
                        style={{marginTop:"2rem"}}
                        onClick={something}>Оплатить</Button>
                    </div>
                </div>
        </div>
        </>
    )
}

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
    },
});