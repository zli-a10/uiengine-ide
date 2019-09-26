import React from "react";
import _ from "lodash";
import { TreeBase } from "./TreeBase";

export const PageTree = (props: any) => {
  const { tree } = props;
  return (
    <div className="pagetree">
      <TreeBase tree={tree} type="schema" />
    </div>
  );
};
