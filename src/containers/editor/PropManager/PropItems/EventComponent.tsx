import React, { useCallback, useState, useEffect, useMemo } from 'react'
import _ from 'lodash'
import { Select, Form, Button, List, Row, Col, message } from 'antd'
import { HandlerManager } from 'uiengine'

import { PropItem } from '../PropItem'
import { formatTitle } from '../../../../helpers'

const Option = Select.Option

export const EventComponent = (props: any) => {
  const { name, onChange, disabled, uinode } = props
  const events = _.get(uinode, 'schema.props.$events', [])
  const eventIndex = _.findIndex(events, {
    eventName: name
  })
  let event: any

  if (eventIndex > -1) {
    event = events[eventIndex]
  }
  let eventHandlerList = _.get(event, 'handler', [])
  if (eventHandlerList && _.isString(eventHandlerList)) {
    eventHandlerList = [eventHandlerList]
  }

  // load handlers
  const handlers = useMemo(() => {
    const handlerManager = HandlerManager.getInstance()
    const list = handlerManager.getHandlerConfig('')

    return { ...list }
  }, [])
  const [handlerName, changeHandlerName] = useState()
  const [hanlderDescribe, changeHandlerDescribe] = useState()
  const [handlerList, changeHandlerList] = useState(eventHandlerList)

  const onChangeHandler = useCallback(
    (index: any, handlerName: any) => {
      const entry = handlers[handlerName]
      if (_.includes(handlerList, handlerName)) {
        message.warning('There is already a duplicate handler!')
      } else {
        if (entry) {
          const newHandlerList = _.cloneDeep(handlerList)
          newHandlerList[index] = handlerName
          changeHandlerList(newHandlerList)
          if (_.isEmpty(event)) {
            const eventSchema = { eventName: name, handler: _.cloneDeep(newHandlerList) }
            events.push(eventSchema)
          } else {
            events[eventIndex].handler = _.cloneDeep(newHandlerList)
          }
          onChange(events)
          changeHandlerName(handlerName)
          changeHandlerDescribe(entry.describe)
        }
      }
    },
    [eventIndex, handlerList]
  );
  const onAddHandler = useCallback(
    (e: any) => {
      const newHandlerList = _.cloneDeep(handlerList)
      let newHandlerName = ''
      let findNewHandlerName = false
      _.forIn(handlers, (item: any) => {
        if (!findNewHandlerName && !_.includes(newHandlerList, item.name)) {
          findNewHandlerName = true
          newHandlerName = item.name
        }
      })
      if (newHandlerName === '') {
        message.warning('No more new handlers')
      } else {
        const entry = handlers[newHandlerName]
        if (entry) {
          const newHandlerList = _.cloneDeep(handlerList)
          newHandlerList.push(newHandlerName)
          changeHandlerList(newHandlerList)
          if (_.isEmpty(event)) {
            const eventSchema = { eventName: name, handler: _.cloneDeep(newHandlerList) }
            events.push(eventSchema)
          } else {
            events[eventIndex].handler = _.cloneDeep(newHandlerList)
          }
          onChange(events)
          changeHandlerName(newHandlerName)
          changeHandlerDescribe(entry.describe)
        }
      }
    }, [handlerList]
  )

  const onDeleteHandler = useCallback(
    (index: any) => {
      const newHandlerList = _.cloneDeep(handlerList)
      newHandlerList.splice(index, 1)
      changeHandlerList(newHandlerList)
      events[eventIndex].handler = _.cloneDeep(newHandlerList)
      onChange(events)
    },
    [handlerList]
  )

  const onEditHandler = useCallback(
    (index: any) => {
      if (handlerName === handlerList[index]) {
        changeHandlerName('')
        changeHandlerDescribe({})
      } else {
        changeHandlerName(handlerList[index])
        const entry = handlers[handlerList[index]];
        if (entry) {
          changeHandlerDescribe(entry.describe)
        } else {
          changeHandlerDescribe({})
        }
      }
    },
    [handlerList, handlerName, hanlderDescribe]
  )

  const onMoveupHandler = useCallback(
    (index: any) => {
      const newHandlerList = _.cloneDeep(handlerList)
      const handlerName = newHandlerList[index]
      newHandlerList.splice(index, 1)
      newHandlerList.splice(index - 1, 0, handlerName)
      changeHandlerList(newHandlerList)
      events[eventIndex].handler = _.cloneDeep(newHandlerList)
      onChange(events)
    },
    [handlerList]
  )

  const onMovedownHandler = useCallback(
    (index: any) => {
      const newHandlerList = _.cloneDeep(handlerList)
      const handlerName = newHandlerList[index]
      newHandlerList.splice(index, 1)
      newHandlerList.splice(index + 1, 0, handlerName)
      changeHandlerList(newHandlerList)
      events[eventIndex].handler = _.cloneDeep(newHandlerList)
      onChange(events)
    },
    [handlerList]
  )

  // datatarget item only
  const onChangeEvent = useCallback(
    (event: any) => {
      onChange(events);
    },
    [eventIndex]
  );

  return (
    <>
      <Row type="flex" justify="space-around" style={{ paddingTop: "10px" }}>
        <Col span={8}>
          {formatTitle(name)}
        </Col>
        <Col span={16} style={{ textAlign: "right" }}>
          Add Handler{" "}
          <Button
            icon="plus"
            size="small"
            onClick={onAddHandler}
            disabled={disabled}
          />
        </Col>
      </Row>
      {
        handlerList.length ? (
          <List
            size="small"
            bordered
            dataSource={handlerList}
            renderItem={(item: any, index: number) => (
              <List.Item>
                <div style={{ maxHeight: "400px", overflow: "auto", width: "100%" }}>
                  <Row>
                    <Col span={14}>
                      <Select
                        defaultValue={'None'}
                        value={item}
                        onChange={onChangeHandler.bind({}, index)}
                        disabled={disabled}
                      >
                        {_.entries(handlers).map((entry: any) => {
                          const [name] = entry;
                          return (
                            <Option value={name} key={name}>
                              {name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Col>
                    <Col span={10}>
                      <Button
                        type="danger"
                        size="small"
                        icon="delete"
                        disabled={disabled}
                        onClick={onDeleteHandler.bind({}, index)}
                      >
                      </Button>
                      {_.isEmpty(handlers[item].describe) ? null : (
                        <Button
                          size="small"
                          icon={handlerName === item ? "down" : "right"}
                          disabled={disabled}
                          onClick={onEditHandler.bind({}, index)}
                        >
                        </Button>
                      )}
                      {index === 0 ? null : (
                        <Button
                          size="small"
                          icon="arrow-up"
                          disabled={disabled}
                          onClick={onMoveupHandler.bind({}, index)}
                        >
                        </Button>
                      )}
                      {index === handlerList.length - 1 ? null : (
                        <Button
                          size="small"
                          icon="arrow-down"
                          disabled={disabled}
                          onClick={onMovedownHandler.bind({}, index)}
                        >
                        </Button>
                      )}
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {handlerName === item && !_.isEmpty(hanlderDescribe) ? (
                        <div className="sub-options event-options modal-body">
                          {Object.entries(hanlderDescribe).map((entry: any) => {
                            const [name, handlerSchema] = entry;
                            return (
                              <PropItem
                                section="event"
                                name={`defaultParams.${name}`}
                                isSubOptions={true}
                                schema={handlerSchema}
                                key={`key-${name}`}
                                uinode={uinode}
                                dataRef={event}
                                event={handlerName}
                                onChangeEvent={onChangeEvent}
                                data={_.get(event, `defaultParams.${name}`)}
                              />
                            );
                          })}
                        </div>
                      ) : null
                      }
                    </Col>
                  </Row>
                </div>
              </List.Item>
            )
            }
          />
        ) : null
      }
    </>
  )
}
