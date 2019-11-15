import { ICommandOptions } from './file'
import { get } from 'lodash'
const fs = require('fs')

/**
 * Used for Debugger
 * @param options {"name": "changeApiHost", "options":{ host: "192.168.x.x" }}
 */
export function changeApiHost(options: ICommandOptions) {
  try {
    const hostConfigPath = './src/config/host.js'
    const result = require(hostConfigPath)
    result.apiServer = get(options, 'host')
    const exportStr = `module.exports = ${JSON.stringify(result)}`
    fs.writeFileSync(hostConfigPath, exportStr, 'utf8')
    console.log('set host success', exportStr)
  } catch (e) {
    console.log(e.message)
    return []
  }
}
