import React, { useCallback } from 'react'
import { Radio } from 'antd'
import _ from 'lodash'

const RadioGroupComponent = (props: any) => {
  const { value, onChange, radioOptions } = props
  let radioOptionList: object[] = []
  if (radioOptions) {
    let radioOption = radioOptions.split(',')
    radioOption.map((data: any) => {
      let optionSplit = data.split(':')
      radioOptionList.push({ label: optionSplit[0], value: optionSplit[1] })
    })
  }

  const onRadioGroupChange = useCallback((e: any) => {
    onChange(e.target.value)
  }, [])

  return (
    <Radio.Group onChange={onRadioGroupChange} value={value}>
      {radioOptionList &&
        radioOptionList.map((data: any) => {
          return (
            <Radio value={_.get(data, 'value')}>{_.get(data, 'label')}</Radio>
          )
        })}
    </Radio.Group>
  )
}

export default RadioGroupComponent
