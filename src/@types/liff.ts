import GetProfileModule from '@line/liff/get-profile'
import ShareTargetPickerModule from '@line/liff/share-target-picker'

type ShareTargetPickerMethod = ReturnType<
  typeof ShareTargetPickerModule.prototype.install
>

export type LiffMessage = Parameters<ShareTargetPickerMethod>[0][number]
export type TextMessage = Extract<LiffMessage, { type: 'text' }>
export type ImageMessage = Extract<LiffMessage, { type: 'image' }>
export type VideoMessage = Extract<LiffMessage, { type: 'video' }>
export type AudioMessage = Extract<LiffMessage, { type: 'audio' }>
export type LocationMessage = Extract<LiffMessage, { type: 'location' }>
export type StickerMessage = Extract<LiffMessage, { type: 'sticker' }>
export type CTemplateMessage = Extract<LiffMessage, { type: 'template' }>
export type CFlexMessage = Extract<LiffMessage, { type: 'flex' }>
export type CFlexBubble = Extract<CFlexMessage['contents'], { type: 'bubble' }>
export type CFlexCarousel = Extract<
  CFlexMessage['contents'],
  { type: 'carousel' }
>

export type CFlexBox = NonNullable<CFlexBubble['body']>

export type Profile = Awaited<
  ReturnType<ReturnType<typeof GetProfileModule.prototype.install>>
>
