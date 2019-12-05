import React, { useContext } from "react";
import _ from "lodash";
import {
  DndNodeManager,
  cloneUINode,
  FileLoader,
  getTreeRoot,
  removeDepsSchema,
  getFileSuffix,
  saveFileStatus,
  getActiveUINode
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
  const { editingResource, setSelectedKey } = useContext(SchemasContext);
  const { setContent } = useContext(IDEEditorContext);
  return async () => {
    if (!editingResource) return;
    const fileLoader = FileLoader.getInstance();
    const schema = uinode.schema;

    // save file
    let targetResource = _.cloneDeep(editingResource)
    if (_.get(editingResource, "nodeType", "") === "file") {
      targetResource = _.get(editingResource, "_parent_", {} as IResourceTreeNode)
    }
    const name = _.uniqueId("saved_template_") + '.json';
    // const newPath = `${_.get(targetResource, "_path_")}/${name}`;
    const newPath = `${name}`;

    // and update the tree
    const children: any = _.get(targetResource, "children", []);
    children.push({
      key: newPath,
      name,
      title: name,
      // _editing_: 'rename',
      isTemplate: false,
      nodeType: "file",
      value: name,
      server: true,
      type: "schema"
    });
    targetResource.children = children;
    const treeRoot = getTreeRoot(targetResource);
    fileLoader.saveFile(newPath, schema, "schema", treeRoot);
    saveFileStatus(name, "schema", "new");
    // refresh the tree
    // setSelectedKey(newPath);

    _.forIn(uinode.schema, function (value, key) {
      delete uinode.schema[key]
    })
    uinode.schema.$template = name
    const dndNodeManager = DndNodeManager.getInstance()
    dndNodeManager.pushVersion()
    await uinode.refreshLayout()
    uinode.sendMessage(true)

    //update code editor
    const jsonFileSchema = getActiveUINode(true);
    const cachedActiveTab = JSON.parse(localStorage.cachedActiveTab || '{}');
    if (!_.isEmpty(cachedActiveTab)) {
      setContent({
        content: jsonFileSchema,
        file: cachedActiveTab.tabName,
        type: 'schema'
      });
    }
  };
};

export const useBreakupFromTemplate = (uinode: IUINode) => {
  const { setContent } = useContext(IDEEditorContext);
  return async () => {
    //update schema
    delete uinode.schema.$$template
    const dndNodeManager = DndNodeManager.getInstance()
    dndNodeManager.pushVersion()
    await uinode.refreshLayout()
    uinode.sendMessage(true)

    //update code editor
    const jsonFileSchema = getActiveUINode(true);
    const cachedActiveTab = JSON.parse(localStorage.cachedActiveTab || '{}');
    if (!_.isEmpty(cachedActiveTab)) {
      setContent({
        content: jsonFileSchema,
        file: cachedActiveTab.tabName,
        type: 'schema'
      });
    }
  }
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
  // const { setEditingResource } = useContext(SchemasContext);
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
    // saveFileStatus(tabName, type, {
    //   status: "new",
    //   nodeType: "file",
    //   isTemple: true
    // });
    activeTab(tabName, type);

    // setEditingResource({ type, _status_: "new" } as IResourceTreeNode);
  };
};
