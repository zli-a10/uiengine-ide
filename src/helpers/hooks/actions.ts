import React, { useContext } from "react";
import _ from "lodash";
import {
  DndNodeManager,
  cloneUINode,
  FileLoader,
  getTreeRoot,
  removeDepsSchema,
  getFileSuffix
} from "../../helpers";
import { SchemasContext, IDEEditorContext } from "../../containers/Context";
import { IUINode } from "uiengine/typings";

export const useDeleteNode = (uinode: IUINode) => {
  const dndNodeManager = DndNodeManager.getInstance();
  const { updateSchema } = useContext(SchemasContext);
  const { chooseEditNode } = useContext(IDEEditorContext);
  return async () => {
    // remove these node who depends on me
    removeDepsSchema(uinode);
    await dndNodeManager.delete(uinode);
    // to show schema corret on prop window
    updateSchema(uinode.schema);
    chooseEditNode(null);
  };
};

export const useUnWrapNode = (uinode: IUINode) => {
  const dndNodeManager = DndNodeManager.getInstance();
  const { updateSchema } = useContext(SchemasContext);
  return async () => {
    await dndNodeManager.removeWrappers(uinode);
    updateSchema(uinode.schema);
  };
};

export const useRemoveChildren = (uinode: IUINode) => {
  const dndNodeManager = DndNodeManager.getInstance();
  const { updateSchema } = useContext(SchemasContext);
  return async () => {
    await dndNodeManager.cleanLayout(uinode);
    updateSchema(uinode.schema);
  };
};

export const useSaveTemplate = (uinode: IUINode) => {
  const { currentData, setSelectedKey } = useContext(SchemasContext);
  return async () => {
    if (!currentData) return;
    const fileLoader = FileLoader.getInstance();
    const schema = uinode.schema;

    // save file
    const name = _.uniqueId("saved_template_");
    const newPath = `${_.get(currentData, "_path_")}/${name}`;

    // and update the tree
    const children = _.get(currentData, "children", []);
    children.push({
      _path_: newPath,
      _key_: newPath,
      name,
      title: name,
      _editing_: true
    });
    currentData.children = children;
    const treeRoot = getTreeRoot(currentData);
    fileLoader.saveFile(newPath, schema, "schema", treeRoot);

    // refresh the tree
    setSelectedKey(newPath);
  };
};

export const useCollapseItems = (uinode: IUINode) => {
  const { setCollapsedNode } = useContext(IDEEditorContext);
  return async () => {
    setCollapsedNode(uinode);
  };
};

export const useCloneNode = (uinode: IUINode) => {
  const { chooseEditNode } = useContext(IDEEditorContext);
  return (pos: string) => async () => {
    await cloneUINode(uinode, pos);
    chooseEditNode(uinode);
  };
};

export const useCreateFile = (type: EResourceType, templateName?: string) => {
  const { setContent, activeTab } = useContext(IDEEditorContext);
  const { setEditingResource } = useContext(SchemasContext);
  return async (event: any) => {
    if (event) {
      event.stopPropagation();
    }
    const fileLoader = FileLoader.getInstance();
    templateName = templateName || `index${getFileSuffix(type)}`;
    const data = await fileLoader.loadFile(templateName, type, true);
    // console.log("template %s content %s", templateName, data);
    const tabName = _.uniqueId(type);
    setContent({ content: data, type, file: tabName });
    activeTab(tabName, type);

    setEditingResource({ type } as IResourceTreeNode);
  };
};
