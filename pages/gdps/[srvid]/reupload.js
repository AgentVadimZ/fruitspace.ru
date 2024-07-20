import GlobalHead from "@/components/GlobalHead";
import GlobalGDPSNav from "@/components/UserZone/GlobalGDPSNav";
import GDPSNavBar from "@/components/UserZone/GDPSSIdeBar";
import toast, {Toaster} from "react-hot-toast";
import {useEffect, useState} from "react";
import useFiberAPI from "@/fiber/fiber.ts";
import PanelContent from "@/components/Global/PanelContent";
import {useCookies} from "react-cookie";
import {sha1} from "js-sha1";
import {Button, Form, Input, Modal, Pagination} from "antd";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDown,
    faClock,
    faCloudArrowUp,
    faDownload, faHashtag,
    faThumbsDown,
    faThumbsUp
} from "@fortawesome/free-solid-svg-icons";

const doGJP2 = (text) => sha1(`${text}mI29fmAnxgTs`)

const GOURL = (url)=>`https://api.fruitspace.one/v2/servers/gd/xxxx/u/gdproxy/${url}`


const parseGD = (text) => text.split("|").map(val => val.split(":"))

export default function Reupload(props) {

    const router = props.router

    const srvid = router.query.srvid
    const [srv, setSrv] = useState({})
    const [user, setUser] = useState({})

    const api = useFiberAPI(`gdps_token`)
    let tokens = api.authorization || {}
    const defaultId = tokens.default?.[srvid] || 0
    let token = tokens[srvid]?.[defaultId] || ""
    if (router.query.acc) {
        token = router.query.acc
    }
    api.authorization = token

    const [creds, setCreds] = useState({uname: user.uname, password: "", email: user.email})

    useEffect(() => {
        srvid && api.gdps_users.get(srvid).then(resp => {
            if (!resp.uname) router.push(`/gdps/${srvid}/`)
            setUser({...resp, vessels: JSON.parse(resp.vessels || "{}")})
            setCreds({uname: resp.uname, password: "", email: resp.email})
        })
    }, [srvid, router.query.acc])

    useEffect(() => {
        if (srvid == null) return
        api.fetch.gdpsGet(srvid).then((resp) => {
            if (resp.srvid) setSrv(resp);
            else router.push("/");
        })
    }, [srvid, router.query.acc])


    const [cookies, setCookie] = useCookies(["gdaccount"])
    const gdaccount = cookies.gdaccount || {}

    const setAccount = async (vals) => {
        let res = (await axios.postForm(GOURL("accounts/loginGJAccount.php"), {
            udid: "S1521253883129942181722331406926781002",
            userName: vals.uname,
            gjp2: doGJP2(vals.password),
            secret: "Wmfv3899gc9"
        })).data
        if (res[0] === '-') {
            toast.error("Неверный логин или пароль")
            return
        }
        setCookie("gdaccount", JSON.stringify({uname: vals.uname, gjp2: doGJP2(vals.password)}), {path: "/"})
    }

    const [levels, setLevels] = useState([])

    const searchLevels = async (page=0) => {
        let levels = await axios.get(`/api/gdproxy/get_levels?user=${gdaccount.uname}&page=${page}`)
        levels.status===200&&setLevels(levels.data)
    }

    useEffect(()=>{
        searchLevels()
    }, [gdaccount])

    const reuploadLevelToGDPS = async (id) => {}

    return <>
        <GlobalHead title={srv.srv_name}/>
        <GlobalGDPSNav name={srv.srv_name} icon={srv.icon} users={tokens}/>
        <GDPSNavBar plan={srv.plan}/>
        <Toaster/>
        <PanelContent>
            {gdaccount.uname &&
                <div className="w-full desktop:w-2/3 flex flex-col gap-4 glassb bg-active rounded-2xl p-4">
                    <div className="flex items-center gap-2 justify-between">
                        <p>Уровни {gdaccount.uname}</p>
                        <Pagination total={levels[0]?.results||1} showSizeChanger={false} onChange={(val)=>searchLevels(val-1)} />
                    </div>
                    <div className="rounded-xl flex flex-col gap-2 bg-dark">
                        {levels.map((level, i) =>
                            <div key={i} className="p-4 flex items-center gap-4  border-b-1 last:border-b-0 border-white border-opacity-25">
                                <img src={`https://cdn.fruitspace.one/assets/bot_icons/lvl/${level.difficultyFace}.png`} className="w-16 h-16"/>
                                <div>
                                    <p className="text-lg flex items-center gap-2">
                                        {level.name}
                                        {level.stars>0 &&
                                            <span className="rounded px-1.5 bg-subtle text-sm">{level.stars} ⭐</span>}
                                    </p>
                                    <p className="text-gray-300 text-sm flex items-center gap-2">
                                        {[
                                            [faHashtag, level.id],
                                            [faClock, level.length],
                                            [faArrowDown, level.downloads],
                                            [faThumbsUp, level.likes]
                                        ].map((item, i)=><span className="rounded bg-subtle px-1.5 py-0.5" key={i}>
                                        <FontAwesomeIcon icon={item[0]} /> {item[1]}</span>
                                        )}
                                    </p>
                                </div>
                                <Button className="ml-auto" size="large" icon={<FontAwesomeIcon icon={faCloudArrowUp} />}
                                onClick={()=>reuploadLevelToGDPS(level.id)}/>
                        </div>)}
                    </div>
                </div>}
        </PanelContent>
        <Modal title="Привязать аккаунт Geometry Dash" open={!gdaccount.uname} footer={null}>
            <p>Для миграции уровней между Geometry Dash и GDPS необходимо привязать GD аккаунт</p>
            <Form onFinish={setAccount}>
                <Form.Item name="uname" label="Username" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{required: true}]}>
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}