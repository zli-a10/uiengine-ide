import React, { useEffect, useCallback, useState, useContext } from 'react'
import * as _ from 'lodash'
import { TreeSelect, Input, Col, Button } from 'antd'
import { GlobalContext } from '../../../../Context'
import { getDatasourceFields, analysisDataSource } from '../../../../../helpers'

const renderNode = (data: any) => {
  const renderFieldNode = (item: any) => {
    return (
      <TreeSelect.TreeNode
        dataRef={item}
        isLeaf={true}
        title={
          <div className="datasource-select">
            <span className="field-bar">{_.toUpper(item.title)[0]}</span>
            {item.title}
          </div>
        }
        value={item.value}
        key={item.id}
      >
        {item.children ? renderNode(item.children) : null}
      </TreeSelect.TreeNode>
    )
  }

  const renderFileNode = (item: any) => {
    return (
      <TreeSelect.TreeNode
        dataRef={item}
        title={
          <div className="datasource-select">
            <span className="file-bar">{_.toUpper(item.title)[0]}</span>
            {item.title}
          </div>
        }
        value={item.value}
        key={item.id}
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
  }

  return data.map((item: any) => {
    if (item.type === 'file') {
      return renderFileNode(item)
    }
    if (item.type === 'field') {
      return renderFieldNode(item)
    }
    return null
  })
}

// schemas fetch
export const DataSourceSelector: React.FC<IDataSourceTreeProps> = (
  props: IDataSourceTreeProps
) => {
  const { onChange, value, disabled, multipleChecked = false } = props

  const data = useContext(GlobalContext)
  const { resourceTree: { datasource = [] } = {} } = data
  const [nodes, setNodes] = useState([] as any[])

  const onLoadData = useCallback(
    (treeNode: any) => {
      const fileName: any = _.get(treeNode, `props.dataRef.file`)
      if (fileName) {
        const fieldsPromise = getDatasourceFields(fileName)
        fieldsPromise.then((data: any) => {
          let children = _.get(treeNode, `props.dataRef.children`)
          if (children && _.isArray(data)) {
            children = _.concat(children, data)
          } else {
            children = data
          }
          _.set(treeNode, `props.dataRef.children`, children)
          const newNodes = _.clone(nodes)
          setNodes(newNodes)
        })
        return fieldsPromise
      }
      return new Promise((resolve: any) => {
        resolve()
      })
    },
    [nodes]
  )

  const [showInput, setShowInput] = useState(false)
  const switchEdit = useCallback(() => {
    setShowInput(!showInput)
  }, [showInput])

  const onChangeValue = useCallback(
    (value: string) => {
      if (onChange) onChange(value)
    },
    [onChange]
  )

  useEffect(() => {
    const initDataSource = async () => {
      if (nodes.length === 0 && datasource.length !== 0) {
        const loadedNodes = (await analysisDataSource(datasource)) || []
        setNodes(loadedNodes)
      }
    }
    initDataSource()
  }, [nodes, datasource])

  return (
    <div className="datasource-select">
      <Col span={20}>
        {showInput ? (
          <Input
            {...(value ? { value } : {})}
            disabled={disabled}
            onChange={(e: any) => {
              onChangeValue(e.target.value)
            }}
          />
        ) : (
            <TreeSelect
              dropdownClassName="cancel-drag"
              disabled={disabled}
              treeCheckable={multipleChecked}
              allowClear
              {...(value ? { value } : {})}
              showSearch
              onChange={(value: any) => onChangeValue(value)}
              loadData={onLoadData}
              size="small"
            >
              {renderNode(nodes)}
            </TreeSelect>
          )}
      </Col>
      <Col span={4}>
        <Button
          type="primary"
          size="small"
          icon={showInput ? 'search' : 'edit'}
          onClick={switchEdit}
        />
      </Col>
    </div>
  )
}
