import styles from "./PayBox.module.css"
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";
import {useCookies} from "react-cookie";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useState} from "react";
import {Backdrop, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import QiwiLogo from "../assets/logos/qiwi_logo.png"
import YooMoneyLogo from "../assets/logos/yoomoney_logo.svg"
import PayokLogo from "../assets/logos/payok_logo.svg"
import {styled} from "@mui/system";
import {Router, useRouter} from "next/router";
import toast from "react-hot-toast";
import ParseError from "../ErrParser";

export default function PayBox(props) {

    const [user,setUser] = useRecoilState(UserState)
    const router = useRouter()
    const [cookies, setCookie, delCookie] = useCookies(["token"])
    const [backdrop, openBackdrop] = useState(false)
    const [paymentParam, setPaymentParam] = useState({
        amount: 0,
        merchant: "qiwi"
    })

    const createPayment = () => {
        if (paymentParam.amount<20) {
            toast.error("Минимальная сумма для пополнения - 20₽", {
                duration: 10000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            return
        }
        fetch("https://api.fruitspace.one/v1/user/create_payment",
            {credentials:"include", method: "POST", headers: {"Authorization": cookies["token"]},
                body: JSON.stringify(paymentParam)}
        ).then(resp=>resp.json()).then((resp)=>{
            if (resp.status==="ok") {
                router.push(encodeURI(resp.payUrl))
            }else {
                toast.error("Произошла ошибка: "+ParseError(resp.message), {
                    duration: 10000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            }
        })
    }

    console.log(paymentParam)

    const prettyPrint = (num)=>new Intl.NumberFormat(user.usd?'en-US':'ru-RU',
        {style: 'currency',currency: user.usd?"USD":"RUB"}).format(num).replace(/[.|,]00/g, '')

    return (
        <div className={styles.paybox}>
            <h3>{prettyPrint(user.bal)}</h3>
            <span />
            <div className={styles.innerbox} onClick={()=>openBackdrop(true)}>
                <AddCircleIcon/>
                <p>Пополнить</p>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop} onClick={()=>openBackdrop(false)}>
                <div className={styles.choosePaymentBox} onClick={(e)=>e.stopPropagation()}>
                    <h2 style={{textAlign:"center"}}>Выберите метод оплаты</h2>

                    <FormControl>
                        <FormLabel>Платежная система</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={paymentParam.merchant}
                            onChange={(e,m)=>setPaymentParam({...paymentParam, merchant: m})}>
                            <FormControlLabel value="qiwi" control={<Radio />} label={<span className={styles.payOption}>
                                <img src={QiwiLogo.src}/>Подходит для Qiwi и банковских карт
                            </span>} />
                            <FormControlLabel value="yookassa" control={<Radio />} label={<span className={styles.payOption}>
                                <YooMoneyLogo/>ЮMoney и наличные
                            </span>}/>
                            <FormControlLabel value="payok" control={<Radio />} label={<span className={styles.payOption}>
                                <PayokLogo/> Криптовалюты, PerfectMoney и Мегафон
                            </span>}/>
                        </RadioGroup>
                    </FormControl>

                    <p>*Если оплата не удалась или деньги не пришли, откройте тикет на Discord сервере или напишите нам в ВК.
                        Хотя такого обычно не происходит</p>
                    <p style={{color:"var(--error-color)"}}>Минимальная сумма для пополнения: 20₽</p>

                    <FruitTextField fullWidth label={`Сумма ${user.usd?"$":"₽"}`} type="text" variant="outlined" style={{margin:".5rem"}}
                                    value={paymentParam.amount} onChange={(evt)=>{setPaymentParam({
                        ...paymentParam,
                        amount: evt.target.value.replaceAll(/[^0-9.]/g,'')
                    })}}/>
                    <Button variant="contained" className={styles.cardButton} onClick={createPayment}>Перейти к оплате</Button>
                </div>
            </Backdrop>
        </div>
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
            borderColor: 'white',
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
    },
});