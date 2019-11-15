interface IConfigWrappers {
  row: any
  col: any
}

interface IHistory {
  version: string
  schema: ILayoutSchema
}

interface IVersionControl {
  histories: Array<IHistory>
  push(schema: ILayoutSchema)
  redo()
  undo()
  clearHistories()
}

interface DragItem {
  uinode?: IUINode
  type: string
  schema?: ILayoutSchema
}

interface IDndNodeManager {
  layoutWrappers: IConfigWrappers
  sourceNode?: IUINode
  sourceIndex: number = -1
  sourceSchema: ILayoutSchema = {}
  sourceChildrenSchema: Array<ILayoutSchema> = []
  sourceParent?: IUINode
  sourceParentSchema: ILayoutSchema = {}
  sourceParentChildrenSchema: Array<ILayoutSchema> = []

  targetNode?: IUINode
  targetIndex: number = -1
  targetSchema: ILayoutSchema = {}
  targetChildrenSchema: Array<ILayoutSchema> = []
  targetParent?: IUINode
  targetParentSchema: ILayoutSchema = {}
  targetParentChildrenSchema: Array<ILayoutSchema> = []

  pushVersion()
  canDrop(sourceNode: IUINode, targetNode: IUINode)
  canDropInCenter(targetNode: IUINode)
  insertCenter(sourceNode: IUINode, targetNode: IUINode)

  insertLeft(
    sourceNode: IUINode,
    targetNode: IUINode,
    wrappers?: IConfigWrappers
  )

  insertRight(
    sourceNode: IUINode,
    targetNode: IUINode,
    wrappers?: IConfigWrappers
  )

  insertUp(sourceNode: IUINode, targetNode: IUINode)

  insertDown(sourceNode: IUINode, targetNode: IUINode)

  delete(sourceNode: IUINode)
  useSchema(targetNode: IUINode, schema: ILayoutSchema)
  cleanLayout(sourceNode: IUINode)
  removeWrappers(sourceNode: IUINode)
}

// component schema for libraries
interface IComponentInfo {
  component: string // component name generally
  title: string //"Widgets",
  schema: ILayoutSchema
  url?: string
  library?: string
  version?: string
  preview?: string //'xx.png'
  icon?: string
  [name: string]: any
}

interface IComponentInfoGroup {
  id: string
  children: Array<IComponentInfo>
  [name: string]: any
  version?: string
  title?: string
}

interface ICommandOutput {
  status: number
  output: any
}

// define component schema for IDE editing
interface IComponentSchema {
  type?: string // component type, corresponds to PropItems/*
  section?: string // data section, like prop, corresponds to helpers/schemaGenerators
  [name: string]: any // schema name
  default?: any // default value
  options?: Array<number | string> // enum items
  range?: Array<number> // range items
}
