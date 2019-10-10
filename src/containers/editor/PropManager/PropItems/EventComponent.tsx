import React, { useCallback, useState, useEffect, useMemo } from "react";
import _ from "lodash";
import { Select, Form } from "antd";
import { ListenerManager } from "uiengine";

import { PropItem } from "../PropItem";
import { formatTitle } from "../../../../helpers";

const Option = Select.Option;
export const EventComponent = (props: any) => {
  const { name, onChange, disabled, uinode } = props;
  const events = _.get(uinode, `schema.props.$events`, []);
  const eventIndex = _.findIndex(events, {
    eventName: name
  });
  let event: any;
  if (eventIndex > -1) {
    event = events[eventIndex];
  }

  let listenerName = _.get(event, "listener");
  // console.log(event, eventIndex, "event");

  // load listeners
  const listeners = useMemo(() => {
    const listenerManager = ListenerManager.getInstance();
    const list = listenerManager.getListenerConfig("");
    return { None: {}, ...list };
  }, []);

  const [listener, changeListener] = useState(listenerName);
  const [describe, changeDescribe] = useState();
  const onChangeListener = useCallback(
    (listenerName: any) => {
      const entry = listeners[listenerName];
      if (entry) {
        const { name: entryName, describe } = entry;
        if (_.isEmpty(event)) {
          const eventSchema = { eventName: name, listener: entryName };
          events.push(eventSchema);
        } else {
          if (listenerName === "None" && eventIndex > -1) {
            events.splice(eventIndex, 1);
          } else {
            event.listener = entryName;
          }
        }
        changeDescribe(describe);
        // console.log(_.get(uinode, `schema.props.$events`, []));
        onChange(events);
      } else if (listenerName === "None" && eventIndex > -1) {
        events.splice(eventIndex, 1);
        changeDescribe({});
        onChange(events);
      }
      changeListener(listenerName);
    },
    [eventIndex]
  );

  const onChangeEvent = useCallback(
    (event: any) => {
      events[eventIndex] = event;
      onChange(events);
    },
    [eventIndex]
  );
  // const [eventOptions, setEventOptions] = useState({});
  useEffect(() => {
    changeListener(listenerName);
    // setEventOptions(event);
    // schema
    const entry = listeners[listenerName];
    if (_.has(entry, "describe")) {
      changeDescribe(entry.describe);
    }
  }, [event]);

  return (
    <>
      <Form.Item label={formatTitle(name)}>
        <Select
          value={listener}
          onChange={onChangeListener}
          disabled={disabled}
          defaultValue={"None"}
        >
          {_.entries(listeners).map((entry: any) => {
            const [name] = entry;
            return (
              <Option value={name} key={name}>
                {name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      {listener && describe ? (
        <div className="sub-options event-options">
          {Object.entries(describe).map((entry: any) => {
            const [name, listenerSchema] = entry;
            return (
              <PropItem
                section="event"
                name={name}
                schema={listenerSchema}
                key={`key-${name}`}
                uinode={uinode}
                dataRef={event}
                event={name}
                onChangeEvent={onChangeEvent}
                data={_.get(event, "listener")}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
};
