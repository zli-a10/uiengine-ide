import React, { useState, useMemo } from "react";
import _ from "lodash";
import { ILayoutSchema } from "uiengine/typings";
import { SchemasContext } from "../../Context";

export const Schemas = (props: any) => {
  const [schema, setSchema] = useState();
  const [currentData, setCurrentData] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const schemasContextValue = useMemo<ISchemasContext>(
    () => ({
      currentData,
      setCurrentData: (data: any) => {
        console.log(data, "was set to currentData");
        setCurrentData(data);
      },
      selectedKeys,
      setSelectedKey: (key: any) => {
        let keys: any = _.clone(selectedKeys);
        if (_.isArray(key)) {
          keys = key;
        } else {
          if (keys.indexOf(key) === -1) keys.push(key);
        }
        setSelectedKeys(keys);
      },
      help: "",
      setHelp: (help: string) => {},
      refresh: "",
      toggleRefresh: (refresh: string) => {},
      showTab: "",
      activeTab: (tab: string) => {},
      savedTime: "",
      setSavedTime: (savedTime: string) => {},
      // for schema replace
      schema,
      updateSchema: (schema: ILayoutSchema) => {
        setSchema(schema);
      }
    }),
    [schema, currentData, selectedKeys]
  );
  return (
    <SchemasContext.Provider value={schemasContextValue}>
      {props.children}
    </SchemasContext.Provider>
  );
};
