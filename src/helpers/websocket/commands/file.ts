import _ from 'lodash'
import { WebsocketClient } from '../WebsocketClient'

export async function getFileList(
  type: EResourceType,
  isTemplate: boolean = false,
  folderOnly: boolean = false
) {
  const command: IWebsocketCommands = {
    name: 'getFileList',
    options: { type, isTemplate, folderOnly }
  }
  const socketClient = WebsocketClient.getInstance()
  const result = await socketClient.send(command)
  return result
}

export async function readFile(
  type: EResourceType,
  name: string,
  isTemplate: boolean = false
) {
  const command: IWebsocketCommands = {
    name: 'readFile',
    options: { type, path: name, isTemplate }
  }
  const socketClient = WebsocketClient.getInstance()
  const result = await socketClient.send(command)
  return result
}

export function saveFile(fileOptions: IUploadFile) {
  const command: IWebsocketCommands = {
    name: 'writeFile',
    options: fileOptions
  }
  const socketClient = WebsocketClient.getInstance()
  socketClient.send(command)
}

export async function getDatasourceFields(fileName: string) {
  const command: IWebsocketCommands = {
    name: 'getDataFields',
    options: {
      type: 'datasource',
      path: fileName
    }
  }
  const socketClient = WebsocketClient.getInstance()
  const result = await socketClient.send(command)
  return result
}
