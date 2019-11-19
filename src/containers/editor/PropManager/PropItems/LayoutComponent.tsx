import React, { useState, useCallback, useEffect } from 'react'
import _ from 'lodash'
import { Input, Select, Switch } from 'antd'
import { Form } from 'antd'
import { ControlledEditor } from '@monaco-editor/react'
import { editorOptions } from '../../Workbench/CodeEditor'
import { IUINode } from 'uiengine/typings'
const displayValues = [
  'inherit',
  'flex',
  'none',
  'block',
  'inline',
  'inline-block',
  'list-item',
  'run-in',
  'compact',
  'marker',
  'table',
  'inline-table',
  'table-row-group',
  'table-header-group',
  'table-footer-group',
  'table-row',
  'table-column-group',
  'table-column',
  'table-cell',
  'table-caption'
]

export const LayoutComponent = (props: any) => {
  const { uinode, onChange: onChangeProps, disabled } = props
  let anyData: any = _.get(uinode, ['schema', 'layout'], {}) as any
  const [css, setCss] = useState('{}')
  const onChangeCss = useCallback(
    (v: any) => {
      if (v) {
        let myCss = `${JSON.stringify(v, null, '\t')}`
        onChangeProps(v)
        setCss(myCss)
      }
    },
    [uinode, anyData]
  )

  const onEditorChange = useCallback(
    // (ev: any, value: any) => {
    (e: any) => {
      const value = e.target.value
      setCss(value)
      return value
    },
    [uinode, anyData]
  )

  const onBlur = useCallback(
    // (ev: any, value: any) => {
    (e: any) => {
      const value = e.target.value
      let myCss = value
      try {
        let json = JSON.parse(myCss)
        onChangeProps(json)
        anyData = _.merge(anyData, json)
      } catch (e) {
        console.error(e.message)
      }
      return value
    },
    [uinode, anyData]
  )

  const onChangeDisplay = useCallback(
    (v: any) => {
      _.set(anyData, 'display', v)
      onChangeCss(anyData)
    },
    [uinode, anyData]
  )

  const onChangeFlex = useCallback(
    (e: any) => {
      _.set(anyData, 'flex', e.target.value)
      onChangeCss(anyData)
    },
    [uinode, anyData]
  )

  const onChangeOverflow = useCallback(
    (v: any) => {
      _.set(anyData, 'overflow', v)
      onChangeCss(anyData)
    },
    [uinode, anyData]
  )

  useEffect(() => {
    setCss(`${JSON.stringify(anyData, null, '\t')}`)
  }, [anyData, uinode])

  const editorOpts: any = _.cloneDeep(editorOptions)
  editorOpts.lineNumbers = 'off'
  editorOpts.minimap = { enabled: false }
  editorOpts.readOnly = disabled

  return (
    <div className="layout-editor">
      <Form.Item label="Display">
        <Select
          onChange={onChangeDisplay}
          size="small"
          defaultValue={'inherit'}
          value={_.get(anyData, 'display')}
          disabled={disabled}
        >
          {displayValues.map((value: any, index: number) => (
            <Select.Option value={value} key={`key-${index}`}>
              {_.words(value).join(' ')}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Flex">
        <Input
          type="number"
          disabled={disabled}
          value={_.get(anyData, 'flex')}
          onChange={onChangeFlex}
          min={1}
          max={24}
        />
      </Form.Item>

      <Form.Item label="Fixed Size">
        <Switch
          checked={_.get(anyData, 'overflow')}
          onChange={onChangeOverflow}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item label="CSS">
        <div style={{ border: '1px solid #eee' }}>
          {/* <ControlledEditor
            language={'css'}
            value={css}
            theme="light"
            options={editorOpts}
            onChange={onEditorChange}
            height="200px"
            loading="Loading..."
          /> */}
          <Input.TextArea
            autosize
            value={css}
            onBlur={onBlur}
            onChange={onEditorChange}
          />
        </div>
      </Form.Item>
    </div>
  )
}
