import React from 'react'
import { Layout, Icon, Row, Col, Menu } from 'antd'

const { Header } = Layout
const { SubMenu } = Menu
const HeaderComponent = (props: any) => {
  return (
    <div className="a10-header ">
      <Header className="flex-bar">
        <Row type="flex" align="middle" justify="space-between">
          <Col span={12} className="logo">
            <img src="logo-a10.png" />
          </Col>
          <Col span={12}>
            <Row type="flex" align="middle" justify="end">
              <Col span={24} className="system-menu">
                <Menu mode="horizontal" defaultSelectedKeys={[]}>
                  <SubMenu
                    key="vcs"
                    title={
                      <span>
                        <Icon type="api" />
                        <span>VCS Status</span>
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
                    key="partition"
                    title={
                      <span>
                        <Icon type="build" />
                        <span>Parititon: Shared</span>
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
                    key="language"
                    title={
                      <span>
                        <Icon type="setting" />
                        <span>Language</span>
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
                  <Menu.Item key="cli" className="sys-menu-item">
                    <Icon type="code" /> CLI{' '}
                  </Menu.Item>
                  <Menu.Item key="user" className="sys-menu-item">
                    <Icon type="user" /> Admin{' '}
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Col>
        </Row>
      </Header>
    </div>
  )
}

export default HeaderComponent
