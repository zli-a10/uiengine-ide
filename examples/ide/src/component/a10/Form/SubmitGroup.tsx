import React from 'react'
import { Row, Button, Col } from 'antd'
import _ from 'lodash'
const SubmitGroupComponent = (props: any) => {
  const { children, ...rest } = props
  return (
    <Row className="form-submit" style={{}}>
      <Button className="submit-btn btn-cancel">Cancel</Button>
      <Button className="submit-btn btn-save" {...rest}>
        Save
      </Button>
    </Row>

    // {_.isArray(children)
    //   ? children.map((child: any, index: number) => {
    //       return child;
    //     })
    //   : null}
  )
}

export default SubmitGroupComponent
