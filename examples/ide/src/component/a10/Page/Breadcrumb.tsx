import React, { useCallback, useContext, useEffect } from 'react'
import _ from 'lodash'
import { Breadcrumb, Row, Icon, Switch, Col } from 'antd'
import { MyContext } from '../../my/Context/Provider'

const { Item } = Breadcrumb
const BreadcrumbComponent = (props: any) => {
  const { helpSwitcher = true } = props
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
    [data, dispatch]
  )

  const onShowAssitant = useCallback(
    (value: any) => {
      if (_.isFunction(dispatch)) {
        const showAssitantVal = !!!data.showAssitant
        dispatch({
          name: 'set',
          params: { showAssitant: showAssitantVal }
        })
        // localStorage.a10ShowAssitant = showAssitantVal
      } else {
        console.warn(
          'dispatch not a function, please use my:Provider as your top container to pass by your Context'
        )
      }
    },
    [data, dispatch]
  )

  // useEffect(() => {
  //   if (localStorage.a10ShowAssitant) {
  //     dispatch({
  //       name: 'set',
  //       params: { showAssitant: localStorage.a10ShowAssitant }
  //     })
  //   }
  // }, [localStorage.a10ShowAssitant, dispatch])

  return (
    <Row className="a10-breadCrumb-container flex-bar">
      <Col span={16}>
        <Breadcrumb className="a10-breadCrumb">
          <Item>
            <Icon
              className="breadCrumb-Icon"
              type="menu-unfold"
              onClick={onShowAssitant}
            />
            ADC > Create Virtual Server
          </Item>
        </Breadcrumb>
      </Col>

      {helpSwitcher ? (
        <Col span={8} className="breadCrumb-switch">
          <Switch
            checkedChildren="Help"
            unCheckedChildren="Hide"
            defaultChecked
            onChange={onShowHelp}
          />
        </Col>
      ) : null}
    </Row>
  )
}

export default BreadcrumbComponent
