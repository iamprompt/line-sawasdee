import axios from 'axios'
import consola from 'consola'

type TFileResponse = {
  baseSize: {
    width: number
    height: number
  }
  baseUrl: string
}

type TUploadFileResponse = {
  data: {
    originalContentUrl: TFileResponse
    previewImageUrl: TFileResponse
  }
}

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await axios.post<TUploadFileResponse>(
      'https://upload-api.ex10.tech/v1/public/image',
      formData,
    )

    return data.data
  } catch (error) {
    consola.error('Failed to upload file: ', error)
  }
}
