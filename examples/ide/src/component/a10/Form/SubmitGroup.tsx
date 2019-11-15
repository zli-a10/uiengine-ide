import React from 'react'
import { Row, Button, Col } from 'antd'
import _ from 'lodash'
const SubmitGroupComponent = (props: any) => {
  const {
    children,
    onSaveClick,
    onCancelClick,
    saveText = 'Save',
    cancelText = 'Cancel',
    buttonAlign = 'right',
    ...rest
  } = props
  return (
    <Row className="a10-form-submit" style={{ textAlign: buttonAlign }}>
      <Button type="primary" size="large" icon="save" onClick={onSaveClick}>
        {saveText}
      </Button>
      <Button
        type="danger"
        icon="close-circle"
        size="large"
        onClick={onCancelClick}
      >
        {cancelText}
      </Button>
    </Row>
  )
}

export default SubmitGroupComponent
