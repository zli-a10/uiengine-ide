import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Slider } from "antd";
import { Form } from "antd";
import { formatTitle } from "../../../../helpers";

export const SliderComponent = (props: any) => {
  let { range: dataRange, onChange, value, uinode, disabled, ...rest } = props;
  if (!_.isArray(dataRange)) return null;
  const maxValue = 9999999999;
  if (!_.isArray(value)) value = [0, maxValue];

  const [inputValue, setInputValue] = useState(value);
  const onChangeValue = (value: any) => {
    // console.log(value, "...........");
    onChange(value);
    setInputValue(value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value, uinode]);

  return (
    <Form.Item label={formatTitle(props.name)}>
      <Slider
        disabled={disabled}
        range
        value={inputValue}
        onChange={onChangeValue}
        min={dataRange[0]}
        max={dataRange[1] || maxValue}
      />
    </Form.Item>
  );
};
