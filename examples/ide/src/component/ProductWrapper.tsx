import React from "react"; // useMemo // useEffect // useCallback, // useContext, // useRef, // useState,
import _ from "lodash";
export const ProductWrapper = (props: any) => {
  const { uinode, children } = props;
  const flex = _.get(uinode, "schema.layout.flex", 1);
  return (
    <div className="product-wrapper" style={{ flex }}>
      {children}
    </div>
  );
};
