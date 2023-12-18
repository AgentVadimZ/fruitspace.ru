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
import ProductCardMC from "../../../components/Cards/ProductCardMC";

export default function OrderMC(props){
    const router = useRouter()
    const locale = useLocale(props.router)
    const localeGlobal = useGlobalLocale(props.router)

    const t = router.query.t;
    const tariffType =(t) => ((t.charAt(t.length - 2)) == "d" ? "dynamic" : "static")
    const planIndex =(t) => (t.slice(-1)) - 1;

    // PLACEHOLDERS
    const planName = "planPlaceholder";
    const resources = "resourcesPlaceholder";
    const cpu = "cpuPlaceholder";
    const ram = "ramPlaceholder";
    const ssd = "ssdPlaceholder";

    return(
        <>
            <div className=" bg-[url(https://abrakadabra.fun/uploads/posts/2021-12/1640970997_4-abrakadabra-fun-p-strashnii-fon-mainkraft-4.png)] bg-opacity-50 h-screen w-screen">
                <GlobalHead title={localeGlobal.get('navName')}/>
                <GlobalNav mainpage router={props.router}/>
                <p className="text-center color-white pt-2 text-xl">Создание нового Minecraft сервера</p>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <p>Тут должны быть карточки, зато вот я знаю какой у тебя тариф, а именно {tariffType(t)} {planIndex(t)}</p>
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

const tariffs = {}
tariffs.dynamic = [
    {
        title: "Next ⋙",
        id: "D-1 S",
        price: 350,
        cpus: 1,
        minRam: 2,
        maxRam: 4,
        ssd: 20
    },
    {
        title: "Reforged",
        id: "D-2 S+",
        price: 700,
        cpus: 2,
        minRam: 4,
        maxRam: 8,
        ssd: 30
    },
    {
        title: "EverPeak",
        id: "D-3 M",
        price: 1300,
        cpus: 3,
        minRam: 8,
        maxRam: 12,
        ssd: 45
    },
    {
        title: "Orbital",
        id: "D-4 M+",
        price: 1700,
        cpus: 4,
        minRam: 8,
        maxRam: 16,
        ssd: 60
    },
    {
        title: "Horizon",
        id: "D-5 L",
        price: 2600,
        cpus: 5,
        minRam: 16,
        maxRam: 24,
        ssd: 100
    },
]

tariffs.static = [
    {
        title: "Air",
        id: "S-1 S~",
        price: 550,
        cpus: 1,
        maxRam: 4,
        ssd: 30
    },
    {
        title: "Viper",
        id: "S-2 S++",
        price: 1000,
        cpus: 2,
        maxRam: 8,
        ssd: 40
    },
    {
        title: "Carbon",
        id: "S-3 M~",
        price: 1500,
        cpus: 3,
        maxRam: 12,
        ssd: 60
    },
    {
        title: "Proton",
        id: "S-4 M++",
        price: 2300,
        cpus: 4,
        maxRam: 16,
        ssd: 80
    },
    {
        title: "Warp",
        id: "S-5 L+",
        price: 3200,
        cpus: 5,
        maxRam: 24,
        ssd: 120
    },
]