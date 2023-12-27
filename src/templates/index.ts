import { FooterFlexTemplate } from './const'

const modules = import.meta.glob<any>('./**/*.json')

const templates: {
  name: string
  defaults: { [key: string]: any }
  json: object
}[] = []

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
  {} as Record<string, Record<string, () => Promise<any>>>,
)

for (const slug in modulesByPath) {
  const { meta, template } = modulesByPath[slug]

  const { default: metadataData } = await meta()
  const { default: templateData } = await template()

  templates.push({
    name: metadataData.name,
    defaults: metadataData.defaults,
    json: {
      ...templateData,
      footer: FooterFlexTemplate,
    },
  })
}

export default templates
