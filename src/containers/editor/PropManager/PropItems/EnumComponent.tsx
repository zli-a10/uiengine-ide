import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Select } from "antd";
import { Form } from "antd";
import { formatTitle } from "../../../../helpers";
const Option = Select.Option;

export const EnumComponent = (props: any) => {
  const { options, value, onChange, disabled } = props;
  if (!_.isArray(options)) return null;
  let v = value;
  if (_.isObject(v)) {
    v = _.get(v, "action", "");
  }
  return (
    <Form.Item label={formatTitle(props.name)}>
      <Select value={v} onChange={onChange} disabled={disabled}>
        {options.map((option: any, index: number) => (
          <Option value={option} key={index}>
            {option}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
