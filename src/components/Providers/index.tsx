import { ReactNode } from 'react'

import LIFFProvider from './LIFFProvider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LIFFProvider>
      {({ isReady }) => {
        if (!isReady) return null
        return children
      }}
    </LIFFProvider>
  )
}

export default Providers
