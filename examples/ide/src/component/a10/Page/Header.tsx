import React from 'react'
import { Layout, Icon, Row, Col, Menu, Input } from 'antd'

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
                    key="backup"
                    title={
                      <span>
                        <Icon type="api" />
                        <span>Sync</span>
                        <Icon type="right" />
                      </span>
                    }
                  >
                    <Menu.Item key="heartbeat">Heartbeat</Menu.Item>
                    <Menu.Item key="avcs">aVCS</Menu.Item>
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
                    <Menu.Item key="search">
                      <Input.Search />
                    </Menu.Item>
                    <Menu.Item key="shared">Shared Partition</Menu.Item>
                    <Menu.ItemGroup title="Partitions">
                      <Menu.Item key="pa">Partition A</Menu.Item>
                      <Menu.Item key="pb">Partition B</Menu.Item>
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
                    <Menu.Item key="English">English</Menu.Item>
                    <Menu.Item key="Chinese">Chinese</Menu.Item>
                    <Menu.Item key="Japanese">Japanese</Menu.Item>
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
