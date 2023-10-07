import '../styles/globals.css'
import {StyledEngineProvider} from "@mui/material";
import {RecoilRoot} from "recoil";
import AuthProvider from "../components/AuthProvider";
import {Router, useRouter} from "next/router";
import {useEffect, useState} from "react";
import LoadingAnim from "../components/ProgressBar";

export default function WebApp({ Component, pageProps }) {
    const [isL, setL] = useState(false)
    const router = useRouter()
    useEffect(()=>{
        Router.events.on('routeChangeStart', () => setL(true));
        Router.events.on('routeChangeComplete', () => setL(false));
        Router.events.on('routeChangeError', () => setL(false));
    }, [Router])
  return (
      <RecoilRoot>
          <StyledEngineProvider injectFirst>
              {isL &&<LoadingAnim />}
              <AuthProvider RequireAuth={Component.RequireAuth} router={router}>
                  <Component {...pageProps} router={router} />
              </AuthProvider>
          </StyledEngineProvider>
      </RecoilRoot>
      )
}


