import { ReactNode } from 'react'

import liffContext, { LIFFState, useLIFFContextData } from '@/contexts/liff'

const LIFFProvider = ({
  children,
}: {
  children: ReactNode | (({ isReady }: { isReady: boolean }) => ReactNode)
}) => {
  const value = useLIFFContextData()

  return (
    <liffContext.Provider value={value}>
      {typeof children === 'function'
        ? children({ isReady: value.state === LIFFState.READY })
        : children}
    </liffContext.Provider>
  )
}

export default LIFFProvider
