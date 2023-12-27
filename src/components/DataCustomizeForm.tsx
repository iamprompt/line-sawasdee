import { zodResolver } from '@hookform/resolvers/zod'
import liff from '@line/liff'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  name: z.string().min(1),
})

type DataCustomizeFormProps = {
  template: any
  onSubmit: (data: z.infer<typeof schema>) => void
}

const DataCustomizeForm = ({ template, onSubmit }: DataCustomizeFormProps) => {
  const { register, handleSubmit, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <div className="w-32 font-bold">Title</div>
          <input
            type="text"
            className="rounded-lg border py-2 px-4 flex-1"
            {...register('title')}
          />
        </div>
        <div className="flex items-center">
          <div className="w-32 font-bold">Description:</div>
          <input
            type="text"
            className="rounded-lg border py-2 px-4 flex-1"
            {...register('description')}
          />
        </div>
        <div className="flex items-center">
          <div className="w-32 font-bold">From:</div>
          <input
            type="text"
            className="rounded-lg border py-2 px-4 flex-1"
            {...register('name')}
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Share
      </button>
    </form>
  )
}

export default DataCustomizeForm
