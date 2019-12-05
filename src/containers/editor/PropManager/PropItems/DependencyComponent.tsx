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
import { updateDepsColor, formatSchemaToTree } from "../../../../helpers";
// const ButtonGroup = Button.Group;
import { useDrop, DropTargetMonitor } from "react-dnd";
import classNames from "classnames";
import { searchNodes } from "uiengine";
import { IUINode } from "uiengine/typings";
import InputComponent from './InputComponent'

import {
  DND_IDE_NODE_TYPE,
  DndNodeManager,
  IDE_DEP_COLORS
} from "../../../../helpers";
const stateRuleOptions = [["is", "Is"]];

const dataRuleOptions = [
  // system
  ["is", "Is"],
  // // customize
  // ["isTrue", "isTrue"],
  // ["isFalse", "isFalse"],
  // system
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
  ["regexp", "Reg Expression"]
];

const updateDepsNodeColor = (uiNode: IUINode, deps: Array<any>) => {
  // remove all deps color first
  _.unset(uiNode, `schema.${IDE_DEP_COLORS}`);

  // update deps color
  deps.forEach((dep: any) => {
    const selector = _.get(dep, `selector`);
    if (selector) {
      const depsNodes = searchNodes(selector);
      depsNodes.forEach((depNode: any) => {
        updateDepsColor(depNode);
        // depNode.sendMessage(true);
      });
    }
  });
};

