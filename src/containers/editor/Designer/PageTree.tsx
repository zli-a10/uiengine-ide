import React, { useState, useEffect, useContext, useCallback } from "react";
import _ from "lodash";
import { TreeBase } from "./TreeBase";
import { FileLoader } from "../../../helpers";
import { SchemasContext, GlobalContext } from "../../Context";

export const PageTree = () => {
  const { refresh } = useContext(SchemasContext);
  const { resourceTree, setResourceTree } = useContext(GlobalContext);
  // schemas fetch
  const fileLoader = FileLoader.getInstance();
  // const [schemaTreeChildren, setSchemaTreeChildren] = useState([]);
  // const [templateSchemaChildren, setTemplateSchemaChildren] = useState([]);

  useEffect(() => {
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
    fileLoader.loadFileTree("schema", false).then((data: any) => {
      // setSchemaTreeChildren(data);
      schemaTree[1]["children"] = data;
      setResourceTree(schemaTree, "schema");
    });
    fileLoader.loadFileTree("schema", true).then((data: any) => {
      // setTemplateSchemaChildren(data);
      schemaTree[0]["children"] = data;
      setResourceTree(schemaTree, "schema");
    });
  }, [refresh]);

  return (
    <div className="pagetree">
      <TreeBase tree={_.get(resourceTree, "schema", [])} openKeys={["pages"]} />
    </div>
  );
};
