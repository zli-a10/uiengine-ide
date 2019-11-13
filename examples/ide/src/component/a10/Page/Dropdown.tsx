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

    const appMenu = (
      <Menu onClick={this.handleSecMenuClick} mode="horizontal">
        <Menu.Item key="1">solutions</Menu.Item>
        <Menu.Item key="2">ADP Based</Menu.Item>
      </Menu>
    )
    const solutionMenu = (
      <Menu onClick={this.handleThirdMenuClick}>
        <Menu.Item key="1">sec1</Menu.Item>
        <Menu.Item key="2">sec2</Menu.Item>
      </Menu>
    )
    const mySolutionMenu = (
      <Menu onClick={this.handleThirdMenuClick}>
        <Menu.Item key="1">third1</Menu.Item>
        <Menu.Item key="2">third2</Menu.Item>
      </Menu>
    )
    return (
      <Row className="a10-dropdown">
        <Col span={8}>
          <Dropdown overlay={appMenu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              <Icon type="solution" style={{ marginRight: '10px' }} />
              SSLi
              <Icon type="right" className="dropdown-icon" />
            </a>
          </Dropdown>
        </Col>
        {subMenu ? (
          <Col span={8}>
            <Dropdown overlay={solutionMenu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                {subMenu}
                <Icon type="right" className="dropdown-icon" />
              </a>
            </Dropdown>
          </Col>
        ) : null}

        {thirdMenu ? (
          <Col span={8}>
            <Dropdown overlay={mySolutionMenu} trigger={['click']}>
              <a className="ant-dropdown-link" href="#">
                {thirdMenu}
                <Icon type="right" className="dropdown-icon" />
              </a>
            </Dropdown>
          </Col>
        ) : null}
      </Row>
    )
  }
}

export default DropdownComponent
