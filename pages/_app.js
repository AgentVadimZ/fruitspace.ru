import '../styles/globals.css'
import {StyledEngineProvider} from "@mui/material";
import {RecoilRoot} from "recoil";

export default function WebApp({ Component, pageProps }) {
  return (
      <RecoilRoot>
          <StyledEngineProvider injectFirst>
              <Component {...pageProps} />
          </StyledEngineProvider>
      </RecoilRoot>
      )

}


