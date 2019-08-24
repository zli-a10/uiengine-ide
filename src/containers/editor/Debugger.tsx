import React, { useContext } from "react";
import _ from "lodash";
import { Collapse, Input } from "antd";
import { Context } from "./Context";
import ReactJson from "react-json-view";
import { getActiveUINode } from "../../helpers";

const Panel = Collapse.Panel;

export const Debugger: React.FC = (props: any) => {
  function callback() {}
  const { preview, info } = useContext(Context);
  const uiNode = getActiveUINode();
  const uiJson = _.get(uiNode, "schema", {});

  return (
    <div className="ide-props-events">
      <h3>(Input)</h3>
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
          <Collapse onChange={callback} accordion defaultActiveKey={"1"}>
            <Panel header="Response" key="1">
              <ReactJson
                indentWidth={2}
                src={uiJson}
                displayDataTypes={false}
                collapsed
                collapseStringsAfterLength={50}
              />
            </Panel>
            <Panel header="Data Posted" key="2">
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
            <Panel header="Plugins" key="3" />
            <Panel header="Data Node" key="4" />
            <Panel header="UI Node" key="5" />
            <Panel header="State Node" key="6" />
            <Panel header="Data Pool" key="7" />
          </Collapse>
        </>
      ) : (
        <Collapse onChange={callback} accordion defaultActiveKey={"1"}>
          <Panel header="UI JSON" key="1">
            <ReactJson
              indentWidth={2}
              src={uiJson}
              onEdit={(d: any) => {
                console.log(d);
              }}
              displayDataTypes={false}
              collapsed
              collapseStringsAfterLength={50}
            />
          </Panel>
        </Collapse>
      )}
    </div>
  );
};
