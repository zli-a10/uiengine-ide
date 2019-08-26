import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Select } from "antd";
const Option = Select.Option;

export const EnumComponent = (props: any) => {
  const { options, ...rest } = props;
  if (!_.isArray(options)) return null;
  return (
    <Select {...rest}>
      {options.map((option: any, index: number) => (
        <Option value={option} key={index}>
          {option}
        </Option>
      ))}
    </Select>
  );
};
