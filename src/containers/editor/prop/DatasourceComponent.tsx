import React, { useState, useCallback } from "react";
import _ from "lodash";
import { TreeSelect, Switch, Form, Input } from "antd";
const TreeNode = TreeSelect.TreeNode;
const DatasourceItem = (props: any) => {
  return (
    <Form.Item label={props.label}>
      <TreeSelect
        showSearch
        style={{ width: 300 }}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        {...props}
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" />
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode
              value="sss"
              title={<b style={{ color: "#08c" }}>sss</b>}
              key="random3"
            />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    </Form.Item>
  );
};

export const DatasourceComponent = (props: any) => {
  const { data, ...rest } = props;
  return (
    <>
      <DatasourceItem label="Source" {...rest} data={_.get(data, "source")} />
      <DatasourceItem label="Schema" {...rest} data={_.get(data, "schema")} />
      <Form.Item label="Autoload">
        <Switch />
      </Form.Item>
      <Form.Item label="DefaultValue">
        <Input />
      </Form.Item>
    </>
  );
};
