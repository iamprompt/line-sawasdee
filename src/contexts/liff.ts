import liff from '@line/liff'
import consola from 'consola'
import { createContext, useEffect, useRef, useState } from 'react'

import { Profile } from '@/@types/liff'

export enum LIFFState {
  INITIALIZE = 'INITIALIZE',
  READY = 'READY',
  ERROR = 'ERROR',
}

type LIFFContextData = {
  state: LIFFState
  profile: Profile | null
}

const liffContext = createContext<LIFFContextData>({
  state: LIFFState.INITIALIZE,
  profile: null,
})

export const useLIFFContextData = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
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
      await liff.init({ liffId, withLoginOnExternalBrowser: true })

      if (!liff.isLoggedIn()) {
        liff.login()
        return
      }

      const profile = await liff.getProfile()
      setProfile(profile)

      consola.success('LIFF initialized.')
      setState(LIFFState.READY)
    } catch (error) {
      consola.error('Failed to initialize LIFF: ', error)
      setState(LIFFState.ERROR)
    }
  }

  return {
    state,
    profile,
  }
}

export default liffContext
