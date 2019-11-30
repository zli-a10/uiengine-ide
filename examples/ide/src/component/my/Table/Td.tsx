import React from "react";
import _ from "lodash";
import useTableElement from "./createElement";

const Td = (props: any) => {
  let {
    children,
    value,
    colSpan,
    rowData,
    colCount = 1,
    mainRow,
    onExpandSubRow,
    expanded,
    rowGroupData,
    ...rest
  } = props;
  const TD = useTableElement("td");

  return (
    <TD className="my-table-col" {...rest} colSpan={colSpan || colCount}>
      {_.isArray(children)
        ? children.map((child: any) => {
            const componentName = _.get(child, "props.uiNode.schema.component");
            return componentName.indexOf("CellContent") > -1
              ? React.cloneElement(child, {
                  rowData
                })
              : child;
          })
        : children || value}
    </TD>
  );
};

export default Td;
