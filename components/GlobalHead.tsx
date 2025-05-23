import Head from 'next/head'

import banner from "@/assets/banner.png"

type HeadProps = {
    title?: string
    og?: {
        title?: string
        description?: string
        type?: string
        url?: string
        image?: string
    }
    description?: string
}

export default function GlobalHead(props: HeadProps) {
    const domain = "https://openbeta.fruitspace.ru"
    let og = {
        title: "FruitSpace",
        description: "Игровой хостинг FruitSpace: сервера Geometry Dash",
        type: "website",
        url: "/",
        image: `${domain}${banner.src}`,
    }
    og = {...og, ...props.og}

    return (
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>{props.title||og.title}</title>
            <meta name="description" content={props.description||og.description} />
            {Object.keys(og).map((k, i) => <meta key={i} property={`og:${k}`} content={og[k]} />)}
        </Head>
    )
}