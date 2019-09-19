import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { InputNumber, Form } from "antd";
import { formatTitle } from "../../../../helpers";

export const NumberComponent = (props: any) => {
  const {
    value,
    uinode,
    name,
    onChange: onChangeProps,
    disabled,
    typeSchema: { type, ...rest }
  } = props;
  const [inputValue, setInputValue] = useState(value);
  const onChange = (value: any) => {
    setInputValue(value);
  };

  const onSave = (e: any) => {
    onChangeProps(inputValue);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value, uinode]);
  return (
    <Form.Item label={formatTitle(name)}>
      <InputNumber
        disabled={disabled}
        value={inputValue}
        onChange={onChange}
        onBlur={onSave}
        size="small"
        {...rest}
      />
    </Form.Item>
  );
};
