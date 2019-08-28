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
import { useDrop, DropTargetMonitor } from "react-dnd";
import classNames from "classnames";

import { DND_IDE_NODE_TYPE } from "../../../helpers";

const SelectorItem = (props: any) => {
  const { index, root, setListValue, onChange } = props;
  const data = _.get(root, `deps[${index}]`);
  const [, rerender] = useState();

  const changeValue = (path: string) => {
    // setInputValue(e.target.value);
    return (e: any) => {
      const value = e.target ? e.target.value : e;
      _.set(data, path, value);
      rerender(Date.now());
      onChange(_.cloneDeep(root));
    };
  };

  const onMouseDown = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const onDeleteItem = useCallback((e: any) => {
    e.stopPropagation();
    data.splice(index, 1);
    setListValue(_.clone(data));
    // setInputValue(Date.now());
  }, []);

  const formItemLayout = {
    // labelCol: { span: 7 },
    // wrapperCol: { span: 12 }
  };

  const [state, setStateValue] = useState(
    _.get(data, "state") ? "state" : "data"
  );
  const onChangeState = (value: any) => {
    if (value === "state") {
      delete data.data;
      delete data.dataCompareRule;
    } else {
      delete data.state;
      delete data.stateCompareRule;
    }
    console.log(data, " removing");
    setStateValue(value);
  };
  // fetch data
  const rule = _.get(
    data,
    state === "data" ? "dataCompareRule" : "stateCompareRule"
  );
  const value = _.get(data, state === "state" ? "state.visible" : "data");

  // drag datasource
  const [droppedSelector, setDroppedSelector] = useState();
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: [DND_IDE_NODE_TYPE],
    drop: async (item: DragItem, monitor: DropTargetMonitor) => {
      const draggingNode = item.uinode;
      const schema = draggingNode.schema;
      let selector = {};
      // if (_.has(schema, "datasource.source")) {
      //   selector["datasource.source"] = _.get(schema, "datasource.source");
      // }

      // if (_.has(schema, "component")) {
      //   selector["component"] = _.get(schema, "component");
      // }
      // // if (_.isEmpty(selector) && _.has(schema, 'props')) {
      // //   selector['props.']
      // // }

      // if (_.has(schema, "id")) {
      //   selector["id"] = _.get(schema, "id");
      // }

      if (_.has(schema, "id")) {
        selector["id"] = _.get(schema, "id");
      } else {
        if (_.has(schema, "_id")) {
          schema.id = `ide-node-${Date.now()}-${_.get(schema, "_id")}`;
        } else {
          schema.id = _.uniqueId(`ide-node-${Date.now()}`);
        }
        selector["id"] = _.get(schema, "id");
      }

      console.log("final selector", selector);
      data.selector = selector;
      onChange(_.cloneDeep(root));
      // changeValue("selector")(selector);
      setDroppedSelector(selector);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  const cls = classNames({
    "dnd-prop-default": true,
    "dnd-prop-dropped": droppedSelector,
    "dnd-prop-over": isOverCurrent
  });

  return (
    <div className="deps-editor">
      <List.Item>
        <Form.Item label="Compare">
          <Select
            size="small"
            defaultValue={"state"}
            value={state}
            onChange={onChangeState}
          >
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
              state === "data" ? "dataCompareRule" : "stateCompareRule"
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
        <div ref={drop} className={cls}>
          <Form.Item label="Selector" {...formItemLayout}>
            <Input
              readOnly
              value={droppedSelector && droppedSelector.id}
              onMouseDown={onMouseDown}
              {...formItemLayout}
              // onChange={changeValue("selector.datasource.source")}
            />
          </Form.Item>
        </div>
        {state === "data" ? (
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
  const { value, group, onChange } = props;
  const [groupValue, setGroupValue] = useState(!_.isEmpty(value));
  // const [logicValue, setLogicValue] = useState(1);
  const data = _.get(value, `deps`, []);
  // const data = [["name1", "value1"], ["name2", "value2"], ["name3", "value3"]];
  const [listValue, setListValue] = useState(data);

  const onGroupChange = (checked: any) => {
    setGroupValue(checked);
  };

  const [logicValue, setLogicValue] = useState(_.get(value, `strategy`, "and"));
  const onDataChange = (e: any) => {
    _.set(value, `strategy`, e.target.value);
    setLogicValue(e.target.value);
  };

  const onAddItems = () => {
    data.push({
      selector: "",
      state: { visible: true },
      stateCompareRule: "is"
    });

    const newData = _.clone(data);
    _.set(value, `deps`, newData);
    setListValue(newData);
    onChange(value);
  };

  // const onSave = () => {
  //   if (groupValue && !_.isEmpty(listValue)) onChange(value);
  // };

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
                <Button icon="plus" size="small" onClick={onAddItems} />
              </Form.Item>
            </Col>
          </Row>
          <List
            size="small"
            bordered
            dataSource={listValue}
            renderItem={(item: any, index: number) => (
              <SelectorItem
                index={index}
                root={value}
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
  console.log("dependency initial value", value);
  const finalResult = _.cloneDeep(value || {});
  const onItemChange = (path: string) => {
    return (v: any) => {
      _.set(finalResult, path, v);
      onChange(finalResult);
    };
  };
  return (
    <>
      <DepGroup
        {...props}
        group="Visible"
        onChange={onItemChange("state.visible")}
        value={_.get(finalResult, "state.visible", {})}
      />
      <DepGroup
        {...props}
        group="Valid"
        onChange={onItemChange("state.valid")}
        value={_.get(finalResult, "state.valid", {})}
      />
    </>
  );
};
