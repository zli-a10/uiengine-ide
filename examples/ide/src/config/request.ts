import { dev, apiServer } from './host'

const reqConfig: any = {
  // axios config
  baseURL: `http://${dev}:3000/`,
  timeout: 1000,
  apiServer,

  // customize config
  devMode: false,
  dataSchemaPrefix: 'schema/data/',
  dataPathPrefix: '',
  layoutSchemaPrefix: 'schema/ui/',
  headers: {}
}

export default reqConfig
