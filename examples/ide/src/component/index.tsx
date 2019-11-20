import { IDERegister } from 'uiengine-ide'
import { myInfo, antdInfo, A10Info } from './schemas'
import 'antd/dist/antd.css'
import * as antd from 'antd'
import * as my from './my'
import * as a10 from './a10'
import './schemas'

export * from './ProductWrapper'
IDERegister.registerComponentsInfo(A10Info)
IDERegister.registerComponentsInfo(myInfo)
IDERegister.registerComponentsInfo(antdInfo)

export default {
  antd,
  my,
  a10
}
