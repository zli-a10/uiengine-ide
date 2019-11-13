import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'

const ColComponent = (props: any) => {
  const { style, children, className, uinode } = props
  const flex = _.get(props, 'style.flex', 1)
  const cls = classNames({
    'my-wrapper-col': true,
    ...className
  })
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  )
}

export default ColComponent
