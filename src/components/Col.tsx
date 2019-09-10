import React from "react";
import classNames from "classnames";

export const Col = (props: any) => {
  const { flex, children } = props;
  const cls = classNames({
    "col-wrapper": true
  });
  return (
    <div className={cls} style={{ display: "flex", flex }}>
      {children}
    </div>
  );
};
