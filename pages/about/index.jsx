import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";


export default function About(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav profilePic={<img src="https://sun9-84.userapi.com/impg/kF4tqNO7BrLupDG8SUDVcn1s6AjCDbEJ9QpGhQ/--gm3SwQFA4.jpg?size=963x918&quality=95&sign=ca6881ea26076bebf1bb925b0672b168&type=album"/>} />

            <div className={styles.main}>
                <h1 style={{color:"white"}}>Нет блин 🍍Онанас</h1>
                <p>Ищу сотрудников: разрабов, тех. поддержку, маркетологов и модераторов. Оплата хэллоуинскими тыквами.</p>
                <p>А если серьезно, то я еще не составил вакансии, но все-равно пишите в лс.</p>
                <span>— With ♥️, M41den</span>
                <p style={{height:"100vh"}} />
            </div>
            <Footer/>
        </>
    )
}