import React, { useCallback, useState, useEffect } from "react";
import _ from "lodash";
import { Select, Form } from "antd";
import { PropItem } from "../PropItem";
import { formatTitle } from "../../../../helpers";

const Option = Select.Option;
export const EventComponent = (props: any) => {
  const { name, schema, value, onChange, disabled, data, uinode } = props;
  let v = value;
  let options = {};
  if (_.isObject(v)) {
    v = _.get(v, "action", "");
    options = _.get(v, "options");
  }

  const [listener, changeListener] = useState(v);
  const onChangeListener = useCallback((myValue: any) => {
    changeListener(listener);
    onChange({ event: name, action: myValue });
  }, []);

  useEffect(() => {
    changeListener(v);
  }, [v]);

  return (
    <Form.Item label={formatTitle(name)}>
      <Select value={listener} onChange={onChangeListener} disabled={disabled}>
        {/* {options.map((option: any, index: number) => (
          <Option value={option} key={index}>
            {option}
          </Option>
        ))} */}
        <Option value="onChangeValue" key="onChangeValue">
          onChangeValue
        </Option>

        <Option value="onChangeData" key="onChangeData">
          onChangeData
        </Option>
      </Select>
      {listener && schema ? (
        <div className="event-options">
          {Object.entries(schema).map((entry: any) => (
            <PropItem
              section="event"
              name={`options.${entry[0]}`}
              schema={entry[1]}
              key={`key-${entry[0]}`}
              uinode={uinode}
              dataRef={value}
              isOptions={true}
              data={_.get(options, `${entry[0]}`)}
            />
          ))}
        </div>
      ) : null}
    </Form.Item>
  );
};
