import React from "react";
import _ from "lodash";
import CellContent from "./CellContent";

const Td = (props: any) => {
  let { children, ...rest } = props;
  console.log(props);
  return (
    <td className="my-table-col" {...rest}>
      <CellContent>{children}</CellContent>
    </td>
  );
};

export default Td;
