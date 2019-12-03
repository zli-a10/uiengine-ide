import React, { useState } from "react";
import _ from "lodash";

const TrGroup = (props: any) => {
  let { children, expandable = true, value } = props;
  const [expanded, setExpanded] = useState(false);
  return children
    ? children.map((child: any, index: number) => {
        const newProps = {
          mainRow: false,
          onExpandSubRow: (value: boolean) => setExpanded(value),
          expanded,
          colCount: 1,
          rowGroupData: value,
          parentIsTrGroup: true
        };
        if (index === 0 && expandable) {
          newProps.mainRow = children.length > 1;
        } else {
          newProps.colCount =
            _.get(children[0], "props.uiNode.children", []).length + 1;
        }
        return React.cloneElement(child, newProps);
      })
    : null;
};

export default TrGroup;
