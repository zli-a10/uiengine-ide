import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Input } from "antd";
import { Form } from "antd";
import { formatTitle } from "../../../helpers";

export const EventComponent = (props: any) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const onBlur = () => {
    const { onChange: onChangeProps } = props;
    onChangeProps(inputValue);
  };

  const onMouseDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);
  return (
    <Form.Item label={formatTitle(props.name)}>
      <Input
        {...props}
        value={inputValue}
        onChange={onChange}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
      />
    </Form.Item>
  );
};
