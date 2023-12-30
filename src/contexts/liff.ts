import liff from '@line/liff'
import consola from 'consola'
import { createContext, useEffect, useRef, useState } from 'react'

import { Profile } from '@/@types/liff'

export enum LIFFState {
  INITIALIZE = 'INITIALIZE',
  READY = 'READY',
  ERROR = 'ERROR',
}

export type LIFFContextData = {
  state: LIFFState
  profile: Profile | null
  login: () => void
  isInClient: boolean
  isLoggedIn: boolean
  os?: string
  language: string
  lineVersion?: string
}

const liffContext = createContext<LIFFContextData>({
  state: LIFFState.INITIALIZE,
  profile: null,
  login: () => {},
  isInClient: false,
  isLoggedIn: false,
  os: undefined,
  language: 'th',
  lineVersion: undefined,
})

export const useLIFFContextData = (): LIFFContextData => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [state, setState] = useState<LIFFState>(LIFFState.INITIALIZE)
  const isInitialized = useRef(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)

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

      if (liff.isLoggedIn()) {
        const profile = await liff.getProfile()
        setProfile(profile)
      }

      consola.success('LIFF initialized.')
      setState(LIFFState.READY)
    } catch (error) {
      consola.error('Failed to initialize LIFF: ', error)
      setState(LIFFState.ERROR)
    }
  }

  const login = () => {
    return liff.login({ redirectUri: window.location.href })
  }

  const getShareUrl = async () => {
    return liff.permanentLink.createUrl()
  }

  useEffect(() => {
    if (state === LIFFState.READY) {
      console.log('login', liff.isLoggedIn())
      setIsLoggedIn(liff.isLoggedIn())
    }
  }, [state])

  return {
    state,
    profile,
    login,
    isInClient: liff.isInClient(),
    isLoggedIn,
    os: liff.getOS(),
    language: liff.getLanguage(),
    lineVersion: liff.getLineVersion() ?? undefined,
  }
}

export default liffContext
