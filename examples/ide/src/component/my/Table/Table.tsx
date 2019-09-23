import React from "react";
import _ from "lodash";
import "./index.less";

const Table = (props: any) => {
  let { children, ...rest } = props;
  return <table>{children}</table>;
};

export default Table;
