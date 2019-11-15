import React, { useState } from 'react'
import { Form, Row, Switch } from 'antd'
import _ from 'lodash'
const FormComponent = (props: any) => {
  const { children, sectionName, formName, fieldName, isCreate } = props
  const [more, setMore] = useState(true)
  const onChange = (e: any) => {
    setMore(e)
  }

  return (
    <>
      {isCreate ? (
        <Row className="form-container">
          <Row className="form-name-weight">{formName}</Row>
          <Row className="margin-min-top">{fieldName}</Row>
          <Row className="float-left margin-min-top switch-big">
            <Switch
              className="switch-size"
              checkedChildren="Internal"
              unCheckedChildren="External"
              defaultChecked
            />
          </Row>
        </Row>
      ) : null}
      <Form className="form-container">
        <Row>
          <Switch
            className="more-infor"
            checkedChildren="More"
            unCheckedChildren="Default"
            defaultChecked
            onChange={onChange}
          />
        </Row>
        <Row className="form-name-weight">{sectionName}</Row>
        {/* {children} */}
        {_.isArray(children)
          ? children.map((child: any, index: number) => {
              return (
                <Row
                  style={{
                    display: !child.props.uiNode.props.isMore
                      ? 'block'
                      : more
                      ? 'block'
                      : 'none'
                  }}
                >
                  {child}
                </Row>
              )
            })
          : null}
      </Form>
    </>
  )
}

export default FormComponent
