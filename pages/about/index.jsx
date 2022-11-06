import GlobalHead from "../../components/GlobalHead";
import GlobalNav from "../../components/GlobalNav";
import styles from "../../components/Index.module.css";
import Footer from "../../components/Global/Footer";


export default function About(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
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