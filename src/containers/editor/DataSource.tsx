import * as React from 'react'
import * as _ from 'lodash'
import { Tree } from 'antd'
import { useDrag } from 'react-dnd'

import { DND_IDE_SCHEMA_TYPE } from '../../helpers'

export interface IDataSourceProps {
  getDataSource?: () => any
  expandDataSource?: (uiPath: string) => any
}

const WidgetItem = (props: any) => {
  const { title, component, defaultProps = {}, data } = props

  // stimulate a ui node
  const schema = {
    datasource: data.datasource
  }
  console.log('schema::::', schema)
  const [, drag] = useDrag({
    item: { type: DND_IDE_SCHEMA_TYPE, schema }
  })

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

  const onAddFields = async (dataRef: any) => {
    if (dataRef.type === 'file' && !dataRef.children) {
      const path: string = dataRef.uiJsonPath
      if (expandDataSource) {
        const source = await expandDataSource(path)
        dataRef.children = source
        setNodes([...nodes])
      }
    }
  }

  const onSelectNode = (selectedKeys: string[], e: any) => {
    const treeNode = e.node
    const dataRef = treeNode.props.dataRef
    if (dataRef.type === 'field') {
      return
    }
    onAddFields(dataRef)
  }

  const renderFieldNode = (item: any) => {
    return (
      <Tree.TreeNode
        dataRef={item}
        title={
          <>
            <span className="field-bar">F</span>
            <WidgetItem title={item.name} data={item} />
          </>
        }
        key={`subnode-${item.name}`}
      >
        {item.children ? renderNode(item.children) : null}
      </Tree.TreeNode>
    )
  }

  const renderFileNode = (item: any) => {
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
      </Tree.TreeNode>
    )
  }

  const renderNode = (data: any[]) => {
    return data.map((item: any) => {
      if (item.type === 'file') {
        return renderFileNode(item)
      }
      if (item.type === 'field') {
        return renderFieldNode(item)
      }
      return null
      // return (
      //   <Tree.TreeNode
      //     dataRef={item}
      //     title={
      //       <>
      //         <span className="file-bar">{_.toUpper(item.name)[0]}</span>
      //         {item.name}
      //       </>
      //     }
      //     key={`${item.name}___${item.uiJsonPath || ''}`}
      //   >
      //     {item.type === 'file' && item.children
      //       ? renderNode(item.children)
      //       : null}
      //     {item.type === 'field' && item.children
      //       ? renderFieldNode(item.children)
      //       : null}
      //   </Tree.TreeNode>
      // )
    })
  }
  return (
    <div className="manager-datasource">
      <Tree onSelect={onSelectNode}>{renderNode(nodes)}</Tree>
    </div>
  )
}

export default DataSource
