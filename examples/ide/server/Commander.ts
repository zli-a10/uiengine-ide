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
<<<<<<< HEAD
          result = await callback(options)
        } else {
          result = value
=======
          result = { command, value: await callback(options) }
        } else {
          result = { command, value }
>>>>>>> 122517598bc1947b7e0d9b1cc2cc261005436a12
        }
        return JSON.stringify(result)
      }
    } catch (e) {
      console.log(e.message)
      return
    }
  }
}
