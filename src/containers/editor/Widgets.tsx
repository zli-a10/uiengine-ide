import React from 'react'
import { Icon } from 'antd'
import { useDrag } from 'react-dnd'
import { UINode } from 'uiengine'

import { DND_IDE_TYPE } from '../dnd'

const WidgetItem = (props: any) => {
  const { title, component, defaultProps = {} } = props

  // stimulate a ui node
  const tempSchema = {
    component,
    content: defaultProps.content,
    props: defaultProps
  }
  console.log(tempSchema)
  const uinode = new UINode(tempSchema)
  // console.log(props);
  console.log('uinode', uinode)
  const [, drag] = useDrag({ item: { type: DND_IDE_TYPE, uinode } })

  return (
    <div className="component" ref={drag}>
      <Icon type="swap" style={{ fontSize: '40px' }} />
      <span>{title}</span>
    </div>
  )
}

export const Widgets: React.FC<IWidgets> = props => {
  const { widgets } = props

  return (
    <div className="list">
      {widgets.map((item: any, key: number) => (
        <WidgetItem {...item} key={key} />
      ))}
    </div>
  )
}
