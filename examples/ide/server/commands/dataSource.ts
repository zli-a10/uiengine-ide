import { ICommandOptions } from './file'
import data from './data'

const withFilterSchema = (list: any[], searchText: string) => {
  return list.filter((item: any) => {
    const { name, type, children = [] } = item
    if (name.includes(searchText)) {
      return true
    }
    if (type === 'file') {
      const newChildren = withFilterSchema(children, searchText) || []
      if (newChildren.length === 0) {
        return false
      }
      item.children = newChildren
      return true
    }
  })
}

export const getDataSourceJson = async (searchText: string) => {
  const schema = data.menu
  if (searchText) {
    return withFilterSchema(schema, searchText)
  }
  return schema
}

export const loadDataSource = async (commandOptions: ICommandOptions) => {
  console.log('xxxxxxxxxxxxxxxx')
  const {
    options: { searchText }
  } = commandOptions
  return await getDataSourceJson(searchText)
}
