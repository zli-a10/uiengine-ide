import _ from 'lodash'
import { Client } from '../Client'

export async function changeApiHost(host: string) {
  const command: IWebsocketCommands = {
    name: 'changeApiHost',
    options: { host }
  }
  return await Client.connect(command)
}
