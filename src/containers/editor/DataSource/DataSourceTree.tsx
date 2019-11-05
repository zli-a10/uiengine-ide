import React, { useEffect, useCallback, useState, useContext } from 'react'
import * as _ from 'lodash'
import { useDrag } from 'react-dnd'
import { Tree } from 'antd'
import { GlobalContext } from '../../Context'
import { FileLoader, formatTree } from '../../../helpers'

// schemas fetch
const fileLoader = FileLoader.getInstance()

import {
  analysisDataSourceFields,
  analysisDataSource
} from '../../../helpers/DataSourceLoader'
import { DND_IDE_SCHEMA_TYPE, DND_IDE_NODE_TYPE } from '../../../helpers'

const getChildrenUiSchema = (data: any) => {
  const { type, children = [] } = data
  if (type !== 'file') {
    return []
  }
  return children.map((child: any) => {
    const { type, ...uiSchema } = child
    if (type === 'field') {
      return uiSchema
    }
    if (type === 'file') {
      const { component, props, datasource } = child
      return {
        component,
        props,
        datasource,
        children: getChildrenUiSchema(child)
      }
    }
  })
}

const WidgetItem = (props: any) => {
  const { title, data } = props
  // const dataSchema = data.uiSchema || data

  let dragObj,
    dragType = DND_IDE_NODE_TYPE
  if (data.type === 'file') {
    const { component, props } = data
    dragObj = {
      uinode: {
        schema: {
          component,
          props,
          children: getChildrenUiSchema(data)
        }
      }
    }
    // dragType = DND_IDE_NODE_TYPE;
  } else {
    dragObj = {
      uinode: { schema: data }
    }
    // const { datasource: { source } = {} as any } = data;
    // dragObj = { schema: { datasource: source } };
    // dragType = DND_IDE_SCHEMA_TYPE;
  }

  const [, drag] = useDrag({
    item: { type: dragType, ...dragObj }
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
  const data = useContext(GlobalContext)
  const { resourceTree: { datasource = [] } = {} } = data
  analysisDataSource(datasource)

  const [nodes, setNodes] = useState([] as any[])
  const [updateState, setUpdateState] = useState(new Date().getTime())
  const [saveSearchText, setSaveSearchText] = useState('')
  const { onChange, searchText } = props

  // const onAddFields = useCallback(
  //   async (dataRef: any) => {
  //     if (dataRef.type === 'file' && !dataRef.children) {
  //       const path: string = dataRef.uiJsonPath
  //       if (expandDataSource) {
  //         const source = await expandDataSource(path)
  //         dataRef.children = source
  //         setNodes([...nodes])
  //       }
  //     }
  //   },
  //   [nodes, expandDataSource]
  // )

  const onSelectNode = useCallback(
    (selectedKeys: string[], e: any) => {
      const treeNode = e.node
      const dataRef: any = treeNode.props.dataRef
      console.log(dataRef)
      const { files } = dataRef
      if (files && files.length === 1) {
        const [schemaJsonName] = files
        console.log(schemaJsonName)
        const schemaProsmise = fileLoader.loadFile(schemaJsonName, 'datasource')
        schemaProsmise.then((schema: any) => {
          const [sources, topUiSchema] = analysisDataSourceFields(schema)
          console.log(dataRef)
          dataRef.children = sources
          dataRef.uiSchema = topUiSchema
          setUpdateState(new Date().getTime())
        })
      }
    },
    [onChange]
  )

  console.log(datasource)

  useEffect(() => {
    const initDataSource = async () => {
      if (
        (nodes.length === 0 || saveSearchText !== searchText) &&
        datasource.length !== 0
      ) {
        setNodes((await analysisDataSource(datasource)) || [])
        setSaveSearchText(searchText as string)
      }
    }
    initDataSource()
  }, [nodes, searchText, saveSearchText, datasource])
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
            <WidgetItem title={item.name} data={item} />
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
