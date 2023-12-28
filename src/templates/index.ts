import { CFlexBubble } from '@/@types/liff'

import { FormatTemplateSource, TFMetaFile } from './type'

const modules = import.meta.glob<any>('./**/*.json')

const templates: FormatTemplateSource[] = []

const modulesByPath = Object.keys(modules).reduce(
  (acc, path) => {
    const pathArr = path.replace('.json', '').split('/')
    const [, name, type] = pathArr

    return {
      ...acc,
      [name]: {
        ...acc[name],
        [type]: modules[path],
      },
    }
  },
  {} as Record<
    string,
    {
      meta: () => Promise<{ default: TFMetaFile }>
      template: () => Promise<{ default: CFlexBubble }>
    }
  >,
)

for (const slug in modulesByPath) {
  const { meta, template } = modulesByPath[slug]

  const { default: metadataData } = await meta()
  const { default: templateData } = await template()

  templates.push({
    name: metadataData.name,
    image: metadataData.image,
    fields: metadataData.fields,
    json: templateData,
  })
}

export default templates
