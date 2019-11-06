import _ from "lodash";
import { getTreeRoot } from "./utils";
import { FileLoader } from "./FileLoader";
import { defaultEmptyLayoutSchema } from "./configLayoutWrappers";
import { saveFileStatus, getFileSuffix, loadFileStatus } from "./utils";

export const AddResourceNode = (
  dstNode: IResourceTreeNode,
  nodeType: ENodeType = "file"
) => {
  const { type } = dstNode;
  const newItem: IResourceTreeNode = {
    type,
    name: "",
    title: "",
    nodeType,
    key: _.uniqueId("tree-node-"),
    value: "",
    _editing_: "add",
    _parent_: dstNode,
    children: []
  };

  if (_.isArray(dstNode.children)) {
    dstNode.children.push(newItem);
  } else {
    dstNode.children = [newItem];
  }
  return dstNode;
};

export const AddResourceFolder = (dstNode: IResourceTreeNode) => {
  return AddResourceNode(dstNode, "folder");
};

export const DeleteResourceNode = (
  dstNode: IResourceTreeNode,
  revert: boolean = false
) => {
  const { type } = dstNode;
  const statusObj = loadFileStatus(type, dstNode.key);
  // console.log(statusObj, type, dstNode._path_, ".....");
  if (statusObj && statusObj.status === "new") {
    const fileLoader = FileLoader.getInstance();
    const srcNodes = _.get(dstNode, `_parent_.children`, []);
    _.remove(srcNodes, (d: any) => {
      return d.key === dstNode.key;
    });
    fileLoader.removeFile(dstNode.key, type, getTreeRoot(dstNode));
    saveFileStatus(dstNode.key, type, {
      status: "dropped",
      nodeType: dstNode.nodeType
    });
  } else {
    if (!revert) {
      // instead remove, just record the stauts
      dstNode._status_ = "removed";
      saveFileStatus(dstNode.key, type, {
        status: "removed",
        nodeType: dstNode.nodeType
      });
    } else {
      // instead remove, just record the stauts
      const { type } = dstNode;
      dstNode._status_ = "normal";
      saveFileStatus(dstNode.key, type, {
        status: "dropped",
        nodeType: dstNode.nodeType
      });
    }
  }

  if (dstNode.children) {
    dstNode.children.forEach((node: IResourceTreeNode) => {
      DeleteResourceNode(node, revert);
    });
  }
};

export const CloneResourceNode = async (
  dstNode: IResourceTreeNode,
  type: EResourceType = "schema"
) => {
  const fileLoader = FileLoader.getInstance();
  const suffix = getFileSuffix(dstNode);
  const regExp = new RegExp(`${suffix}$`);
  const nameUniqueId = _.uniqueId("_copy");
  const newName = dstNode.key.replace(regExp, `${nameUniqueId}${suffix}`);
  const newItem: IResourceTreeNode = {
    type,
    name: newName,
    title: newName,
    nodeType: "file",
    key: newName,
    value: newName,
    _editing_: false,
    _status_: "new",
    _parent_: dstNode._parent_,
    children: []
  };
  const children = _.get(dstNode, `_parent_.children`);
  if (children) {
    children.push(newItem);
  }
  const content = await fileLoader.loadFile(dstNode.key, type);
  // console.log(content, dstNode._path_, type);
  fileLoader.saveFile(newName, content, type, getTreeRoot(dstNode));
  saveFileStatus(newName, type, { status: "new", nodeType: "file" });
  return newItem;
};

export const RenameResourceNode = (dstNode: IResourceTreeNode) => {
  dstNode._editing_ = "rename";
  dstNode._status_ = "renamed";
};

export const saveToResourceNode = (
  dstNode: IResourceTreeNode,
  value: string
) => {
  const fileLoader = FileLoader.getInstance();
  let name = _.snakeCase(value);
  const { _editing_: editing, type } = dstNode;
  let parentPath = dstNode._parent_.key;
  if (dstNode.nodeType === "file") {
    const suffix = getFileSuffix(dstNode);
    name = name.indexOf(suffix) > -1 ? name : `${name}${suffix}`;
    // const regExp = new RegExp(`${suffix}$`);
    // parentPath = parentPath.replace(regExp, "");
  }

  const oldPath = dstNode.key;
  const nodeType = dstNode.nodeType;
  let path =
    dstNode._parent_ && dstNode._parent_.nodeType !== "root"
      ? `${parentPath}/${name}`
      : name;
  const status = editing === "add" ? "new" : "changed";

  const newAttrs = {
    type,
    name,
    title: value,
    value: path,
    key: path,
    _status_: status,
    _editing_: false
  };

  _.merge(dstNode, newAttrs);

  // console.log(oldPath, type, path);
  if (editing === "rename") {
    const statusObj = loadFileStatus(type, oldPath);
    if (!_.isEmpty(statusObj)) {
      if (statusObj.status !== "new") {
        saveFileStatus(oldPath, type, {
          newPath: path,
          status: "renamed",
          nodeType
        });
      } else {
        if (dstNode.nodeType === "file") {
          const content = fileLoader.loadFile(oldPath, type);
          content.then((data: any) => {
            fileLoader.removeFile(oldPath, type);
            fileLoader.saveFile(
              path,
              data || defaultEmptyLayoutSchema,
              type,
              getTreeRoot(dstNode)
            );
          });
        }
        saveFileStatus(oldPath, type, { status: "dropped", nodeType });
        saveFileStatus(path, type, { status: "new", nodeType });
      }
    } else {
      // remote file
      saveFileStatus(oldPath, type, {
        newPath: path,
        status: "renamed",
        nodeType
      });
    }
  } else {
    fileLoader.saveFile(
      path,
      defaultEmptyLayoutSchema,
      type,
      getTreeRoot(dstNode)
    );
    saveFileStatus(path, type, { status, nodeType });
  }

  return path;
};

export const revertResourceNode = async (
  dstNode: IResourceTreeNode,
  type: EResourceType = "schema"
) => {
  let content = {};
  const statusObj = loadFileStatus(dstNode.type, dstNode.key);
  if (!_.isEmpty(statusObj) && statusObj.status === "changed") {
    const fileLoader = FileLoader.getInstance();
    content = await fileLoader.loadFile(dstNode.key, type, false, true);
    fileLoader.saveFile(dstNode.key, content, type, getTreeRoot(dstNode));
    saveFileStatus(dstNode.key, type, { status: "dropped", nodeType: dstNode.nodeType });
  }
  return content;
};

export const resourceActions = {
  add: AddResourceNode,
  addFolder: AddResourceFolder,
  delete: DeleteResourceNode,
  rename: RenameResourceNode,
  clone: CloneResourceNode,
  save: saveToResourceNode,
  revert: revertResourceNode
};
