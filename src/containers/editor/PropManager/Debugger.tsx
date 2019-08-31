import React, { useContext } from "react";
import _ from "lodash";
import { Collapse, Input, Form, Button, Select, TreeSelect } from "antd";
import { IDEEditorContext, GlobalContext } from "../../Context";
import ReactJson from "react-json-view";
import { getActiveUINode } from "../../../helpers";

const Panel = Collapse.Panel;
const TreeNode = TreeSelect.TreeNode;

export const Debugger: React.FC = (props: any) => {
  const { editNode } = useContext(IDEEditorContext);

  const { preview } = useContext(GlobalContext);

  // layout
  const formItemLayout = {
    colon: false,
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 16 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 6,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 6
      }
    }
  };

  // preview json
  let uiJson: any = {};
  if (editNode) {
    uiJson = editNode.schema;
  } else {
    const uiNode = getActiveUINode(true);
    uiJson = _.get(uiNode, "schema", {});
  }

  const genRandomData = () => {};

  let value = "";
  const changeDomain = () => {};

  return (
    <div className="ide-props-events">
      {preview ? (
        <Collapse accordion defaultActiveKey={"running-params"}>
          <Panel header="Running Params" key="running-params">
            <Form {...formItemLayout}>
              <Form.Item label="API Host">
                <Input
                  size={"default"}
                  placeholder={"192.168.x.x"}
                  addonAfter={<a>Send</a>}
                />
              </Form.Item>
              <Form.Item label="Data Domain">
                <TreeSelect
                  showSearch
                  style={{ width: 300 }}
                  value={value}
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
                    <TreeNode
                      value="parent 1-1"
                      title="parent 1-1"
                      key="random2"
                    >
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
              <Form.Item label="URL Params(JSON)">
                <Input type="textarea" />
              </Form.Item>
              <Form.Item label="Env Params(JSON)">
                <Input type="textarea" />
              </Form.Item>
              <Form.Item label="Submit Method">
                <Select defaultValue="post">
                  <Select.Option value="post">Post</Select.Option>
                  <Select.Option value="put">Put</Select.Option>
                  <Select.Option value="delete">Delete</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  icon="play-circle"
                  onClick={genRandomData}
                >
                  Run with Mock Data
                </Button>
              </Form.Item>
            </Form>
          </Panel>
          <Panel header="Request" key="request-data">
            <ReactJson
              indentWidth={2}
              collapsed
              src={[
                {
                  "slb.virtual-server":
                    "http://[host]/axapi/v3/slb/virtual-server/"
                }
              ]}
            />
          </Panel>
          <Panel header="Response Data" key="reponse-data">
            <ReactJson
              indentWidth={2}
              src={[]}
              displayDataTypes={false}
              collapsed={false}
              collapseStringsAfterLength={50}
            />
          </Panel>

          <Panel header="Plugins" key="plugins" />
          <Panel header="Data Node" key="data-node" />
          <Panel header="UI Node" key="ui-node" />
          <Panel header="State Node" key="state-node" />
          <Panel header="Data Pool" key="data-pool" />
        </Collapse>
      ) : (
        <Collapse accordion defaultActiveKey={"running-params"}>
          <Panel header="UI JSON" key="ui-node-json">
            <ReactJson
              indentWidth={2}
              src={uiJson}
              onEdit={(d: any) => {
                console.log(d);
              }}
              displayDataTypes={false}
              collapsed={3}
              collapseStringsAfterLength={50}
            />
          </Panel>
        </Collapse>
      )}
    </div>
  );
};
