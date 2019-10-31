import _ from 'lodash'
import { Client } from '../Client'
import { IObject } from 'uiengine/typings'

export async function getFileList(
  type: EResourceType,
  isTemplate: boolean = false,
  folderOnly: boolean = false
) {
  const command: IWebsocketCommands = {
    name: 'getFileList',
    options: { type, isTemplate, folderOnly }
  }
  return await Client.connect(command)
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

  return await Client.connect(command)
}

export function saveFile(fileOptions: IUploadFile) {
  const command: IWebsocketCommands = {
    name: 'writeFile',
    options: fileOptions
  }
  return Client.connect(command)
}

export async function loadDataSource(options: IObject) {
  const command: IWebsocketCommands = {
    name: 'loadDataSource',
    options: {
      type: 'datasource',
      options
    }
  }
  return await Client.connect(command)
}
