import * as commands from './commands'
import { isFunction } from 'lodash'

export default class Commander {
  static async executeCommand(command: any) {
    try {
      const { name, options } = command
      const callback = (commands as any)[name]
      if (isFunction(callback)) {
        // client side should have same name command
        const value = await callback(options)
        let result: any
        if (typeof value !== 'string') {
          result = { command, value: await callback(options) }
        } else {
          result = { command, value }
        }
        return JSON.stringify(result)
      }
    } catch (e) {
      console.log(e.message)
      return
    }
  }
}
