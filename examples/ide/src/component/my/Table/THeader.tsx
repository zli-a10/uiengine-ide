import React from "react";
import _ from "lodash";
import { Checkbox } from "antd";
import { getComponent } from "uiengine";

const THeader = (props: any) => {
  let { children, columns, onSelectAll, allSelected = false, ...rest } = props;
  const tds = _.get(columns, "0.children", []);

  return (
    <thead className="ant-table-thead my-table-head">
      <tr>
        {columns && columns.length > 1 ? <th>&nbsp;</th> : null}
        {children ||
          tds.map((col: any, index: number) => {
            if (_.has(col, "props.selectAll")) {
              let componentName = _.get(
                col,
                "children[0].component",
                "antd:Checkbox"
              );
              if (componentName) {
                const CheckboxComponent: any = getComponent(componentName);
                if (CheckboxComponent) {
                  return (
                    <th key={`col-${index}`}>
                      <CheckboxComponent onChange={onSelectAll} {...rest} />
                    </th>
                  );
                }
              }
              return (
                <th key={`col-${index}`}>
                  <Checkbox onChange={onSelectAll} {...rest} />
                </th>
              );
            }
            return <th key={`col-${index}`}>{_.get(col, "props.title")}</th>;
          })}
      </tr>
    </thead>
  );
};

export default THeader;
