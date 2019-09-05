import React, { useState, useCallback, useContext } from "react";
import DataSourceTreeSelect from "./DataSourceTreeSelect";
import { Form } from "antd";

export const DataSourceSelector = (props: any) => {
  const { value, disabled } = props;
  const onChange = (value: any) => {
    const { onChange: onChangeProps } = props;
    if (onChangeProps) {
      onChangeProps(value);
    }
  };
  return (
    <Form.Item label={props.label}>
      <DataSourceTreeSelect
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </Form.Item>
  );
};
