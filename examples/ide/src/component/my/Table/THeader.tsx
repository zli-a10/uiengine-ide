import React from "react";
import _ from "lodash";
import Tr from "./Tr";

const THeader = (props: any) => {
  let { children, columns, ...rest } = props;

  return (
    <thead className="ant-table-thead my-table-head">
      <Tr>
        {_.get(columns, "0.props.subRow") ? <th>&nbsp;</th> : null}
        {children ||
          _.get(columns, "0.children", []).map((col: any, index: number) => {
            return <th key={`col-${index}`}>{_.get(col, "props.title")}</th>;
          })}
      </Tr>
    </thead>
  );
};

export default THeader;
