import React, { useContext } from "react";
import _ from "lodash";
import { Collapse, Input } from "antd";
import { Context } from "./Context";
import ReactJson from "react-json-view";
import { getActiveUINode } from "../../helpers";

const Panel = Collapse.Panel;

export const Debugger: React.FC = (props: any) => {
  function callback() {}
  const {
    preview,
    info: { editNode }
  } = useContext(Context);
  let uiJson: any = {};
  if (editNode) {
    uiJson = editNode.schema;
  } else {
    const uiNode = getActiveUINode(true);
    uiJson = _.get(uiNode, "schema", {});
  }

  return (
    <div className="ide-props-events">
      <Collapse
        onChange={callback}
        accordion
        defaultActiveKey={"running-params"}
      >
        <Panel header="Running Params" key="running-params"></Panel>

        {preview ? (
          <>
            <div className="ide-debugger">
              <h4>Set Debug Host:</h4>
              <Input
                size={"default"}
                placeholder={"192.168.x.x"}
                addonAfter={<a>Send</a>}
              />
            </div>

            <Panel header="Response Data" key="reponse-data">
              <ReactJson
                indentWidth={2}
                src={[]}
                displayDataTypes={false}
                collapsed={false}
                collapseStringsAfterLength={50}
              />
            </Panel>
            <Panel header="Request Data" key="request-data">
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
            <Panel header="Plugins" key="plugins" />
            <Panel header="Data Node" key="data-node" />
            <Panel header="UI Node" key="ui-node" />
            <Panel header="State Node" key="state-node" />
            <Panel header="Data Pool" key="data-pool" />
          </>
        ) : (
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
        )}
      </Collapse>
    </div>
  );
};
