import { CFlexBox } from '@/@types/liff'
import useLIFF from '@/hooks/useLIFF'

export const useFooterFlexTemplate = (): CFlexBox => {
  const { profile } = useLIFF()

  return {
    type: 'box',
    layout: 'vertical',
    contents: [
      {
        type: 'separator',
        color: '#f0f0f0',
        margin: 'none',
      },
      {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'image',
            url: 'https://bucket.ex10.tech/images/ef793012-a4d9-11ee-97d4-0242ac12000b/originalContentUrl.png',
            flex: 1,
            gravity: 'center',
            aspectRatio: '1:1',
          },
          {
            type: 'text',
            text: 'Sawasdee Studio',
            flex: 19,
            size: 'xs',
            color: '#999999',
            weight: 'bold',
            gravity: 'center',
            wrap: false,
          },
          {
            type: 'image',
            url: 'https://vos.line-scdn.net/service-notifier/footer_go_btn.png',
            flex: 1,
            gravity: 'center',
            size: 'xxs',
          },
        ],
        flex: 1,
        spacing: 'md',
        margin: 'md',
      },
    ],
    margin: 'none',
    paddingTop: 'none',
    action: {
      type: 'uri',
      label: 'Happy New Year Studio',
      uri: `https://liff.line.me/${
        import.meta.env.VITE_LIFF_ID
      }?utm_source=line&utm_medium=flex_message&utm_campaign=flex_footer&utm_content=flex_share_${profile?.userId}`,
    },
  }
}
