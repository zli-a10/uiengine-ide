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
    listenerName = _.get(listenerName, "listener", "");
    options = _.get(listenerName, "defaultParams");
  }
  // load listeners
  const listeners = useMemo(() => {
    const listenerManager = ListenerManager.getInstance();
    return listenerManager.getListenerConfig("");
  }, []);

  const [listener, changeListener] = useState(listenerName);
  const [schema, changeSchema] = useState(Date.now());
  const onChangeListener = useCallback((name: any) => {
    const entry = listeners[name];
    if (entry) {
      const { name: entryName, describe } = entry;
      changeListener(entryName);
      changeSchema(describe);
      onChange({ event: name, listener: entryName });
    }
  }, []);

  useEffect(() => {
    changeListener(listenerName);
  }, [listenerName]);

  return (
    <Form.Item label={formatTitle(name)}>
      <Select value={listener} onChange={onChangeListener} disabled={disabled}>
        {_.entries(listeners).map((entry: any) => {
          const [name] = entry;
          return (
            <Option value={name} key={name}>
              {name}
            </Option>
          );
        })}
      </Select>
      {listener && schema ? (
        <div className="event-options">
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
    </Form.Item>
  );
};
