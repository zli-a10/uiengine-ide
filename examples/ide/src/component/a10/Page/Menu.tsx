import React from 'react'
import { Menu, Icon, Row, Col, TreeSelect } from 'antd'

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
        <Col span={8}>
          <DropdownComponent />
        </Col>
        <Col span={16} className="system-menu">
          <Row type="flex" align="middle" justify="end">
            <Col span={18}>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={[]}
                inlineCollapsed={false}
              >
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
                  <Menu.Item key="default">Default</Menu.Item>
                  <Menu.Item key="App">Application</Menu.Item>
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
                  <SubMenu title="Interfaces">
                    <Menu.Item key="lan">LAN</Menu.Item>
                    <Menu.Item key="ve">Virtual Ethernets</Menu.Item>
                    <Menu.Item key="management">Management</Menu.Item>
                    <Menu.Item key="Transparent">Transparent</Menu.Item>
                    <Menu.Item key="Trunks">Trunks</Menu.Item>
                    <Menu.Item key="LLDP">LLDP</Menu.Item>
                    <Menu.Item key="General">General</Menu.Item>
                  </SubMenu>
                  <SubMenu title="VLAN">
                    <Menu.Item key="vlan">VLAN</Menu.Item>
                    <Menu.Item key="MAC">MAC</Menu.Item>
                    <Menu.Item key="General">General</Menu.Item>
                  </SubMenu>
                  <SubMenu title="ARP">
                    <SubMenu title="IPv4">
                      <Menu.Item key="Static">Static</Menu.Item>
                      <Menu.Item key="Dynamic">Dynamic</Menu.Item>
                    </SubMenu>
                    <SubMenu title="IPv6">
                      <Menu.Item key="Static">Static</Menu.Item>
                      <Menu.Item key="Dynamic">Dynamic</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="General">General</Menu.Item>
                  </SubMenu>
                  <SubMenu title="Routes">
                    <SubMenu title="IPv4">
                      <Menu.Item key="Static">Rib</Menu.Item>
                      <Menu.Item key="Dynamic">BFD</Menu.Item>
                    </SubMenu>
                    <SubMenu title="IPv6">
                      <Menu.Item key="Static">Rib</Menu.Item>
                      <Menu.Item key="Dynamic">BFD</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="General">General</Menu.Item>
                  </SubMenu>
                  <SubMenu title="Other">
                    <Menu.Item key="lacp">LACP</Menu.Item>
                    <Menu.Item key="trunk">Trunk</Menu.Item>
                    <Menu.Item key="BPDU Fwd Groups">BPDU Fwd Groups</Menu.Item>
                    <Menu.Item key="MDLB">MDLB</Menu.Item>
                  </SubMenu>
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
                  <SubMenu title="Resources">
                    <Menu.Item key="files">Files</Menu.Item>
                    <Menu.Item key="usage">Application Resource</Menu.Item>
                    <Menu.Item key="resource-system">
                      {' '}
                      System Resource
                    </Menu.Item>
                    <Menu.Item key="resource-accounting">
                      Resource Acountting
                    </Menu.Item>
                    <Menu.Item key="template">Templates</Menu.Item>
                  </SubMenu>
                  <SubMenu title="Share Objects">
                    <Menu.Item key="class-list">Class List</Menu.Item>
                    <Menu.Item key="domain-list">Domain List</Menu.Item>
                    <Menu.Item key="geo-list">GEO List</Menu.Item>
                  </SubMenu>
                  <SubMenu title="Settings">
                    <Menu.Item key="time">Time</Menu.Item>
                    <Menu.Item key="dns">DNS</Menu.Item>
                    <Menu.Item key="web">Web</Menu.Item>
                    <Menu.Item key="web-cert">Web Cert</Menu.Item>
                    <Menu.Item key="terminal">Terminal</Menu.Item>
                    <Menu.Item key="logging">Logging</Menu.Item>
                    <Menu.Item key="SMTP">SMTP</Menu.Item>
                    <Menu.Item key="Sync">Sync</Menu.Item>
                    <Menu.Item key="Password Policy">Password Policy</Menu.Item>
                    <Menu.Item key="Cloud">Harmony Controller</Menu.Item>
                  </SubMenu>
                  <SubMenu title="Admin">
                    <Menu.Item key="Users">Users</Menu.Item>
                    <Menu.Item key="RBA">RBA</Menu.Item>
                    <Menu.Item key="Partitions">Partition</Menu.Item>
                    <Menu.Item key="Lockout">Lockout</Menu.Item>
                    <Menu.Item key="External-auth">External Auth</Menu.Item>
                    <Menu.Item key="licensing">Licensing</Menu.Item>
                  </SubMenu>
                  <SubMenu title="Maintenance">
                    <Menu.Item key="Upgrade">Upgrade</Menu.Item>
                    <Menu.Item key="Backup">Backup</Menu.Item>
                    <Menu.Item key="Restore">Restore</Menu.Item>
                    <Menu.Item key="Hotfix">Hotfix</Menu.Item>
                    <Menu.Item key="reboot">Reboot</Menu.Item>
                    <Menu.Item key="shutdown">Shutdown</Menu.Item>
                  </SubMenu>
                  <SubMenu title="Debug">
                    <Menu.Item key="ShowTech">ShowTech</Menu.Item>
                    <Menu.Item key="ShowCores">Show Cores</Menu.Item>
                    <Menu.Item key="HTTP-Logs">HTTP Logs</Menu.Item>
                    <Menu.Item key="Debug-Files">Debug Files</Menu.Item>
                    <Menu.Item key="Debug-Configs">Debug Configs</Menu.Item>
                    <Menu.Item key="Audit">Audit Log</Menu.Item>
                    <Menu.Item key="System Log">System Log</Menu.Item>
                  </SubMenu>
                </SubMenu>
              </Menu>
            </Col>
            <Col span={6} className="search-function">
              <TreeSelect
                showSearch
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Search features or objects"
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
