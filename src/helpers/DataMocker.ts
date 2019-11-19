import Mock from 'mockjs'
import _ from 'lodash'
import { EMPTY_DATA } from '../helpers'
import { IUINode } from 'uiengine/typings'
// import { DataNode, UINode, Request } from 'uiengine'

export class DataMocker implements IDataMocker {
  static instance: IDataMocker
  static getInstance() {
    if (!DataMocker.instance) {
      DataMocker.instance = new DataMocker()
    }
    return DataMocker.instance
  }

  /**
   * Should convert data schema rules to mockjs definiation
   * @param schema data schema
   */
  schemaCoverter(schema: any, mode: string = '') {
    return schema
  }

  maxRow: number = 5
  enable: boolean = true
  mode: string = 'normal'
  noCache: boolean = false // default cache
  dataCached: any = {} // see mockjs definiation
  generate(schema: any) {
    if (this.mode === EMPTY_DATA) return
    if (!this.enable) return
    const templates = this.schemaCoverter(schema, this.mode)
    const key = Object.keys(templates)[0]

    if (!key) return

    const getValue = (data: any) => {
      if (data) {
        return Object.values(data)[0]
      }
      return
    }
    let result: any
    if (this.noCache) {
      result = Mock.mock(templates)
      result = getValue(result)
    } else {
      if (this.dataCached[key] === undefined) {
        result = Mock.mock(templates)
        result = getValue(result)
      } else {
        result = this.dataCached[key]
      }
    }
    this.dataCached[key] = result

    return result
  }

  // private async fetchDataSchemasAndSourceListNames(childrenNodeSchemas: any[]) {
  //   const schemas: any = {}
  //   for (let i in childrenNodeSchemas) {
  //     const childSchema = childrenNodeSchemas[i]
  //     let datasource = _.get(childSchema, 'datasource')
  //     let schema = '',
  //       source = ''
  //     if (datasource) {
  //       source = _.get(datasource, 'source', datasource)
  //       schema = _.get(datasource, 'schema', datasource)
  //     }
  //     if (schema && schema.indexOf('$dummy') === -1) {
  //       const request = Request.getInstance()
  //       const dataNode = new DataNode(
  //         { schema, source },
  //         new UINode({}, request),
  //         request
  //       )
  //       const data = await dataNode.loadData({ schema, source })
  //       if (!schemas[source]) schemas[source] = []
  //       schemas[source].push(dataNode.schema)
  //     }

  //     if (_.get(childSchema, `children`)) {
  //       _.merge(
  //         schemas,
  //         await this.fetchDataSchemasAndSourceListNames(childSchema.children)
  //       )
  //     }
  //   }
  //   return schemas
  // }

  // async _generateTableData(childrenNodeSchemas: any[], lines: number = 15) {
  //   const result = {}
  //   const schemaAndSources = await this.fetchDataSchemasAndSourceListNames(
  //     childrenNodeSchemas
  //   )
  //   const noCache = this.noCache
  //   this.noCache = true
  //   for (let i = 0; i <= lines; i++) {
  //     for (let source in schemaAndSources) {
  //       const schemas = schemaAndSources[source]
  //       for (let schemaIndex in schemas) {
  //         const data = this.generate(schemas[schemaIndex])
  //         const path = source.replace('$', i.toString())
  //         _.set(result, path, data)
  //       }
  //     }
  //   }
  //   this.noCache = noCache
  //   return result
  // }

  generateTableData(uiNode: IUINode) {
    const result: any = []
    if (this.mode === EMPTY_DATA) return result
    if (!this.enable) return result
    const children = _.get(uiNode, 'schema.$children', [])
    for (let i = 0; i < this.maxRow; i++) {
      const r = children.map(() => ({}))
      result.push(r)
    }
    return result
  }
}
