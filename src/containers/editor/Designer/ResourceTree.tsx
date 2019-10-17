import React, { useState, useEffect, useCallback, useContext } from "react";
import _ from "lodash";
import { TreeBase } from "./TreeBase";
import { FileLoader, getPluginTree } from "../../../helpers";
import { PluginManager } from "uiengine";
import { SchemasContext } from "../../Context";

export const ResourceTree = () => {
  const { refresh } = useContext(SchemasContext);

  // schemas fetch
  const fileLoader = FileLoader.getInstance();
  const [pluginsChildren, setPluginsChildren] = useState([]);
  const [listenerChildren, setListenerChildren] = useState([]);
  const [datasourceChildren, setDatasourceChildren] = useState([]);
  const [componentChildren, setComponentChildren] = useState([]);

  useEffect(() => {
    fileLoader.loadFileTree("listener", false).then((data: any) => {
      setListenerChildren(data);
    });
    fileLoader.loadFileTree("datasource", false).then((data: any) => {
      setDatasourceChildren(data);
    });
    fileLoader.loadFileTree("component", false).then((data: any) => {
      setComponentChildren(data);
    });
    fileLoader.loadFileTree("plugin", false).then((data: any) => {
      setPluginsChildren(data);
    });
  }, [refresh]);

  // const [tree, setTree] = useState(treeStructure)
  const resourceTree: any = [
    {
      name: "Plugins",
      title: "Plugins",
      nodeType: "category",
      children: [
        {
          name: "running-plugins",
          title: "Running Plugins",
          children: getPluginTree(
            PluginManager.getInstance().getPlugins("global")
          )
        },
        {
          name: "my-plugins",
          title: "My Plugins",
          nodeType: "root",
          type: "plugin",
          children: pluginsChildren
        }
      ]
    },
    {
      name: "Listeners",
      title: "Listeners",
      nodeType: "root",
      type: "listener",
      children: listenerChildren
    },
    {
      name: "Components",
      title: "Components",
      nodeType: "root",
      type: "component",
      children: componentChildren
    },
    {
      name: "DataSources",
      title: "Data Sources",
      nodeType: "root",
      type: "datasource",
      children: datasourceChildren
    }
  ];

  return (
    <div className="pagetree">
      <TreeBase tree={resourceTree} />
    </div>
  );
};
