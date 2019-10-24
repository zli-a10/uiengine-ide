import React, { useState, useCallback, useContext, useEffect } from "react";
import _ from "lodash";
import { Form, List, Button, TreeSelect, Switch, Select } from "antd";
import {
  getDataSourceDomains,
  getDataSourceFields,
  convertNodes
} from "../../../../helpers";
import { GlobalContext } from "../../../Context";

const TargetItem = (props: any) => {
  const { datasource: { getDataSource } = {} as any } = useContext(
    GlobalContext
  );
  const { item, onChange, index, onRemoveItem } = props;

  const [dependOnList, setDependOnList] = useState();
  const [schemaLineage, setSchemaLineage] = useState();
  const [schemaMethod, setSchemaMethod] = useState();
  const [dataSource, setDataSource] = useState();
  const [excludes, setExcludes] = useState();

  const treeData = getDataSourceDomains();
  const treeFields = getDataSourceFields();
  const changeItem = useCallback(
    (source: string, setStateFunc: any) => {
      return (value: string) => {
        _.set(item, source, value);
        setStateFunc(value);
        onChange(item, index);
      };
    },
    [item]
  );

  const onChangeDependOn = useCallback(
    (value: any, options: any) => {
      _.set(item, "dependOn.dependList", value);
      setDependOnList(value);
      // TO Enhance: multiple targets depend
      const key = _.get(options, "0.key");
      if (key) {
        _.set(item, "dependOn.targetKey", key);
      }
      onChange(item, index);
    },
    [item]
  );

  const [schemas, setSchemas] = useState([]);
  useEffect(() => {
    const initDataSource = async () => {
      let newNodes = (await getDataSource("")) || [];
      newNodes = convertNodes(newNodes, [], true);
      setSchemas(newNodes);
    };
    initDataSource();
  }, []);

  useEffect(() => {
    const dataSource = _.get(item, "dataSource.source");
    setDataSource(dataSource);

    const excludes = _.get(item, "dataSource.exclude");
    setExcludes(excludes);

    const schemaMethod = _.get(item, "dataSchema.method");
    setSchemaMethod(schemaMethod);

    const schemaLineage = _.get(item, "dataSchema.lineage");
    setSchemaLineage(schemaLineage);

    const dependOn = _.get(item, "dependOn.dependList");
    setDependOnList(dependOn);
  }, [item]);

  const methods = ["post", "put"];

  return (
    <List.Item key={item.key}>
      <Form.Item label="Source">
        <Select
          value={dataSource}
          onChange={changeItem("dataSource.source", setDataSource)}
        >
          <Select.Option value="">None</Select.Option>
          {treeData.map((value: any, index: number) => (
            <Select.Option value={`${value}:`} key={index}>
              {value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {dataSource ? (
        <>
          <Form.Item label="Method">
            <Select
              value={schemaMethod}
              onChange={changeItem("dataSchema.method", setSchemaMethod)}
            >
              <Select.Option value="">None</Select.Option>
              {methods.map((value: any, index: number) => (
                <Select.Option value={value} key={index}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Excludes">
            <Select
              value={excludes}
              onChange={changeItem("dataSource.exclude", setExcludes)}
              mode="multiple"
            >
              <Select.Option value="">None</Select.Option>
              {treeFields[dataSource.split(':').shift()]
                ? treeFields[dataSource.split(':').shift()].map((value: any, index: number) => (
                  <Select.Option value={value} key={index}>
                    {value}
                  </Select.Option>
                ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item label="Schema">
            <TreeSelect
              allowClear
              showSearch
              value={schemaLineage}
              treeData={schemas}
              placeholder="Please select"
              onChange={changeItem("dataSchema.lineage", setSchemaLineage)}
            />
          </Form.Item>

          <Form.Item label="Depend On">
            <Select
              value={dependOnList}
              onChange={onChangeDependOn}
              mode="multiple"
            >
              <Select.Option value="">None</Select.Option>
              {Object.entries(treeFields).map((entry: any, key: number) => (
                <Select.OptGroup label={entry[0]} key={`key-${key}`}>
                  {entry[1].map((value: any, index: any) => (
                    <Select.Option value={value} key={entry[0]}>
                      {value}
                    </Select.Option>
                  ))}
                </Select.OptGroup>
              ))}
            </Select>
          </Form.Item>
        </>
      ) : null}
      <Form.Item label=" ">
        <Button type="danger" size="small" icon="delete" onClick={onRemoveItem}>
          Delete
        </Button>
      </Form.Item>
    </List.Item>
  );
};

/**
 *
This component used for submit only
will generate following schema:
"target": {
  "targets": [
    {
      "key": "main",
      "dataSource": {
        "source": "slb.virtual-server:",
        "exclude": "port-list"
      },
    },
    {
      "dataSource": "slb.virtual-server:port-list",
      "dataSchema": { lineage: "slb.virtual-server.port:", method: ""},
      "dependOn": {
        "targetKey": "main",
        "dependList": ["name"]
      }
    }
  ],
  "mode": "sync"
},
  */
export const DatatargetComponent = (props: any) => {
  const { schema, data, name, uinode, onChangeEvent, dataRef } = props;

  // const _targets = _.get(dataRef, "defaultParams.target.targets", []);
  const [targets, setTargets] = useState([]);

  const [mode, setMode] = useState();
  const onChangeMode = useCallback(
    (value: boolean) => {
      if (value) {
        _.set(dataRef, "defaultParams.target.mode", "sync");
      } else {
        _.set(dataRef, "defaultParams.target.mode", "async");
      }
      setMode(value);
      // _.set(dataRef, "defaultParams", ["target"]);
      onChangeEvent(dataRef);
    },
    [targets]
  );

  const onAddItem = useCallback(() => {
    const newTargets: any = _.clone(targets);
    const tpl = {
      dataSource: "",
      dataSchema: {},
      dependOn: {}
    };
    newTargets.push(tpl);
    setTargets(newTargets);
  }, [targets]);

  const onChangeItem = useCallback(
    (item: any) => {
      if (_.has(item, "dataSource")) {
        const newTargets = [];
        const _targets = _.get(dataRef, "defaultParams.target.targets", []);
        let findedIndex = -1;
        if (_targets.length) {
          _targets.forEach((data: any, index: any) => {
            if (_.has(data, "dataSource")) {
              newTargets.push(data);
              if (data.dataSource === item.dataSource) {
                findedIndex = index;
              }
            }
          });
        }
        if (findedIndex === -1) {
          newTargets.push(item);
        } else {
          newTargets[findedIndex] = item;
        }
        _.set(dataRef, "defaultParams.target.targets", newTargets);
        onChangeEvent(dataRef);
      }
    },
    [targets]
  );

  const onRemoveItem = useCallback(
    (index: number) => {
      return () => {
        const newTargets = _.clone(targets);
        newTargets.splice(index, 1);
        setTargets(newTargets);
        let saveTargets: any = [];
        newTargets.forEach((data: any, index: any) => {
          if (_.has(data, "dataSource")) {
            saveTargets.push(data);
          }
        });
        _.set(dataRef, "defaultParams.target.targets", saveTargets);
        onChangeEvent(dataRef);
      };
    },
    [targets]
  );

  useEffect(() => {
    const _targets = _.get(dataRef, "defaultParams.target.targets", []);
    setTargets(_targets);

    const mode = _.get(dataRef, "defaultParams.target.mode");
    if (mode === "sync") {
      setMode(true);
    } else {
      setMode(false);
    }

    // console.log(dataRef);
  }, [dataRef]);

  return (
    <div className="targets">
      <Form.Item className="title" label="Targets">
        <Switch
          checked={mode}
          checkedChildren="Sync"
          unCheckedChildren="Async"
          onChange={onChangeMode}
        />
      </Form.Item>
      <div className=" list cancel-drag">
        <List
          dataSource={targets}
          renderItem={(item: any, index: any) => (
            <TargetItem
              key={index}
              index={index}
              item={item}
              onChange={onChangeItem}
              onRemoveItem={onRemoveItem(index)}
            />
          )}
        ></List>
      </div>
      <Form.Item label=" " className="add-target">
        <Button type="primary" size="small" icon="plus" onClick={onAddItem}>
          Add Target
        </Button>
      </Form.Item>
    </div>
  );
};
