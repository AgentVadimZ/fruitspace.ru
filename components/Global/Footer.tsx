import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord, faTelegram, faVk, faYoutube} from "@fortawesome/free-brands-svg-icons";


export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <div className="bg-black flex flex-col">
            <div className="flex flex-col lg:flex-row gap-4 p-4">
                <div className="flex flex-col gap-2 p-2 text-sm">
                    <h3 className="font-semibold text-base">FruitSpace</h3>
                    <Link href="/about" className="hover:text-white hover:underline">О нас</Link>
                    <Link href="/about/partnership" className="hover:text-white hover:underline">
                        Партнерская программа
                    </Link>
                    <Link href="/about/tos" className="hover:text-white hover:underline">Условия использования</Link>
                </div>
                <div className="flex flex-col gap-2 p-2 text-sm">
                    <h3 className="font-semibold text-base">Хостинг</h3>
                    <Link href="/product/mc" className="hover:text-white hover:underline">Minecraft</Link>
                    <Link href="/product/gd" className="hover:text-white hover:underline">Geometry Dash</Link>
                </div>
                <div className="flex flex-col gap-2 p-2 text-sm">
                    <h3 className="font-semibold text-base">Сообщество</h3>
                    <Link href="/docs" className="hover:text-white hover:underline">Документация</Link>
                    <Link href="https://blog.fruitspace.one" className="hover:text-white hover:underline">Блог</Link>
                </div>
                <span className="flex-1"></span>
                <div className="flex flex-col gap-2 lg:items-end">
                    <Link href="https://status.fruitspace.one/" target="_blank" className="flex items-center gap-2 group rounded-lg bg-active px-2 py-1 w-fit">
                        <span className="h-2 w-2 bg-success rounded-full animate-pulse"></span>
                        <span className="group-hover:text-white group-hover:underline">Статус серверов</span>
                    </Link>
                    <p className="flex items-center gap-2 text-sm group">
                        Designed by
                        <Link href="https://m41den.com" target="_blank" className="flex items-center gap-2 border-1 border-solid border-transparent group-hover:border-white rounded-full pr-2">
                            <img src="https://cdn.fruitspace.one/profile_pics/c4ca4238a0b923820dcc509a6f75849b.png" className="w-6 h-6 rounded-full" />
                            M41den
                        </Link>
                    </p>
                    <p className="text-sm">FruitSpace &copy; 2022-{year}</p>
                </div>
            </div>
            <div className="footerLine"></div>
            <p className="text-center mt-2">Наши сообщества</p>
            <div className="m-2 mt-0 flex flex-row items-center justify-center gap-2">
                {[
                    {
                        logo: faDiscord,
                        link: "https://discord.gg/fruitspace"
                    },
                    {
                        logo: faVk,
                        link: "https://vk.com/fruit_space"
                    },
                    {
                        logo: faTelegram,
                        link: "https://t.me/fruitspace"
                    },
                    {
                        logo: faYoutube,
                        link: "https://www.youtube.com/@fruce"
                    }
                ].map((el, i)=> (
                    <a key={i} className="p-2 text-3xl w-12 h-12 flex items-center justify-center"
                       href={el.link}>
                        <FontAwesomeIcon icon={el.logo}/>
                    </a>
                ))}
            </div>
        </div>
    );
}