import _ from 'lodash'
import { HandlerManager } from 'uiengine'

import {
  IPlugin,
  IPluginExecution,
  IUINode,
  IPluginParam,
  IEventConfig
} from 'uiengine/typings'

function getDefaultEventConfig(component: string, type: string) {
  const onChangeWithEvent: IEventConfig = {
    eventName: 'onChange',
    receiveParams: ['event'],
    handler: 'updateData'
  }
  const onChangeWithValue: IEventConfig = {
    eventName: 'onChange',
    receiveParams: ['value'],
    handler: 'updateData'
  }
  const onChangeWithEventExport: IEventConfig = {
    eventName: 'onChangeWithEvent',
    receiveParams: ['event'],
    handler: 'updateData'
  }
  const onChangeWithValueExport: IEventConfig = {
    eventName: 'onChangeWithValue',
    receiveParams: ['value'],
    handler: 'updateData'
  }

  const com = component.includes('my:Form.FormItem') ? type : component

  const isUserComponent =
    com.includes('a10:') || com.includes('my:') || type.includes('a10:')

  if (isUserComponent) {
    switch (true) {
      case com === 'antd:Input':
      case com.includes('antd:Input.'):
      case com === 'antd:Checkbox':
      case com === 'antd:Radio.Group':
        return [onChangeWithEvent]
      case com === 'antd:InputNumber':
      case com === 'antd:Checkbox.Group':
      case com === 'antd:Switch':
      case com === 'antd:Select':
      case com.includes('RadioGroup'):
        return [onChangeWithValue]
      default:
        return [onChangeWithEventExport, onChangeWithValueExport]
    }
  } else {
    return [onChangeWithEvent]
  }
}

const execution: IPluginExecution = async (directParam: IPluginParam) => {
  // const uiNode: IUINode = _.get(directParam, "props.uinode");
  const uiNode: IUINode = _.get(directParam, 'uiNode')

  const schema = uiNode.getSchema()
  const component: any = _.get(schema, 'component')
  const schemaProps: any = _.get(schema, 'props')

  const dataNode = uiNode.dataNode
  // load label & type from data schema
  const dataLabel: string = dataNode.getSchema('label')
  const inputType: string = dataNode.getSchema('type') || 'input'
  // get data value
  const value = _.cloneDeep(dataNode.data)
  const valueKey = _.get(props, '$valueKey', 'value')
  // get error validation info
  const error = dataNode.errorInfo

  // assign all default props
  let result: any = {
    key: uiNode.id,
    label: dataLabel,
    type: inputType,
    [valueKey]: value,
    error
  }

  let eventConfigs: IEventConfig[] = []
  // assign user defined props
  if (_.isObject(schemaProps)) {
    let {
      label = dataLabel,
      type = inputType,
      $valueKey,
      ide_droppable,
      $events,
      ...rest
    } = schemaProps as any

    // get event configs
    if (_.isArray($events) && $events.length > 0) {
      eventConfigs = $events
    }

    const style: any = _.cloneDeep(_.get(schema, 'layout', {}))

    // assign props to result
    result = { ...rest, ...result, label, type, style }
  }

  // get default event configs
  if (_.isArray(eventConfigs) && eventConfigs.length === 0) {
    const { type } = result
    eventConfigs = getDefaultEventConfig(component, type)
  }

  const manager = HandlerManager.getInstance()
  let eventFuncs = manager.getStaticEventProps(
    eventConfigs.map((config: IEventConfig) => {
      // console.log(config);
      const {
        eventName,
        receiveParams,
        defaultParams,
        target,
        handler,
        ...rest
      } = config

      return {
        eventName: _.isString(eventName) ? eventName : '',
        receiveParams: _.isArray(receiveParams) ? receiveParams : [],
        defaultParams: {
          ...(_.isObject(defaultParams) ? defaultParams : {}),
          uiNode
        },
        target: _.isString(target) ? target : uiNode.id,
        handler: _.isString(handler) ? handler : '',
        ...rest
      }
    })
  )
  if (!_.isEmpty(eventFuncs)) {
    result = { ...result, ...eventFuncs }
  }

  uiNode.props = result

  return result
}

export const props: IPlugin = {
  name: 'props-parser',
  // categories: ["ui.parser"],
  paramKeys: ['uiNode'],
  categories: ['ui.parser'],
  // paramKeys: ["props"],
  execution,
  priority: 200
}
