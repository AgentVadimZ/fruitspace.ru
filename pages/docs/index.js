import GlobalHead from "@/components/GlobalHead";
import GlobalNav from "@/components/GlobalNav";
import styles from "@/components/Index.module.css";

import FruceLogo from "@/assets/ava.png";
import GDLogo from "@/assets/logos/geometrydash.png";
import MCLogo from "@/assets/logos/minecraft.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

const DocsIndex = (props) => {
    return <>
        <GlobalHead/>
        <GlobalNav router={props.router} mainpage />
        <div className={styles.main}>
            <div className="mt-16 select-none">
                <p className="text-5xl uppercase font-semibold text-center">Документация</p>
                <p className="text-center font-mono">на все случаи жизни</p>
                <div className="mt-8 grid grid-cols-1 laptop:grid-cols-3 gap-16 p-8">
                    {/*<div*/}
                    {/*    className="flex items-center gap-4 rounded-2xl bg-active hover:bg-subtle cursor-pointer glassb p-2 pr-4"*/}
                    {/*    onClick={() => {*/}
                    {/*        props.router.push("/docs/hosting")*/}
                    {/*    }}>*/}
                    {/*    <img src={FruceLogo.src} className="w-24"/>*/}
                    {/*    <div className="">*/}
                    {/*        <p className="text-lg">Хостинг</p>*/}
                    {/*        <span className="text-sm">Работа с аккаунтом</span>*/}
                    {/*    </div>*/}
                    {/*    <FontAwesomeIcon className="ml-auto text-xl" icon={faChevronRight}/>*/}
                    {/*</div>*/}

                    <div
                        className="flex items-center gap-4 rounded-2xl bg-active hover:bg-subtle cursor-pointer glassb p-2 pr-4"
                        onClick={() => {
                            props.router.push("/docs/gdps")
                        }}>
                        <img src={GDLogo.src} className="w-24"/>
                        <div className="">
                            <p className="text-lg">Geometry Dash</p>
                            <span className="text-sm">Работа с GDPS и панелью</span>
                        </div>
                        <FontAwesomeIcon className="ml-auto text-xl" icon={faChevronRight}/>
                    </div>

                    {/*<div*/}
                    {/*    className="flex items-center gap-4 rounded-2xl bg-active hover:bg-subtle cursor-pointer glassb p-2 pr-4"*/}
                    {/*    onClick={() => {*/}
                    {/*        props.router.push("/docs/gdps")*/}
                    {/*    }}>*/}
                    {/*    <img src={MCLogo.src} className="w-24"/>*/}
                    {/*    <div className="">*/}
                    {/*        <p className="text-lg">Minecraft</p>*/}
                    {/*        <span className="text-sm">Работа с серверами</span>*/}
                    {/*    </div>*/}
                    {/*    <FontAwesomeIcon className="ml-auto text-xl" icon={faChevronRight}/>*/}
                    {/*</div>*/}

                </div>
            </div>
        </div>
    </>
}

export default DocsIndex