import React from "react";
import _ from "lodash";

const TFooter = (props: any) => {
  let { children, ...rest } = props;
  return <tfoot className="my-table-footer">{children}</tfoot>;
};

export default TFooter;
