import GlobalHead from "../../../../components/GlobalHead";
import GlobalNav from "../../../../components/GlobalNav";
import GDNavBar from "../../../../components/Manage/NavBars/GDNavBar";


export default function ManageGD(props) {

    return (
        <>
            <GlobalHead title="Игровой хостинг"/>
            {/*<Script src="//code.jivo.ru/widget/QDbblcMLJ0" strategy="lazyOnload"/>*/}
            <GlobalNav />
            <GDNavBar />
        </>
    )
}