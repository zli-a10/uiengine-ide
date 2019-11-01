import React from "react";
import _ from "lodash";
import CellContent from "./CellContent";

const Td = (props: any) => {
  let { children, value, ...rest } = props;
  return (
    <td className="my-table-col" {...rest}>
      {children ? <CellContent>{children}</CellContent> : value}
    </td>
  );
};

export default Td;
