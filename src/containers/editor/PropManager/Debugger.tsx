import React, { useContext, useState, useCallback } from "react";
import _ from "lodash";
import ReactJson from "react-json-view";
import {
  Collapse,
  TreeSelect,
  Row,
  Col,
  Input,
  Select,
  Form,
  Icon
} from "antd";
import { IDEEditorContext, GlobalContext } from "../../Context";
import * as Panels from "./Panels";
import { getActiveUINode } from "../../../helpers";
import { PluginManager } from "uiengine";
import { DND_IDE_NODE_TYPE } from "../../../helpers";
import { useDrop } from "react-dnd";

const Panel = Collapse.Panel;
const TreeNode = TreeSelect.TreeNode;
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

export const Debugger: React.FC = (props: any) => {
  const { editNode } = useContext(IDEEditorContext);

  const { preview } = useContext(GlobalContext);

  // preview json
  let uiJson: any = {},
    dataJson;
  if (editNode) {
    uiJson = editNode.schema;
    dataJson = editNode.dataNode.schema;
  } else {
    const uiNode = getActiveUINode(true);
    uiJson = _.get(uiNode, "schema", {});
  }

  const [struct, setStruct] = useState<any>("category-id-tree");
  const [exclude, setExclude] = useState<any>("non-empty-queue");
  const [componentID, setComponentID] = useState<any>();

  let pluginData = PluginManager.getInstance().exportHistoryRecords({
    struct,
    exclude,
    include: {
      id: componentID
    }
  });
  const changeStruct = useCallback((value: any) => {
    setStruct(value);
  }, []);

  const changeExclude = useCallback((value: any) => {
    setExclude(value);
  }, []);

  // drop id
  const changeComponentId = (e: any) => {
    let id;
    if (_.has(e, "target")) {
      id = e.target.value;
    } else {
      id = e;
    }
    setComponentID(id);
  };
  const onClickFetchCurrentId = useCallback(() => {
    if (editNode) {
      changeComponentId(editNode.id);
    }
  }, []);

  const [collect, drop] = useDrop({
    accept: [DND_IDE_NODE_TYPE],
    drop: async (item: DragItem) => {
      const draggingNode = item.uinode;
      const schema = draggingNode.schema;
      let id = _.get(schema, "id", _.get(schema, "_id"));
      changeComponentId(id);
    }
  });

  return (
    <div className="ide-props-events">
      <Collapse accordion defaultActiveKey={"request-params"}>
        <Panel header="Networking " key="request-params">
          <Panels.RequestParams
            formItemLayout={formItemLayout}
            tailFormItemLayout={tailFormItemLayout}
          ></Panels.RequestParams>
          {/* <ReactJson
              indentWidth={2}
              src={[]}
              displayDataTypes={false}
              collapsed={false}
              collapseStringsAfterLength={50}
            /> */}
        </Panel>
        <Panel header="Initial Params" key="running-params">
          <Panels.RunningParams
            formItemLayout={formItemLayout}
            tailFormItemLayout={tailFormItemLayout}
          ></Panels.RunningParams>
        </Panel>
      </Collapse>
      <Collapse
        accordion
        defaultActiveKey={preview ? "plugin" : "ui-node-json"}
      >
        <Panel header="UI JSON" key="ui-node-json">
          <div className="debugger-tree">
            <ReactJson
              indentWidth={2}
              src={uiJson}
              onEdit={(d: any) => {
                console.log(d);
              }}
              displayDataTypes={false}
              collapsed={2}
              collapseStringsAfterLength={50}
            />
          </div>
        </Panel>
        {dataJson ? (
          <Panel header="Data JSON" key="ui-data-json">
            <div className="debugger-tree">
              <ReactJson
                indentWidth={2}
                src={dataJson}
                onEdit={(d: any) => {
                  console.log(d);
                }}
                displayDataTypes={false}
                collapsed={2}
                collapseStringsAfterLength={50}
              />
            </div>
          </Panel>
        ) : null}
        <Panel header="Plugin Data" key="plugin">
          <div className="plugin-filter">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Category">
                  <Select value={struct} onChange={changeStruct}>
                    <Select.Option value="category-id-tree">
                      Category ID Tree
                    </Select.Option>
                    <Select.Option value="id-category-tree">
                      ID Category Tree
                    </Select.Option>
                    <Select.Option value="category-tree">
                      Category Tree
                    </Select.Option>
                    <Select.Option value="sequence">Sequence</Select.Option>
                    <Select.Option value="id-tree">ID Tree</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Include">
                  <Select value={exclude} onChange={changeExclude}>
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="empty-queue">
                      With Queue Empty
                    </Select.Option>
                    <Select.Option value="non-empty-queue">
                      Queue Data
                    </Select.Option>
                    <Select.Option value="empty-record">
                      With Record
                    </Select.Option>
                    <Select.Option value="non-empty-record">
                      No Record
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Component ID (Drag)">
                  <div ref={drop}>
                    <Input
                      title="Drag any element right here from drawingboard"
                      value={componentID}
                      onChange={changeComponentId}
                      size="small"
                      addonAfter={
                        <Icon
                          type="border-inner"
                          title="Use current edit node"
                          onClick={onClickFetchCurrentId}
                        />
                      }
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Row>
            <Col>
              <Form.Item>
                <div className="debugger-tree">
                  <ReactJson
                    indentWidth={2}
                    src={pluginData}
                    displayDataTypes={true}
                    collapsed={1}
                    collapseStringsAfterLength={50}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
};