const SelectorItem = (props: any) => {
  const { index, root, setListValue, onChange, disabled, uinode } = props;

  const data = _.get(root, `deps[${index}]`);
  // const [droppedId, setdroppedId] = useState();
  const getSelectors = () =>
    _.entries(_.get(data, "selector", {})).map(
      (entry: any) => `${entry[0]}.${entry[1]}`
    );
  let [selector, setSelector] = useState<Array<any>>(getSelectors());
  let [draggedSchema, setDraggedSchema] = useState([] as any);
  // let dependId = droppedId || _.get(selector, "id");

  // change selector type
  const onChangeSelector = useCallback((value: any, label: any, extra: any) => {
    if (extra.allCheckedNodes.length) {
      const selector = {};
      extra.allCheckedNodes.forEach((node: any) => {
        const key = _.get(node, `node.key`);
        const value = _.get(node, `node.props.value`);
        if (value) {
          selector[key] = value.slice(value.indexOf(":") + 1, value.length);
        }
      });
      data.selector = selector;
      setSelector(value);
      updateDepsNodeColor(uinode, root.deps);
      onChange(root);
    }
  }, []);

  const onDeleteItem = useCallback((e: any) => {
    // remove deps from schema
    root.deps.splice(index, 1);
    setListValue(_.clone(root.deps));

    // update dependant label
    // generate again
    updateDepsNodeColor(uinode, root.deps);
    onChange(root);
    // uinode.sendMessage(true);
  }, []);

  const [state, setStateValue] = useState(
    _.get(data, "state") ? "state" : "data"
  );

  // what are current working rule and keys for value?
  let compareRule: any, valueKey: any;
  const changeCompareRule = (state: any) => {
    compareRule = state === "data" ? "dataCompareRule" : "stateCompareRule";
    valueKey = state === "state" ? "state.visible" : "data";
  };
  changeCompareRule(state);

  // rule settings
  let [rule, setRule] = useState(_.get(data, compareRule, "is"));
  let [isHidden, setIsHidden] = useState(false);
  let [value, setDataValue] = useState(_.get(data, valueKey));

  // change schema value
  const numberRules = ["above", "below"];
  const emptyRules = ["empty", "notEmpty"];
  const booleanRules = ["isTrue", "isFalse"];
  const noFillRules = [...emptyRules, ...booleanRules];

  const getValue = (state: string, value: any) => {
    let newValue = value;
    if (state === "state") {
      newValue = Boolean(value);
    } else {
      if (numberRules.indexOf(rule) > -1) {
        newValue = Number(value);
      }
    }
    return newValue;
  };
  const changeValue = (value: any) => {
    let newValue = getValue(state, value);
    // remove unnecessary data
    if (noFillRules.indexOf(rule) > -1) {
      _.unset(data, valueKey);
    } else {
      _.set(data, valueKey, newValue);
    }

    onChange(root);
  };

  // special rule handling
  const changeRule = useCallback((rule: string) => {
    try {
      if (noFillRules.indexOf(rule) > -1) {
        setIsHidden(true);
        if (rule === "isFalse") {
          _.set(data, valueKey, false);
        } else if (rule === "isTrue") {
          _.set(data, valueKey, true);
        } else {
          _.unset(data, valueKey);
        }
      } else {
        setIsHidden(false);
      }
      _.set(data, compareRule, rule);

      setRule(rule);
      onChange(root);
    } catch (e) {
      console.log(e)
    }
  }, []);

  // change Compare
  const onChangeState = useCallback(
    (value: any) => {
      if (value === "state") {
        delete data.data;
        delete data.dataCompareRule;
        _.set(data, "state.visible", true);
        _.set(data, "stateCompareRule", "is");
        setDataValue(true);
      } else {
        delete data.state;
        delete data.stateCompareRule;
        _.set(data, "data", "");
        _.set(data, "dataCompareRule", "is");
        setDataValue("");
      }

      changeCompareRule(value);
      setStateValue(value);
      onChange(root);
    },
    [uinode]
  );

  // drag datasource
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
      const treeData = formatSchemaToTree(schema);
      setDraggedSchema(treeData);
      setSelector([`id:${selector["id"]}`]);
      updateDepsNodeColor(uinode, root.deps);
      onChange(root);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  const cls = classNames({
    "dnd-prop-default": true,
    "dnd-prop-over": isOverCurrent
  });

  useEffect(() => {
    const selectors = getSelectors();

    setSelector(selectors);
    if (selectors.length) {
      const depNodes = searchNodes(_.get(data, "selector"));
      if (depNodes.length) {
        const schema = _.get(depNodes[0], "schema", {});
        const { id, props, datasource } = schema;
        const validProps = {};
        if (id !== undefined) validProps["id"] = id;
        if (props !== undefined) validProps["props"] = props;
        if (datasource !== undefined) validProps["datasource"] = datasource;
        const treeData = formatSchemaToTree(validProps);
        setDraggedSchema(treeData);
      }
    }

    const state = _.has(data, "state") ? "state" : "data";
    setStateValue(state);
    const compareRule =
      state === "data" ? "dataCompareRule" : "stateCompareRule";
    const rule = _.get(data, compareRule);
    setRule(rule);
    const path = state === "state" ? "state.visible" : "data";
    const value = _.get(data, path);
    setDataValue(value);
  }, [data]);

  const ruleOptions = state === "state" ? stateRuleOptions : dataRuleOptions;

  return (
    <div className="deps-editor">
      <List.Item>
        <div ref={drop} className={cls}>
          <Form.Item label="Selector">
            <TreeSelect
              size="small"
              style={{ maxWidth: "120px" }}
              treeData={draggedSchema}
              value={selector}
              onChange={onChangeSelector}
              treeCheckable
              searchPlaceholder="Please select"
            />
          </Form.Item>
        </div>
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
        {ruleOptions.length > 1 ? (
          <Form.Item label="Rule" style={{ width: "150px" }}>
            <Select
              size="small"
              style={{ maxWidth: "100px" }}
              dropdownStyle={{ width: "130px", maxWidth: "130px" }}
              dropdownMenuStyle={{ width: "130px", maxWidth: "130px" }}
              defaultValue={"is"}
              value={rule}
              onChange={(value: any) => {
                _.set(data, compareRule, value);
                onChange(_.cloneDeep(root));
                changeRule(value);
              }}
              disabled={disabled}
            >
              {ruleOptions.map((rule: any, key: number) => (
                <Select.Option
                  key={key}
                  value={rule[0]}
                  title={rule[1]}
                  disabled={disabled}
                >
                  {rule[1]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : null}
        {isHidden ? null : state === "data" ? (
          <Form.Item label="Value">
            {/* <Input
              disabled={disabled}
              value={value}
              onChange={(e: any) => {
                changeValue(e.target.value);
                setDataValue(e.target.value);
              }}
            /> */}
            <InputComponent
              disabled={disabled}
              value={value}
              onChange={(val: any) => {
                changeValue(val);
                setDataValue(val);
              }}
            />
          </Form.Item>
        ) : (
            <Form.Item label="State">
              <Select
                disabled={disabled}
                size="small"
                value={value ? 1 : 0}
                onChange={(value: any) => {
                  changeValue(value);
                  setDataValue(value);
                }}
              >
                <Select.Option value={1}>True</Select.Option>
                <Select.Option value={0}>False</Select.Option>
              </Select>
            </Form.Item>
          )}
        <Form.Item label="Del">
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
  const { value, uinode, group, onChange, disabled, ...rest } = props;
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
    updateDepsNodeColor(uinode, data);
    setShowGroup(checked);
    uinode.sendMessage(true);
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
    setListValue(data);
  }, [uinode]);

  return (
    <>
      <Form.Item label={group}>
        <Switch
          checked={showGroup}
          onChange={onGroupChange}
          disabled={disabled}
        />
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
                key={index}
                index={index}
                root={value}
                group={props.group}
                setListValue={setListValue}
                {...props}
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
  // const [state, changeState] = useState(finalResult);
  const onItemChange = (path: string) => {
    return (v: any) => {
      _.set(finalResult, path, v);
      uinode.refreshLayout();
      uinode.sendMessage(true);
      const dndNodeManager = DndNodeManager.getInstance();
      dndNodeManager.pushVersion();
    };
  };

  // useEffect(() => {
  //   changeState(finalResult);
  // }, [uinode]);

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
