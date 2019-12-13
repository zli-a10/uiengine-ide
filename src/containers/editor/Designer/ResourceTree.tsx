import React, { useState, useEffect, useMemo, useContext } from "react";
import _ from "lodash";
import { TreeBase } from "./TreeBase";
import { FileLoader, getPluginTree } from "../../../helpers";
import { PluginManager } from "uiengine";
import { SchemasContext, GlobalContext } from "../../Context";

export const ResourceTree = () => {
  // const { refresh } = useContext(SchemasContext);
  const { resourceTree, setResourceTree } = useContext(GlobalContext);

  // schemas fetch
  // const fileLoader = FileLoader.getInstance();

  // useEffect(() => {
  //   const loadData = async () => {
  //     const tree = {};
  //     const handler = await fileLoader.loadFileTree("handler", false);
  //     tree["handler"] = handler;
  //     const datasource = await fileLoader.loadFileTree("datasource", false);
  //     tree["datasource"] = datasource;
  //     const components = await fileLoader.loadFileTree("component", false);
  //     tree["component"] = components;
  //     const plugins = await fileLoader.loadFileTree("plugin", false);
  //     tree["plugin"] = plugins;
  //     setResourceTree(tree);
  //   };
  //   loadData();
  // }, [refresh]);

  const tree = useMemo(() => {
    return [
      {
        name: "Plugins",
        title: "Plugins",
        nodeType: "category",
        children: [
          {
            name: "running-plugins",
            title: "Running Plugins",
            nodeType: "category",
            children: getPluginTree(
              PluginManager.getInstance().getPlugins("global")
            )
          },
          {
            name: "my-plugins",
            title: "My Plugins",
            nodeType: "root",
            type: "plugin",
            children: _.get(resourceTree, "plugin", [])
          }
        ]
      },
      {
        name: "Handlers",
        title: "Handlers",
        nodeType: "root",
        type: "handler",
        children: _.get(resourceTree, "handler", [])
      },
      {
        name: "Components",
        title: "Components",
        nodeType: "root",
        type: "component",
        children: _.get(resourceTree, "component", [])
      },
      {
        name: "DataSources",
        title: "Data Sources",
        nodeType: "root",
        type: "datasource",
        children: _.get(resourceTree, "datasource", [])
      }
    ];
  }, [resourceTree]);

  return (
    <div className="pagetree">
      <TreeBase tree={tree} />
    </div>
  );
};
