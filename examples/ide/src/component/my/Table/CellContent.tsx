import React from "react";
import _ from "lodash";
import "./index.less";

const CellContent = (props: any) => {
  let { children, text, value, ...rest } = props;

  return (
    <div className="my-table-cell-content">{children || value || text}</div>
  );
};

export default CellContent;
