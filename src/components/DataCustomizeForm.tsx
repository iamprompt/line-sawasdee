import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo } from 'react'
import { Button } from 'react-aria-components'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormatTemplateSource } from '@/templates/type'
import { useTemplateHook } from '@/templates/utils'

import FormField from './FormField'

type DataCustomizeFormProps = {
  template: FormatTemplateSource
  onSubmit: (data: any) => void
}

const DataCustomizeForm = ({ template, onSubmit }: DataCustomizeFormProps) => {
  const { createDefaultFromFields, createSchemaFromFields } = useTemplateHook()

  const schema = useMemo(
    () => createSchemaFromFields(template.fields),
    [template, createSchemaFromFields],
  )

  const defaultValues = useMemo(
    () => ({
      notification_message: 'สวัสดีปีใหม่ 2024',
      ...createDefaultFromFields(template.fields),
    }),
    [template, createDefaultFromFields],
  )

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(
      schema.extend({
        notification_message: z.string().min(1, 'กรุณากรอกข้อความแจ้งเตือน'),
      }),
    ),
    mode: 'onChange',
    defaultValues: defaultValues,
  })

  const resetDefaultValues = useCallback(() => {
    reset(defaultValues, { keepDirty: false })
  }, [reset, defaultValues])

  useEffect(() => {
    if (!template) return
    resetDefaultValues()
  }, [template, resetDefaultValues])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col space-y-4">
        <FormField
          type="text"
          key="notification_message"
          control={control}
          name="notification_message"
          label="ข้อความแจ้งเตือน"
        />
        {template.fields.map((field) => {
          return (
            <FormField
              type={field.type}
              key={field.key}
              control={control}
              name={field.key}
              label={field.label}
            />
          )
        })}
      </div>
      <Button
        isDisabled={!isValid}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
      >
        แบ่งปัน
      </Button>
    </form>
  )
}

export default DataCustomizeForm
