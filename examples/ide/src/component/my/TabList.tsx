import React, { useState, useContext, useCallback } from 'react'
import { Tabs, Button, Icon } from 'antd'
import _ from 'lodash'
import { GlobalContext } from 'uiengine-ide'

const { TabPane } = Tabs

const TabListComponent = (props: any) => {
  const { ideMode, preview } = useContext(GlobalContext)
  const { children, uinode } = props

  const onEdit = useCallback(
    (targetKey: any, action: any) => {
      // console.log(uinode, 'uinode')
      if (action === 'add') {
        uinode.dataNode.createRow()
      } else if (action === 'remove') {
        uinode.dataNode.deleteData(targetKey)
      }
    },
    [uinode]
  )

  return (
    <div className="a10-tab-list">
      <Tabs type="editable-card" onEdit={onEdit}>
        {ideMode && !preview ? (
          <TabPane tab={'Tab Editing'} key="editing-key">
            {children}
          </TabPane>
        ) : children && _.isArray(children) ? (
          children.map((child: any, index: number) => {
            return (
              <TabPane tab={'Tab1'} key={index.toString()}>
                {child}
              </TabPane>
            )
          })
        ) : (
          <TabPane tab={'Tab New'} key="empty-key">
            <div>Empty</div>
          </TabPane>
        )}
      </Tabs>
    </div>
  )
}

export default TabListComponent
