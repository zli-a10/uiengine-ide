import React, { useContext } from 'react'
import { Tabs, Icon } from 'antd'
import _ from 'lodash'

import { GlobalContext } from '../../Context'
import { PageTree, ResourceTree, Libraries } from '..'
import { DataSource } from '../DataSource'
import { IDERegister } from '../../../helpers'
const TabPane = Tabs.TabPane

export const DesignManager: React.FC<IDesignManager> = props => {
  const { componentCollapsed, toggleComponentCollapsed } = useContext(
    GlobalContext
  )

  // libraries fetch
  const librariesData = IDERegister.componentsLibrary

  return !componentCollapsed ? (
    <>
      <div className="manager">
        <div className="pages">
          <a
            className="close-button"
            onClick={() => toggleComponentCollapsed(true)}
          >
            <Icon type="close" />
          </a>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Schemas" key="1">
              <PageTree />
            </TabPane>
            <TabPane tab="Resources" key="2">
              <ResourceTree />
            </TabPane>
          </Tabs>
        </div>

        <div className="widgets">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Components" key="1">
              <Libraries list={librariesData} />
            </TabPane>

            <TabPane tab="DataSources" key="DataSources">
              <DataSource />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  ) : null
}
