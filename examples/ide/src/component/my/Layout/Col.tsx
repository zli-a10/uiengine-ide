import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'

const ColComponent = (props: any) => {
  const { children, className, uinode } = props
  const flex = _.get(props, 'style.flex', 1)
  console.log(flex, 'flex....', uinode.schema)
  const cls = classNames({
    'ide-wrapper-col': true,
    ...className
  })
  return (
    <div className={cls} style={{ display: 'flex', flex }}>
      {children}
    </div>
  )
}

export default ColComponent
