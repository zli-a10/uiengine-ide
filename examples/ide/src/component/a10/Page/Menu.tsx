import React from 'react'
import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Icon,
  AutoComplete,
  Row,
  Col,
  Dropdown,
  TreeSelect
} from 'antd'

import DropdownComponent from './Dropdown'
const { TreeNode } = TreeSelect
class MenuComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  onClick = () => {}

  render() {
    return (
      <Row className="menus-container">
        <Row className="a10-menu  flex-bar ">
          <Row className="float-left" style={{ width: '40%' }}>
            <DropdownComponent />
          </Row>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            className="float-left"
            style={{ width: '40%', textAlign: 'right' }}
          >
            {/* <Menu.Item key="1">
              <Icon type="solution" />
              SSLi
            </Menu.Item>
            <Menu.Item key="2">ADP Based</Menu.Item>
            <Menu.Item key="3">Wizard</Menu.Item> */}

            <Menu.Item key="6">
              <Icon type="dashboard" />
              Dashboard
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="dashboard" />
              Networking
              <Icon type="down" className="menu-icon" />
            </Menu.Item>
            <Menu.Item key="8">
              <Icon type="dashboard" />
              System
              <Icon type="down" className="menu-icon" />
            </Menu.Item>
          </Menu>
          <Row
            className="float-right search-container"
            style={{ width: '18%' }}
          >
            {/* <Input style={{ borderRadius: "20px" }} /> */}
            {/* <AutoComplete placeholder="Search..." /> */}
            <TreeSelect
              showSearch
              style={{ width: 210 }}
              value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              // onChange={this.onChange}
            >
              <TreeNode value="parent 1" title="parent 1" key="0-1">
                <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                  <TreeNode value="leaf1" title="my leaf" key="random" />
                  <TreeNode value="leaf2" title="your leaf" key="random1" />
                </TreeNode>
                <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                  <TreeNode
                    value="sss"
                    title={<b style={{ color: '#08c' }}>sss</b>}
                    key="random3"
                  />
                </TreeNode>
              </TreeNode>
            </TreeSelect>
          </Row>
        </Row>
      </Row>
    )
  }
}

export default MenuComponent
