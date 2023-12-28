import consola from 'consola'
import { UploadIcon } from 'lucide-react'
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

import { uploadFile } from '@/utils/ex10'

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
                        return
                      }

                      onChange(response.originalContentUrl.baseUrl)
                      toast.success('อัพโหลดรูปภาพสำเร็จ')
                    } catch (error) {
                      consola.error(error)
                      toast.error('อัพโหลดรูปภาพล้มเหลว')
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

export default FormField
