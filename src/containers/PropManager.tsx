import React from "react";
import { Tabs, Icon } from "antd";
import Draggable from "react-draggable";
import { Debugger } from "./Debugger";
import { Props } from "./Props";

const TabPane = Tabs.TabPane;

export const PropManager: React.FC<IPropManager> = props => {
  const { onClose } = props;
  const uiJson = {
    schema: [
      {
        widget: "row",
        props: {
          children: [
            {
              widget: "column",
              props: {
                children: [
                  {
                    widget: "field",
                    props: { dataSource: "aam.aaa-policy.name" }
                  },
                  {
                    widget: "Custom/SSLi/Service/Form",
                    props: {
                      name: "name",
                      title: {
                        create: "Add New Object",
                        update: "Edit Object"
                      },
                      description: {
                        create:
                          "Please provide following information to create a new object",
                        update:
                          "Please provide following information to edit object"
                      },
                      children: []
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <Draggable>
      <div className="props">
        <a className="close-button" onClick={onClose}>
          <Icon type="close" />
        </a>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Props" key="1">
            <Props />
          </TabPane>
          <TabPane tab="Debug" key="2">
            <Debugger />
          </TabPane>
        </Tabs>
      </div>
    </Draggable>
  );
};
