import React, { useCallback, useState, useEffect, useMemo } from 'react'
import _ from 'lodash'
import { Select, Form } from 'antd'
import { ListenerManager } from 'uiengine'

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

  let handlerName = _.get(event, 'listener')
  // console.log(event, eventIndex, "event");

  // load listeners
  const handlers = useMemo(() => {
    const handlerManager = ListenerManager.getInstance()
    const list = handlerManager.getListenerConfig('')

    return { None: {}, ...list }
  }, [])

  const [handler, changeListener] = useState(handlerName)
  const [describe, changeDescribe] = useState()
  const onChangeHandler = useCallback(
    (handlerName: any) => {
      const entry = handlers[handlerName]

      if (entry) {
        const { name: entryName, describe } = entry

        if (_.isEmpty(event)) {
          const eventSchema = { eventName: name, listener: entryName }

          events.push(eventSchema)
        } else {
          if (handlerName === 'None' && eventIndex > -1) {
            events.splice(eventIndex, 1)
          } else {
            event.listener = entryName
          }
        }
        changeDescribe(describe)
        // console.log(_.get(uinode, `schema.props.$events`, []));
        onChange(events)
      } else if (handlerName === 'None' && eventIndex > -1) {
        events.splice(eventIndex, 1)
        changeDescribe({})
        onChange(events)
      }
      changeListener(handlerName)
    },
    [eventIndex]
  )

  // datatarget item only
  const onChangeEvent = useCallback(
    (event: any) => {
      onChange(events)
    },
    [eventIndex]
  )
  // const [eventOptions, setEventOptions] = useState({});

  useEffect(() => {
    changeListener(handlerName)
    // setEventOptions(event);
    // schema
    const entry = handlers[handlerName]

    if (_.has(entry, 'describe')) {
      changeDescribe(entry.describe)
    }
  }, [event])

  return (
    <>
      <Form.Item label={formatTitle(name)}>
        <Select
          value={handler}
          onChange={onChangeHandler}
          disabled={disabled}
          defaultValue={'None'}
        >
          {_.entries(handlers).map((entry: any) => {
            const [name] = entry

            return (
              <Option value={name} key={name}>
                {name}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      {handler && !_.isEmpty(describe) ? (
        <div className="sub-options event-options">
          {Object.entries(describe).map((entry: any) => {
            const [name, handlerSchema] = entry

            return (
              <PropItem
                section="event"
                name={`defaultParams.${name}`}
                isSubOptions={true}
                schema={handlerSchema}
                key={`key-${name}`}
                uinode={uinode}
                dataRef={event}
                event={handler}
                onChangeEvent={onChangeEvent}
                data={_.get(event, `defaultParams.${name}`)}
              />
            )
          })}
        </div>
      ) : null}
    </>
  )
}
