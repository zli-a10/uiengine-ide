import React, { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import { Form } from 'antd'
import { formatTitle } from '../../../../helpers'
import { DataSourceSelector } from './DataSource/DataSourceSelector'

export const FieldselectorComponent = (props: any) => {
  let { onChange, value, uinode, disabled } = props

  const onChangeValue = useCallback(
    (value: string) => {
      if (onChange) onChange(value)
    },
    [onChange]
  )

  return (
    <Form.Item label={formatTitle(props.name)}>
      <DataSourceSelector
        multipleChecked
        onChange={onChangeValue}
        {...props}
        size="small"
      />
    </Form.Item>
  )
}
