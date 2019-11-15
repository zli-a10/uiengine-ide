import React, { useContext } from 'react'
import _ from 'lodash'
import useTableElement from './createElement'

const Td = (props: any) => {
  let {
    children,
    value,
    colSpan,
    rowData,
    colCount = 1,
    mainRow,
    ...rest
  } = props
  const TD = useTableElement('td')

  return (
    <TD className="my-table-col" {...rest} colSpan={colSpan || colCount}>
      {_.isArray(children)
        ? children.map((child: any) => {
            return React.cloneElement(child, {
              rowData
            })
          })
        : children || value}
    </TD>
  )
}

export default Td
