import styles from "./PayBox.module.css"
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";
import {useCookies} from "react-cookie";

import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function PayBox(props) {

    const [user,setUser] = useRecoilState(UserState)
    const [cookies, setCookie, delCookie] = useCookies(["token"])

    const prettyPrint = (num)=>new Intl.NumberFormat(user.usd?'en-US':'ru-RU',
        {style: 'currency',currency: user.usd?"USD":"RUB"}).format(num).replace(/[.|,]00/g, '')

    return (
        <div className={styles.paybox}>
            <h3>{prettyPrint(user.bal)}</h3>
            <span />
            <div className={styles.innerbox}>
                <AddCircleIcon/>
                <p>Пополнить</p>
            </div>
        </div>
    )
}