import React, { useContext, useState, useMemo } from "react";
import _ from "lodash";
import { Collapse, Form, Icon, TreeSelect } from "antd";
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

  const genExtra = () => (
    <Icon
      type="plus"
      onClick={event => {
        event.stopPropagation();
      }}
    />
  );

  const [treeValue, selectTreeValue] = useState(component);
  const onTreeChange = (value: any) => {
    selectTreeValue(value);
  };

  const treeData = useMemo(
    () => [
      {
        title: "Node1",
        value: "0-0",
        key: "0-0",
        children: [
          {
            title: "Child Node1",
            value: "0-0-1",
            key: "0-0-1"
          },
          {
            title: "Child Node2",
            value: "0-0-2",
            key: "0-0-2"
          }
        ]
      },
      {
        title: "Node2",
        value: "0-1",
        key: "0-1"
      }
    ],
    []
  );
  // console.log("edit node", plugins, _.find(editNode.$events, { event: name }));
  return (
    <div className="ide-props-events">
      <TreeSelect
        className={"component-select"}
        value={treeValue}
        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
        treeData={treeData}
        placeholder={formatTitle(title)}
        treeDefaultExpandAll
        onChange={onTreeChange}
      />

      <Collapse accordion defaultActiveKey={"1"}>
        {!_.isEmpty(restSchema) ? (
          <Panel header="Component Props" key="1">
            <Form {...formItemLayout}>
              {Object.entries(restSchema).map((entry: any) => (
                <PropItem
                  section="prop"
                  name={entry[0]}
                  schema={entry[1]}
                  key={`key=${entry[0]}`}
                  data={_.get(editNode, `props.${entry[0]}`)}
                />
              ))}
            </Form>
          </Panel>
        ) : null}
        <Panel header="Data Source" key="2" extra={genExtra()}>
          <Form {...formItemLayout}>
            <PropItem
              section="datasource"
              type="datasource"
              data={_.get(editNode, "schema.datasource")}
            />
          </Form>
        </Panel>
        {!_.isEmpty(allEvents) ? (
          <Panel header="Events" key="3" extra={genExtra()}>
            <Form {...formItemLayout}>
              {allEvents.map((name: any) => (
                <PropItem
                  section="event"
                  name={name}
                  type="enum"
                  key={`key-${name}`}
                  options={_.keys(plugins)}
                  data={_.find(editNode.$events, { event: name })}
                />
              ))}
            </Form>
          </Panel>
        ) : null}
        <Panel header="Dependency" key="4">
          <Form>
            <PropItem
              section="dependency"
              type="dependency"
              data={_.get(editNode, "state", {})}
            />
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
};
