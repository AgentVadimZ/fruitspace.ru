import styles from './Footer.module.css'

import HalogenLogoB from './../assets/logos/halogenlogo_b.png'
import discordLogo from './../assets/social/discord.png'
import twitterLogo from './../assets/social/twitter.png'
import vkLogo from './../assets/social/vkontakte.png'
import telegramLogo from './../assets/social/telegram.png'
import Link from "next/link";


export default function Footer(props) {
    const year = new Date().getFullYear()
    return (
        <div className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={styles.footerLinklist}>
                    <h3>О нас</h3>
                    <Link href="/about"><p>О нас</p></Link>
                    <Link href="/about/team"><p>Команда</p></Link>
                    <Link href="/about/partnership"><p>Партнерская программа</p></Link>
                    <Link href="/about/tos"><p>Условия использования</p></Link>
                </div>
                <div className={styles.footerLinklist}>
                    <h3>FruitSpace</h3>
                    <Link href="/product/mc"><p>Хостинг Minecraft</p></Link>
                    <Link href="/product/gd"><p>Хостинг Geometry Dash</p></Link>
                    <Link href="/product/gta"><p>Хостинг Grand Theft Auto</p></Link>
                    <Link href="https://docs.fruitspace.ru"><p>Документация</p></Link>
                </div>
                <Link href="https://halogen.cc" prefetch={false}><img src={HalogenLogoB.src} /></Link>
                <div>
                    <p>Developed by</p>
                    <h3>M41den</h3>
                    <h5> &copy; {year}</h5>
                </div>
            </div>
            <div className={styles.footerLine}></div>
            <div className={styles.footerBottom}>
                <a href="https://discord.gg/fruitspace"><img src={discordLogo.src}/> FruitSpace</a>
                {/*<a href="https://t.co/the_m41den"><img src={twitterLogo.src}/> Alexander</a>*/}
                <a href="https://vk.com/fruit_space"><img src={vkLogo.src}/> FruitSpace</a>
                {/*<a href="https://t.me/m41den"><img src={telegramLogo.src}/> M41den</a>*/}
            </div>
        </div>
    )
}