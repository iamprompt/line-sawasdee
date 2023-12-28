import { zodResolver } from '@hookform/resolvers/zod'
import liff from '@line/liff'
import { useCallback, useEffect } from 'react'
import { Button } from 'react-aria-components'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import FormField from './FormField'

const schema = z.object({
  title: z.string().min(1, 'กรุณากรอกหัวเรื่อง'),
  description: z.string().min(1, 'กรุณากรอกคำอวยพร'),
  name: z.string().min(1, 'กรุณากรอกชื่อ'),
})

type DataCustomizeFormProps = {
  template: any
  onSubmit: (data: z.infer<typeof schema>) => void
}

const DataCustomizeForm = ({ template, onSubmit }: DataCustomizeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isValid },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      title: '',
      description: '',
    },
  })

  const resetDefaultValues = useCallback(async () => {
    const profile = await liff.getProfile()

    reset(
      {
        title: template.defaults.title,
        description: template.defaults.description,
        name: profile.displayName,
      },
      { keepDirty: false },
    )
  }, [template, reset])

  useEffect(() => {
    if (!template) return
    resetDefaultValues()
  }, [template, resetDefaultValues])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col space-y-4">
        <FormField control={control} name="title" label="หัวเรื่อง" />
        <FormField control={control} name="description" label="คำอวยพร" />
        <FormField control={control} name="name" label="จาก" />
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
