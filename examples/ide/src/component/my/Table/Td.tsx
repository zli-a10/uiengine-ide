import React from "react";
import _ from "lodash";
import "./index.less";

const Td = (props: any) => {
  let { children, ...rest } = props;
  return <td>{children}</td>;
};

export default Td;
