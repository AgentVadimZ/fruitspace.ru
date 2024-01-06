import Link from "next/link";


export default function NotFoundPage(props) {
    return <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl xl:text-8xl font-[Coolvetica] tracking-wider font-normal fruitText m-0 select-none">404</h1>
        <p>Тут ничего нет, может вы искали <Link href="/" className="text-blue-600 hover:underline">Главную страницу</Link>?</p>
    </div>

}