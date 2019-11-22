import React, { useCallback, useEffect, useContext, useMemo } from 'react'
import _ from 'lodash'
import { UIEngine, UIEngineRegister } from 'uiengine'
import { UIEngineDndWrapper } from '../../dnd'
import { GlobalContext, SchemasContext, IDEEditorContext } from '../../Context'
import { VersionControl, useDeleteNode, useCloneNode } from '../../../helpers'
import * as plugins from '../../../helpers/plugins'

UIEngineRegister.registerPlugins(plugins)

export const DrawingBoard: React.FC = (props: any) => {
  const {
    preview,
    togglePropsCollapsed,
    componentCollapsed,
    toggleComponentCollapsed
  } = useContext(GlobalContext)
  const { updateSchema } = useContext(SchemasContext)
  const { editNode } = useContext(IDEEditorContext)
  const { layouts, config = {} } = props
  const schemas = layouts
  schemas[0].id = 'drawingboard'

  let productWrapper = useMemo(
    () => _.get(config, `widgetConfig.componentWrapper`),
    []
  )
  const newConfig = _.cloneDeep(config)
  if (!preview) {
    _.set(newConfig, `widgetConfig.componentWrapper`, UIEngineDndWrapper)
    _.set(newConfig, `ideMode`, true)
  } else {
    _.set(newConfig, `widgetConfig.componentWrapper`, productWrapper)
    _.set(newConfig, `ideMode`, false)
  }

  let deleteEditNode = useDeleteNode(editNode)
  let cloneEditNode = useCloneNode(editNode)

  // _.set(config, `widgetConfig.uiengineWrapper`, UIEngineDndProvider);
  const keyPressActions = useCallback(
    async (e: any) => {
      const versionControl = VersionControl.getInstance()
      if (e.ctrlKey && e.code === 'KeyZ') {
        const schema = await versionControl.undo()
        updateSchema({ schema })
      }

      if (e.ctrlKey && e.shiftKey && e.code === 'KeyZ') {
        const schema = await versionControl.redo()
        updateSchema({ schema })
      }

      // duplicate | delete
      const keyMap = {
        KeyD: 'down',
        KeyU: 'up',
        KeyL: 'left',
        KeyR: 'right'
      }
      if (editNode && e.target.localName === 'body') {
        e.preventDefault()
        // dup: Bug: ^D  will recover downwards elements
        if (e.ctrlKey && keyMap[e.code] && editNode) {
          cloneEditNode(keyMap[e.code])()
        } else if (e.key === 'Delete' || (e.code === 'KeyD' && !preview)) {
          // delete
          deleteEditNode()
        }
        return false
      }
    },
    [editNode]
  )

  let activeTab = JSON.parse(localStorage.cachedActiveTab || '{}')
  if (!_.isEmpty(activeTab)) {
    schemas[0].layout = activeTab.isTemplate ? 'schema/templates/ui/' + activeTab.tabName : 'schema/ui/' + activeTab.tabName
  }
  useEffect(() => {
    // Update the document title using the browser API
    window.onkeydown = keyPressActions
    // const drawingboard = document.getElementById("drawingboard");
    // if (drawingboard) {
    //   drawingboard.ondblclick = (e: any) => {
    //     e.stopPropagation();
    //     toggleComponentCollapsed(!componentCollapsed);
    //     togglePropsCollapsed(!componentCollapsed);
    //   };
    // }
  }, [editNode, componentCollapsed])
  return (
    <div className="editor" id="drawingboard">
      <UIEngine layouts={schemas} config={newConfig} />
    </div>
  )
}
