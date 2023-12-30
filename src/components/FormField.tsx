import { Color, parseColor } from '@react-stately/color'
import consola from 'consola'
import { UploadIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Button,
  FieldError,
  FileTrigger,
  Input,
  Label,
  TextField,
} from 'react-aria-components'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { toast } from 'sonner'

import useAnalytics from '@/hooks/useAnalytics'
import { uploadFile } from '@/utils/ex10'

import { ColorArea } from './ColorArea'
import { ColorSlider } from './ColorSlider'

type FormFieldProps<T extends FieldValues> = {
  type: string
  control: Control<T>
  label: string
  name: Path<T>
}

const FormField = <T extends FieldValues>({
  type,
  control,
  label,
  name,
}: FormFieldProps<T>) => {
  const { trackEvent } = useAnalytics()

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error },
      }) => {
        return (
          <div>
            <TextField
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              isRequired
              validationBehavior="aria"
              isInvalid={invalid}
              className="flex flex-col gap-2"
            >
              <Label className="w-32 font-bold">{label}</Label>
              <div className="flex flex-col">
                {(() => {
                  switch (type) {
                    default:
                      return (
                        <Input
                          ref={ref}
                          className="rounded-lg border py-2 px-4"
                        />
                      )
                  }
                })()}
                <FieldError className="text-sm mt-2 text-red-600">
                  {error?.message}
                </FieldError>
              </div>
            </TextField>

            {type === 'color' && (
              <ColorPicker value={value} onChange={onChange} />
            )}

            {type === 'image' && (
              <div className="mt-2 flex flex-col">
                <span className="font-bold text-center">หรือ</span>
                <FileTrigger
                  acceptedFileTypes={['image/jpeg', 'image/png']}
                  allowsMultiple={false}
                  onSelect={async (e) => {
                    if (!e) return
                    const files = Array.from(e)
                    if (files.length === 0) return

                    const file = files[0]
                    try {
                      const response = await uploadFile(file)

                      if (!response) {
                        consola.error('Upload file failed')
                        trackEvent('upload-image-file', { status: 'failed' })
                        return
                      }

                      onChange(response.originalContentUrl.baseUrl)
                      toast.success('อัพโหลดรูปภาพสำเร็จ')
                      trackEvent('upload-image-file', { status: 'success' })
                    } catch (error) {
                      consola.error(error)
                      toast.error('อัพโหลดรูปภาพล้มเหลว')
                      trackEvent('upload-image-file', { status: 'error' })
                    }
                  }}
                >
                  <Button className="mt-2 bg-yellow-500 hover:bg-yellow-700 w-full flex items-center justify-center text-white font-bold py-2 px-4 rounded-lg">
                    <UploadIcon className="w-4 h-4 mr-2" />
                    เลือกไฟล์
                  </Button>
                </FileTrigger>
              </div>
            )}
          </div>
        )
      }}
    />
  )
}

type ColorPickerProps = {
  value: string
  onChange: (value: string) => void
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [color, setColor] = useState<Color>(parseColor('#FFFFFF'))

  useEffect(() => {
    try {
      setColor(parseColor(value))
    } catch (error) {
      return
    }
  }, [value])

  if (!value) return null

  return (
    <div className="space-y-4 mt-6">
      <ColorArea
        value={color}
        onChange={(value) => {
          onChange(value.toString('hex'))
        }}
        xChannel="blue"
        yChannel="red"
        width="100%"
        height={96}
      />
      <ColorSlider
        value={color}
        onChange={(value) => {
          onChange(value.toString('hex'))
        }}
        channel="green"
        width="100%"
      />
    </div>
  )
}

export default FormField
