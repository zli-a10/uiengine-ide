import React, { useState } from 'react'
import { Icon, Dropdown, Menu, Row, Col } from 'antd'
import _ from 'lodash'
export interface IDropdownState {
  subMenu?: string
  isClick?: Boolean
  menuLevel?: string
  thirdMenu?: string
}
class DropdownComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { subMenu: '', isClick: false, menuLevel: '', thirdMenu: '' }
  }

  handleSecMenuClick = (e: any) => {
    if (
      _.has(e, 'item') &&
      _.has(e.item, 'props') &&
      _.has(e.item.props, 'children')
    ) {
      this.setState({
        subMenu: e.item.props.children,
        isClick: true
      })
    }
  }
  handleThirdMenuClick = (e: any) => {
    if (
      _.has(e, 'item') &&
      _.has(e.item, 'props') &&
      _.has(e.item.props, 'children')
    ) {
      this.setState({
        thirdMenu: e.item.props.children
      })
    }
  }

  render() {
    // const menu = this.props;
    const { subMenu, isClick, thirdMenu } = this.state

    const firMenuList = (
      <Menu onClick={this.handleSecMenuClick} mode="horizontal">
        <Menu.Item key="1">solutions</Menu.Item>
        <Menu.Item key="2">ADP Based</Menu.Item>
      </Menu>
    )
    const secMenuList = (
      <Menu onClick={this.handleThirdMenuClick}>
        <Menu.Item key="1">sec1</Menu.Item>
        <Menu.Item key="2">sec2</Menu.Item>
      </Menu>
    )
    const thirdMenuList = (
      <Menu onClick={this.handleThirdMenuClick}>
        <Menu.Item key="1">third1</Menu.Item>
        <Menu.Item key="2">third2</Menu.Item>
      </Menu>
    )
    return (
      <Row className="a10-dropdown">
        <Col className="float-left dropdown-menu">
          <Dropdown overlay={firMenuList} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              <Icon type="solution" style={{ marginRight: '10px' }} />
              SSLi
              <Icon type="down" className="dropdown-icon" />
            </a>
          </Dropdown>
        </Col>
        <Col className="float-left  dropdown-menu">
          {subMenu ? (
            <Dropdown overlay={secMenuList} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                {subMenu}
                <Icon type="down" className="dropdown-icon" />
              </a>
            </Dropdown>
          ) : null}
        </Col>
        <Col className="float-left  dropdown-menu">
          {thirdMenu ? (
            <Dropdown overlay={thirdMenuList} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                {thirdMenu}
                <Icon type="down" className="dropdown-icon" />
              </a>
            </Dropdown>
          ) : null}
        </Col>
      </Row>
    )
  }
}

export default DropdownComponent
