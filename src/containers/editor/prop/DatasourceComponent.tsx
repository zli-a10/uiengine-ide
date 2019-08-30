import React, { useState, useCallback, useContext, useEffect } from "react";
import _ from "lodash";
import { DataSourceSelector } from "../DataSource";
import { Switch, Form, Input, Popover, Icon } from "antd";

export const DatasourceComponent = (props: any) => {
  const { onChange, uinode, ...rest } = props;
  const [isLock, setLock] = useState(true);
  let dataSource = _.get(uinode, "schema.datasource") as any;
  if (_.isString(dataSource)) {
    dataSource = {
      source: dataSource
    };
  }

  const onClickLock = useCallback(() => {
    setLock(!isLock);
  }, [isLock]);
  const onChangeSource = useCallback(
    value => {
      dataSource.source = value;
      if (isLock) {
        dataSource.schema = value;
      }
    },
    [dataSource, isLock]
  );

  const onChangeSchema = useCallback(
    value => {
      dataSource.schema = value;
      if (isLock) {
        dataSource.source = value;
      }
    },
    [dataSource, isLock]
  );

  const onChangeAutoLoad = useCallback(
    (value: boolean) => {
      dataSource.autoload = value;
    },
    [dataSource]
  );

  const [defaultValue, changeDefaultValue] = useState(
    _.get(dataSource, "defaultValue")
  );
  const onChangeInput = (e: any) => {
    dataSource.defaultValue = e.target.value;
    changeDefaultValue(e.target.value);
  };

  useEffect(() => {
    onChange({ datasource: dataSource });
    changeDefaultValue(_.get(dataSource, "defaultValue"));
  }, [dataSource]);

  const onMouseDownInput = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      <DataSourceSelector
        label="Source"
        {...rest}
        onChange={onChangeSource}
        value={_.get(dataSource, "source")}
      />
      <DataSourceSelector
        label="Schema"
        {...rest}
        onChange={onChangeSchema}
        value={_.get(dataSource, "schema")}
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
          checked={_.get(dataSource, "autoload", false)}
        />
      </Form.Item>
      <Form.Item label="DefaultValue">
        <Input
          value={defaultValue}
          onChange={onChangeInput}
          onPressEnter={onChangeInput}
          onMouseDown={onMouseDownInput}
        />
      </Form.Item>
    </>
  );
};
