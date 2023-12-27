import parse from 'json-templates'
import { useState } from 'react'

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
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4">
      <TemplateSelector
        selected={selectedTemplate}
        onChange={setSelectedTemplate}
      />
      <DataCustomizeForm template={selectedTemplate} onSubmit={onSubmit} />
    </div>
  )
}

export default App
