import _ from "lodash";
import { getTreeRoot } from "./utils";
import { FileLoader } from "./FileLoader";
import { defaultEmptyLayoutSchema } from "./configLayoutWrappers";

export const AddResourceNode = (
  dataRef: IResourceTreeNode,
  type: EResourceType = "schema"
) => {
  const newItem: IResourceTreeNode = {
    type,
    name: "",
    title: "",
    _key_: _.uniqueId("tree-node-"),
    _path_: "",
    _editing_: "add",
    _parent_: dataRef,
    children: []
  };

  if (_.isArray(dataRef.children)) {
    dataRef.children.push(newItem);
  } else {
    dataRef.children = [newItem];
  }
  return dataRef;
};

export const DeleteResourceNode = (dstNode: IResourceTreeNode) => {
  const fileLoader = FileLoader.getInstance();
  const srcNodes = _.get(dstNode, `_parent_.children`, []);
  _.remove(srcNodes, (d: any) => {
    return d._key_ === dstNode._key_;
  });
  fileLoader.removeFile(dstNode._path_, "schema", getTreeRoot(dstNode));
};

export const CloneResourceNode = (
  dstNode: IResourceTreeNode,
  type: EResourceType = "schema"
) => {
  const fileLoader = FileLoader.getInstance();
  const newItem: IResourceTreeNode = {
    type,
    name: "",
    title: `Copy_${dstNode.title}`,
    _key_: _.uniqueId("tree-node-"),
    _path_: dstNode._path_.replace(/(\.\w+)/, "_copy_$1"),
    _editing_: "clone",
    _parent_: dstNode._parent_,
    children: []
  };
  const children = _.get(dstNode, `_parent_.children`);
  if (children) {
    children.push(newItem);
  }
  const content = fileLoader.loadFile(dstNode._path_);
  const newName = `${dstNode._path_}_${_.uniqueId("copy_")}`;
  fileLoader.saveFile(newName, content, "schema", getTreeRoot(dstNode));
  return newName;
};

export const RenameResourceNode = (dstNode: IResourceTreeNode) => {
  dstNode._editing_ = "rename";
};

export const saveSchemaToResourceNode = (
  dstNode: IResourceTreeNode,
  value: string,
  type: EResourceType = "schema"
) => {
  const fileLoader = FileLoader.getInstance();
  let name = _.snakeCase(value);
  name = name.indexOf(".json") > -1 ? name : `${name}.json`;
  const oldPath = dstNode._path_;
  let path =
    dstNode._parent_ && dstNode._parent_.nodeType !== "root"
      ? `${dstNode._parent_._path_}/${name}`
      : name;
  const newAttrs = {
    type,
    name,
    title: value,
    value: path,
    key: path,
    _path_: path,
    _key_: path,
    _status_: "changed",
    _editing_: false
  };

  const editing = dstNode._editing_;
  _.merge(dstNode, newAttrs);

  if (editing === "add") {
    fileLoader.saveFile(
      path,
      defaultEmptyLayoutSchema,
      type,
      getTreeRoot(dstNode)
    );
  } else if (editing === "rename") {
    const content = fileLoader.loadFile(oldPath);
    fileLoader.removeFile(oldPath);
    fileLoader.saveFile(
      path,
      content || defaultEmptyLayoutSchema,
      type,
      getTreeRoot(dstNode)
    );
  }

  return path;
};

export const resourceActions = {
  add: AddResourceNode,
  delete: DeleteResourceNode,
  rename: RenameResourceNode,
  clone: CloneResourceNode,
  save: saveSchemaToResourceNode
};
