import React from "react";
import _ from "lodash";

const Td = (props: any) => {
  let { children, value, colSpan, rowData, colCount = 1, ...rest } = props;
  return (
    <td className="my-table-col" colSpan={colSpan || colCount} {...rest}>
      {_.isArray(children)
        ? children.map((child: any) => {
            return React.cloneElement(child, {
              rowData
            });
          })
        : children || value}
    </td>
  );
};

export default Td;
