import React, { useContext, useEffect } from 'react'
import { Tabs, Icon } from 'antd'
import _ from 'lodash'

import { GlobalContext } from '../../Context'
import { PageTree, ResourceTree, Libraries } from '..'
import { DataSource } from './DataSource'
import { IDERegister, Resize } from '../../../helpers'
const TabPane = Tabs.TabPane

export const DesignManager: React.FC<IDesignManager> = props => {
  const { componentCollapsed, toggleComponentCollapsed } = useContext(
    GlobalContext
  )

  // libraries fetch
  const librariesData = IDERegister.componentsLibrary

  useEffect(() => {
    const handler = document.getElementById('drag-handler-south')
    const target: any = document.getElementById('page-list')
    if (target) {
      const targetHeight = target.offsetHeight
      const widgetLib: any = document.getElementById('widgets-library')
      const widgetLibHeight = widgetLib.offsetHeight
      const widdgetDatasource: any = document.getElementById(
        'widget-datasource'
      )
      const widgetDatasourceHeight = widdgetDatasource.offsetHeight
      const Resizer = new Resize('s', target, handler, (w: any) => {
        const offset = targetHeight - w.height
        localStorage.fileListHeightOffset = offset
        widgetLib.style.height = `${widgetLibHeight + offset}px`
        widdgetDatasource.style.height = `${widgetDatasourceHeight + offset}px`
      })

      const offset = parseInt(localStorage.fileListHeightOffset)
      if (offset) {
        target.style.height = `${targetHeight - offset}px`
        widgetLib.style.height = `${widgetLibHeight + offset}px`
        widdgetDatasource.style.height = `${widgetDatasourceHeight + offset}px`
      }
    }
  }, [componentCollapsed, localStorage.fileListHeightOffset])

  return !componentCollapsed ? (
    <>
      <div className="manager">
        <div className="pages" id="page-list">
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
        <div className="drag-handler-south" id="drag-handler-south" />

        <div className="widgets" id="widget-datasource">
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
