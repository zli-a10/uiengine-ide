import _ from 'lodash'

export function set(info: any, params: any) {
  return _.merge(info, params)
}
