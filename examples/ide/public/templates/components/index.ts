import React, { useState } from "react";
import { Input } from "antd";
import _ from "lodash";

export const ComponentName = (props: any) => {
  const { children, uinode, select, ...rest } = props;

  return (
    <div>
      <Input />
    </div>
  );
};
