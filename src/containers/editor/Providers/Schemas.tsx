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
  const [editingResource, setEditingResource] = useState();

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [time, setTime] = useState(Date.now());

  const schemasContextValue = useMemo<ISchemasContext>(
    () => ({
      currentData,
      setCurrentData: (data: IResourceTreeNode) => {
        setCurrentData(data);
      },
      selectedKeys,
      setSelectedKey: (key: any, treeNode?: IResourceTreeNode) => {
        if (treeNode) {
          const { type } = treeNode;
          if (type === "schema") {
            setCurrentData(treeNode);
          }
          setEditingResource(treeNode);
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
        setContent({
          content: allSchema,
          file: currentData.name,
          type: currentData.type
        });
      },
      editingResource,
      setEditingResource: (editingResource: IResourceTreeNode) => {
        setEditingResource(editingResource);
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
