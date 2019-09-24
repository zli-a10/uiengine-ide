import React from "react";
import _ from "lodash";
import "./index.less";

const Tr = (props: any) => {
  let { children, ...rest } = props;
  return <tr>{children}</tr>;
};

export default Tr;
