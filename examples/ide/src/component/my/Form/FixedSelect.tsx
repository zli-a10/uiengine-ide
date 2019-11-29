import React from 'react'
import { Select } from 'antd'
import _ from 'lodash'

const FixedSelectComponent = (props: any) => {
  const { children, uinode, select, userDefinedOptions, ...rest } = props
  // load data
  let allowedOptions: object[] = []
  if (
    uinode.dataNode &&
    uinode.dataNode.schema &&
    uinode.dataNode.schema.type === 'select' &&
    uinode.dataNode.schema['cm-meta'].allowed
  ) {
    allowedOptions = uinode.dataNode.schema['cm-meta'].allowed
  } else if (userDefinedOptions) {
    let customOptions = userDefinedOptions.split(',')
    customOptions.map((data: any) => {
      let optionSplit = data.split(':')
      allowedOptions.push({ label: optionSplit[0], value: optionSplit[1] })
      return data
    })
  }
  return (
    <Select {...rest}>
      {allowedOptions &&
        allowedOptions.map((data: any, index: number) => {
          return (
            <Select.Option value={_.get(data, 'value')} key={index}>
              {_.get(data, 'label')}
            </Select.Option>
          )
        })}
    </Select>
  )
}

export default FixedSelectComponent
