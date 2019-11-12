import React, { useContext } from 'react'
import _ from 'lodash'
import { Form, Input } from 'antd'
// import components from '../';
import { getComponent } from 'uiengine'
import { MyContext } from '../../my/Context/Provider'

const { Item } = Form

const FormItemComponent = (props: any) => {
  let { children, type, error, group, help, isAdvance, ...rest } = props

  const { data } = useContext(MyContext)
  // console.log(data, group, _.get(data, `help[${group}]`))

  const showAdvanced = _.get(data, `advanceOption[${group}]`, false)

  let element: any = children
  if (type) {
    if (type.indexOf(':') === -1) type = 'antd:' + _.upperFirst(type)
    const InputComponent: any = getComponent(type)
    if (InputComponent) {
      element = <InputComponent {...rest} />
    } else {
      element = <Input {...rest} />
    }
  }

  let e = {}
  if (!_.get(error, 'status', true)) {
    e = {
      validateStatus: _.isString(error.status) ? error.status : 'error',
      help: error.code
    }
  }

  return isAdvance ? (
    showAdvanced === true ? (
      <Item
        help={_.get(data, 'showHelp') === false ? '' : help}
        {...rest}
        {...e}
      >
        {element}
      </Item>
    ) : null
  ) : (
    <Item help={_.get(data, 'showHelp') === false ? '' : help} {...rest} {...e}>
      {element}
    </Item>
  )
}

export default FormItemComponent
