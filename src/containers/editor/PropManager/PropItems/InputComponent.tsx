import React, { useCallback } from "react"
import _ from 'lodash'
import { Input } from 'antd'
import { InputProps } from 'antd/lib/input'


const InputComponent: React.FC<InputProps> = (props: InputProps) => {
  const { onChange, ...rest } = props

  const getType = (value: string) => {
    let type = 'string'
    if (value.includes(':')) {
      return value.split(':')[0].toLowerCase()
    } else {
      if (value === 'true' || value === 'false') {
        type = 'boolean'
      } else if (value === 'undefined') {
        type = 'undefined'
      } else if (value === 'null') {
        type = 'null'
      } else if (!isNaN(Number(value))) {
        type = 'number'
      }
    }
    return type
  }

  const convertValue = (value: string) => {
    let result: any = value.includes(':') ? value.split(':')[1] : value
    let type = 'string'
    try {
      type = getType(value)
      switch (type) {
        case 'boolean':
          result = JSON.parse(result)
          break
        case 'undefined':
          result = undefined
          break
        case 'null':
          result = null
          break
        case 'number':
          result = Number(result)
          break
      }
    } catch (e) {
      console.log(e)
    }
    return result
  }

  const handleChange = useCallback((e: any) => {
    const value = _.get(e, ['target', 'value'], '')
    onChange && onChange(convertValue(value))
  }, [])
  return (
    <Input
      placeholder="number:1"
      {...rest}
      onChange={handleChange}
    />
  )
}

export default InputComponent
