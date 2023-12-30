import { ReactNode, useMemo, useState } from 'react'
import { Button } from 'react-aria-components'
import QRCode from 'react-qr-code'

import useLIFF from '@/hooks/useLIFF'

const NotInClientFallback = ({ children }: { children: ReactNode }) => {
  const { os, isInClient, isLoggedIn, login, getShareUrl } = useLIFF()

  const [bypassNotInClient, setBypassNotInClient] = useState(false)

  const isMobile = useMemo(() => {
    return os === 'ios' || os === 'android'
  }, [os])

  if (isInClient || (bypassNotInClient && isLoggedIn)) return <>{children}</>

  return (
    <div className="h-dvh flex flex-col items-center justify-center py-10 px-6">
      <div className="flex flex-col w-full items-center gap-4 mb-8">
        <img src="/favicon.svg" className="h-16 w-16 object-contain" />
        <span className="font-bold text-xl">Sawasdee Studio</span>
      </div>
      {isMobile && (
        <>
          <h1 className="font-bold text-2xl mt-2 mb-4 text-center">
            เปิดใช้งานในแอป LINE เพื่อประสบการณ์ที่ดี
          </h1>
          <a href={getShareUrl(true)}>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-70 disabled:cursor-not-allowed">
              เปิดในแอป
            </Button>
          </a>
        </>
      )}
      {!isMobile && (
        <>
          <div className="mb-6 flex flex-col items-center">
            <div className="text-center font-bold text-lg mb-2">
              สแกน QR Code บนโทรศัพท์ เพื่อเปิดบนแอป LINE
            </div>
            <QRCode value={getShareUrl()} className="w-28 h-28" />
          </div>
          {!isLoggedIn && (
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-70 disabled:cursor-not-allowed"
              onPress={() => login()}
            >
              เข้าสู่ระบบ LINE เพื่อใช้งานต่อบนเว็บไซต์
            </Button>
          )}
          {isLoggedIn && (
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-70 disabled:cursor-not-allowed"
              onPress={() => setBypassNotInClient(true)}
            >
              เข้าใช้งานบนเว็บไซต์
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default NotInClientFallback
