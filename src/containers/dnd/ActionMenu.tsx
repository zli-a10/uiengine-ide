import React, { useCallback, useContext } from 'react'
import _ from 'lodash'
import { Menu, Dropdown, Icon } from 'antd'
import { DndNodeManager, getActiveUINode } from '../../helpers'
const dndNodeManager = DndNodeManager.getInstance()
import { Context } from '../editor/Context'
import { UINode } from 'uiengine'

const ActionMenu = (props: any) => {
  const { updateInfo, focusMode = {} as any, updateFocusMode } = useContext(
    Context
  )
  const { children, uinode } = props
  // const [isFocus, setFocus] = useState(false)
  const { isFocus, topSchema } = focusMode
  // const {SubMenu} = Menu;
  const deleteNode = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation()
      await dndNodeManager.delete(uinode)
      updateInfo({ schema: uinode.schema })
    },
    [uinode]
  )

  const unWrapNode = useCallback(
    async (e: any) => {
      e.domEvent.stopPropagation()
      await dndNodeManager.removeWrappers(uinode)
      updateInfo({ schema: uinode.schema })
    },
    [uinode]
  )

  const focusCurrent = async (e: any) => {
    const currentIsFocus = !isFocus
    // setFocus(currentIsFocus)
    updateFocusMode({
      isFocus: currentIsFocus,
      topSchema: currentIsFocus ? _.cloneDeep(getActiveUINode(true)) : undefined
    })
    e.domEvent.stopPropagation()
    const rootNode = getActiveUINode()
    if (rootNode instanceof UINode) {
      rootNode.schema = currentIsFocus ? uinode.schema : topSchema
      await rootNode.updateLayout()
      rootNode.sendMessage(true)
    }
  }
  const menu = (
    <Menu>
      <Menu.Item key="unit-focus" onClick={focusCurrent}>
        {isFocus ? (
          <a target="_blank">
            <Icon type="border-outer" />
            Blur
          </a>
        ) : (
          <a target="_blank">
            <Icon type="border-inner" />
            Focus
          </a>
        )}
      </Menu.Item>
      <Menu.Item key="unit-unwrapper" onClick={unWrapNode}>
        <a target="_blank">
          <Icon type="menu-fold" />
          Remove Layout Wrappers
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="unit-delete" onClick={deleteNode}>
        <a target="_blank">
          <Icon type="delete" /> Delete
        </a>
      </Menu.Item>
    </Menu>
  )

  return <Dropdown overlay={menu}>{children}</Dropdown>
}

export default ActionMenu
