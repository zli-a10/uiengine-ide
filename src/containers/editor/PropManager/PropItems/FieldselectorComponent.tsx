import React, { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { TreeSelect } from "antd";
import { Form } from "antd";
import { formatTitle } from "../../../../helpers";
const { SHOW_PARENT } = TreeSelect;

export const FieldselectorComponent = (props: any) => {
  let { onChange: onChangeValue, value, uinode, disabled } = props;

  const [inputValue, setInputValue] = useState();
  useEffect(() => {
    setInputValue(value);
  }, [value, uinode]);

  const onChange = (value: any) => {
    console.log("onChange ", value);
    setInputValue(value);
  };

  const treeData = [
    {
      title: "Node1",
      value: "0-0",
      key: "0-0",
      children: [
        {
          title: "Child Node1",
          value: "0-0-0",
          key: "0-0-0"
        }
      ]
    },
    {
      title: "Node2",
      value: "0-1",
      key: "0-1",
      children: [
        {
          title: "Child Node3",
          value: "0-1-0",
          key: "0-1-0"
        },
        {
          title: "Child Node4",
          value: "0-1-1",
          key: "0-1-1"
        },
        {
          title: "Child Node5",
          value: "0-1-2",
          key: "0-1-2"
        }
      ]
    }
  ];

  const tProps = {
    disabled,
    treeData,
    value: inputValue,
    onChange: onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: "Please select"
  };

  return (
    <Form.Item label={formatTitle(props.name)}>
      <TreeSelect {...tProps} size="small" />
    </Form.Item>
  );
};
