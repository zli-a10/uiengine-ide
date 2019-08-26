import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Form } from "antd";
import { formatTitle, PropManager } from "../../helpers";
import { FieldComponent } from "../prop";

export const PropItem: React.FC<any> = (props: any) => {
  const { name, schema, ...rest } = props;

  // type : event| prop
  return (
    <Form.Item label={formatTitle(name)}>
      <FieldComponent fieldSchema={schema} {...props} />
    </Form.Item>
  );
};
