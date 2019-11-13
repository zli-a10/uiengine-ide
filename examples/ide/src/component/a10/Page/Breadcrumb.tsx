import React, { useCallback, useContext } from 'react'
import _ from 'lodash'
import { Breadcrumb, Row, Icon, Switch, Col } from 'antd'
import { MyContext } from '../../my/Context/Provider'

const { Item } = Breadcrumb
const BreadcrumbComponent = (props: any) => {
  const { data, dispatch } = useContext(MyContext)
  const onShowHelp = useCallback(
    (value: any) => {
      if (_.isFunction(dispatch)) {
        dispatch({ name: 'set', params: { showHelp: value } })
      } else {
        console.warn(
          'dispatch not a function, please use my:Provider as your top container to pass by your Context'
        )
      }
    },
    [dispatch]
  )

  return (
    <Row className="a10-breadCrumb-container flex-bar">
      <Col span={16}>
        <Breadcrumb className="a10-breadCrumb">
          <Item>
            <Icon className="breadCrumb-Icon" type="menu-unfold" />
            ADC > Create Virtual Server
          </Item>
        </Breadcrumb>
      </Col>

      <Col span={8} className="breadCrumb-switch">
        <Switch
          checkedChildren="Help"
          unCheckedChildren="Hide"
          defaultChecked
          onChange={onShowHelp}
        />
      </Col>
    </Row>
  )
}

export default BreadcrumbComponent
