import React, { useState, useCallback } from "react";
import _ from "lodash";
import { Switch } from "antd";

export const BooleanComponent = (props: any) => {
  const { value, ...rest } = props;
  return <Switch checked={value} {...rest} />;
};
