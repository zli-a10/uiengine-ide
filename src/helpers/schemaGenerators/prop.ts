import _ from 'lodash'

export const prop = (
  name: string,
  componentSchema: IComponentSchema,
  value: any,
  options?: any
) => {
  // TODO: validate by info
  if (name !== 'content') {
    const props = {}
    _.set(props, name, value)
    return { props }
  } else {
    return { content: value }
  }
}
