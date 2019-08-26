import React, { useState, useCallback, useContext } from 'react'
import _ from 'lodash'
import DataSource from '../DataSource'
import { TreeSelect, Switch, Form, Input, Popover } from 'antd'
const TreeNode = TreeSelect.TreeNode
const DatasourceItem = (props: any) => {
  const [inputValue, setInputValue] = useState('')
  const onChange = (value: any) => {
    console.log(value)
    if (value.type === 'field' && !value.children) {
      const { uiSchema: { datasource: { source = '' } = {} } = {} } = value
      setInputValue(source)
    }
  }
  return (
    <Form.Item label={props.label}>
      <Popover
        placement="bottom"
        content={
          <div className="datasource-component-pop-content">
            <DataSource onChange={onChange} />
          </div>
        }
      >
        <Input value={inputValue} />
      </Popover>
    </Form.Item>
  )
}

export const DatasourceComponent = (props: any) => {
  console.log('dataSource', props)
  const { data, ...rest } = props
  return (
    <>
      <DatasourceItem label="Source" {...rest} data={_.get(data, 'source')} />
      <DatasourceItem label="Schema" {...rest} data={_.get(data, 'schema')} />
      <Form.Item label="Autoload">
        <Switch />
      </Form.Item>
      <Form.Item label="DefaultValue">
        <Input />
      </Form.Item>
    </>
  )
}
