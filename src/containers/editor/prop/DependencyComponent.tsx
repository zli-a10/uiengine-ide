import React, { useState, useCallback } from "react";
import _ from "lodash";
import {
  Select,
  Switch,
  Input,
  Radio,
  Form,
  TreeSelect,
  List,
  Button,
  Row,
  Col
} from "antd";
// import { formatTitle } from "../../../helpers";
// const ButtonGroup = Button.Group;

const SelectorItem = (props: any) => {
  const { data, group } = props;
  const [inputValue, setInputValue] = useState(data[1]);

  const changeValue = (e: any) => {
    setInputValue(e.target.value);
  };

  const onMouseDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const formItemLayout = {
    // labelCol: { span: 7 },
    // wrapperCol: { span: 12 }
  };
  return (
    <div className="deps-editor">
      <List.Item>
        <Form.Item label="Compare">
          <Select size="small">
            <Select.Option value="state">State</Select.Option>
            <Select.Option value="data">Data</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Source" {...formItemLayout}>
          <Input
            value={inputValue}
            onBlur={changeValue}
            onPressEnter={changeValue}
            onMouseDown={onMouseDown}
            {...formItemLayout}
          />
        </Form.Item>
        {group !== "Visible" ? (
          <Form.Item label="Value">
            <Input value={inputValue} />
          </Form.Item>
        ) : (
          <Form.Item label="State">
            <Select size="small" value={inputValue} onChange={changeValue}>
              <Select.Option value={1}>True</Select.Option>
              <Select.Option value={0}>False</Select.Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Add">
          <Button type="danger" icon="delete" size="small" />
        </Form.Item>
      </List.Item>
    </div>
  );
};

const DepGroup = (props: any) => {
  const [groupValue, setGroupValue] = useState(false);
  const [logicValue, setLogicValue] = useState(1);
  const data = [["name1", "value1"], ["name2", "value2"], ["name3", "value3"]];
  const [listValue, setListValue] = useState(data);

  const onGroupChange = (checked: any) => {
    console.log(checked, "checked");
    setGroupValue(checked);
  };

  const onLogicChange = (e: any) => {
    setLogicValue(e.target.value);
  };

  const onListValueChange = (value: any) => {
    setListValue(value);
  };

  return (
    <>
      <Form.Item label={props.group}>
        <Switch checked={groupValue} onChange={onGroupChange} />
      </Form.Item>
      {groupValue ? (
        <>
          <Row type="flex" justify="space-around">
            <Col span={16}>
              <Form.Item label="Logic Strategy">
                <Radio.Group onChange={onLogicChange} value={logicValue}>
                  <Radio value={1}>And</Radio>
                  <Radio value={2}>Or</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{
                  textAlign: "right",
                  marginTop: "15px",
                  marginRight: "0px"
                }}
              >
                Add Rule <Button icon="plus" size="small" />
              </Form.Item>
            </Col>
          </Row>
          <List
            size="small"
            bordered
            dataSource={data}
            renderItem={item => (
              <SelectorItem
                data={item}
                group={props.group}
                onListValueChange={onListValueChange}
              />
            )}
          />
        </>
      ) : null}
    </>
  );
};

export const DependencyComponent = (props: any) => {
  return (
    <>
      <DepGroup {...props} group="Visible" />
      <DepGroup {...props} group="Valid" />
    </>
  );
};
