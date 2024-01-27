import Link from "next/link";


export default function NotFoundPage(props) {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl xl:text-8xl font-[Coolvetica] tracking-wider font-normal fruitText m-0 select-none">404</h1>
            <p>Тут ничего нет, может вы искали <Link href="/" legacyBehavior>
                <span className="text-blue-600 hover:underline cursor-pointer">Главную страницу</span>
            </Link>?</p>
        </div>
    );

}