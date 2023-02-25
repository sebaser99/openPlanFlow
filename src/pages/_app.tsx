import { UIProvider } from '@/context'
import '@/styles/globals.css'
import {CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import {darkTheme, lightTheme} from '../themes'


export default function App({ Component, pageProps }: AppProps) {
  return( 
    <UIProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  )
}
