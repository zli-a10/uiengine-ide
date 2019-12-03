import React from "react";
// import _ from 'lodash'
import useTableElement from "./createElement";

const TBody = (props: any) => {
  const TB = useTableElement("tbody");

  let { children } = props;
  return <TB className="ant-table-tbody my-table-body">{children}</TB>;
};

export default TBody;
