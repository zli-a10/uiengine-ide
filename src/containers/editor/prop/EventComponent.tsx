import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Select, Form, Row, Col, Button } from "antd";
import { formatTitle } from "../../../helpers";
const Option = Select.Option;

export const EventComponent = (props: any) => {
  const { options, value, onChange, ...rest } = props;
  if (!_.isArray(options)) return null;
  let v = value;
  if (_.isObject(v)) {
    v = _.get(v, "action", "");
  }
  // console.log(props);
  return (
    <Form.Item label={formatTitle(props.name)}>
      <Select value={v} onChange={onChange}>
        {options.map((option: any, index: number) => (
          <Option value={option} key={index}>
            {option}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
