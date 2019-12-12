import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { Input, Form } from "antd";
import { formatTitle } from "../../../../helpers";

export const StringComponent = (props: any) => {
  const {
    value,
    uinode,
    name,
    onChange: onChangeProps,
    disabled,
    placeholder,
    noLabel = false
  } = props;
  const [inputValue, setInputValue] = useState(value);
  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onSave = (e: any) => {
    onChangeProps(inputValue);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value, uinode]);
  return (
    <Form.Item label={noLabel ? "" : formatTitle(name)}>
      <Input
        disabled={disabled}
        value={inputValue}
        onChange={onChange}
        onPressEnter={onSave}
        onBlur={onSave}
        placeholder={placeholder}
      />
    </Form.Item>
  );
};
