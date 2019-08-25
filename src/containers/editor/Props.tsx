import React, { useContext } from "react";
import _ from "lodash";
import { Collapse, Form } from "antd";
import { PropItem } from "./PropItem";
import { Context } from "../editor/Context";
import { IDERegister, formatTitle } from "../../helpers";

const Panel = Collapse.Panel;

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
                    type="prop"
                    key={`key=${entry[0]}`}
                  />
                ))}
              </ul>
            </Panel>
          ) : null}
          <Panel header="Data Binding" key="2">
            <ul className="list">
              <PropItem />
              <PropItem />
              <PropItem />
              <PropItem />
              <PropItem />
              <PropItem />
            </ul>
          </Panel>
          {!_.isEmpty(allEvents) ? (
            <Panel header="Events" key="3">
              <ul className="list">
                {allEvents.map((name: any) => (
                  <PropItem name={name} type="event" key={`key=${name}`} />
                ))}
              </ul>
            </Panel>
          ) : null}
        </Collapse>
      </Form>
    </div>
  );
};
