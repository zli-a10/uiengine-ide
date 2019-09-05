import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Input } from "antd";
import { Form } from "antd";
import { formatTitle } from "../../../../helpers";

export const ComponentComponent = (props: any) => {
  const { name, disabled, onChange: onChangeProps } = props;
  const [inputValue, setInputValue] = useState("");
  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const onBlur = () => {
    onChangeProps(inputValue);
  };

  const onMouseDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);
  return (
    <Form.Item label={formatTitle(name)}>
      <Input
        disabled={disabled}
        value={inputValue}
        onChange={onChange}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
      />
    </Form.Item>
  );
};
