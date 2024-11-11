import { ReactNode } from 'react'
import TanstackProvider from './tanstack-query'


const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackProvider>
      {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
        {children}
      {/* </ThemeProvider> */}
    </TanstackProvider>
  )
}

export default Providers
