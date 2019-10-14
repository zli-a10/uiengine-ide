import _ from "lodash";
import { getTreeRoot } from "./utils";
import { FileLoader } from "./FileLoader";
import { defaultEmptyLayoutSchema } from "./configLayoutWrappers";
import { saveFileStatus, getFileSuffix, loadFileStatus } from "./utils";

export const AddResourceNode = (dstNode: IResourceTreeNode) => {
  const { type } = dstNode;
  const newItem: IResourceTreeNode = {
    type,
    name: "",
    title: "",
    _key_: _.uniqueId("tree-node-"),
    _path_: "",
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

export const DeleteResourceNode = (
  dstNode: IResourceTreeNode,
  revert: boolean = false
) => {
  const { type } = dstNode;
  const status = loadFileStatus(type, dstNode._path_);
  if (status === "new") {
    const fileLoader = FileLoader.getInstance();
    const srcNodes = _.get(dstNode, `_parent_.children`, []);
    _.remove(srcNodes, (d: any) => {
      return d._key_ === dstNode._key_;
    });
    fileLoader.removeFile(dstNode._path_, type, getTreeRoot(dstNode));
    saveFileStatus(dstNode._path_, type, "dropped");
  } else {
    if (!revert) {
      // instead remove, just record the stauts
      dstNode._status_ = "removed";
      saveFileStatus(dstNode._path_, type, "removed");
    } else {
      // instead remove, just record the stauts
      const { type } = dstNode;
      dstNode._status_ = "normal";
      saveFileStatus(dstNode._path_, type, "normal");
    }
  }

  if (dstNode.children) {
    dstNode.children.forEach((node: IResourceTreeNode) => {
      DeleteResourceNode(node, revert);
    });
  }
};

export const CloneResourceNode = (
  dstNode: IResourceTreeNode,
  type: EResourceType = "schema"
) => {
  const fileLoader = FileLoader.getInstance();
  const suffix = getFileSuffix(dstNode);
  const regExp = new RegExp(`${suffix}$`);
  const newName = dstNode._path_.replace(
    regExp,
    `${_.uniqueId("_copy")}${suffix}`
  );
  const newItem: IResourceTreeNode = {
    type,
    name: "",
    title: `Copy_${dstNode.title}`,
    _key_: _.uniqueId("tree-node-"),
    _path_: newName,
    _editing_: "clone",
    _status_: "new",
    _parent_: dstNode._parent_,
    children: []
  };
  const children = _.get(dstNode, `_parent_.children`);
  if (children) {
    children.push(newItem);
  }
  const content = fileLoader.loadFile(dstNode._path_, type);
  fileLoader.saveFile(newName, content, type, getTreeRoot(dstNode), "new");
  return newName;
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
  //   const jsonSuffixTypes = ['datasource', 'schema'];
  //  const tsSuffixTypes = ['plugin', 'listener'];
  //   const suffix = jsonSuffixTypes.indexOf(type) > -1 ? '.json' : tsSuffixTypes.indexOf(type) ? '.ts' : '.tsx';
  const suffix = getFileSuffix(dstNode);
  name = name.indexOf(suffix) > -1 ? name : `${name}${suffix}`;
  const oldPath = dstNode._path_;
  const regExp = new RegExp(`${suffix}$`);
  const parentPath = dstNode._parent_._path_.replace(regExp, "");
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
    _path_: path,
    _key_: path,
    _status_: status,
    _editing_: false
  };

  _.merge(dstNode, newAttrs);

  if (editing === "rename") {
    // const content = fileLoader.loadFile(oldPath, type);
    // fileLoader.removeFile(oldPath, type);
    // fileLoader.saveFile(
    //   path,
    //   content || defaultEmptyLayoutSchema,
    //   type,
    //   getTreeRoot(dstNode),
    //   status
    // );
    saveFileStatus(oldPath, type, { newPath: path, status: "renamed" });
  } else {
    fileLoader.saveFile(
      path,
      defaultEmptyLayoutSchema,
      type,
      getTreeRoot(dstNode),
      status
    );
  }

  return path;
};

export const resourceActions = {
  add: AddResourceNode,
  delete: DeleteResourceNode,
  rename: RenameResourceNode,
  clone: CloneResourceNode,
  save: saveToResourceNode
};
