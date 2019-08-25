import React from "react";
import _ from "lodash";
import { Input, Form } from "antd";
import { formatTitle } from "../../helpers";

export const PropItem: React.FC<any> = (props: any) => {
  const { name, schema, type } = props;
  return (
    <Form.Item label={formatTitle(name)}>
      <Input />
    </Form.Item>
  );
};
