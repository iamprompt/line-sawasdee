import parse from 'json-templates'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { CFlexBubble } from './@types/liff'
import DataCustomizeForm from './components/DataCustomizeForm'
import TemplateSelector from './components/TemplateSelector'
import useAnalytics from './hooks/useAnalytics'
import templates from './templates'
import { useFooterFlexTemplate } from './templates/hook'
import { EventType, track } from './utils/analytics'
import { shareTargetPicker } from './utils/liff'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])

  const { trackEvent, trackPageview } = useAnalytics()

  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    trackPageview()
    tracked.current = true
  }, [trackPageview])

  const onTemplateChange = (template: (typeof templates)[number]) => {
    trackEvent('change-template', {
      from_template: selectedTemplate.name,
      to_template: template.name,
    })
    setSelectedTemplate(template)
  }

  const footerFlexContent = useFooterFlexTemplate()

  const onSubmit = async (data: Record<string, any>) => {
    if (!selectedTemplate) return

    try {
      const json = parse(selectedTemplate.json)(data) as unknown as CFlexBubble

      const noti_message =
        data.notification_message || 'ส่งความสุขผ่าน LINE รูปแบบใหม่'
      const result = await shareTargetPicker(
        [
          {
            type: 'flex',
            altText: noti_message,
            contents: {
              ...json,
              footer: footerFlexContent,
            },
          },
        ],
        { isMultiple: true },
      )

      toast.success(`ข้อความถูกส่งสำเร็จแล้ว`)
      trackEvent('flex-share', {
        template: selectedTemplate.name,
        status: 'success',
      })
      track(EventType.FLEX_SHARE_SUCCESS, {
        template_id: selectedTemplate.id,
        notification_message: noti_message,
        variables: {
          ...data,
        },
      })
    } catch (error) {
      console.error(error)
      toast.error(`เกิดข้อผิดพลาดในการส่งข้อความ`)
      trackEvent('flex-share', {
        template: selectedTemplate.name,
        status: 'error',
      })
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-screen-lg px-4 pt-10 pb-8">
        <div className="mb-12">
          <div className="font-bold text-4xl text-center">
            ส่งความสุขผ่าน LINE รูปแบบใหม่
          </div>
        </div>
        <div className="mt-8">
          <div>
            <div className="font-bold text-2xl mb-4">เลือกรูปแบบ</div>
            <TemplateSelector
              selected={selectedTemplate}
              onChange={onTemplateChange}
            />
            <div className="text-red-600">
              * หากเปลี่ยนรูปแบบ ข้อมูลที่กรอกจะถูกล้างทั้งหมด
            </div>
          </div>
          <div>
            <div className="font-bold text-2xl mb-4 mt-8">ปรับแต่งข้อความ</div>
            <DataCustomizeForm
              template={selectedTemplate}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto max-w-screen-lg py-2">
          <div className="text-center">
            Made with ❤️ by iamPrompt. Big Thanks to{' '}
            <a
              href="https://www.ex10.tech/"
              className="text-blue-500 hover:underline"
            >
              EX10
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
