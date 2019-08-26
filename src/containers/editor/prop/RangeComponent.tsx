import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Slider } from "antd";
import { Form } from "antd";
import { formatTitle } from "../../../helpers";

export const RangeComponent = (props: any) => {
  let { range: dataRange, value, ...rest } = props;
  if (!_.isArray(dataRange)) return null;
  const maxValue = 9999999999;
  if (!_.isArray(value)) value = [0, maxValue];
  return (
    <Form.Item label={formatTitle(props.name)}>
      <Slider
        range
        value={value}
        min={dataRange[0]}
        max={dataRange[1] || maxValue}
        {...rest}
      />
    </Form.Item>
  );
};
