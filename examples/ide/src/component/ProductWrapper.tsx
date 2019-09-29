// import React, { useContext, useCallback, useState } from "react"; // useMemo // useEffect // useCallback, // useContext, // useRef, // useState,
// import { IDEEditorContext } from "uiengine-ide";
// import { Icon } from "antd";

import _ from "lodash";
// export const ProductWrapper = (props: any) => {
//   const { uinode, style } = props;
//   const { chooseEditNode } = useContext(IDEEditorContext);

//   const { children } = props;

//   const [hoverClassNames, setHoverClassNames] = useState("preview-wrapper");
//   const mouseOver = useCallback((e: any) => {
//     e.stopPropagation();
//     setHoverClassNames("preview-wrapper over");
//   }, []);

//   const mouseOut = useCallback((e: any) => {
//     e.stopPropagation();
//     setHoverClassNames("preview-wrapper out");
//   }, []);

//   return (
//     <div
//       className={hoverClassNames}
//       onMouseOver={mouseOver}
//       onMouseOut={mouseOut}
//       style={style}
//     >
//       <a
//         className="info"
//         onClick={(e: any) => {
//           e.stopPropagation();
//           chooseEditNode(uinode);
//         }}
//       >
//         <Icon type="info-circle" />
//         {uinode.id}
//       </a>
//       {children}
//     </div>
//   );
// };

export const ProductWrapper = (props: any) => {
  return props.children;
};
