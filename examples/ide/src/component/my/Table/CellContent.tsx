import React from "react";
import _ from "lodash";
import "./index.less";

const CellContent = (props: any) => {
  let { children, text, ...rest } = props;
  return <div className="my-table-cell-content">{children || text}</div>;
};

export default CellContent;
