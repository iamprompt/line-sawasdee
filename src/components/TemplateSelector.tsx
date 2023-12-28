import templates from '@/templates'

type TemplateSelectorProps = {
  selected?: (typeof templates)[number]
  onChange?: (template: (typeof templates)[number]) => void
}

const TemplateSelector = ({ selected, onChange }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((template) => {
        return (
          <div
            key={template.name}
            data-selected={selected?.name === template.name}
            className="group cursor-pointer flex px-4 py-2 rounded-lg border mb-2 flex-col justify-center items-center data-[selected=true]:bg-blue-100 data-[selected=true]:border-blue-500"
            onClick={() => onChange?.(template)}
          >
            <img
              src={template.image}
              className="w-20 h-20"
              alt={template.name}
            />

            <span className="mt-4 group-data-[selected=true]:font-bold">
              {template.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default TemplateSelector
