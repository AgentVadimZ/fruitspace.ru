import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";
import {Toaster} from "react-hot-toast";
import useLocale from "../../../../locales/useLocale";
import PanelContent from "../../../../components/Global/PanelContent";
import {Button, Alert, Input} from "antd";
import {useRecoilState} from "recoil";
import {userAtom} from "../../../../fiber/fiber.model";
import PanelSideNav from "../../../../components/PanelSideNav";


export default function ManageMC(props) {
    const locale = useLocale(props.router)

    const [user,setUser] = useRecoilState(userAtom)

    return (<>
            <GlobalHead title={locale.get('nav')}/>
            <GlobalNav />
            <PanelSideNav />
            <Toaster/>
            <PanelContent>
                <div className="flex flex-col items-center rounded-xl bg-[var(--subtle-color)] p-4 max-w-5xl gap-8">
                    <Alert showIcon type="info" message="Если это ваш первый Minecraft-сервер на FruitSpace, то вам должно было прийти письмо на почту,
                    указанную при регистрации. Перейдите по ссылке в нем и завершите настройку аккаунта." />

                    <div className="rounded-lg bg-[var(--btn-hover)] p-2 flex flex-col gap-2 w-full lg:w-96">
                        <span className="flex items-center justify-between gap-4">
                            Логин: <Input disabled className="!text-white" value={user.uname}/>
                        </span>
                        <span className="flex items-center justify-between gap-4">
                            Пароль: <Input.TextArea autoSize disabled className="!text-white" value={"Пароль, выбранный при настройки панели"}/>
                        </span>
                    </div>

                    <Button type="primary" size="large" onClick={() => {
                        window.location.href = "https://fruitspace.panel.gg"
                    }}>Перейти в панель</Button>
                </div>
            </PanelContent>
        </>)
}

ManageMC.RequireAuth = true