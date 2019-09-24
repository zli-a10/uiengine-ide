import React, { useContext } from "react";
import _ from "lodash";
import ReactJson from "react-json-view";
import { Collapse, Input, Form, Button, Select, TreeSelect } from "antd";
// import { IDEEditorContext, GlobalContext } from "../../Context";
// import { getActiveUINode } from "../../../helpers";
const TreeNode = TreeSelect.TreeNode;

export const InitialParams = (props: any) => {
  const { formItemLayout, tailFormItemLayout, value } = props;
  const changeDomain = () => {};

  return (
    <Form {...formItemLayout}>
      <Form.Item label="Data">
        <TreeSelect
          showSearch
          value={value}
          size="small"
          style={{ height: 22 }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select"
          allowClear
          multiple
          treeDefaultExpandAll
          onChange={changeDomain}
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
      <Form.Item label="Initial Mode">
        <Select defaultValue="new">
          <Select.Option value="new">New</Select.Option>
          <Select.Option value="update">Update</Select.Option>
          <Select.Option value="delete">Delete</Select.Option>
          <Select.Option value="view">View</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="URL Params">
        <Input type="textarea" />
      </Form.Item>
      <Form.Item label="Env Params">
        <Input type="textarea" />
      </Form.Item>
      <Form.Item label="Method">
        <Select defaultValue="post">
          <Select.Option value="post">Post</Select.Option>
          <Select.Option value="put">Put</Select.Option>
          <Select.Option value="delete">Delete</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" icon="play-circle">
          Initial
        </Button>
      </Form.Item>
    </Form>
  );
};
