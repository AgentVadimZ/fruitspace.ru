import '../styles/globals.css'
import {StyledEngineProvider} from "@mui/material";

export default function WebApp({ Component, pageProps }) {
  return (
          <StyledEngineProvider injectFirst>
            <Component {...pageProps} />
          </StyledEngineProvider>
      )

}


