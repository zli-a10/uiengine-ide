import React, { useContext } from "react";
import { Icon } from "antd";
import _ from "lodash";
import Td from "./Td";
import { GlobalContext } from "uiengine-ide";

const Tr = (props: any) => {
  const { ideMode, preview } = useContext(GlobalContext);
  let { children, expanded, onExpandSubRow, mainRow } = props;

  return expanded || mainRow || (ideMode && !preview) ? (
    <tr className="ant-table-row ant-table-row-level-0 my-table-row">
      {mainRow ? (
        <Td>
          <Icon
            type={expanded ? "caret-down" : "caret-right"}
            onClick={() => onExpandSubRow(!expanded)}
          />
        </Td>
      ) : null}
      {children}
    </tr>
  ) : null;
};

export default Tr;
