import liff from '@line/liff'
import consola from 'consola'

export const shareTargetPicker = async (
  messages: Parameters<typeof liff.shareTargetPicker>[0],
  options?: Parameters<typeof liff.shareTargetPicker>[1],
) => {
  if (!liff.isApiAvailable('shareTargetPicker')) {
    throw new Error('shareTargetPicker is not available')
  }

  consola.info('Share target picker is invoked')
  const result = await liff.shareTargetPicker(messages, options)

  if (!result) {
    throw new Error('Share target picker was cancelled')
  }

  if (result.status === 'success') {
    consola.success('Successfully sent messages')
    return true
  }
}
