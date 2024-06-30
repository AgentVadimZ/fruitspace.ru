import '@/styles/globals.css'
import {StyledEngineProvider} from "@mui/material";
import {RecoilRoot} from "recoil";
import AuthProvider from "@/components/AuthProvider";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LoadingAnim from "@/components/ProgressBar";
import {ConfigProvider, theme} from "antd";

export default function WebApp({Component, pageProps}) {
    const [isL, setL] = useState(false)
    const router = useRouter()
    useEffect(() => {
        router.events.on('routeChangeStart', () => setL(true));
        router.events.on('routeChangeComplete', () => setL(false));
        router.events.on('routeChangeError', () => setL(false));
    }, [router])

    return (
        <RecoilRoot>
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
                    </AuthProvider>
                </ConfigProvider>
            </StyledEngineProvider>
        </RecoilRoot>
    )
}


