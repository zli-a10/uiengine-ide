import React from 'react'
import { Breadcrumb, Row, Icon, Switch, Col } from 'antd'

const { Item } = Breadcrumb
class BreadcrumbComponent extends React.Component<any, any> {
  render() {
    return (
      <Row className="a10-breadCrumb-container flex-bar">
        <Col span={16}>
          <Breadcrumb className="a10-breadCrumb">
            <Item>
              <Icon className="breadCrumb-Icon" type="menu-unfold" />
              ADC > Create Virtual Server
            </Item>
          </Breadcrumb>
        </Col>

        <Col span={8} className="breadCrumb-switch">
          <Switch
            checkedChildren="Help"
            unCheckedChildren="Default"
            defaultChecked
          />
        </Col>
      </Row>
    )
  }
}

export default BreadcrumbComponent
