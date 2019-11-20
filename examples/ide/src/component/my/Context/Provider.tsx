import React, { createContext, useReducer } from 'react'
import _ from 'lodash'
import * as reducerActions from './reducers'

export const MyContext = createContext<IComponentContext>({})

const ProviderComponent = (props: any) => {
  const { children, state } = props

  const actions: any = reducerActions
  let allState: IStateInfo = {}
  if (typeof state === 'string') {
    try {
      allState = JSON.parse(state)
    } catch {
      allState = {}
    }
  }
  const [data, dispatch] = useReducer(
    (state: IStateInfo, action: IReducerAction | string) => {
      let name: string = 'set'
      let params
      if (typeof action === 'string') {
        name = action
      } else {
        name = action.name
        params = action.params
      }

      let result: any
      if (_.isFunction(actions[name])) {
        result = actions[name](state, params)
      }
      return _.clone(result)
    },
    allState
  )

  return (
    <MyContext.Provider value={{ data, dispatch }}>
      {children}
    </MyContext.Provider>
  )
}

export default ProviderComponent
