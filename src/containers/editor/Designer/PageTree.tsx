import React, { useState, useEffect, useContext, useCallback } from "react";
import _ from "lodash";
import { TreeBase } from "./TreeBase";
import { FileLoader } from "../../../helpers";
import { SchemasContext } from "../../Context";

export const PageTree = () => {
  const { refresh } = useContext(SchemasContext);
  // schemas fetch
  const fileLoader = FileLoader.getInstance();
  const [schemaTreeChildren, setSchemaTreeChildren] = useState([]);
  const [templateSchemaChildren, setTemplateSchemaChildren] = useState([]);

  useEffect(() => {
    fileLoader.loadFileTree("schema", false).then((data: any) => {
      setSchemaTreeChildren(data);
    });
    fileLoader.loadFileTree("schema", true).then((data: any) => {
      setTemplateSchemaChildren(data);
    });
  }, [refresh]);

  const schemaTree = [
    {
      name: "templates",
      title: "Templates",
      nodeType: "root",
      isTemplate: true,
      children: templateSchemaChildren
    },
    {
      key: "root",
      name: "pages",
      title: "Pages",
      nodeType: "root",
      isTemplate: false,
      type: "schema",
      children: schemaTreeChildren
    }
  ];
  return (
    <div className="pagetree">
      <TreeBase tree={schemaTree} openKeys={["pages"]} />
    </div>
  );
};
