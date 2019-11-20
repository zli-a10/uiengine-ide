import React from 'react'
import _ from 'lodash'
import useTableElement from './createElement'

const TFooter = (props: any) => {
  let { children, ...rest } = props
  const TFoot = useTableElement('tfoot')
  return <TFoot className="my-table-footer">{children}</TFoot>
}

export default TFooter
