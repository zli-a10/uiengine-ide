import React from "react";
import classNames from "classnames";

export const Row = (props: any) => {
  const { flex, children } = props;
  const cls = classNames({
    "row-wrapper": true
  });
  return (
    <div className={cls} style={{ display: "flex", flex }}>
      {children}
    </div>
  );
};
