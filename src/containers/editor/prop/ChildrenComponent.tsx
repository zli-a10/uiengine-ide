import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Button, Form, Input } from "antd";

export const ChildrenComponent = (props: any) => {
  return (
    <div className="children-setting">
      <Form.Item label="Row Template">
        <Input />
      </Form.Item>
    </div>
  );
};
