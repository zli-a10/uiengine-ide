import React from 'react'
import { Form } from 'antd'
import _ from 'lodash'
const FormComponent = (props: any) => {
  const { children } = props

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  }

  return (
    <>
      <Form {...formItemLayout}>{children}</Form>
    </>
  )
}

export default FormComponent
