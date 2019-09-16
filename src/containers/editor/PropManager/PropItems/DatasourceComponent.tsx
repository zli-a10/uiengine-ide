import React, { useState, useCallback, useContext, useEffect } from "react";
import _ from "lodash";
import { DataSourceSelector } from "../../DataSource";
import { Switch, Form, Input, Popover, Icon } from "antd";

export const DatasourceComponent = (props: any) => {
  const { onChange, value, name, uinode, disabled, ...rest } = props;
  // let dataSource = _.get(uinode, "schema.datasource") as any;
  let dataSource = value;
  if (_.isString(dataSource)) {
    dataSource = {
      source: dataSource
    };
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

  const onChangeDefaultValue = (e: any) => {
    dataSource.defaultValue = e.target.value;
    changeDefaultValue(e.target.value);
    onChange(dataSource);
  };

  // const [ds, changeDs] = useState(dataSource);
  useEffect(() => {
    changeSource(_.get(dataSource, "source"));
    changeSchema(_.get(dataSource, "schema"));
    changeAutoload(_.get(dataSource, "autoload"));
    changeDefaultValue(_.get(dataSource, "defaultValue"));
  }, [dataSource]);

  return (
    <>
      <DataSourceSelector
        label="Source"
        {...rest}
        disabled={disabled}
        onChange={onChangeSource}
        value={source}
      />
      <DataSourceSelector
        label="Schema"
        {...rest}
        disabled={disabled}
        onChange={onChangeSchema}
        value={schema}
      />
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
            <Input
              value={defaultValue}
              onChange={onChangeDefaultValue}
              disabled={disabled}
            />
          </Form.Item>
        </>
      )}
    </>
  );
};
