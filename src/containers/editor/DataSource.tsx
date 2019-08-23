import * as React from 'react'
import * as _ from 'lodash'
import { Tree } from 'antd'
import { useDrag } from 'react-dnd'
import { UINode } from 'uiengine'

import { DND_IDE_TYPE } from '../dnd'

import { setServers } from 'dns'
import { setComponentState } from 'uiengine'

export interface IDataSourceProps {
  getDataSource?: () => any
  expandDataSource?: (uiPath: string) => any
}

const WidgetItem = (props: any) => {
  const { title, component, defaultProps = {} } = props

  // stimulate a ui node
  const tempSchema = {
    component,
    content: defaultProps.content,
    props: defaultProps
  }
  const uinode = new UINode(tempSchema)
  // console.log(props);
  console.log('uinode', uinode)
  const [, drag] = useDrag({ item: { type: DND_IDE_TYPE, uinode } })

  return (
    <span ref={drag}>
      <span>{title}</span>
    </span>
  )
}

const DataSource: React.FC<IDataSourceProps> = (props: IDataSourceProps) => {
  const { getDataSource, expandDataSource } = props
  const [nodes, setNodes] = React.useState([] as any[])
  if (nodes.length === 0 && getDataSource) {
    setNodes(getDataSource() || [])
  }
  const clickNode = (node: any) => {
    // onClickNode(node)
  }

  const onAddFields = async (dataRef: any) => {
    if (dataRef.uiJsonPath && !dataRef.children && !dataRef.fields) {
      const path: string = dataRef.uiJsonPath
      if (expandDataSource) {
        const schJson = await expandDataSource(path)
        dataRef.fields = (schJson || {}).fields
        setNodes([...nodes])
      }
    }
  }

  const onSelectNode = (selectedKeys: string[], e: any) => {
    // const selectedNode = _.first(selectedKeys) || ''
    // const nodeKeys = selectedNode.split('___')
    const treeNode = e.node
    const dataRef = treeNode.props.dataRef
    if (dataRef['cm-lineage']) {
      return
    }
    onAddFields(dataRef)
  }

  const renderFieldNode = (data: any[]) => {
    return data.map((item: any) => {
      return (
        <Tree.TreeNode
          dataRef={item}
          title={
            <>
              <span className="field-bar">F</span>
              <WidgetItem title={item.label} />
            </>
          }
          key={item['cm-lineage']}
        >
          {item.fields ? renderFieldNode(item.fields) : null}
        </Tree.TreeNode>
      )
    })
  }

  const renderNode = (data: any[]) => {
    return data.map((item: any) => {
      return (
        <Tree.TreeNode
          dataRef={item}
          title={
            <>
              <span className="file-bar">{_.toUpper(item.name)[0]}</span>
              {item.name}
            </>
          }
          key={`${item.name}___${item.uiJsonPath || ''}`}
        >
          {item.children ? renderNode(item.children) : null}
          {item.fields ? renderFieldNode(item.fields) : null}
        </Tree.TreeNode>
      )
    })
  }
  return (
    <div className="manager-datasource">
      <Tree onSelect={onSelectNode}>{renderNode(nodes)}</Tree>
    </div>
  )
}

export default DataSource
