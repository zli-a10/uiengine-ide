import React, { useState, useEffect, useContext, useCallback } from "react";
import _ from "lodash";
import { TreeBase } from "./TreeBase";
import { FileLoader } from "../../../helpers";
import { SchemasContext, GlobalContext } from "../../Context";

export const PageTree = () => {
  const { refresh } = useContext(SchemasContext);
  const { resourceTree, setResourceTree } = useContext(GlobalContext);

  useEffect(() => {
    const loadData = async () => {
      const fileLoader = FileLoader.getInstance();
      const tree = {};
      const schemaTree = [
        {
          name: "templates",
          title: "Templates",
          nodeType: "root",
          isTemplate: true,
          children: []
        },
        {
          key: "root",
          name: "pages",
          title: "Pages",
          nodeType: "root",
          isTemplate: false,
          type: "schema",
          children: []
        }
      ];
      const schemaTpls = await fileLoader.loadFileTree("schema", true);
      schemaTree[0]["children"] = schemaTpls;
      const schemas = await fileLoader.loadFileTree("schema", false);
      schemaTree[1]["children"] = schemas;
      tree["schema"] = schemaTree;
      const listener = await fileLoader.loadFileTree("listener", false);
      tree["listener"] = listener;
      const datasource = await fileLoader.loadFileTree("datasource", false);
      tree["datasource"] = datasource;
      const components = await fileLoader.loadFileTree("component", false);
      tree["component"] = components;
      const plugins = await fileLoader.loadFileTree("plugin", false);
      tree["plugin"] = plugins;
      setResourceTree(tree);
    };
    loadData();
  }, [refresh]);

  return (
    <div className="pagetree">
      <TreeBase tree={_.get(resourceTree, "schema", [])} openKeys={["pages"]} />
    </div>
  );
};
