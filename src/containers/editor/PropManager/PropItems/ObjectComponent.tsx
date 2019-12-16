import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { Input, Form } from "antd";
import { formatTitle } from "../../../../helpers";

export const ObjectComponent = (props: any) => {
  const { value, uinode, name, onChange: onChangeProps, disabled } = props;
  const [inputValue, setInputValue] = useState("{}");
  const onChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onSave = (e: any) => {
    try {
      const objectValue = JSON.parse(inputValue);
      onChangeProps(objectValue, true);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    setInputValue(JSON.stringify(value));
  }, [value, uinode]);

  return (
    <Form.Item label={formatTitle(name)}>
      <Input.TextArea
        disabled={disabled}
        value={inputValue}
        onChange={onChange}
        onPressEnter={onSave}
        onBlur={onSave}
      />
    </Form.Item>
  );
};
