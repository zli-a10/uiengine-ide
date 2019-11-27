import * as _ from 'lodash'

const getDataSource = (dataTree: any, keys: string[], fileName: string) => {
  const [firstKey, ...otherKeys] = keys
  const existItem = _.find(dataTree, (item: any) => {
    return item.title === firstKey
  }) as { name: string; children: any; files: string[]; file: string }
  if (!existItem) {
    const value = keys.slice(0, keys.indexOf(firstKey) + 1).join('.')
    dataTree.push({
      component: 'div',
      files: [fileName],
      type: 'file',
      id: value,
      value,
      title: firstKey,
      ...(otherKeys.length > 0
        ? { children: getDataSource([], otherKeys, fileName) }
        : { file: fileName })
    })
  } else {
    if (otherKeys.length > 0) {
      existItem.children = getDataSource(
        existItem.children || [],
        otherKeys,
        fileName
      )
    } else {
      existItem.file = fileName
    }
    existItem.files = [fileName, ...existItem.files]
  }
  return dataTree
}

export const analysisDataSource = (dataSource: any) => {
  let dataTree: any = []
  dataSource.forEach((item: any) => {
    const { name } = item
    const nameKeys = _.split(_.replace(name, '.json', ''), '.')
    dataTree = getDataSource(dataTree, nameKeys, name)
  })

  return dataTree
}
