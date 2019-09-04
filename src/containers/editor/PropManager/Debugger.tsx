import React, { useContext } from "react";
import _ from "lodash";
import { Collapse, TreeSelect } from "antd";
import { IDEEditorContext, GlobalContext } from "../../Context";
import ReactJson from "react-json-view";
import * as Panels from "./Panels";
import { getActiveUINode } from "../../../helpers";

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

  return (
    <div className="ide-props-events">
      {preview ? (
        <Collapse accordion defaultActiveKey={"request-params"}>
          <Panel header="Request Params" key="request-params">
            <Panels.RequestParams
              formItemLayout={formItemLayout}
              tailFormItemLayout={tailFormItemLayout}
            ></Panels.RequestParams>
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

          <Panel header="UIEngine Data" key="uiengine">
            <Collapse accordion defaultActiveKey={"plugins"} bordered={false}>
              <Panel header="Plugins" key="plugins" />
              <Panel header="Data Node" key="data-node" />
              <Panel header="UI Node" key="ui-node" />
              <Panel header="State Node" key="state-node" />
              <Panel header="Data Pool" key="data-pool" />
            </Collapse>
          </Panel>
        </Collapse>
      ) : (
        <Collapse accordion defaultActiveKey={"running-params"}>
          <Panel header="Initial Params" key="running-params">
            <Panels.RunningParams
              formItemLayout={formItemLayout}
              tailFormItemLayout={tailFormItemLayout}
            ></Panels.RunningParams>
          </Panel>
          <Panel header="Request Params" key="request-params">
            <Panels.RequestParams
              formItemLayout={formItemLayout}
              tailFormItemLayout={tailFormItemLayout}
            ></Panels.RequestParams>
          </Panel>
          <Panel header="UI JSON" key="ui-node-json">
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
          </Panel>
          {dataJson ? (
            <Panel header="Data JSON" key="ui-data-json">
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
            </Panel>
          ) : null}
        </Collapse>
      )}
    </div>
  );
};
