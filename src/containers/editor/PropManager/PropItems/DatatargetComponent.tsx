import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { Form, List, Button, TreeSelect } from "antd";

export const DatatargetComponent = (props: any) => {
  const { schema, data, name, uinode, onChange } = props;

  const [targets, setTargets] = useState([
    {
      key: "any",
      source: "slb.virtual-server",
      schema: "slb.virtual-server",
      dependOn: ""
    },
    {
      key: "any1",
      source: "slb.virtual-server",
      schema: "slb.virtual-server",
      dependOn: ""
    },
    {
      key: "any2",
      source: "slb.virtual-server",
      schema: "slb.virtual-server",
      dependOn: ""
    }
  ]);

  const treeData = [
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
  ];

  const onChangeSource = () => {};
  const onChangeSchema = () => {};
  const onChangeDependOn = () => {};

  return (
    <div className="targets">
      <h5 className="title">Targets</h5>
      <div className=" list cancel-drag">
        <List
          dataSource={targets}
          renderItem={(item: any) => (
            <List.Item key={item.key}>
              <Form.Item label="Source">
                <TreeSelect
                  allowClear
                  value={item.source}
                  treeData={treeData}
                  placeholder="Please select"
                  onChange={onChangeSource}
                />
              </Form.Item>
              <Form.Item label="Schema">
                <TreeSelect
                  allowClear
                  value={item.schema}
                  treeData={treeData}
                  placeholder="Please select"
                  onChange={onChangeSchema}
                />
              </Form.Item>
              <Form.Item label="Depend On">
                <TreeSelect
                  allowClear
                  value={item.dependOn}
                  treeData={treeData}
                  placeholder="Please select"
                  onChange={onChangeDependOn}
                />
              </Form.Item>
            </List.Item>
          )}
        ></List>
      </div>
      <div className="add-target">
        <Button type="primary" size="small" icon="plus">
          Add Target
        </Button>
      </div>
    </div>
  );
};
