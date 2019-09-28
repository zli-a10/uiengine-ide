import React, { useState, useMemo, useContext } from "react";
import _ from "lodash";
import { ILayoutSchema } from "uiengine/typings";
import { SchemasContext, IDEEditorContext } from "../../Context";
import { getActiveUINode } from "../../../helpers";

export const Schemas = (props: any) => {
  const { setContent } = useContext(IDEEditorContext);
  const [schema, setSchema] = useState();
  // for showing
  const [currentData, setCurrentData] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const schemasContextValue = useMemo<ISchemasContext>(
    () => ({
      currentData,
      setCurrentData: (data: any) => {
        setCurrentData(data);
      },
      selectedKeys,
      setSelectedKey: (key: any, treeNode?: IResourceTreeNode) => {
        if (treeNode) {
          setCurrentData(treeNode);
        }
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
        // fetch latest version of schema
        const allSchema = getActiveUINode(true);
        setContent(allSchema);
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
