import React from 'react'
import './styles/TabContent.less'
const TabContentComponent = (props: any) => {
  let { tabName, children } = props
  return (
    <div>
      <span style={{ display: 'none' }}>{tabName}</span>
      {children
        ? children.map((child: any, index: number) => (
            <div key={index.toString()} className="Tab-content">
              {child}
            </div>
          ))
        : null}
    </div>
  )
}
export default TabContentComponent
