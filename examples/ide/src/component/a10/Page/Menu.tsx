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
const { SubMenu } = Menu

export const MenuComponent = (props: any) => {
  return (
    <div className="a10-menus-container">
      <Row
        type="flex"
        align="middle"
        justify="space-between"
        className="flex-bar"
      >
        <Col span={12}>
          <DropdownComponent />
        </Col>
        <Col span={12} className="system-menu">
          <Row type="flex" align="middle" justify="end">
            <Col span={18}>
              <Menu mode="horizontal" defaultSelectedKeys={[]}>
                <SubMenu
                  key="dashboard"
                  title={
                    <span>
                      <Icon type="dashboard" />
                      <span>Dashboard</span>
                      <Icon type="right" />
                    </span>
                  }
                >
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Iteom 2">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu
                  key="networking"
                  title={
                    <span>
                      <Icon type="apartment" />
                      <span>Networking</span>
                      <Icon type="right" />
                    </span>
                  }
                >
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Iteom 2">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
                <SubMenu
                  key="system"
                  title={
                    <span>
                      <Icon type="setting" />
                      <span>system</span>
                      <Icon type="right" />
                    </span>
                  }
                >
                  <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                  </Menu.ItemGroup>
                  <Menu.ItemGroup title="Iteom 2">
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
              </Menu>
            </Col>
            <Col span={6} className="search-function">
              <TreeSelect
                showSearch
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                className="search-function-menu"
                suffixIcon={() => (
                  <Icon type="search" style={{ fontSize: '16px' }} />
                )}
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
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default MenuComponent
