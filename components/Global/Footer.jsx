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
        <div className="bg-black flex flex-col">
            <div className={styles.footerTop}>
                <div className={styles.footerLinklist}>
                    <h3>{locale.get('footer.about')}</h3>
                    <Link href="/about"><p className="hover:text-white hover:underline">{locale.get('footer.about')}</p></Link>
                    <Link href="/about/team"><p className="hover:text-white hover:underline">{locale.get('footer.team')}</p></Link>
                    <Link href="/about/partnership"><p className="hover:text-white hover:underline">{locale.get('footer.partnership')}</p></Link>
                    <Link href="/about/tos"><p className="hover:text-white hover:underline">{locale.get('footer.tos')}</p></Link>
                </div>
                <div className={styles.footerLinklist}>
                    <h3>FruitSpace</h3>
                    <Link href="/product/mc"><p className="hover:text-white hover:underline">{locale.get('footer.hostingmc')}</p></Link>
                    <Link href="/product/gd"><p className="hover:text-white hover:underline">{locale.get('footer.hostinggd')}</p></Link>
                    <Link href="/product/gta"><p className="hover:text-white hover:underline">{locale.get('footer.hostinggta')}</p></Link>
                    {/*<Link href="https://telegra.ph/Dokumentaciya-dlya-ochen-umnyh-09-29"><p>{locale.get('footer.docs')}</p></Link>*/}
                </div>
                <span className="flex-1"></span>
                <div className="flex flex-col justify-center mx-8">
                    <p>Developed by</p>
                    <h3>M41den</h3>
                    <h5> &copy; {year}</h5>
                </div>
            </div>
            <div className={styles.footerLine}></div>
            <div className="m-2 flex flex-col items-center justify-center lg:flex-row">
                <a className="flex gap-2 justify-center items-center box-border border-2 border-black hover:border-white transition-all duration-300 border-solid rounded-xl pr-2 m-2"
                   href="https://discord.gg/fruitspace">
                    <img className="invert h-16" src={discordLogo.src} alt="discord"/> FruitSpace
                </a>
                <a className="flex gap-2 justify-center items-center box-border border-2 border-black hover:border-white transition-all duration-300 border-solid rounded-xl pr-2 m-2"
                   href="https://vk.com/fruit_space">
                    <img className="invert h-16" src={vkLogo.src} alt="discord"/> FruitSpace
                </a>
            </div>
        </div>
    )
}