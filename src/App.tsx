import parse from 'json-templates'
import { useState } from 'react'
import { toast } from 'sonner'

import DataCustomizeForm from './components/DataCustomizeForm'
import TemplateSelector from './components/TemplateSelector'
import templates from './templates'
import { shareTargetPicker } from './utils/liff'

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0])

  const onSubmit = async (data: any) => {
    if (!selectedTemplate) return

    try {
      const json = parse(selectedTemplate.json)(data) as any

      const result = await shareTargetPicker(
        [
          {
            type: 'flex',
            altText: 'สวัสดีปีใหม่ 2024',
            contents: json,
          },
        ],
        { isMultiple: true },
      )

      toast.success(`ข้อความถูกส่งสำเร็จแล้ว`)
    } catch (error) {
      console.error(error)
      toast.error(`เกิดข้อผิดพลาดในการส่งข้อความ`)
    }
  }

  return (
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
            onChange={setSelectedTemplate}
          />
          <div className="text-red-600">
            * หากเปลี่ยนรูปแบบ ข้อมูลที่กรอกจะถูกล้างทั้งหมด
          </div>
        </div>
        <div>
          <div className="font-bold text-2xl mb-4 mt-8">ปรับแต่งข้อความ</div>
          <DataCustomizeForm template={selectedTemplate} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  )
}

export default App
