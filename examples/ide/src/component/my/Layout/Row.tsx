import React from 'react'
import classNames from 'classnames'

const RowComponent = (props: any) => {
  const { flex = 1, children, className } = props
  const cls = classNames({
    'ide-wrapper-row': true,
    ...className
  })
  return (
    <div className={cls} style={{ display: 'flex', flex }}>
      {children}
    </div>
  )
}

export default RowComponent
