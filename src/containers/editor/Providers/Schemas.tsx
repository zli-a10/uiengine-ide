import React, { useState, useMemo, useContext, useCallback } from "react";
import _ from "lodash";
import { ILayoutSchema } from "uiengine/typings";
import { SchemasContext, IDEEditorContext } from "../../Context";
import { getActiveUINode } from "../../../helpers";

export const Schemas = (props: any) => {
  const { setContent } = useContext(IDEEditorContext);
  const [schema, setSchema] = useState();
  // for showing
  const [currentData, setCurrentData] = useState();
  const onSetCurrentData = useCallback((data: IResourceTreeNode) => {
    setCurrentData(data);
    const { _parent_, children, ...rest } = data;
    localStorage["currentEditNode"] = JSON.stringify(rest);
  }, []);

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [time, setTime] = useState(Date.now());

  const schemasContextValue = useMemo<ISchemasContext>(
    () => ({
      currentData,
      setCurrentData: (data: IResourceTreeNode) => {
        onSetCurrentData(data);
      },
      selectedKeys,
      setSelectedKey: (key: any, treeNode?: IResourceTreeNode) => {
        if (treeNode) {
          onSetCurrentData(treeNode);
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
      refresh: time,
      toggleRefresh: () => {
        setTime(Date.now());
      },
      showTab: "",
      activeTab: (tab: string) => {},
      savedTime: "",
      setSavedTime: (savedTime: string) => {},
      // for schema replace
      schema,
      updateSchema: (schema: ILayoutSchema) => {
        setSchema(schema);
        // fetch latest version of schema
        // Bug to fix: sometimes dnd not working
        const allSchema = getActiveUINode(true);
        setContent(allSchema);
      }
    }),
    [schema, currentData, selectedKeys, time]
  );
  return (
    <SchemasContext.Provider value={schemasContextValue}>
      {props.children}
    </SchemasContext.Provider>
  );
};
