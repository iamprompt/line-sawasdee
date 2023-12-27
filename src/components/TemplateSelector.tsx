import clsx from 'clsx'

import templates from '@/templates'

type TemplateSelectorProps = {
  selected?: (typeof templates)[number]
  onChange?: (template: (typeof templates)[number]) => void
}

const TemplateSelector = ({ selected, onChange }: TemplateSelectorProps) => {
  return (
    <div className="flex gap-4">
      {templates.map((template) => {
        return (
          <div
            key={template.name}
            className={clsx(
              'h-8 cursor-pointer flex items-center px-4 rounded-lg border mb-2',
              selected?.name === template.name && 'bg-red-500',
            )}
            onClick={() => onChange?.(template)}
          >
            {template.name}
          </div>
        )
      })}
    </div>
  )
}

export default TemplateSelector
