import Head from 'next/head'

import banner from "./assets/banner.png"

export default function GlobalHead(props) {
    const domain = "https://fruitspace.ru"
    let og = {
        title: "FruitSpace",
        description: "Игровой хостинг FruitSpace: сервера Minecraft, Geometry Dash, CS 1.6/GO/2",
        type: "website",
        url: "/",
        image: `${domain}${banner.src}`,
    }
    og = {...og, ...props.og}

    return (
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>{og.title} | FruitSpace</title>
            {Object.keys(og).map((k, i) => <meta key={i} name={`og:${k}`} content={og[k]} />)}
        </Head>
    )
}