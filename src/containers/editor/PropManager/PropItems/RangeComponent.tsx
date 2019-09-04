import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { InputNumber } from "antd";
import { Form } from "antd";
import { formatTitle } from "../../../../helpers";

export const RangeComponent = (props: any) => {
  let { range: dataRange, onChange, value, uinode } = props;
  if (!_.isArray(dataRange)) return null;

  const [inputValue, setInputValue] = useState(dataRange[0]);
  const onChangeValue = (value: any) => {
    onChange(value);
    setInputValue(value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value, uinode]);

  const onMouseDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <Form.Item label={formatTitle(props.name)}>
      <InputNumber
        value={inputValue}
        onChange={onChangeValue}
        onMouseDown={onMouseDown}
        min={dataRange[0]}
        max={dataRange[1]}
      />
    </Form.Item>
  );
};
