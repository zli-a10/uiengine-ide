import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import { DataSourceSelector } from "./DataSource";
import { Switch, Form, Input, Row, Col, Icon, Select, InputNumber } from "antd";
import { IDERegister, DndNodeManager } from "../../../../helpers";
import { PropItem } from "../PropItem";

export const DatasourceComponent = (props: any) => {
  const { onChange, value, name, uinode, disabled, ...rest } = props;
  // let dataSource = _.get(uinode, "schema.datasource") as any;
  let dataSource: any = {
    source: "",
    schema: ""
  };

  if (_.isString(value)) {
    dataSource = {
      source: value,
      schema: value
    };
  } else if (_.isObject(value)) {
    dataSource = value;
  }

  // change source and update layout
  const [source, changeSource] = useState(_.get(dataSource, "source"));
  const [schema, changeSchema] = useState(_.get(dataSource, "schema"));
  const [autoload, changeAutoload] = useState(_.get(dataSource, "autoload"));
  const [defaultValue, changeDefaultValue] = useState(
    _.get(dataSource, "defaultValue")
  );

  const [isLock, setLock] = useState(true);
  const onClickLock = useCallback(() => {
    setLock(!isLock);
  }, [isLock]);
  const onChangeSource = useCallback(
    value => {
      dataSource.source = value;
      if (isLock) {
        dataSource.schema = value;
        changeSchema(value);
      }
      changeSource(value);
      onChange(dataSource);
    },
    [dataSource, isLock]
  );

  const onChangeSchema = useCallback(
    value => {
      dataSource.schema = value;
      if (isLock) {
        dataSource.source = value;
        changeSource(value);
      }
      changeSchema(value);
      onChange(dataSource);
    },
    [dataSource, isLock]
  );

  const onChangeAutoLoad = useCallback(
    (value: boolean) => {
      // console.log("changing auto load", value);
      dataSource.autoload = value;
      changeAutoload(value);
      onChange(dataSource);
    },
    [dataSource]
  );

  const [defaultValueType, changeDefaultValueType] = useState("string");
  const onChangeDefaultValueType = (value: string) => {
    changeDefaultValueType(value);
    changeDefaultValue(undefined);
    onChange(dataSource);
  };

  const onChangeDefaultValue = (e: any) => {
    let value: any;

    if (defaultValueType === "string") {
      value = e.target.value;
    } else if (defaultValueType === "undefined") {
      value = undefined;
    } else {
      value = e;
    }
    dataSource.defaultValue = value;
    changeDefaultValue(value);
    onChange(dataSource);
  };

  const [formatter, setFormatter] = useState();
  const changeFormatter = useCallback((formatterName: string) => {
    setFormatter(formatterName);
    const finalResult = _.get(uinode, "schema", {});

    if (!formatterName) {
      _.unset(finalResult, "props.formatter");
    } else {
      _.set(finalResult, "props.formatter.name", formatterName);
    }
    uinode.refreshLayout();
    uinode.sendMessage(true);
    const dndNodeManager = DndNodeManager.getInstance();

    dndNodeManager.pushVersion();
  }, []);

  // const [ds, changeDs] = useState(dataSource);
  useEffect(() => {
    changeSource(_.get(dataSource, "source"));
    changeSchema(_.get(dataSource, "schema"));
    changeAutoload(_.get(dataSource, "autoload"));
    changeDefaultValue(_.get(dataSource, "defaultValue"));
    const formatterName = _.get(uinode, "schema.props.formatter.name");

    setFormatter(formatterName);
  }, [dataSource, formatter, uinode]);

  return (
    <>
      <Form.Item label="Source">
        <DataSourceSelector
          {...rest}
          disabled={disabled}
          onChange={onChangeSource}
          value={source}
        />
      </Form.Item>
      <Form.Item label="Schema">
        <DataSourceSelector
          {...rest}
          disabled={disabled}
          onChange={onChangeSchema}
          value={schema}
        />
      </Form.Item>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", right: "22px", top: "-52px" }}>
          {isLock ? (
            <Icon onClick={onClickLock} type="lock" style={{ color: "red" }} />
          ) : (
            <Icon
              onClick={onClickLock}
              type="unlock"
              style={{ color: "green" }}
            />
          )}
        </div>
      </div>
      {name ? null : (
        <>
          <Form.Item label="Autoload">
            <Switch
              disabled={disabled}
              onChange={onChangeAutoLoad}
              checked={autoload}
            />
          </Form.Item>
          <Form.Item label="DefaultValue">
            <Row gutter={8}>
              <Col span={8}>
                <Select
                  defaultValue="string"
                  onChange={onChangeDefaultValueType}
                >
                  <Select.Option value="string">String</Select.Option>
                  <Select.Option value="boolean">Boolean</Select.Option>
                  <Select.Option value="number">Number</Select.Option>
                  <Select.Option value="undefined">Undefined</Select.Option>
                </Select>
              </Col>
              <Col span={16}>
                {defaultValueType === "number" ? (
                  <InputNumber
                    value={defaultValue}
                    onChange={onChangeDefaultValue}
                    disabled={disabled}
                    size="small"
                  />
                ) : defaultValueType === "boolean" ? (
                  <Switch
                    onChange={onChangeDefaultValue}
                    checked={defaultValue}
                    disabled={disabled}
                  />
                ) : (
                  <Input
                    value={defaultValue}
                    onChange={onChangeDefaultValue}
                    disabled={disabled}
                    size="small"
                  />
                )}
              </Col>
            </Row>
          </Form.Item>
          {!_.isEmpty(IDERegister.formatters) ? (
            <>
              <Form.Item label="Formatter">
                <Select
                  defaultValue=""
                  value={formatter}
                  onChange={changeFormatter}
                >
                  <Select.Option value="">----</Select.Option>
                  {Object.entries(IDERegister.formatters).map(
                    (formatter: any, index: any) => (
                      <Select.Option value={formatter[0]} key={index}>
                        {formatter[1].name}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
              {_.has(IDERegister.formatters, `${formatter}.params`)
                ? Object.entries(IDERegister.formatters[formatter].params).map(
                    (entry: any) => {
                      return (
                        <PropItem
                          section="prop"
                          name={`formatter.${entry[0]}`}
                          schema={entry[1]}
                          key={`key-${entry[0]}`}
                          uinode={uinode}
                          data={_.get(
                            uinode,
                            `schema.props.formatter.${entry[0]}`
                          )}
                        />
                      );
                    }
                  )
                : null}
            </>
          ) : null}
        </>
      )}
    </>
  );
};
