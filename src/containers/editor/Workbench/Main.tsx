import React, {
  useCallback,
  useState,
  useMemo,
  useContext,
  useEffect
} from 'react'

import { Switch, Icon, Modal } from 'antd'
import { UINode } from 'uiengine'
import _ from 'lodash'
import { GlobalContext, SchemasContext, IDEEditorContext } from '../../Context'
import {
  getActiveUINode,
  FileLoader,
  saveFile,
  saveFileStatus,
  cleanSchema,
  MemoStore,
  WebsocketClient
} from '../../../helpers'
import { StagingFileTree } from './StagingFileTree'

export const Main = (props: any) => {
  const { activeTab } = useContext(IDEEditorContext)
  const { refresh, toggleRefresh } = useContext(SchemasContext)

  // header collpase state
  const [headerCollapsed, setHeaderCollapse] = useState(
    localStorage.ideHeaderCollapse === 'true'
  )
  const toggleHeaderCollapse = useCallback((status: boolean) => {
    setHeaderCollapse(status)
    localStorage.ideHeaderCollapse = status
  }, [])

  // component collapse state
  const [componentCollapsed, setComponentCollapse] = useState(
    localStorage.ideComponentCollapse === 'true'
  )

  const toggleComponentCollapse = useCallback((status: boolean) => {
    setComponentCollapse(status)
    localStorage.ideComponentCollapse = status
  }, [])

  // props collapse state
  const [propsCollapsed, setPropsCollapse] = useState(
    localStorage.idePropsCollapse === 'true'
  )
  const togglePropsCollapse = useCallback((status: boolean) => {
    setPropsCollapse(status)
    localStorage.idePropsCollapse = status
  }, [])

  // preview collaspse state
  const [preview, setPreview] = useState(false)
  const switchPreview = async (status: boolean) => {
    MemoStore.bucket.preview = status
    const rootNode = getActiveUINode() as UINode
    await rootNode.updateLayout()
    rootNode.sendMessage(true)
    setPreview(status)
    activeTab('drawingboard')
  }

  const [resourceTree, setResourceTree] = useState({
    listener: [],
    plugin: [],
    component: [],
    schema: []
  })

  const [fileStatus, setFileStatus] = useState()
  const saveOpenFileStatus = useCallback((statusObj: IFileStatusGroup) => {
    // setFileStatus(statusObj);
    const { file, type, status } = statusObj
    saveFileStatus(file, type, status)
  }, [])

  const contextValue = useMemo<IGlobalContext>(
    () => ({
      ideMode: true,
      preview,
      togglePreview: (preview: boolean) => {
        switchPreview(preview)
      },
      saved: false,
      theme: '',
      toggleTheme: (theme: string) => {},
      propsCollapsed,
      togglePropsCollapsed: (collapsed: boolean) => {
        togglePropsCollapse(collapsed)
      },
      headerCollapsed,
      toggleHeaderCollapsed: (collapsed: boolean) => {
        toggleHeaderCollapse(collapsed)
      },
      componentCollapsed,
      toggleComponentCollapsed: (collapsed: boolean) => {
        toggleComponentCollapse(collapsed)
      },
      resourceTree,
      setResourceTree: (tree: any, type?: EResourceType) => {
        let copyTree: any = _.clone(resourceTree)
        if (_.isArray(tree) && type) {
          copyTree[type] = tree
        } else if (_.isObject(tree)) {
          copyTree = _.assign(copyTree, tree)
        }
        setResourceTree(copyTree)
      },
      fileStatus,
      setFileStatus: (status: IFileStatusGroup) => {
        saveOpenFileStatus(status)
      }
    }),
    [
      headerCollapsed,
      propsCollapsed,
      componentCollapsed,
      preview,
      resourceTree,
      fileStatus
    ]
  )

  const hideAll = useCallback(() => {
    toggleComponentCollapse(true)
    togglePropsCollapse(true)
    toggleHeaderCollapse(true)
  }, [])

  const showAll = useCallback(() => {
    toggleComponentCollapse(false)
    togglePropsCollapse(false)
    toggleHeaderCollapse(false)
  }, [])

  // file save window
  const [visible, changeVisible] = useState(false)
  const [files, setFiles] = useState([])
  const searchNode = useCallback(
    (file: string, nodeTree: IResourceTreeNode): any => {
      let node = {} as IResourceTreeNode
      if (nodeTree && _.isObject(nodeTree)) {
        if (nodeTree.key === file) {
          node = nodeTree
        } else if (nodeTree.children && nodeTree.children.length) {
          nodeTree.children.forEach((item: IResourceTreeNode) => {
            let findNode = searchNode(file, item)
            if (!_.isEmpty(findNode)) {
              node = findNode
            }
          })
        }
      }
      return node
    },
    []
  )
  const removeNodeFromResourceTree = useCallback(
    (file: string, type: string) => {
      let data: IResourceTreeNode
      let updatedTree: any = _.clone(resourceTree)
      if (type === 'schema') {
        data = _.get(updatedTree, `${type}[1]`)
      } else {
        data = _.get(updatedTree, type)
      }
      let targetNode = searchNode(file, data)
      const srcNodes = _.get(targetNode, `_parent_.children`, [])
      _.remove(srcNodes, (d: any) => {
        return d.key === targetNode.key
      })
      setResourceTree(updatedTree)
    },
    []
  )
  const handleOk = useCallback(() => {
    // save files using sockets
    const fileLoader = FileLoader.getInstance()
    files.forEach(async (statusNode: IUploadFile) => {
      const { path, type, status } = statusNode
      if (
        status &&
        (status.status === 'removed' || status.status === 'renamed')
      ) {
        await saveFile(statusNode)
        // update file status
        fileLoader.removeFile(path, type)
      } else {
        let data = await fileLoader.loadFile(path, type)
        if (type === 'schema') data = cleanSchema(data)
        statusNode.data = data
        await saveFile(statusNode)
      }
      // update file status
      let updatedStatus = _.cloneDeep(status)
      updatedStatus.status = 'dropped'
      saveOpenFileStatus({ file: path, type, status: updatedStatus })
      // remove node from resource tree
      removeNodeFromResourceTree(path, type)
      toggleRefresh()
    })

    changeVisible(false)
  }, [files])

  const handleCancel = useCallback((e: any) => {
    changeVisible(false)
  }, [])

  const showSaveWindow = useCallback((e: any) => {
    changeVisible(true)
  }, [])

  const onCheckFiles = useCallback((files: any) => {
    console.log(files, 'files...')
    setFiles(files)
  }, [])

  useEffect(() => {
    const websocket = WebsocketClient.getInstance()
    websocket.listen().then((response: any) => {
      console.log(response)
    })
  }, [resourceTree])
<<<<<<< HEAD

  useEffect(() => {
    const ideEditor: any = document.getElementById('ide-editor')
    if (headerCollapsed) {
      ideEditor.style.height = '100%'
    } else {
      ideEditor.style.height = 'calc(100% - 60px)'
    }
  }, [headerCollapsed])
=======
>>>>>>> 122517598bc1947b7e0d9b1cc2cc261005436a12

  return (
    <GlobalContext.Provider value={contextValue}>
      {headerCollapsed ? (
        <a className="ide-show" onClick={showAll}>
          <Icon type="caret-right" />
        </a>
      ) : null}
      <div className={headerCollapsed ? 'ide-header hide' : 'ide-header'}>
        <div className="left">
          <div className="button-close">
            <Icon type="close" onClick={hideAll} />
          </div>
          <SchemasContext.Consumer>
            {({ savedTime, editingResource }) => (
              <>
                <a
                  className="button-menu"
                  onClick={() => toggleComponentCollapse(!componentCollapsed)}
                >
                  <Icon type="menu" /> Editing{' '}
                  {_.get(editingResource, 'title', '...')}
                </a>
                {savedTime ? (
                  <div className="page-name">
                    <em>(Last Saved: {savedTime})</em>
                  </div>
                ) : null}
                <Modal
                  title="Choose Saving Files"
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <StagingFileTree onChange={onCheckFiles} refresh={refresh} />
                </Modal>
              </>
            )}
          </SchemasContext.Consumer>
        </div>
        <div className="right">
          <div className="props">
            <Switch
              checked={preview}
              checkedChildren="Preview"
              unCheckedChildren="Edit"
              onChange={() => switchPreview(!preview)}
            />
            <a
              className="settings"
              onClick={() => togglePropsCollapse(!propsCollapsed)}
            >
              <Icon type="setting" />
            </a>
            <a className="save" onClick={showSaveWindow}>
              <Icon type="save" />
            </a>
          </div>

          <div className="brand">UIEngine</div>
        </div>
      </div>

      {props.children}
    </GlobalContext.Provider>
  )
}
