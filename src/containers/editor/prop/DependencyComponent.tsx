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
  const { data, index, root, setListValue } = props;
  const [inputValue, setInputValue] = useState(data);

  const changeValue = (path: string) => {
    // setInputValue(e.target.value);
    return (e: any) => {
      const value = e.target ? e.target.value : e;
      _.set(data, path, value);
      console.log("update new data", data);
      setInputValue(Date.now());
    };
  };

  const onMouseDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const onDeleteItem = useCallback((e: any) => {
    e.stopPropagation();
    // console.log(_.cloneDeep(root));
    root.splice(index, 1);
    // console.log(_.cloneDeep(root));
    setListValue(_.cloneDeep(root));
  }, []);

  const formItemLayout = {
    // labelCol: { span: 7 },
    // wrapperCol: { span: 12 }
  };

  // fetch data
  const compareRule = _.get(data, "state") ? "state" : "data";
  const rule = _.get(data, "stateCompareRule");
  const source = _.get(data, "selector.datasource.source");
  const value = _.get(data, compareRule === "state" ? "state.visible" : "data");
  // console.log(compareRule, rule, source, value);

  return (
    <div className="deps-editor">
      <List.Item>
        <Form.Item label="Compare">
          <Select size="small" defaultValue={"state"} value={compareRule}>
            <Select.Option value="state">State</Select.Option>
            <Select.Option value="data">Data</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Rule" style={{ width: "150px" }}>
          <Select
            size="small"
            defaultValue={"is"}
            value={rule}
            onChange={changeValue(
              compareRule === "data" ? "dataCompareRule" : "stateCompareRule"
            )}
          >
            <Select.Option value="is" title="is">
              is
            </Select.Option>
            <Select.Option value="not" title="not">
              not
            </Select.Option>
            <Select.Option value="above" title="above">
              above
            </Select.Option>
            <Select.Option value="below" title="below">
              below
            </Select.Option>
            <Select.Option value="include" title="include">
              include
            </Select.Option>
            <Select.Option value="exclude" title="exclude">
              exclude
            </Select.Option>
            <Select.Option value="matchOne" title="matchOne">
              matchOne
            </Select.Option>
            <Select.Option value="matchAll" title="matchAll">
              matchAll
            </Select.Option>
            <Select.Option value="dismatchOne" title="dismatchOne">
              dismatchOne
            </Select.Option>
            <Select.Option value="dismatchAll" title="dismatchAll">
              dismatchAll
            </Select.Option>
            <Select.Option value="empty" title="empty">
              empty
            </Select.Option>
            <Select.Option value="notEmpty" title="notEmpty">
              notEmpty
            </Select.Option>
            <Select.Option value="or" title="or">
              or
            </Select.Option>
            <Select.Option value="regexp" title="regexp">
              regexp
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Source" {...formItemLayout}>
          <Input
            value={source}
            onMouseDown={onMouseDown}
            {...formItemLayout}
            onChange={changeValue("selector.datasource.source")}
          />
        </Form.Item>
        {compareRule === "data" ? (
          <Form.Item label="Value">
            <Input
              value={value}
              onChange={changeValue("data")}
              onMouseDown={onMouseDown}
            />
          </Form.Item>
        ) : (
          <Form.Item label="State">
            <Select
              size="small"
              value={value ? 1 : 0}
              onChange={changeValue("state.visible")}
            >
              <Select.Option value={1}>True</Select.Option>
              <Select.Option value={0}>False</Select.Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Add">
          <Button
            type="danger"
            icon="delete"
            size="small"
            onClick={onDeleteItem}
          />
        </Form.Item>
      </List.Item>
    </div>
  );
};

const DepGroup = (props: any) => {
  const { value, group, name, onChange } = props;
  const [groupValue, setGroupValue] = useState(!_.isEmpty(value));
  // const [logicValue, setLogicValue] = useState(1);
  const data = _.get(value, `${name}.deps`, []);
  // const data = [["name1", "value1"], ["name2", "value2"], ["name3", "value3"]];
  const [listValue, setListValue] = useState(data);

  const onGroupChange = (checked: any) => {
    setGroupValue(checked);
  };

  const [logicValue, setLogicValue] = useState(
    _.get(value, `${name}.strategy`, "and")
  );
  const onDataChange = (e: any) => {
    _.set(value, `${name}.strategy`, e.target.value);
    setLogicValue(e.target.value);
  };

  const onAddItems = () => {
    data.push({
      selector: "",
      state: { visible: true },
      stateCompareRule: "is"
    });
    const newData = _.clone(data);
    _.set(value, `${name}.deps`, newData);
    setListValue(newData);
  };

  const onSave = () => {
    if (groupValue && !_.isEmpty(listValue)) onChange(value);
  };

  // console.log(value, listValue, ".data");
  return (
    <>
      <Form.Item label={group}>
        <Switch checked={groupValue} onChange={onGroupChange} />
      </Form.Item>
      {groupValue ? (
        <>
          <Row type="flex" justify="space-around">
            <Col span={16}>
              <Form.Item label="Logic Strategy">
                <Radio.Group onChange={onDataChange} value={logicValue}>
                  <Radio value={"and"}>And</Radio>
                  <Radio value={"or"}>Or</Radio>
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
                Add Rule{" "}
                <Button.Group>
                  <Button icon="plus" size="small" onClick={onAddItems} />
                  <Button icon="save" size="small" onClick={onSave} />
                </Button.Group>
              </Form.Item>
            </Col>
          </Row>
          <List
            size="small"
            bordered
            dataSource={listValue}
            renderItem={(item: any, index: number) => (
              <SelectorItem
                data={item}
                index={index}
                root={listValue}
                group={props.group}
                setListValue={setListValue}
                onChange={onChange}
              />
            )}
          />
        </>
      ) : null}
    </>
  );
};

export const DependencyComponent = (props: any) => {
  const { value, onChange } = props;
  const finalResult = _.cloneDeep(value || {});

  const onItemChange = (path: string) => {
    return (v: any) => {
      _.set(finalResult, path, v);
      console.log(finalResult, "final result", path, v);
      onChange(finalResult);
    };
  };
  return (
    <>
      <DepGroup
        {...props}
        group="Visible"
        name="visible"
        onChange={onItemChange("state.visible")}
        value={_.get(finalResult, "visible", {})}
      />
      <DepGroup
        {...props}
        group="Valid"
        name="valid"
        onChange={onItemChange("state.valid")}
        value={_.get(finalResult, "valid", {})}
      />
    </>
  );
};
