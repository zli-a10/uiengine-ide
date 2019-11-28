import { readFile, ICommandOptions } from './file'
import { get, isArray, isEmpty } from 'lodash'

const buildFields = (fields: any, fileName: string) => {
  return fields.map((field: any) => {
    const domainName = fileName.replace('.json', ':')
    const value = domainName + field.key
    let schema: any = {}
    if (field.fields) {
      schema = {
        type: 'file',
        component: 'div',
        title: field.key,
        value: field.key,
        children: buildFields(field.fields, fileName)
        // props: {
        //   label: field.label,
        //   help: get(field, 'cm-meta.help', ''),
        //   isAdvance: get(field, 'cm-meta.gui-section') === 'Advanced'
        // },
        // datasource: { source: value }
        // children: [
        //   {
        //     component: getFieldComponent(field),
        //     datasource: { source: field['cm-lineage'] }
        //   }
        // ]
      }
    } else {
      schema = {
        type: 'field',
        component: 'my:Form.FormItem',
        title: field.key,
        value,
        props: {
          label: field.label,
          help: get(field, 'cm-meta.help', ''),
          isAdvance: get(field, 'cm-meta.gui-section') === 'Advanced'
        },
        datasource: { source: value }
        // children: [
        //   {
        //     component: getFieldComponent(field),
        //     datasource: { source: field['cm-lineage'] }
        //   }
        // ]
      }
    }
    // exclusive
    let deps: any = []
    // const exclusion = get(field, 'cm-meta.m-exclusion', [])
    // if (isArray(exclusion)) {
    //   deps = deps.concat(
    //     exclusion.map((ex: any) => {
    //       return {
    //         selector: {
    //           'datasource.source': domainName + ex
    //         },
    //         data: '',
    //         dataCompareRule: 'is'
    //       }
    //     })
    //   )
    //   console.log(deps)
    // }

    // condition
    const condition = get(field, 'cm-meta.condition')
    if (condition) {
      deps.push({
        selector: {
          'datasource.source': domainName + condition
        },
        // "state": { visible: true }
        data: '',
        dataCompareRule: 'not'
      })
    }

    // add deps to visible node
    if (!isEmpty(deps)) {
      schema.state = {
        visible: { deps }
      }
    }

    return schema
  })
}

/**
 *
 * @param options {"name": "getDataFields", "options":{ type: "datasource", "path": name }}
 */
export function getDataFields(options: ICommandOptions) {
  const content = readFile(options)
  try {
    const jsonObj = JSON.parse(content)
    return buildFields(jsonObj.fields, options.path)
  } catch (e) {
    return []
  }
}
