import React from "react";
import _ from "lodash";
import { Checkbox } from "antd";

const THeader = (props: any) => {
  let { children, columns, onSelectAll, allSelected = false } = props;

  return (
    <thead className="ant-table-thead my-table-head">
      <tr>
        {columns && columns.length > 1 ? <th>&nbsp;</th> : null}
        {children ||
          _.get(columns, "0.children", []).map((col: any, index: number) => {
            if (_.has(col, "props.selectAll")) {
              return (
                <th key={`col-${index}`}>
                  <Checkbox
                    checked={allSelected}
                    onChange={() => {
                      console.log("test");
                    }}
                  />
                </th>
              );
            }
            return <th key={`col-${index}`}>{_.get(col, "props.title")}</th>;
          })}
      </tr>
    </thead>
  );
};

export default THeader;
