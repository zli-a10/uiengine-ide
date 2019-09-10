import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect
  // useMemo
} from "react";

export const ProductWrapper = (props: any) => {
  return <div className="wrapper">{props.children}...</div>;
};
