import React, { useState } from 'react'
import { Form, Row, Switch } from 'antd'
import _ from 'lodash'
const FormComponent = (props: any) => {
  const { children, sectionName } = props
  const [more, setMore] = useState(true)
  const onChange = (e: any) => {
    setMore(e)
  }

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
      <Form className="form-container" {...formItemLayout}>
        {children}
      </Form>
    </>
  )
}

export default FormComponent
