import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Input, Form } from "antd";
import { formatTitle } from "../../../helpers";

export const StringComponent = (props: any) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const onSave = (e: any) => {
    const { onChange: onChangeProps } = props;
    if (inputValue) onChangeProps(inputValue);
  };

  const onMouseDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);
  return (
    <Form.Item label={formatTitle(props.name)}>
      <Input
        {...props}
        value={inputValue || props.value}
        onChange={onChange}
        onPressEnter={onSave}
        onBlur={onSave}
        onMouseDown={onMouseDown}
      />
    </Form.Item>
  );
};
