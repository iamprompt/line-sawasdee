import { useCallback, useMemo } from 'react'

import {
  trackEvent as pTrackEvent,
  trackPageview as pTrackPageview,
} from '@/utils/plausible'

import useLIFF from './useLIFF'

const useAnalytics = () => {
  const { profile } = useLIFF()

  const lineTrackingData = useMemo(() => {
    if (!profile) return undefined

    return {
      line_userId: profile.userId,
      line_name: profile.displayName,
    }
  }, [profile])

  const trackEvent = useCallback(
    (
      eventName: string,
      properties?: Record<string, string | number | boolean>,
    ) => {
      return pTrackEvent(eventName, {
        props: {
          task: eventName,
          ...properties,
          ...lineTrackingData,
        },
      })
    },
    [lineTrackingData],
  )

  const trackPageview = useCallback(() => {
    return pTrackPageview(
      {},
      {
        props: {
          ...lineTrackingData,
        },
      },
    )
  }, [lineTrackingData])

  return { trackEvent, trackPageview }
}

export default useAnalytics
