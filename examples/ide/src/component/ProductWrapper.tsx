import React, { useContext, useCallback, useState } from "react"; // useMemo // useEffect // useCallback, // useContext, // useRef, // useState,
import { IDEEditorContext } from "uiengine-ide";

import _ from "lodash";
export const ProductWrapper = (props: any) => {
  const { uinode, style } = props;
  const { chooseEditNode } = useContext(IDEEditorContext);

  const { children } = props;

  const [hoverClassNames, setHoverClassNames] = useState("");
  const mouseOver = useCallback((e: any) => {
    e.stopPropagation();
    setHoverClassNames("preview-wrapper over");
  }, []);

  const mouseOut = useCallback((e: any) => {
    e.stopPropagation();
    setHoverClassNames("preview-wrapper out");
  }, []);

  return (
    <div
      className={hoverClassNames}
      onClick={() => {
        chooseEditNode(uinode);
      }}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      style={style}
    >
      {children}
    </div>
  );
};
