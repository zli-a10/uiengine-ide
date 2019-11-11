import React, { useState } from 'react'
import { Row, Switch, Icon } from 'antd'

const InfoCardComponent = (props: any) => {
  const { checkedChildren, unCheckedChildren, cardInfor, tipsInfor } = props

  const [isShowInfor, setIsShowInfor] = useState(true)
  // if (checkedChildren) {
  //   setIsShowInfor(true);
  // }
  const onChange = (checked: boolean) => {
    if (checked) {
      setIsShowInfor(true)
    } else {
      setIsShowInfor(false)
    }
  }

  return (
    <Row className="form-container">
      <Switch
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        className="float-right"
        onChange={onChange}
        defaultChecked
      />
      {isShowInfor ? (
        <Row className="margin-top">
          <Row className="form-name">Config</Row>
          <Row className="margin-min-top">{cardInfor}</Row>
        </Row>
      ) : null}
      <Row className="margin-top">
        <Row className="form-name">
          <Icon type="bulb" style={{ color: '#ffc800' }} />
          Tips
        </Row>
        <Row className="margin-min-top">{tipsInfor}</Row>
      </Row>
    </Row>
  )
}

export default InfoCardComponent
