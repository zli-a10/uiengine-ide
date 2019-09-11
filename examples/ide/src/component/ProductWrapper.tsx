import React from "react"; // useMemo // useEffect // useCallback, // useContext, // useRef, // useState,
import _ from "lodash";
export const ProductWrapper = (props: any) => {
  const { uinode, children } = props;
  return children;
  // const display = _.get(uinode, "schema.props.style", {});
  // return (
  //   <div className="product-wrapper" style={display}>
  //     {children}
  //   </div>
  // );
};
