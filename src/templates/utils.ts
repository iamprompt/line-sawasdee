import { useCallback } from 'react'
import { z } from 'zod'

import useLIFF from '@/hooks/useLIFF'

import { TTextField } from './type'

export const useTemplateHook = () => {
  const { profile } = useLIFF()

  const createSchemaFromFields = useCallback((fields: TTextField[]) => {
    const object = fields.reduce(
      (acc, field) => {
        const zObject = (() => {
          switch (field.type) {
            case 'number':
              return z.number()
            case 'image':
              return z.string().url('กรุณาใส่ลิงค์รูปภาพที่ถูกต้อง')
            case 'text':
            case 'profile_name':
            default:
              return z.string().min(1, 'กรุณาใส่ข้อความ')
          }
        })()

        return {
          ...acc,
          [field.key]: zObject,
        }
      },
      {} as Record<string, z.ZodTypeAny>,
    )

    return z.object(object)
  }, [])

  const createDefaultFromFields = useCallback(
    (fields: TTextField[]) => {
      const defaultValues = fields.reduce(
        (acc, field) => {
          const currentDefault = (() => {
            switch (field.type) {
              case 'profile_name':
                return profile?.displayName ?? ''
              default:
                return field.default ?? ''
            }
          })()

          return {
            ...acc,
            [field.key]: currentDefault,
          }
        },
        {} as Record<string, string>,
      )

      return defaultValues
    },
    [profile],
  )

  return {
    createSchemaFromFields,
    createDefaultFromFields,
  }
}
