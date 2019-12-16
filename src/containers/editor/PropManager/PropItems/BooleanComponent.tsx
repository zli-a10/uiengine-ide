import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Switch } from "antd";
import { Form } from "antd";
import { formatTitle } from "../../../../helpers";

export const BooleanComponent = (props: any) => {
  const {
    value,
    onChange,
    disabled,
    noLabel = false,
    switchOnly = false,
    checkedChildren,
    unCheckedChildren
  } = props;

  const onChangeValue = useCallback(
    (value: any, e: any) => {
      e.stopPropagation();
      onChange(value);
    },
    [onChange]
  );

  return switchOnly ? (
    <Switch
      checked={value}
      onChange={onChangeValue}
      disabled={disabled}
      checkedChildren={checkedChildren}
      unCheckedChildren={unCheckedChildren}
    />
  ) : (
    <Form.Item label={noLabel ? "" : formatTitle(props.name)}>
      <Switch checked={value} onChange={onChangeValue} disabled={disabled} />
    </Form.Item>
  );
};
