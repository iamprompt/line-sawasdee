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
    () => createDefaultFromFields(template.fields),
    [template, createDefaultFromFields],
  )

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
    watch,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValues,
  })

  const watchAllFields = watch()

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
