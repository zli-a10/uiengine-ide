interface IErrorBoundaryProps {}

interface IErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface IPropInfo {
  schema?: ILayoutSchema
  debug?: any
  [name: string]: any
}

interface IIDEEditor {
  children?: ReactNode
  layouts: [string]
  config: object
}

interface IPropManager {}

interface IDesignManager {}

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
