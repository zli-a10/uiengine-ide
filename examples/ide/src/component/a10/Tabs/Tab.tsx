import React, { useState } from 'react'
import { Tabs, Row, Switch, Button } from 'antd'
import _ from 'lodash'

const { TabPane } = Tabs

class TabComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      activeKey: '0',
      defaultActiveKey: '0',
      cloneCount: 0
    }
  }
  onChange = (activeKey: string) => {
    this.setState({ activeKey })
  }

  add = () => {
    this.setState({
      cloneCount: this.state.cloneCount + 1
    })
  }

  render() {
    const { children, isTable, sectionName } = this.props
    const { activeKey, cloneCount } = this.state
    console.log('this', this)
    console.log('this.props', this.props)
    return (
      <>
        <Row>
          <Switch
            className="float-right"
            checkedChildren="Tabs"
            unCheckedChildren="Table"
            defaultChecked
          />
        </Row>
        <Row>
          <Row className="form-name">{sectionName}</Row>
          <Row className="margin-top">
            {isTable ? (
              <table>TODO this is table</table>
            ) : (
              <Tabs onChange={this.onChange} activeKey={activeKey}>
                {_.isArray(children)
                  ? children.map((child: any, index: number) => (
                      <TabPane
                        tab={
                          child.props.uiNode.props.tabName
                            ? child.props.uiNode.props.tabName
                            : child
                        }
                        key={index.toString()}
                      >
                        {child}
                      </TabPane>
                    ))
                  : null}
                {cloneCount ? <TabPane tab="newAdd"></TabPane> : null}
              </Tabs>
            )}
            <Button className="float-left tabs-add" onClick={this.add}>
              +
            </Button>
          </Row>
        </Row>
      </>
    )
  }
}

export default TabComponent
