import { EntriesProvider } from '@/context/entries'
import { UIProvider } from '@/context/ui'
import '@/styles/globals.css'
import {CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import {darkTheme, lightTheme} from '../themes'


export default function App({ Component, pageProps }: AppProps) {
  return( 
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
    
  )
}
