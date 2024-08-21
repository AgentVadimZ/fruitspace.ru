import '@/styles/globals.css'
import {StyledEngineProvider} from "@mui/material";
import {RecoilRoot} from "recoil";
import AuthProvider from "@/components/AuthProvider";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LoadingAnim from "@/components/ProgressBar";
import {ConfigProvider, theme} from "antd";
import Head from "next/head";
import Script from "next/script";

export default function WebApp({Component, pageProps}) {
    const [isL, setL] = useState(false)
    const router = useRouter()
    useEffect(() => {
        router.events.on('routeChangeStart', () => setL(true));
        router.events.on('routeChangeComplete', () => setL(false));
        router.events.on('routeChangeError', () => setL(false));
    }, [router])

    useEffect(() => {
        if (Component.jivo) {
            // @ts-ignore
            window?.jivo_init?.()
        } else {
            // @ts-ignore
            window?.jivo_destroy?.()
        }
    }, [typeof window, router.pathname]);

    return (
        <RecoilRoot>
            <Head>
                <meta name="application-name" content="FruitSpace"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
                <meta name="apple-mobile-web-app-title" content="FruitSpace"/>
                <meta name="description" content="Упарвляйте вашим сервером с помощью FruitSpace"/>
                <meta name="format-detection" content="telephone=no"/>
                <meta name="mobile-web-app-capable" content="yes"/>
                <meta name="theme-color" content="#191925"/>
                <link rel="manifest" href="/manifest.json"/>
            </Head>
            <StyledEngineProvider injectFirst>
                {isL && <LoadingAnim/>}
                <ConfigProvider theme={{
                    token: {
                        colorPrimary: "#0d6efd",
                        colorInfo: "#0d6efd",
                        colorSuccess: "#43b581",
                        colorError: "#f04747",
                        colorLink: "#0d6efd",
                        borderRadius: 8,
                        colorBgContainer: "rgba(255, 255, 255, 0.08)",
                        colorBgSpotlight: "transparent",
                    },
                    components: {
                        Input: {
                            activeShadow: "0 0 0 1px #0d6efd",
                        },
                        Select: {
                            colorBgElevated: "var(--subtle-color)",
                            optionSelectedBg: "var(--btn-color)"
                        },
                        Button: {
                            primaryShadow: "none",
                            colorPrimaryHover: "rgb(30 64 175)"
                        },
                        Menu: {
                            itemHeight: 64 // px
                        },
                        Modal: {
                            contentBg: "#1f1f1fdd",
                            headerBg: "transparent",
                        },
                        Table: {
                            headerBg: "rgba(0,0,0,0)",
                            footerBg: "rgba(0,0,0,0)",
                            colorBgContainer: "rgba(0,0,0,0)",
                            selectionColumnWidth: 48
                        },
                        Slider: {
                            railBg: "rgba(255,255,255,0.2)",
                            railHoverBg: "rgba(255,255,255,0.3)",
                            trackBg: "rgba(255,255,255,0.7)",
                            trackHoverBg: "rgba(255,255,255,1)",
                            handleColor: "rgba(255,255,255,0.7)",
                            handleSize: 8,
                            handleSizeHover: 12,
                            handleLineWidth: 0,
                            handleLineWidthHover: 0,
                            dotSize: 1
                        },
                        DatePicker: {
                            activeShadow: "0 0 0 1px #0d6efd",
                            colorBgElevated: "var(--subtle-color)",
                            controlItemBgActive: "var(--btn-color)"
                        }
                    },
                    algorithm: theme.darkAlgorithm
                }}>
                    <AuthProvider RequireAuth={Component.RequireAuth} router={router}>
                        <Component {...pageProps} router={router} globalLoader={[isL, setL]}/>
                        {Component.jivo && <Script src="//code.jivo.ru/widget/QDbblcMLJ0" async></Script>}
                    </AuthProvider>
                </ConfigProvider>
            </StyledEngineProvider>
        </RecoilRoot>
    )
}


