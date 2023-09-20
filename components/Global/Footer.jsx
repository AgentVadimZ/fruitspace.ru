import styles from './Footer.module.css'

import HalogenLogoB from './../assets/logos/halogenlogo_b.png'
import discordLogo from './../assets/social/discord.png'
import vkLogo from './../assets/social/vkontakte.png'
import Link from "next/link";
import {useGlobalLocale} from "../../locales/useLocale";


export default function Footer(props) {
    const year = new Date().getFullYear()

    const locale = useGlobalLocale(props.router)

    return (
        <div className={styles.footer}>
            <div className={styles.footerTop}>
                <div className={styles.footerLinklist}>
                    <h3>{locale.get('footer.about')}</h3>
                    <Link href="/about"><p>{locale.get('footer.about')}</p></Link>
                    <Link href="/about/team"><p>{locale.get('footer.team')}</p></Link>
                    <Link href="/about/partnership"><p>{locale.get('footer.partnership')}</p></Link>
                    <Link href="/about/tos"><p>{locale.get('footer.tos')}</p></Link>
                </div>
                <div className={styles.footerLinklist}>
                    <h3>FruitSpace</h3>
                    <Link href="/product/mc"><p>{locale.get('footer.hostingmc')}</p></Link>
                    <Link href="/product/gd"><p>{locale.get('footer.hostinggd')}</p></Link>
                    <Link href="/product/gta"><p>{locale.get('footer.hostinggta')}</p></Link>
                    <Link href="https://telegra.ph/Dokumentaciya-dlya-ochen-umnyh-09-29"><p>{locale.get('footer.docs')}</p></Link>
                </div>
                <Link href="https://halogen.cc" prefetch={false}><img src={HalogenLogoB.src} alt="halogen.cc" /></Link>
                <div>
                    <p>Developed by</p>
                    <h3>M41den</h3>
                    <h5> &copy; {year}</h5>
                </div>
            </div>
            <div className={styles.footerLine}></div>
            <div className={styles.footerBottom}>
                <a href="https://discord.gg/fruitspace"><img src={discordLogo.src} alt="discord"/> FruitSpace</a>
                {/*<a href="https://t.co/the_m41den"><img src={twitterLogo.src}/> Alexander</a>*/}
                <a href="https://vk.com/fruit_space"><img src={vkLogo.src} alt="vk"/> FruitSpace</a>
                {/*<a href="https://t.me/m41den"><img src={telegramLogo.src}/> M41den</a>*/}
            </div>
        </div>
    )
}