import React, { useState, useCallback, useEffect } from "react";
// import { IDEEditorContext } from "../../../Context";
import _ from "lodash";
import { Input, Select } from "antd";
import { Form } from "antd";
// import { IDERegister } from "../../../../helpers";

export const LayoutComponent = (props: any) => {
  const { uinode, onChange: onChangeProps, disabled } = props;
  let anyData = _.get(uinode, "schema.layout", {}) as any;

  // const { name, disabled, onChange: onChangeProps } = props;
  const [display, setDisplay] = useState(_.get(anyData, "display"));
  const onChangeDisplay = useCallback(
    (v: any) => {
      setDisplay(v);
      _.set(anyData, "display", v);
      onChangeProps(anyData);
    },
    [uinode, anyData]
  );

  const [flex, setFlex] = useState(_.get(anyData, "flex"));
  const onChangeFlex = useCallback(
    (e: any) => {
      setFlex(e.target.value);
      _.set(anyData, "flex", e.target.value);
      onChangeProps(anyData);
    },
    [uinode, anyData]
  );

  const displayValues = [
    "inherit",
    "flex",
    "none",
    "block",
    "inline",
    "inline-block",
    "list-item",
    "run-in",
    "compact",
    "marker",
    "table",
    "inline-table",
    "table-row-group",
    "table-header-group",
    "table-footer-group",
    "table-row",
    "table-column-group",
    "table-column",
    "table-cell",
    "table-caption"
  ];

  useEffect(() => {
    setDisplay(_.get(anyData, "display"));
    setFlex(_.get(anyData, "flex"));
  }, [anyData, uinode]);

  return (
    <div className="layout-editor">
      <Form.Item label="Display">
        <Select
          onChange={onChangeDisplay}
          size="small"
          defaultValue={"inherit"}
          value={display}
          disabled={disabled}
        >
          {displayValues.map((value: any, index: number) => (
            <Select.Option value={value} key={`key-${index}`}>
              {_.words(value).join(" ")}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Flex">
        <Input
          type="number"
          disabled={disabled}
          value={flex}
          onChange={onChangeFlex}
          min={1}
          max={24}
        />
      </Form.Item>
    </div>
  );
};
