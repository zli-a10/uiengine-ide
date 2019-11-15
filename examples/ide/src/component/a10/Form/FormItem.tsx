import React, { useState } from 'react'
import _ from 'lodash'
import { Form, Input, Icon, Row, Popover } from 'antd'

import { getComponent } from 'uiengine-ide'

const { Item } = Form
const FormItemComponent = (props: any) => {
  let { children, type, error, help, extra, ...rest } = props
  let element: any = children
  let extraInfor: any = children
  let helpInfor: any = children
  let labelInfor: any = children
  helpInfor = (
    <Row>
      {help ? (
        <Popover content={help} title="Title" placement="right">
          <Icon
            type="question"
            className="form-item-help"
            style={{ marginTop: '9px' }}
          />
        </Popover>
      ) : null}
    </Row>
  )
  extraInfor = (
    <>{extra ? <Row className="form-item-extra">{extra}</Row> : null}</>
  )
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

  return (
    <Item {...rest} {...e}>
      {/* {helpInfor}*/}
      {extraInfor}
      {element}
    </Item>
  )
}

export default FormItemComponent
