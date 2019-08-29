import React, { useState, useCallback, useContext } from "react";
import DataSourceTreeSelect from "./DataSourceTreeSelect";
import { Form } from "antd";

export const DataSourceSelector = (props: any) => {
  const { value } = props;
  const onChange = (value: any) => {
    const { onChange: onChangeProps } = props;
    if (onChangeProps) {
      onChangeProps(value);
    }
  };
  return (
    <Form.Item label={props.label}>
      <DataSourceTreeSelect onChange={onChange} value={value} />
    </Form.Item>
  );
};
