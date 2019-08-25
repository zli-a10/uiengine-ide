import React, { useContext } from "react";
import _ from "lodash";
import { Collapse, Form } from "antd";
import { PropItem } from "./PropItem";
import { Context } from "../editor/Context";
import { IDERegister, formatTitle } from "../../helpers";
import { PluginManager } from "uiengine";

const Panel = Collapse.Panel;
const plugins = PluginManager.getPlugins("ui.parser.event");

export const Props: React.FC = (props: any) => {
  const {
    info: { editNode }
  } = useContext(Context);
  let componentInfo: IComponentInfo = {} as IComponentInfo;
  if (editNode) {
    componentInfo = IDERegister.getComponentInfo(editNode.schema.component);
    // console.log(componentInfo, editNode);
  }

  const { title, component, schema } = componentInfo;

  let allEvents, restSchema;
  if (schema) {
    const { events, ...rest } = schema;
    allEvents = events;
    restSchema = rest;
  }

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

  // console.log("edit node", plugins, _.find(editNode.$events, { event: name }));
  return (
    <div className="ide-props-events">
      <h3>
        {formatTitle(title)} <i>({component})</i>
      </h3>
      <Form {...formItemLayout}>
        <Collapse accordion defaultActiveKey={"1"}>
          {!_.isEmpty(restSchema) ? (
            <Panel header="Component Props" key="1">
              <ul className="list">
                {Object.entries(restSchema).map((entry: any) => (
                  <PropItem
                    name={entry[0]}
                    schema={entry[1]}
                    key={`key=${entry[0]}`}
                    data={_.get(editNode, `props.${entry[0]}`)}
                  />
                ))}
              </ul>
            </Panel>
          ) : null}
          <Panel header="Data Source" key="2">
            <PropItem
              type="datasource"
              name="Data Schema"
              data={_.get(editNode, "schema.datasource.schema")}
            />
            <PropItem
              type="datasource"
              name="Data Source"
              data={_.get(editNode, "schema.datasource.source")}
            />
            <PropItem
              type="boolean"
              name="Autoload"
              data={_.get(editNode, "schema.datasource.autoload")}
            />
          </Panel>
          {!_.isEmpty(allEvents) ? (
            <Panel header="Events" key="3">
              {allEvents.map((name: any) => (
                <PropItem
                  name={name}
                  type="enum"
                  key={`key-${name}`}
                  options={_.keys(plugins)}
                  data={_.find(editNode.$events, { event: name })}
                />
              ))}
            </Panel>
          ) : null}
          <Panel header="Dependency" key="4">
            <PropItem
              type="dependencyElement"
              name="Depend"
              data={_.get(editNode, "state", {})}
            />
          </Panel>
        </Collapse>
      </Form>
    </div>
  );
};
