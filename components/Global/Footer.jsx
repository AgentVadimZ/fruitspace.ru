import styles from './Footer.module.css'

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
                    <Link href="/product/cs"><p className="hover:text-white hover:underline">{locale.get('footer.hostingcs')}</p></Link>
                    {/* TAKE YOUR API BACK TO ROBLOX */}
                    {/* <Link href="https://api.fruitspace.one/v2/antiswagger/"><p className="hover:text-white hover:underline">FruitSpace API</p></Link> */}
                </div>
                <span className="flex-1"></span>
                <Link href="https://m41den.com">
                    <div className="my-auto p-1 h-fit group w-36 flex !items-center bg-gradient-to-br from-[#8e388e] via-[#5a00ff] to-[#0d6efd] transition-all duration-300 hover:w-60">
                        <div className="h-24 w-[9rem] !m-0 cursor-pointer flex flex-col justify-center transition-all duration-300 bg-black">
                            <div className="mx-4 my-2">
                                <p className="m-0 mb-2">Developed by</p>
                                <p className="my-0 text-xl !text-white">M41den</p>
                                <p className="text-sm my-0"> &copy; {year}</p>
                            </div>
                        </div>
                        <img className="border-solid border-black border-2 box-border !m-0 h-24 w-0 group-hover:w-24 transition-all duration-300" src="https://cdn.fruitspace.one/profile_pics/c4ca4238a0b923820dcc509a6f75849b.png" />
                    </div>
                </Link>
            </div>
            <div className={styles.footerLine}></div>
            <div className="m-2 flex flex-col items-center justify-center lg:flex-row">
                <a className="flex gap-2 justify-center items-center box-border border-2 border-black hover:border-white transition-all duration-300 border-solid rounded-lg pr-2 m-2"
                   href="https://discord.gg/fruitspace">
                    <img className="invert h-10" src={discordLogo.src} alt="discord"/> FruitSpace
                </a>
                <a className="flex gap-2 justify-center items-center box-border border-2 border-black hover:border-white transition-all duration-300 border-solid rounded-lg pr-2 m-2"
                   href="https://vk.com/fruit_space">
                    <img className="invert h-10" src={vkLogo.src} alt="discord"/> FruitSpace
                </a>
            </div>
        </div>
    )
}