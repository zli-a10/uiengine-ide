import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Select } from "antd";
import { Form } from "antd";
import { formatTitle } from "../../../helpers";
const Option = Select.Option;

export const EnumComponent = (props: any) => {
  const { options, ...rest } = props;
  if (!_.isArray(options)) return null;
  return (
    <Form.Item label={formatTitle(props.name)}>
      <Select {...rest}>
        {options.map((option: any, index: number) => (
          <Option value={option} key={index}>
            {option}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
