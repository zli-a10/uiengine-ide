import React, { useEffect, useCallback, useState } from 'react'
import * as _ from 'lodash'
import { useDrag } from 'react-dnd'
import { Tree } from 'antd'

import { Context } from '../Context'
import { DND_IDE_SCHEMA_TYPE } from '../../../helpers'

export interface IDataSourceTreeProps {
  searchText?: string
  onChange?: (value: any) => void
}

const WidgetItem = (props: any) => {
  const { title, data } = props

  const [, drag] = useDrag({
    item: { type: DND_IDE_SCHEMA_TYPE, schema: data.uiSchema }
  })

  return (
    <span ref={drag}>
      <span>{title}</span>
    </span>
  )
}

const DataSourceTree: React.FC<IDataSourceTreeProps> = (
  props: IDataSourceTreeProps
) => {
  const {
    dataSourceProps: { getDataSource, expandDataSource } = {} as any
  } = React.useContext(Context)
  const [nodes, setNodes] = useState([] as any[])
  const [saveSearchText, setSaveSearchText] = useState('')
  const { onChange, searchText } = props

  const onAddFields = useCallback(
    async (dataRef: any) => {
      if (dataRef.type === 'file' && !dataRef.children) {
        const path: string = dataRef.uiJsonPath
        if (expandDataSource) {
          const source = await expandDataSource(path)
          dataRef.children = source
          setNodes([...nodes])
        }
      }
    },
    [nodes, expandDataSource]
  )

  const onSelectNode = useCallback(
    (selectedKeys: string[], e: any) => {
      const treeNode = e.node
      const dataRef: any = treeNode.props.dataRef
      if (onChange) {
        onChange(dataRef)
      }
      if (dataRef.type === 'field') {
        return
      }
      onAddFields(dataRef)
    },
    [onChange, onAddFields]
  )

  useEffect(() => {
    const initDataSource = async () => {
      if (
        (nodes.length === 0 && getDataSource) ||
        saveSearchText !== searchText
      ) {
        setNodes((await getDataSource(searchText)) || [])
        setSaveSearchText(searchText as string)
      }
    }
    initDataSource()
  }, [nodes, searchText, getDataSource, saveSearchText])
  const renderFieldNode = useCallback((item: any) => {
    return (
      <Tree.TreeNode
        dataRef={item}
        title={
          <>
            <span className="field-bar">{item.children ? 'Fs' : 'F'}</span>
            <WidgetItem title={item.name} data={item} />
          </>
        }
        key={`subnode-${item.name}`}
      >
        {item.children ? renderNode(item.children) : null}
      </Tree.TreeNode>
    )
  }, [])

  const renderFileNode = useCallback((item: any) => {
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
  }, [])
  const renderNode = useCallback((data: any[]) => {
    return data.map((item: any) => {
      if (item.type === 'file') {
        return renderFileNode(item)
      }
      if (item.type === 'field') {
        return renderFieldNode(item)
      }
      return null
    })
  }, [])
  return <Tree onSelect={onSelectNode}>{renderNode(nodes)}</Tree>
}

export default DataSourceTree
