import React, { useState } from "react";
import { Icon } from "antd";
import { UIEngine } from "uiengine";
import _ from "lodash";
import Td from "./Td";
import config from "../../../config";

const Tr = (props: any) => {
  let { children, uinode, subRow, ...rest } = props;
  const [expanded, setExpanded] = useState(false);
  const layout = `schema/ui/${subRow}`;
  const schemas = [{ layout }];

  return (
    <>
      <tr className="ant-table-row ant-table-row-level-0 my-table-row">
        {subRow ? (
          <Td>
            <Icon
              type={expanded ? "caret-down" : "caret-right"}
              onClick={() => setExpanded(!expanded)}
            />
          </Td>
        ) : null}
        {children}
      </tr>
      {subRow && expanded ? (
        <tr className="ant-table-row ant-table-row-level-0 my-table-row my-table-subrow ">
          <Td colSpan={children.length + 1}>
            <UIEngine layouts={schemas} config={config} />
          </Td>
        </tr>
      ) : null}
    </>
  );
};

export default Tr;
