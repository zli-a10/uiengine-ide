import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Input } from "antd";

export const ComponentComponent = (props: any) => {
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
    <Input
      {...props}
      value={inputValue}
      onChange={onChange}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
    />
  );
};
