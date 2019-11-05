import React from "react";
import _ from "lodash";

const TBody = (props: any) => {
  let { children, ...rest } = props;
  return <tbody className="ant-table-tbody my-table-body">{children}</tbody>;
};

export default TBody;
