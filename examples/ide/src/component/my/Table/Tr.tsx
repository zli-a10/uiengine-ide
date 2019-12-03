import React, { useContext } from "react";
import { Icon } from "antd";
import Td from "./Td";
import { GlobalContext } from "uiengine-ide";
import useTableElement from "./createElement";

const Tr = (props: any) => {
  const { ideMode, preview } = useContext(GlobalContext);
  let {
    children,
    expanded,
    onExpandSubRow,
    value,
    mainRow,
    parentIsTrGroup,
    colCount,
    rowGroupData,
    selectedItems,
    selectItem,
    ...rest
  } = props;

  const TR = useTableElement("tr");

  return !parentIsTrGroup || mainRow || expanded || (ideMode && !preview) ? (
    <TR className="my-table-row" {...rest}>
      {mainRow && parentIsTrGroup ? (
        <Td width="40">
          <Icon
            type={expanded ? "caret-down" : "caret-right"}
            onClick={() => onExpandSubRow(!expanded)}
          />
        </Td>
      ) : null}
      {children &&
        children.map((child: any) => {
          // if (_.has(child, `props.uiNode.schema.props.selectAll`)) {
          //   return (
          //     React.cloneElement(child, {

          //     }, <Checkbox checked={false} onChange={selectItem} />))

          // }

          return React.cloneElement(child, {
            colCount,
            rowData: value || rowGroupData
          });
        })}
    </TR>
  ) : null;
};

export default Tr;
