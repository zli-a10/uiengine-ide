import React from "react";
import classNames from "classnames";
// import _ from 'lodash'

const ColComponent = (props: any) => {
  const { style, children, className } = props;
  const cls = classNames({
    "my-wrapper-col": true,
    ...className
  });
  return children ? (
    <div className={cls} style={{ overflow: "hidden", ...style }}>
      {children}
    </div>
  ) : null;
};

export default ColComponent;
