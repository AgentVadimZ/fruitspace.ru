import Head from 'next/head'


export default function GlobalHead(props) {
    return (
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>{props.title} | FruitSpace</title>
        </Head>
    )
}