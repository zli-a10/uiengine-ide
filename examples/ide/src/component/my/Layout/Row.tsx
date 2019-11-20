import React from 'react'
import classNames from 'classnames'

const RowComponent = (props: any) => {
  const { style, children, className } = props
  const cls = classNames({
    'my-wrapper-row': true,
    ...className
  })
  return children ? (
    <div className={cls} style={{ display: 'flex', ...style }}>
      {children}
    </div>
  ) : null
}

export default RowComponent
