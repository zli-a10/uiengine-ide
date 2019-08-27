import React, { useEffect, useCallback, useState } from 'react'
import * as _ from 'lodash'
import { useDrag } from 'react-dnd'
import { TreeSelect } from 'antd'

import { Context } from '../Context'
import { DND_IDE_SCHEMA_TYPE } from '../../../helpers'

export interface IDataSourceTreeProps {
  searchText?: string
  value?: string
  onChange?: (value: any) => void
}

const DataSourceTree: React.FC<IDataSourceTreeProps> = (
  props: IDataSourceTreeProps
) => {
  const {
    dataSourceProps: { getDataSource, expandDataSource } = {} as any
  } = React.useContext(Context)
  const [nodes, setNodes] = useState([] as any[])
  const [saveSearchText, setSaveSearchText] = useState('')
  const { onChange, searchText, value } = props

  const covertNodes = (nodes: any[], nodeKeys: string[] = []) => {
    return nodes.map((node: any) => {
      const newNodeKeys = _.cloneDeep(nodeKeys)
      if (node.type === 'field') {
        node.value = `${newNodeKeys.join('.')}:${node.name}`
      } else {
        node.value = `${newNodeKeys.join('.')}.${node.name}`
      }
      newNodeKeys.push(node.name)
      node.key = newNodeKeys.join('.')
      if (node.children) {
        node.children = covertNodes(node.children, newNodeKeys)
      }
      return node
    })
  }

  const onAddFields = useCallback(
    async (dataRef: any) => {
      if (dataRef.type === 'file' && !dataRef.children) {
        const path: string = dataRef.uiJsonPath
        if (expandDataSource) {
          const source = await expandDataSource(path)
          dataRef.children = source
          setNodes([...covertNodes(nodes)])
        }
      }
    },
    [nodes, expandDataSource]
  )

  const getExpandNode = useCallback(
    (expandedKeys: string[] = []) => {
      const getSelectedNode = (nodeList: any[], key: string) => {
        const selectedNode = nodeList.filter((node: any) => {
          return node.key === key
        })
        return _.first(selectedNode)
      }
      let checknodes = nodes
      let selectNode = undefined
      expandedKeys.map((key: string) => {
        const node = getSelectedNode(checknodes, key)
        if (node) {
          if (node.children) {
            checknodes = node.children
          }
          selectNode = node
        }
      })
      return selectNode
    },
    [nodes]
  )

  const onExpandNode = useCallback(
    (expandedKeys: string[]) => {
      const dataRef = getExpandNode(expandedKeys) || ({} as any)
      if (onChange) {
        onChange(dataRef)
      }
      if (dataRef.type === 'field') {
        return
      }
      onAddFields(dataRef)
    },
    [onChange, onAddFields, getExpandNode]
  )

  const onSelect = useCallback(
    (value: string) => {
      if (value && onChange && _.includes(value, ':')) {
        onChange(value)
      }
    },
    [onChange]
  )

  useEffect(() => {
    const initDataSource = async () => {
      if (
        (nodes.length === 0 && getDataSource) ||
        saveSearchText !== searchText
      ) {
        let newNodes = (await getDataSource(searchText)) || []
        newNodes = covertNodes(newNodes)
        setNodes(newNodes)
        setSaveSearchText(searchText as string)
      }
    }
    initDataSource()
  }, [nodes, searchText, getDataSource, saveSearchText])
  const renderFieldNode = useCallback((item: any) => {
    return (
      <TreeSelect.TreeNode
        // dataRef={item}
        title={
          <div className="manager-datasource">
            <span className="field-bar">{item.children ? 'Fs' : 'F'}</span>
            {item.name}
          </div>
        }
        value={item.value}
        key={item.key}
      >
        {item.children ? renderNode(item.children) : null}
      </TreeSelect.TreeNode>
    )
  }, [])

  const renderFileNode = useCallback((item: any) => {
    return (
      <TreeSelect.TreeNode
        // dataRef={item}
        title={
          <div className="manager-datasource">
            <span className="file-bar">{_.toUpper(item.name)[0]}</span>
            {item.name}
          </div>
        }
        value={item.value}
        key={item.key}
      >
        {item.children ? (
          renderNode(item.children)
        ) : (
          <TreeSelect.TreeNode
            title="Loading ..."
            value={_.uniqueId('loading')}
            key={_.uniqueId('loading')}
          />
        )}
      </TreeSelect.TreeNode>
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
  // onTreeExpand={onExpandNode}
  return (
    <div className="manager-datasource">
      <TreeSelect
        {...(value ? { value } : {})}
        showSearch={true}
        allowClear={true}
        multiple={true}
        onSelect={onSelect}
        // size="small"
      >
        {renderNode(nodes)}
      </TreeSelect>
    </div>
  )
}

export default DataSourceTree
