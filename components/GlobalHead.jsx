import Head from 'next/head'
import Script from "next/script";


export default function GlobalHead(props) {
    return (
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>{props.title} | FruitSpace</title>
            <meta property="og:title" content={`${props.title} | FruitSpace`} />
            <meta property="og:description" content={props.description?props.description:
                "Игровой хостинг FruitSpace: сервера Minecraft, Geometry Dash, GTA SA/IV/V"} />
            {props.image && <meta property="og:image" content={props.image} />}
            <meta name="pandora-tag" content="cdn:edge.halogen.cc;ttl=300;instances=3"/>
        </Head>
    )
}