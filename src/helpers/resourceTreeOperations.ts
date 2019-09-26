import _ from "lodash";
import { getTreeRoot } from "./utils";
import { FileLoader } from "./FileLoader";
import { defaultEmptyLayoutSchema } from "./configLayoutWrappers";

export const AddResourceNode = (dataRef: IResourceTreeNode) => {
  const newItem: IResourceTreeNode = {
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

export const CloneResourceNode = (dstNode: IResourceTreeNode) => {
  const fileLoader = FileLoader.getInstance();
  const newItem: IResourceTreeNode = {
    name: "",
    title: `Copy_${dstNode.title}`,
    _key_: _.uniqueId("tree-node-"),
    _path_: dstNode._path_.replace(/(\.\w+)/, "_copy_$1"),
    _editing_: "clone",
    _parent_: dstNode._parent_,
    children: []
  };
  dstNode._parent_.children.push(newItem);
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
  value: string
) => {
  const fileLoader = FileLoader.getInstance();
  let name = _.snakeCase(value);
  name = name.indexOf(".json") > -1 ? name : `${name}.json`;
  const oldPath = dstNode._path_;
  let path = dstNode._parent_
    ? `${dstNode._parent_._path_}/${dstNode.name}`
    : dstNode.name;
  const newAttrs = {
    name,
    title: value,
    _path_: path,
    _key_: path,
    _status_: "changed",
    _editing_: false
  };
  _.merge(dstNode, newAttrs);

  if (dstNode._editing_ === "add") {
    fileLoader.saveFile(
      path,
      defaultEmptyLayoutSchema,
      "schema",
      getTreeRoot(dstNode)
    );
  } else if (dstNode._editing_ === "rename") {
    const content = fileLoader.loadFile(oldPath);
    fileLoader.removeFile(oldPath);
    fileLoader.saveFile(
      path,
      content || defaultEmptyLayoutSchema,
      "schema",
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
