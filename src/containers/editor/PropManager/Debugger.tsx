import React, { useContext, useState, useCallback } from "react";
import _ from "lodash";
import ReactJson from "react-json-view";
import { Collapse, Row, Col, Input, Select, Form, Icon } from "antd";
import { useDrop } from "react-dnd";
import { IDEEditorContext, GlobalContext, PropsContext } from "../../Context";
import * as Panels from "./Panels";
import { getActiveUINode } from "../../../helpers";
import { PluginManager } from "uiengine";
import { DND_IDE_NODE_TYPE, useDeepCompareEffect } from "../../../helpers";

const Panel = Collapse.Panel;
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

  const { time } = useContext(PropsContext);

  // preview json
  const [stateUiJson, setStateUIJson] = useState();
  const [stateDataJson, setStateDataJson] = useState();

  const getJson = () => {
    let uiJson: any = {},
      dataJson;
    if (editNode) {
      uiJson = editNode.schema;
      dataJson = editNode.dataNode.schema;
    } else {
      const uiNode = getActiveUINode(true);
      uiJson = _.get(uiNode, "schema", {});
    }
    setStateUIJson(uiJson);
    setStateDataJson(dataJson);
  };

  const [struct, setStruct] = useState<any>("category-id-tree");
  const [exclude, setExclude] = useState<any>("empty-record");
  const [componentID, setComponentID] = useState<any>(_.get(editNode, "id"));

  const pluginManager = PluginManager.getInstance();
  let pluginData = pluginManager.exportHistoryRecords({
    struct,
    exclude,
    include: {
      id: componentID === "" ? undefined : componentID
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
  }, [editNode]);

  const [collect, drop] = useDrop({
    accept: [DND_IDE_NODE_TYPE],
    drop: async (item: DragItem) => {
      const draggingNode = item.uinode;
      const schema = draggingNode.schema;
      let id = _.get(schema, "id", _.get(schema, "_id"));
      changeComponentId(id);
    }
  });

  const [currentTime, setCurrentTime] = useState(Date.now());
  const onRefresh = (e: any) => {
    e.stopPropagation();
    setCurrentTime(Date.now());
  };

  // set data for nodes
  const [uiNode, setUINode] = useState({});
  const fetchUINode = useCallback(() => {
    const {
      id,
      schema,
      errorInfo,
      rootName,
      props,
      stateInfo,
      nodes
    } = editNode;
    const data = {
      id,
      schema,
      props,
      stateInfo,
      nodes,
      errorInfo,
      rootName
    };
    setUINode(data);
  }, [editNode]);

  const [dataNode, setDataNode] = useState({});
  const fetchDataNode = useCallback(() => {
    const { id, schema, rootSchema, source, dataPool } = editNode.dataNode;
    const data = editNode.dataNode.data;
    const info = {
      id,
      source,
      schema,
      data,
      rootSchema,
      dataPool
    };
    setDataNode(info);
  }, [editNode]);

  const [stateNode, setStateNode] = useState({});
  const fetchStateNode = useCallback(() => {
    const { id, state, errorInfo } = editNode.stateNode;
    const info = {
      id,
      state,
      errorInfo
    };
    setStateNode(info);
  }, [editNode]);

  useDeepCompareEffect(() => {
    if (_.get(editNode, `id`)) {
      changeComponentId(editNode.id);
      fetchUINode();
      fetchDataNode();
      fetchStateNode();
    }
    getJson();
  }, [editNode, time]);

  // change ui tree schema
  const onChangeTreeSchema = useCallback(
    async (d: any) => {
      const namespace = _.cloneDeep(d.namespace);
      namespace.push(d.name);
      _.set(editNode.schema, namespace, d.new_value);
      await editNode.updateLayout();
      editNode.sendMessage(true);
    },
    [editNode]
  );

  const onAddTreeSchema = useCallback(
    async (d: any) => {
      _.merge(editNode.schema, d.new_value);
      await editNode.updateLayout();
      editNode.sendMessage(true);
    },
    [editNode]
  );

  const onDeleteTreeSchema = useCallback(
    async (d: any) => {
      const namespace = _.cloneDeep(d.namespace);
      namespace.push(d.name);
      _.unset(editNode.schema, namespace);
      await editNode.updateLayout();
      editNode.sendMessage(true);
    },
    [editNode]
  );

  return (
    <div className="ide-props-events">
      <Collapse accordion>
        <Panel header="Test Toolkits " key="request-params">
          <Panels.TestToolkits
            formItemLayout={formItemLayout}
            tailFormItemLayout={tailFormItemLayout}
          ></Panels.TestToolkits>
          {/* <ReactJson
              indentWidth={2}
              src={[]}
              displayDataTypes={false}
              collapsed={false}
              collapseStringsAfterLength={50}
            /> */}
        </Panel>
        <Panel header="Initial Params" key="running-params">
          <Panels.InitialParams
            formItemLayout={formItemLayout}
            tailFormItemLayout={tailFormItemLayout}
          ></Panels.InitialParams>
        </Panel>
      </Collapse>
      <Collapse accordion>
        <Panel header="UI JSON" key="ui-node-json">
          <div className="debugger-tree">
            <ReactJson
              indentWidth={2}
              src={stateUiJson}
              onEdit={onChangeTreeSchema}
              onAdd={onAddTreeSchema}
              onDelete={onDeleteTreeSchema}
              displayDataTypes={false}
              collapsed={2}
              collapseStringsAfterLength={50}
            />
          </div>
        </Panel>
        {stateDataJson ? (
          <Panel header="Data JSON" key="ui-data-json">
            <div className="debugger-tree">
              <ReactJson
                indentWidth={2}
                src={stateDataJson}
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
              <Col span={10}>
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
              <Col span={10}>
                <Form.Item label="Include">
                  <Select value={exclude} onChange={changeExclude}>
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="empty-queue">Has Queue</Select.Option>
                    <Select.Option value="non-empty-queue">
                      No Queue
                    </Select.Option>
                    <Select.Option value="empty-record">
                      Has Record
                    </Select.Option>
                    <Select.Option value="non-empty-record">
                      No Record
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Icon type="redo" title="Reload" onClick={onRefresh} />
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
        <Panel
          header="Nodes"
          key="nodes"
          extra={<Icon type="reload" onClick={onRefresh} />}
        >
          <Collapse accordion bordered={false} defaultActiveKey={"ui-node"}>
            <Panel header="UI Node" key="ui-node">
              <div className="debugger-tree ui-node">
                <ReactJson
                  indentWidth={2}
                  src={uiNode}
                  displayDataTypes={true}
                  collapsed={1}
                  collapseStringsAfterLength={50}
                />
              </div>
            </Panel>
            <Panel header="Data Node" key="data-node">
              <div className="debugger-tree data-node">
                <ReactJson
                  indentWidth={2}
                  src={dataNode}
                  displayDataTypes={true}
                  collapsed={1}
                  collapseStringsAfterLength={50}
                />
              </div>
            </Panel>
            <Panel header="State Node" key="state-node">
              <div className="debugger-tree state-node">
                <ReactJson
                  indentWidth={2}
                  src={stateNode}
                  displayDataTypes={true}
                  collapsed={1}
                  collapseStringsAfterLength={50}
                />
              </div>
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
    </div>
  );
};
