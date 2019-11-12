interface IComponentContext {
  [name: string]: any
}

interface IStateInfo {
  [name: string]: any
}

interface IReducerAction {
  name: string
  params?: any
}

declare const Actions: ['set']
