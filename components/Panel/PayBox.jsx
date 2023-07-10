import styles from "./PayBox.module.css"
import {useRecoilState} from "recoil";
import {UserState} from "../../states/user";
import {useCookies} from "react-cookie";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useState} from "react";
import {Backdrop, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import QiwiLogo from "../assets/logos/qiwi_logo.png"
import YooMoneyLogo from "../assets/logos/yoomoney_logo.svg"
import EnotLogo from "../assets/logos/enot_logo.svg"
import {styled} from "@mui/system";
import {Router, useRouter} from "next/router";
import toast from "react-hot-toast";
import useLocale, {useGlobalLocale} from "../../locales/useLocale";

export default function PayBox(props) {

    const [user,setUser] = useRecoilState(UserState)
    const [backdrop, openBackdrop] = useState(false)
    const [paymentParam, setPaymentParam] = useState({
        amount: 0,
        merchant: "qiwi"
    })

    const locale = useLocale(props.router)
    const globalLocale = useGlobalLocale(props.router)

    const ParseError = globalLocale.get('funcParseErr')

    const createPayment = () => {
        if (paymentParam.amount<20) {
            toast.error(locale.get('minMax')[0], {
                duration: 10000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            return
        }
        if (paymentParam.amount>100000) {
            toast.error(locale.get('minMax')[1], {
                duration: 10000,
                style: {
                    color: "white",
                    backgroundColor: "var(--btn-color)"
                }
            })
            return
        }
        props.api.payments.new(parseInt(paymentParam.amount), paymentParam.merchant).then((resp)=>{
            if (resp.status==="ok") {
                props.router.push(encodeURI(resp.pay_url))
            }else {
                toast.error(locale.get('err')+ParseError(resp.message), {
                    duration: 10000,
                    style: {
                        color: "white",
                        backgroundColor: "var(--btn-color)"
                    }
                })
            }
        })
    }

    const prettyPrint = (num)=>new Intl.NumberFormat(user.usd?'en-US':'ru-RU',
        {style: 'currency',currency: user.usd?"USD":"RUB"}).format(num).replace(/[.|,]00/g, '')

    return (
        <div className={styles.paybox}>
            <h3>{prettyPrint(user.bal)}</h3>
            <span />
            <div className={styles.innerbox} onClick={()=>openBackdrop(true)}>
                <AddCircleIcon/>
                <p>{locale.get('payment')[0]}</p>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop} onClick={()=>openBackdrop(false)}>
                <div className={styles.choosePaymentBox} onClick={(e)=>e.stopPropagation()}>
                    <h2 style={{textAlign:"center"}}>{locale.get('payment')[1]}</h2>

                    <FormControl>
                        <FormLabel>{locale.get('payment')[2]}</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={paymentParam.merchant}
                            onChange={(e,m)=>setPaymentParam({...paymentParam, merchant: m})}>
                            <FormControlLabel value="qiwi" control={<Radio />} label={<span className={styles.payOption}>
                                <img src={QiwiLogo.src}/>{locale.get('paymentSystem')[0]}
                            </span>} />
                            <FormControlLabel value="yookassa" control={<Radio />} label={<span className={styles.payOption}>
                                <YooMoneyLogo/>{locale.get('paymentSystem')[1]}
                            </span>}/>
                            <FormControlLabel value="enot" control={<Radio />} label={<span className={styles.payOption}>
                                <EnotLogo/> {locale.get('paymentSystem')[2]}
                            </span>}/>
                        </RadioGroup>
                    </FormControl>

                    <p>{locale.get('paymentFail')}</p>
                    <p style={{color:"var(--error-color)"}}>{locale.get('minMax')[0]}</p>

                    <FruitTextField fullWidth label={locale.get('sum')+` ${user.usd?"$":"₽"}`} type="text" variant="outlined" style={{margin:".5rem"}}
                                    value={paymentParam.amount||''} onChange={(evt)=>{setPaymentParam({
                        ...paymentParam,
                        amount: evt.target.value.replaceAll(/[^0-9.]/g,'')
                    })}}/>
                    <Button variant="contained" className={styles.cardButton} onClick={createPayment}>{locale.get('goToPayment')}</Button>
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