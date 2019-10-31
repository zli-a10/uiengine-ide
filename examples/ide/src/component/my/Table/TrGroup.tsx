import React, { useState } from "react";
import _ from "lodash";

const TrGroup = (props: any) => {
  let { children, uinode, ...rest } = props;
  const [expanded, setExpanded] = useState(false);

  return children
    ? children.map((child: any, index: number) => {
        const newProps = {
          mainRow: false,
          onExpandSubRow: (value: boolean) => setExpanded(value),
          expanded
        };
        if (index === 0) {
          newProps.mainRow = children.length > 1;
        }
        return React.cloneElement(child, newProps);
      })
    : null;
};

export default TrGroup;
