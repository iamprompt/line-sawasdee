import { ReactNode } from 'react'

import liffContext, {
  LIFFContextData,
  LIFFState,
  useLIFFContextData,
} from '@/contexts/liff'

const LIFFProvider = ({
  children,
}: {
  children:
    | ReactNode
    | ((params: { isReady: boolean } & LIFFContextData) => ReactNode)
}) => {
  const value = useLIFFContextData()

  return (
    <liffContext.Provider value={value}>
      {typeof children === 'function'
        ? children({ isReady: value.state === LIFFState.READY, ...value })
        : children}
    </liffContext.Provider>
  )
}

export default LIFFProvider
