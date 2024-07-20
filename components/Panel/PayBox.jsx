import {useRecoilState} from "recoil";
import {userAtom} from "@/fiber/fiber.model";

import {useState} from "react";
import toast from "react-hot-toast";
import useLocale, {useGlobalLocale} from "@/locales/useLocale";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {Input, Modal} from "antd";


import YookassaLogo from "@/assets/logos/yookassa_logo.jpg"
import EnotLogo from "@/assets/logos/enot_logo.jpg"
import Paypalych from "@/assets/logos/paypalych.png"
import LavaPay from "@/assets/logos/lava-logo-compact-gradient.png"

import SberPay from "@/assets/logos/sberlogo.svg"
import TbankPay from "@/assets/logos/tbank.png"
import Yoomoney from "@/assets/logos/yoomoney.png"
import {faBitcoin, faCcMastercard} from "@fortawesome/free-brands-svg-icons";
import SBPPay from "@/assets/logos/sbp.svg"
import MasterCard from "@/assets/logos/mc_symbol_opt_63_3x.png"

const payments = {
    "yookassa": {
        logo: YookassaLogo,
        name: "Юkassa",
        desc: "Оплата российскими платежными системами",
        icons: [
            <SberPay className="w-4" key="sber" />,
            <img src={TbankPay.src} key="tbank" className="w-4"/>,
            <img src={Yoomoney.src} key="tbank" className="w-4"/>,
        ]
    },
    "enot": {
        logo: EnotLogo,
        name: "EnotPay",
        desc: "Оплата криптовалютами: BTC, USDT, TRX",
        icons: [
            <FontAwesomeIcon icon={faBitcoin} key="btc" className="w-4 text-orange-400" />
        ]
    },
    "paypalych": {
        logo: Paypalych,
        name: "PAYPALYCH",
        desc: "Оплата через СБП и международные карты",
        icons: [
            <SBPPay className="w-4" key="sbp" />,
            <img src={MasterCard.src} key="mc" className="w-4"/>
        ]
    },
    "lava": {
        logo: LavaPay,
        name: "LavaPay",
        desc: "Оплата через российские карты",
        icons: [
            <FontAwesomeIcon icon={faCreditCard} className="w-4 text-success" key="cc" />
        ]
    }
}

export default function PayBox(props) {

    const [user,setUser] = useRecoilState(userAtom)
    const [backdrop, openBackdrop] = useState(false)
    const [paymentParam, setPaymentParam] = useState({
        amount: 100,
        merchant: "yookassa"
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
                toast.error(locale.get('err')+ParseError(resp.code, resp.message), {
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
        <div className="flex rounded-xl glassb bg-active">
            <p className="text-lg font-semibold p-4 border-r-1 border-white border-opacity-25">{prettyPrint(user.balance)}</p>
            <div className="p-4 flex items-center gap-2" onClick={()=>openBackdrop(true)}>
                <FontAwesomeIcon className="text-2xl" icon={faPlusCircle} />
                <span className="text-sm">Пополнить</span>
            </div>
            <Modal open={backdrop} title="Пополнить баланс" onCancel={()=>openBackdrop(false)}
                   cancelText="Отмена" okText="Пополнить" onOk={createPayment}>
                <div className="flex flex-col gap-2">
                    <p className="text-lg">Сумма</p>
                    <Input value={paymentParam.amount || 0} onChange={(e) => setPaymentParam({
                        ...paymentParam, amount: e.target.value.replaceAll(/[^0-9]/g, '')
                    })} addonAfter="₽"/>
                    <p className="text-lg mt-2">Система оплаты</p>
                    <div className="grid gap-4 grid-cols-2 ipad:grid-cols-3">
                        {Object.keys(payments).map(k=>{
                            const system = payments[k]
                            return <PaymentProviderCard onClick={() => setPaymentParam({...paymentParam, merchant: k})}
                                key={k} logo={system.logo} name={system.name} desc={system.desc} icons={system.icons}
                                                        active={paymentParam.merchant===k} />
                        })}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const PaymentProviderCard = (props) => {
            return <div onClick={props.onClick} className={`rounded-xl bg-active glassb p-2 flex flex-col 
            ${props.active&&"!border-primary bg-gradient-to-br from-active to-[#0d6efd88]"}`}>
                <div className="p-4">
                    <img src={props.logo.src} className="rounded-full w-20 mx-auto" />
                </div>
                <div className="mx-2">
                    <p className="text-lg">{props.name}</p>
                    <p className="text-xs iphone:text-sm text-gray-300 mb-1">{props.desc}</p>
                    <div className="flex items-center gap-2 mt-auto">
                        {props.icons.map((icon, i) => {
                            return icon
                        })}
                    </div>
                </div>
            </div>
}