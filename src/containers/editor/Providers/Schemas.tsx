import React, { useState, useMemo } from "react";
import _ from "lodash";
import { ILayoutSchema, IUINode } from "uiengine/typings";
import { SchemasContext } from "../../Context";
import { getActiveUINode, VersionControl, FileLoader } from "../../../helpers";

export const Schemas = (props: any) => {
  const [schema, setSchema] = useState();
  const [currentData, setCurrentData] = useState();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const schemasContextValue = useMemo<ISchemasContext>(
    () => ({
      currentData,
      setCurrentData: (data: any) => {
        setCurrentData(data);
      },
      selectedKeys,
      setSelectedKey: (key: any, treeNode?: any, type = "schema") => {
        if (
          selectedKeys.length &&
          !_.has(treeNode, "node.props.dataRef._editing_")
        ) {
          const fileLoader = FileLoader.getInstance();

          const path = _.last(selectedKeys);
          const versionControl = VersionControl.getInstance();
          if (path) {
            if (type === "schema") {
              versionControl.clearHistories();
              fileLoader.editingFile = path;
              const schemaPromise = fileLoader.loadFile(path, type);
              schemaPromise.then((schema: any) => {
                if (_.isObject(schema) && !_.isEmpty(schema)) {
                  const uiNode = getActiveUINode() as IUINode;
                  uiNode.schema = schema;
                  uiNode.updateLayout();
                  uiNode.sendMessage(true);
                }
              });
            }

            // set current dataRef
            if (_.has(treeNode, "node.props.dataRef")) {
              setCurrentData(treeNode.node.props.dataRef);
            }
          }
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
