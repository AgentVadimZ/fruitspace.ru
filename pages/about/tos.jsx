import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import styles from "@/components/Index.module.css";
import Footer from "@/components/Global/Footer";
import Link from "next/link";
import {useGlobalLocale} from "@/locales/useLocale";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faPhone, faReceipt, faUser} from "@fortawesome/free-solid-svg-icons";

export default function Tos(props) {

    const localeGlobal = useGlobalLocale(props.router)

    return <>
        <GlobalHead title={localeGlobal.get('navName')}/>
        <GlobalNav router={props.router} mainpage />
        <div className={styles.main}>
            <div className="flex flex-col gap-4 glassb bg-active rounded-2xl p-4 mb-8">
                <h2 className="text-3xl text-center">Пользовательское соглашение</h2>
                <h3 className="text-xl mt-4">1. Терминология</h3>
                <ol className="list-decimal ml-8">
                    <li><strong>Хостинг</strong> - сервис FruitSpace.</li>
                    <li><strong>Клиент</strong> - физическое лицо, заключившее с
                        провайдером договор.
                    </li>
                    <li><strong>Игрок</strong> - конечный потребитель, прямо или косвенно использующий услуги хостинга.
                    </li>
                    <li><strong>Пользователь</strong> - игрок или клиент.</li>
                </ol>
                <h3 className="text-xl mt-4">2. Условия и порядок предоставления услуг</h3>
                <ol className="list-decimal ml-8">
                    <li>Пользуясь услугами хостинга пользователь подтверждает факт
                        владения лицензионной копией игры для выбранного приватного сервера.
                    </li>
                    <li>Все серверы использует ПО с закрытым исходным кодом, принадлежащее FruitSpace. Хостинг вправе
                        изменять его без уведомления пользователей.
                    </li>
                    <li>Запрещена перепродажа серверов и посредничество при продаже</li>
                    <li>Мы вправе отказать в обслуживании клиента, нарушающего настоящие
                        условия использования, а также заблокировать его аккаунт и удалить его приватные серверы без
                        возврата средств.
                    </li>
                    <li>Мы вправе заблокировать аккаунт клиента и удалить его приватные
                        серверы без возврата средств по жалобе со стороны третьих лиц и непринятию клиентом мер по
                        поступившей жалобе.
                    </li>
                    <li>При подключении опции «Автопродление» клиент дает разрешение
                        хостингу списывать денежные средства с баланса в личном кабинете в сумме необходимой для
                        активации услуг(и) с учетом имеющегося остатка денежных средств.
                    </li>
                    <li>Услуги хостинга предоставляются «как есть», хостинг оставляет за
                        собой право пересмотреть правила предоставления услуг, в том числе ценовую политику и
                        характеристики тарифов в любой момент, без предварительного уведомления и в одностороннем
                        порядке, новые правила вступают в действие в момент опубликования их на официальном сайте
                        хостинга.
                    </li>
                    <li>Запрещено размещение информации, противоречащей и/или
                        запрещенной законодательством РФ, законом об авторских и смежных правах.
                    </li>
                </ol>
                <h3 className="text-xl mt-4">3. Политика оплаты и возврата</h3>
                <ol className="list-decimal ml-8">
                    <li>Исполнитель не платит НДС, так как применяет упрощённую систему
                        налогообложения.
                    </li>
                    <li>Стоимость услуг указана на <Link href="/" passHref
                                                         style={{color: "#0d6efd", textDecoration: "none"}}>Главной
                        странице</Link>, а также на
                        страницах услуг.
                    </li>
                    <li>Клиенты оплачивают услуги по безналичному расчёту через
                        сторонние мерчант-сервисы «Qiwi» и «Ю.Касса».
                    </li>
                    <li>Возврат денежных средств возможен только в случае
                        неработоспособности сервера по вине хостинга и за фактически неиспользованные дни.
                    </li>
                    <li>Возврат средств осуществляется в течение 45 рабочих дней на
                        счет, с которого производилась оплата.
                    </li>
                    <li>Для возврата средств необходимо написать письмо запрос в
                        поддержку с темой «Возврат средств» по адресу support@fruitspace.one
                    </li>
                </ol>
                <h3 className="text-xl mt-4">4. Ответственность сторон</h3>
                <ol className="list-decimal ml-8">
                    <li>Мы не несем ответственности за утерю данных, взлом или нарушение
                        работы приватного сервера в результате халатности пользователя.
                    </li>
                    <li>Досудебный порядок урегулирования споров в течение 30 дней обязателен.</li>
                    <li>Все плановые технические работы, обновления и тому подобные
                        мероприятия проводятся с 22:00 до 02:00 следующего дня по московскому времени. К этому
                        пункту не относятся форс-мажорные ситуации и внеплановые работы.
                    </li>
                    <li>Подсудность неурегулированных споров — суд Воронежской области.</li>
                </ol>

                <h3 className="text-xl text-center">Контакты</h3>
                <div className="flex gap-4 justify-center text-sm">
                    <p className="px-2 rounded-full glassb flex items-center gap-2">
                        <FontAwesomeIcon icon={faEnvelope}/> support@fruitspace.one
                    </p>
                    <p className="px-2 rounded-full glassb flex items-center gap-2">
                        <FontAwesomeIcon icon={faPhone}/> +2 597 064 (факс)
                    </p>
                    <p className="px-2 rounded-full glassb flex items-center gap-2">
                        <FontAwesomeIcon icon={faReceipt}/> ИНН: 366416455929
                    </p>
                    <p className="px-2 rounded-full glassb flex items-center gap-2">
                        <FontAwesomeIcon icon={faUser}/> ФИО: Фоминых Александр Михайлович
                    </p>
                </div>
            </div>
        </div>
        <Footer router={props.router}/>
    </>;
}