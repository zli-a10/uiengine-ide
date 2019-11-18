import React, { useState } from "react";
import { Select } from "antd";
import _ from "lodash";

export const DataSelect = (props: any) => {
  const { children, uinode, select, ...rest } = props;
  // load data
  const [assocs, setAssocs] = useState([]);
  const datasource = _.get(select, "datasource");
  const title = _.get(select, "optionmap.title");
  const value = _.get(select, "optionmap.value");

  if (datasource) {
    const source = { source: datasource };
    uinode.dataNode.dataEngine.loadData(source).then((data: any) => {
      setAssocs(_.get(data, datasource.replace(":", ".")));
    });
  }
  
  return (
    <Select {...rest}>
      {assocs &&
        assocs.map((data: any, index: number) => {
          return (
            <Select.Option value={_.get(data, title)} key={index}>
              {_.get(data, value)}
            </Select.Option>
          );
        })}
    </Select>
  );
};
