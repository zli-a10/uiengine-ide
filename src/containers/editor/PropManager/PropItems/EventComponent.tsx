import React, { useCallback, useState, useEffect, useMemo } from "react";
import _ from "lodash";
import { Select, Form } from "antd";
import { ListenerManager } from "uiengine";

import { PropItem } from "../PropItem";
import { formatTitle } from "../../../../helpers";

const Option = Select.Option;
export const EventComponent = (props: any) => {
  const { name, value, onChange, disabled, data, uinode } = props;
  let options = {};
  let listenerName = value;
  if (_.isObject(listenerName)) {
    listenerName = _.get(listenerName, "listener");
    options = _.get(listenerName, "defaultParams");
  }
  console.log(props, "props");
  // load listeners
  const listeners = useMemo(() => {
    const listenerManager = ListenerManager.getInstance();
    const list = listenerManager.getListenerConfig("");
    return { None: {}, ...list };
  }, []);

  const [listener, changeListener] = useState(listenerName);
  const [schema, changeSchema] = useState();
  const onChangeListener = useCallback((listenerName: any) => {
    const entry = listeners[listenerName];
    if (entry) {
      const { name: entryName, describe } = entry;
      changeSchema(describe);
      // onChange({ event: name, listener: entryName });
    } else {
      // onChange({ event: name });
      changeSchema({});
    }

    changeListener(listenerName);
  }, []);

  useEffect(() => {
    changeListener(listenerName);
  }, [listenerName]);

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
      {listener && schema ? (
        <div className="sub-options event-options">
          {Object.entries(schema).map((entry: any) => {
            return (
              <PropItem
                section="event"
                name={`options.${entry[0]}`}
                schema={entry[1]}
                key={`key-${entry[0]}`}
                uinode={uinode}
                dataRef={value}
                event={name}
                data={_.get(options, `${entry[0]}`)}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
};
