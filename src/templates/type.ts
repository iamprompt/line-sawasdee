import { CFlexBubble } from '@/@types/liff'

export type TTextField = {
  key: string
  type: string
  label: string
  default: string
}

export type TFMetaFile = {
  name: string
  image: string
  fields: TTextField[]
}

export type FormatTemplateSource = {
  name: string
  image: string
  fields: TTextField[]
  json: CFlexBubble
}
