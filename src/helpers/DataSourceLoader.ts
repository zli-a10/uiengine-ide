import * as commands from './websocket'
import { IObject } from 'uiengine/typings'

export const loadDataSource = async (options: IObject = {}) => {
  return (await commands.loadDataSource(options)) as IObject[]
}
