import liff from '@line/liff'
import axios from 'axios'
import consola from 'consola'

const AnalyticsInstace = axios.create({
  baseURL: 'https://api.line-sawasdee.iamprompt.me',
})

AnalyticsInstace.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    return config
  }

  const token = liff.getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export enum EventType {
  FLEX_SHARE_SUCCESS = 'FLEX_SHARE_SUCCESS',
  FLEX_SHARE_FAIL = 'FLEX_SHARE_FAIL',
  UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS',
  UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL',
}

export const track = async (type: EventType, payload: Record<string, any>) => {
  try {
    const { data } = await AnalyticsInstace.post('/event', {
      type,
      ...payload,
    })

    return data
  } catch (error) {
    consola.error(error)
  }
}
