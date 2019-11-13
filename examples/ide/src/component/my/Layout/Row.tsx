import React from 'react'
import classNames from 'classnames'

const RowComponent = (props: any) => {
  const { style, children, className } = props
  const cls = classNames({
    'my-wrapper-row': true,
    ...className
  })
  return (
    <div className={cls} style={{ display: 'flex', ...style }}>
      {children}
    </div>
  )
}

export default RowComponent
