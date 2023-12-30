import { ReactNode } from 'react'

import NotInClientFallback from '../NotInClientFallback'
import LIFFProvider from './LIFFProvider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LIFFProvider>
      {({ isReady }) => {
        if (!isReady) return null
        return <NotInClientFallback>{children}</NotInClientFallback>
      }}
    </LIFFProvider>
  )
}

export default Providers
