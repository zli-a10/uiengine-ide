import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { Input, Form } from "antd";
import { formatTitle } from "../../../helpers";

export const StringComponent = (props: any) => {
  const [inputValue, setInputValue] = useState(props.value);
  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const onSave = (e: any) => {
    const { onChange: onChangeProps } = props;
    if (inputValue) onChangeProps(inputValue);
  };

  // useEffect(() => {
  //   setInputValue(props.value);
  // }, [props.value]);

  return (
    <Form.Item label={formatTitle(props.name)}>
      <Input
        value={inputValue}
        onChange={onChange}
        onPressEnter={onSave}
        onBlur={onSave}
      />
    </Form.Item>
  );
};
