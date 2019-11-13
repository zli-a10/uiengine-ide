import React from 'react'
import { Layout } from 'antd'
import _ from 'lodash'
import LayoutComponent from './Layout'
import HeaderComponent from './Header'
import ContentComponent from './Content'
import BreadcrumbComponent from './Breadcrumb'
import MenuComponent from './Menu'
import FooterComponent from './Footer'
import Provider from '../../my/Context/Provider'

class PageComponent extends React.Component<any, any> {
  render() {
    const { children } = this.props
    return (
      <Provider>
        <LayoutComponent>
          <HeaderComponent />
          <MenuComponent />
          <BreadcrumbComponent />
          <ContentComponent>{children}</ContentComponent>
          <FooterComponent />
        </LayoutComponent>
      </Provider>
    )
  }
}

export default PageComponent
