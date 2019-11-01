import React from "react";
import _ from "lodash";
import CellContent from "./CellContent";

const Td = (props: any) => {
  let { children, value, colSpan, colCount = 1, ...rest } = props;
  return (
    <td className="my-table-col" colSpan={colSpan || colCount} {...rest}>
      {children ? <CellContent>{children}</CellContent> : value}
    </td>
  );
};

export default Td;
