interface IPropInfo {
  schema?: ILayoutSchema
  debug?: any
  [name: string]: any
}

interface IIDEContext {
  preview: boolean
  togglePreview(preview: boolean)
  info: IPropInfo
  updateInfo(info: IPropInfo)
  theme: string
  toggleTheme(theme: string)
  propsCollapsed
  toggleCollapsed(propsCollapsed: boolean)
  dataSourceProps: any
  [name]: any
}

interface IIDEEditor {
  children?: ReactNode
  layouts: [string]
  config: object
  manangerProps: {
    getDataSource?: () => any
    expandDataSource?: (uiPath: string) => any
  }
}

interface IPropManager {
  onClose: () => any
}

interface IManager {
  onClose: () => any
}

interface IWidgets {
  widgets: IWidget[]
}

interface ILayoutManager {
  layout: string
}

interface ITree {
  tree: any
}

interface ITreeState {
  expandKeys: string[]
  date: number
  autoExpandParent: boolean
  [name: string]: any
}

interface IComponents {
  list: any
}

interface IWidget {
  widget: any
}

interface IMenuTitle {
  dataRef: any
}
