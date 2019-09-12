import React, { useState, useCallback, useEffect } from "react";
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

import { DND_IDE_NODE_TYPE, DndNodeManager } from "../../../../helpers";

const SelectorItem = (props: any) => {
  const { index, root, setListValue, onChange, disabled } = props;

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
    root.deps.splice(index, 1);
    setListValue(_.clone(root.deps));
    // setInputValue(Date.now());
  }, []);

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
    setStateValue(value);
  };
  // fetch data
  const compareRule = state === "data" ? "dataCompareRule" : "stateCompareRule";
  const rule = _.get(data, compareRule);
  const value = _.get(data, state === "state" ? "state.visible" : "data");

  // drag datasource
  const [droppedSelector, setDroppedSelector] = useState();
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: [DND_IDE_NODE_TYPE],
    drop: async (item: DragItem, monitor: DropTargetMonitor) => {
      const draggingNode = item.uinode;
      const schema = draggingNode.schema;
      let selector = {};
      if (_.has(schema, "id")) {
        selector["id"] = _.get(schema, "id");
      } else {
        if (_.has(schema, "_id")) {
          schema.id = _.get(schema, "_id");
        } else {
          schema.id = _.uniqueId(`ide-gen-node-`);
        }
        selector["id"] = _.get(schema, "id");
      }

      data.selector = selector;
      onChange(_.cloneDeep(root));
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

  const ruleOptions = [
    ["is", "Is"],
    ["not", "Not"],
    ["above", "Above"],
    ["below", "Below"],
    ["include", "Include"],
    ["exclude", "Exclude"],
    ["matchOne", "MatchOne"],
    ["matchAll", "MatchAll"],
    ["dismatchOne", "DismatchOne"],
    ["dismatchAll", "DismatchAll"],
    ["empty", "Empty"],
    ["notEmpty", "NotEmpty"],
    ["regexp", "Reg Expression"],
    ["is", "IS"]
  ];

  return (
    <div className="deps-editor">
      <List.Item>
        <Form.Item label="Compare">
          <Select
            size="small"
            defaultValue={"state"}
            value={state}
            onChange={onChangeState}
            disabled={disabled}
          >
            <Select.Option value="state">State</Select.Option>
            <Select.Option value="data">Data</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Rule" style={{ width: "150px" }}>
          <Select
            size="small"
            defaultValue={"is"}
            value={rule || "is"}
            onChange={changeValue(compareRule)}
            disabled={disabled}
          >
            {ruleOptions.map((rule: any) => (
              <Select.Option
                value={rule[0]}
                title={rule[1]}
                disabled={disabled}
              >
                {rule[1]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div ref={drop} className={cls}>
          <Form.Item label="ID(Drag)">
            <Input
              title="Drag Any Element Right Here From Drawingboard"
              readOnly
              disabled={disabled}
              value={
                (droppedSelector && droppedSelector.id) ||
                _.get(data, "selector.id")
              }
              onMouseDown={onMouseDown}
            />
          </Form.Item>
        </div>
        {state === "data" ? (
          <Form.Item label="Value">
            <Input
              disabled={disabled}
              value={value}
              onChange={changeValue("data")}
              onMouseDown={onMouseDown}
            />
          </Form.Item>
        ) : (
          <Form.Item label="State">
            <Select
              disabled={disabled}
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
            disabled={disabled}
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
  const { value, group, onChange, disabled } = props;
  let groupChecked = !_.isEmpty(value);
  const [showGroup, setShowGroup] = useState(groupChecked);
  const data = _.get(value, `deps`, []);
  const [listValue, setListValue] = useState(data);

  const onGroupChange = (checked: any) => {
    if (!checked) {
      onChange({});
    } else {
      onChange(value);
    }
    setShowGroup(checked);
  };

  const [logicValue, setLogicValue] = useState(_.get(value, `strategy`, "and"));
  const onDataChange = (e: any) => {
    _.set(value, `strategy`, e.target.value);
    setLogicValue(e.target.value);
    onChange(value);
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

  useEffect(() => {
    setShowGroup(groupChecked);
  }, [groupChecked]);

  useEffect(() => {
    setListValue(data);
  }, [data]);

  return (
    <>
      <Form.Item label={group}>
        <Switch checked={showGroup} onChange={onGroupChange} />
      </Form.Item>
      {showGroup ? (
        <>
          <Row type="flex" justify="space-around">
            <Col span={16}>
              <Form.Item label="Logic Strategy">
                <Radio.Group
                  onChange={onDataChange}
                  value={logicValue}
                  disabled={disabled}
                >
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
                <Button
                  icon="plus"
                  size="small"
                  onClick={onAddItems}
                  disabled={disabled}
                />
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
                disabled={disabled}
              />
            )}
          />
        </>
      ) : null}
    </>
  );
};

export const DependencyComponent = (props: any) => {
  const { onChange, uinode } = props;
  const finalResult = _.get(uinode, "schema", {});
  const onItemChange = (path: string) => {
    return (v: any) => {
      _.set(finalResult, path, v);
      const dndNodeManager = DndNodeManager.getInstance();
      dndNodeManager.pushVersion();
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
