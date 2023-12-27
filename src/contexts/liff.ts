import liff from '@line/liff'
import consola from 'consola'
import { createContext, useEffect, useRef, useState } from 'react'

export enum LIFFState {
  INITIALIZE = 'INITIALIZE',
  READY = 'READY',
  ERROR = 'ERROR',
}

type LIFFContextData = {
  state: LIFFState
}

const liffContext = createContext<LIFFContextData>({
  state: LIFFState.INITIALIZE,
})

export const useLIFFContextData = () => {
  const [state, setState] = useState<LIFFState>(LIFFState.INITIALIZE)
  const isInitialized = useRef(false)

  useEffect(() => {
    initialize()
  }, [])

  const initialize = async () => {
    if (isInitialized.current) return

    isInitialized.current = true

    const liffId = import.meta.env.VITE_LIFF_ID

    if (!liffId) {
      consola.error('LIFF ID is not defined.')
      setState(LIFFState.ERROR)
      return
    }

    try {
      consola.info('Initializing LIFF:', liffId)
      await liff.init({ liffId })
      consola.success('LIFF initialized.')
      setState(LIFFState.READY)
    } catch (error) {
      consola.error('Failed to initialize LIFF: ', error)
      setState(LIFFState.ERROR)
    }
  }

  return {
    state,
  }
}

export default liffContext
