import React, { useState, useCallback, useContext, useEffect } from "react";
import _ from "lodash";
import { DataSourceSelector } from "../../DataSource";
import { Switch, Form, Input, Popover, Icon } from "antd";

export const DatasourceComponent = (props: any) => {
  const { onChange, uinode, ...rest } = props;
  let dataSource = _.get(uinode, "schema.datasource") as any;
  if (_.isString(dataSource)) {
    dataSource = {
      source: dataSource
    };
  }

  const [isLock, setLock] = useState(true);
  const onClickLock = useCallback(() => {
    setLock(!isLock);
  }, [isLock]);
  const onChangeSource = useCallback(
    value => {
      dataSource.source = value;
      if (isLock) {
        dataSource.schema = value;
      }
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
      onChange({ datasource: dataSource });
    },
    [dataSource, isLock]
  );

  const onChangeAutoLoad = useCallback(
    (value: boolean) => {
      // console.log("changing auto load", value);
      dataSource.autoload = value;
      onChange({ datasource: dataSource });
    },
    [dataSource]
  );

  // const [defaultValue, changeDefaultValue] = useState(
  //   _.get(dataSource, "defaultValue")
  // );
  const onChangeInput = (e: any) => {
    dataSource.defaultValue = e.target.value;
    // changeDefaultValue(e.target.value);
    onChange({ datasource: dataSource });
  };

  let ds = dataSource;

  // const [ds, changeDs] = useState(dataSource);
  // useEffect(() => {
  //   console.log(dataSource, " data source changed");
  //   // onChange({ datasource: dataSource });

  //   // onChangeAutoLoad(_.get(dataSource, "autoload"));
  //   // onChangeSchema(_.get(dataSource, "schema"));
  //   // onChangeSource(_.get(dataSource, "source"));
  // }, [dataSource]);

  return (
    <>
      <DataSourceSelector
        label="Source"
        {...rest}
        onChange={onChangeSource}
        value={_.get(ds, "source")}
      />
      <DataSourceSelector
        label="Schema"
        {...rest}
        onChange={onChangeSchema}
        value={_.get(ds, "schema")}
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
          checked={_.get(ds, "autoload", false)}
        />
      </Form.Item>
      <Form.Item label="DefaultValue">
        <Input value={_.get(ds, "defaultValue")} onChange={onChangeInput} />
      </Form.Item>
    </>
  );
};
