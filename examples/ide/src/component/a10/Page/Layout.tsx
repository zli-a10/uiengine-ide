import React from 'react'
import { Layout } from 'antd'
import _ from 'lodash'

class LayoutComponent extends React.Component<any, any> {
  render() {
    const { children } = this.props
    return <Layout>{children}</Layout>
  }
}

export default LayoutComponent
