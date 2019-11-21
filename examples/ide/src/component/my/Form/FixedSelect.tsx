import React from 'react'
import { Select, Form } from 'antd'
import _ from 'lodash'
const { Item } = Form
const FixedSelectComponent = (props: any) => {
  const { children, uinode, select, userDefinedOptions, ...rest } = props
  // load data
  let allowedOptions: object[] = []
  let defaultValue = ''
  if (
    uinode.dataNode &&
    uinode.dataNode.schema &&
    uinode.dataNode.schema.type == 'select' &&
    uinode.dataNode.schema['cm-meta'].allowed
  ) {
    allowedOptions = uinode.dataNode.schema['cm-meta'].allowed
    if (uinode.dataNode.schema['cm-meta'].default) {
      defaultValue = uinode.dataNode.schema['cm-meta'].default
    }
  } else if (userDefinedOptions) {
    let customOptions = userDefinedOptions.split(',')
    customOptions.map((data: any) => {
      let optionSplit = data.split(':')
      allowedOptions.push({ label: optionSplit[0], value: optionSplit[1] })
    })
  }

  return (
    <Item {...rest}>
      <Select defaultValue={defaultValue}>
        {allowedOptions &&
          allowedOptions.map((data: any, index: number) => {
            return (
              <Select.Option value={_.get(data, 'value')} key={index}>
                {_.get(data, 'label')}
              </Select.Option>
            )
          })}
      </Select>
    </Item>
  )
}

export default FixedSelectComponent
