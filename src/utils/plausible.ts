import Plausible from 'plausible-tracker'

export const {
  trackEvent,
  trackPageview,
  enableAutoOutboundTracking,
  enableAutoPageviews,
} = Plausible({
  domain: 'line-sawasdee.iamprompt.me',
  trackLocalhost: false,
  apiHost: 'https://plausible.iamprompt.me',
})
