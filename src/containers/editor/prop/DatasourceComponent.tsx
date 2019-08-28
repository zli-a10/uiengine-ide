import React, { useState, useCallback, useContext } from "react";
import _ from "lodash";
import { DataSourceTreeSelect } from "../DataSource";
import { Switch, Form, Input, Popover, Icon } from "antd";

const DatasourceItem = (props: any) => {
  const { value } = props;
  const onChange = (value: any) => {
    const { onChange: onChangeProps } = props;
    if (onChangeProps) {
      onChangeProps(value);
    }
  };
  return (
    <Form.Item label={props.label}>
      <DataSourceTreeSelect onChange={onChange} value={value} />
    </Form.Item>
  );
};

export const DatasourceComponent = (props: any) => {
  const { value: data, onChange, uinode, ...rest } = props;
  const [isLock, setLock] = useState(true);
  const [dataSource, setDataSource] = useState({} as any);
  const onClickLock = useCallback(() => {
    setLock(!isLock);
  }, [isLock]);
  const onChangeSource = useCallback(
    value => {
      dataSource.source = value;
      if (isLock) {
        dataSource.schema = value;
      }
      setDataSource(dataSource);
      onChange({ datasource: dataSource });
    },
    [dataSource, isLock]
  );
  const onChangeSchema = useCallback(
    value => {
      dataSource.schema = value;
      if (isLock) {
        dataSource.source = value;
      }
      setDataSource(dataSource);
      onChange({ datasource: dataSource });
    },
    [dataSource, isLock]
  );
  const onChangeAutoLoad = useCallback(
    (value: boolean) => {
      dataSource.autoload = value;
      setDataSource(dataSource);
      onChange({ datasource: dataSource });
    },
    [dataSource]
  );

  const onChangeInput = useCallback(
    e => {
      dataSource.defaultValue = e.target.value;
      setDataSource(dataSource);
    },
    [dataSource]
  );

  const onBlurInput = useCallback(() => {
    onChange({ datasource: dataSource });
  }, [onChange, dataSource]);
  const onMouseDownInput = useCallback((e: any) => {
    e.stopPropagation();
  }, []);
  console.log("====", props);
  return (
    <>
      <DatasourceItem
        label="Source"
        {...rest}
        onChange={onChangeSource}
        value={_.get(uinode, "schema.datasource.source")}
      />
      <DatasourceItem
        label="Schema"
        {...rest}
        onChange={onChangeSchema}
        value={_.get(uinode, "schema.datasource.schema")}
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
      <Form.Item label="Autoload">
        <Switch
          onChange={onChangeAutoLoad}
          checked={_.get(uinode, "schema.datasource.autoload", false)}
        />
      </Form.Item>
      <Form.Item label="DefaultValue">
        <Input
          // defaultValue={dataSource.defaultValue}
          value={
            _.get(uinode, "schema.datasource.defaultValue") ||
            dataSource.defaultValue
          }
          onChange={onChangeInput}
          onBlur={onBlurInput}
          onMouseDown={onMouseDownInput}
        />
      </Form.Item>
    </>
  );
};
