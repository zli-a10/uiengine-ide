import React, { useContext } from "react";
import _ from "lodash";
import { NodeController } from "uiengine";
import { IUINode, IDataSource } from "uiengine/typings";
import { DndNodeManager, FileLoader, VersionControl } from ".";
import { IDE_ID, IDE_DEP_COLORS, IDE_COLOR } from "../helpers/consts";
import { searchDepsNodes } from "uiengine";

export function difference(object: any, base: any) {
  function changes(object: any, base: any) {
    return _.transform(object, function(result: any, value, key) {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}

export function cleanSchema(schema: any, exporting: boolean = false) {
  if (_.isArray(schema)) {
    schema.forEach((child: any) => {
      cleanSchema(child, exporting);
    });
  } else {
    // remove $$children && $$template
    if (_.has(schema, "$$children")) {
      const childrenTemplate = _.get(schema, "$$children");
      const fileLoader = FileLoader.getInstance();
      const data = fileLoader.loadFile(childrenTemplate, "schema");
      if (_.isArray(data.children)) {
        schema.$children = data.children;
      }
    }
    if (_.has(schema, "$$template")) {
      const childrenTemplate = _.get(schema, "$$template");
      // _.forIn(schema, (value: any, key: any) => {
      //   _.unset(schema, key);
      // });
      schema.$template = childrenTemplate;
    }

    // remove IDE_ID
    if (exporting) {
      _.unset(schema, IDE_ID);
      _.unset(schema, "_id");
      _.unset(schema, IDE_DEP_COLORS);
      _.unset(schema, IDE_COLOR);
    }

    if (_.has(schema, "children")) {
      cleanSchema(schema.children, exporting);
    }
  }
  return schema;
}

export function getActiveUINode(
  schemaOnly: boolean = false,
  copySchema: boolean = false
) {
  const nodeController = NodeController.getInstance();
  const uiNode = nodeController.getUINode("drawingboard", true);

  if (schemaOnly) {
    let result = (uiNode as IUINode).schema;
    if (!copySchema) {
      // if don't clone the schema, once the schema has $$template or $$children
      // that area will be removed when refresh other target parent
      result = _.cloneDeep(result);
    }
    return cleanSchema(result);
  }
  return uiNode;
}

export function getDataSourceDomains(schema: any = {}) {
  if (_.isEmpty(schema)) {
    schema = getActiveUINode(true);
  }

  let results: any = [];
  const datasource = _.get(schema, "datasource", "");
  let formattedSource = getDataSource(datasource, true);
  let domain = "unknown";
  if (formattedSource) {
    let sourceSegs: any = [];
    if (formattedSource.indexOf(":") > -1) {
      sourceSegs = formattedSource.split(":");
    } else {
      sourceSegs = formattedSource.split(".");
    }

    results = [];
    domain = sourceSegs.shift();
    let name;

    if (results.indexOf(domain) === -1) {
      name = domain;
      results.push(name);
    }
  }
  if (_.isArray(schema.children)) {
    schema.children.forEach((s: any) => {
      results = _.union(results, getDataSourceDomains(s));
    });
  }
  return results;
}

export function getDataSourceFields(schema: any = {}) {
  if (_.isEmpty(schema)) {
    schema = getActiveUINode(true);
  }

  let results: any = {};
  const datasource = _.get(schema, "datasource", "");
  let formattedSource = getDataSource(datasource, true);
  let domain = "";
  if (formattedSource) {
    let sourceSegs: any = [];
    if (formattedSource.indexOf(":") > -1) {
      sourceSegs = formattedSource.split(":");
    } else {
      sourceSegs = formattedSource.split(".");
    }

    domain = sourceSegs.shift();
    const fieldName = sourceSegs.join(".");
    if (!results[domain]) results[domain] = [];
    results[domain].push(fieldName);
  }

  if (_.isArray(schema.children)) {
    schema.children.forEach((s: any) => {
      const cResults = getDataSourceFields(s);
      Object.keys(cResults).forEach((key: string) => {
        if (results[key]) {
          results[key] = results[key].concat(cResults[key]);
        } else {
          results[key] = _.cloneDeep(cResults[key]);
        }
      });
    });
  }
  return results;
}

export function convertNodes(
  nodes: any[],
  nodeKeys: string[] = [],
  shortFormat: boolean = false
) {
  return nodes.map((node: any) => {
    const newNodeKeys = _.cloneDeep(nodeKeys);
    let value = _.get(node, "datasource.source");
    if (!value) {
      value = `${newNodeKeys.join(".")}.${node.name}`;
    }
    if (!shortFormat) {
      node.value = value;
    } else {
      node.value = node.name;
    }
    node.title = node.name;
    newNodeKeys.push(node.name);
    node.key = newNodeKeys.join(".");
    if (node.children) {
      node.children = convertNodes(node.children, newNodeKeys);
    }
    return node;
  });
}

export function getTreeRoot(treeRoot: any) {
  let root = null;
  while (treeRoot) {
    if (!treeRoot._parent_) {
      root = treeRoot;
    }
    treeRoot = treeRoot._parent_;
  }
  return root;
}

export function formatTitle(wording: string) {
  if (_.isString(wording)) {
    let lastWord = _.last(wording.split("."));
    const words = _.words(lastWord).map(word => _.upperFirst(word));
    return words.join(" ");
  }
  return "";
}
export function checkDuplicate(treeNode: any, name: string) {
  let duplicate = false;
  if (treeNode.children && treeNode.children.length) {
    treeNode.children.some((item: any) => {
      duplicate = checkDuplicate(item, name);
      if (duplicate) return true;
    });
  } else {
    if (
      treeNode._editing_ != "rename" &&
      treeNode.name.split(".")[0] === name
    ) {
      duplicate = true;
    }
  }
  return duplicate;
}
export function checkDuplicateTreeLeaf(treeNode: any, name: string) {
  let treeRoot = getTreeRoot(treeNode);
  let duplicate = false;
  treeRoot.children.some((item: any) => {
    duplicate = checkDuplicate(item, name);
    if (duplicate) return true;
  });
  return duplicate;
}
/**
 * Format arbitary schema to stardard one
 *
 * @param fieldSchema
 * @return
 */
export const schemaTidy = (fieldSchema: any): IComponentSchema => {
  let standardSchema: any = { type: "string" };
  if (_.isArray(fieldSchema)) {
    if (_.isNumber(fieldSchema[0])) {
      standardSchema["range"] = fieldSchema;
      standardSchema["type"] = "range";
    } else {
      if (_.isObject(fieldSchema[0])) {
        // subobject treated
        standardSchema["sub"] = fieldSchema.map(schemaTidy);
        standardSchema["type"] = "sub";
      } else {
        standardSchema["options"] = fieldSchema;
        standardSchema["type"] = "enum";
      }
    }
  } else if (_.isString(fieldSchema)) {
    standardSchema["type"] = fieldSchema;
  } else if (_.isObject(fieldSchema)) {
    if (!_.has(fieldSchema, "type")) {
      _.forIn(fieldSchema, (schema: any, key: string) => {
        fieldSchema[key] = schemaTidy(schema);
      });
    }
    standardSchema = fieldSchema;
  }
  return standardSchema;
};

// format tree, add key and item
export const formatTree = (data: any, parent?: any) => {
  if (data) {
    let parentPath;
    if (!parent) {
      parentPath = data.name;
    } else {
      parentPath = `${parent.value}/${data.name}`;
    }
    data.value = parentPath;
    data.key = _.uniqueId(`key-of-${parentPath}`);
    if (data.children) {
      data.children.forEach((item: any) => {
        formatTree(item, data);
      });
    }
  }
  return data;
};

// format tree, add key and value
export const formatSchemaToTree = (data: any, parentPath?: any) => {
  const result: any = [];
  _.forIn(data, (value: any, key: string) => {
    if (key[0] !== "_") {
      let path = key;
      if (parentPath) {
        path = `${parentPath}.${path}`;
      }
      let obj: any = {
        key: path
      };
      if (_.isObject(value)) {
        obj.value = path;
        obj.title = path;
        obj.children = formatSchemaToTree(value, key);
      } else {
        obj.value = `${path}:${value}`;
        obj.title = `${path}(${value})`;
      }
      result.push(obj);
    }
  });
  return result;
};

// clone schema, remove _id & id
export const cloneSchemaDeep = (schema: any) => {
  const toRemoveKeys = ["id", "_id"];
  _.forIn(schema, (s: any, k: string) => {
    if (toRemoveKeys.indexOf(k) > -1) {
      delete schema[k];
    }
  });
  // generate ide key
  schema[IDE_ID] = _.uniqueId(`${IDE_ID}-`);
  if (_.isArray(schema.children)) {
    schema.children.forEach((child: any) => cloneSchemaDeep(child));
  }
  return schema;
};

export const cloneUINode = async (sourceNode: any, pos: string) => {
  const dndNodeManager = DndNodeManager.getInstance();
  const clonedSchema = cloneSchemaDeep(_.cloneDeep(sourceNode.schema));
  const copiedNode = { schema: clonedSchema };
  const method = `insert${_.upperFirst(pos)}`;
  await dndNodeManager[method](copiedNode, sourceNode);
  return copiedNode;
};

export const getDataSource = (
  datasource: IDataSource | string,
  full: boolean = false
) => {
  if (!datasource) return "";
  let source = "";
  if (_.isObject(datasource)) {
    source = datasource.source;
  } else {
    source = datasource;
  }
  if (!source) return "";
  if (full) {
    return source;
  }
  return _.last(source.replace(":", ".").split("."));
};

export const getDataSchema = (datasource: IDataSource | string) => {
  if (!datasource) return "";
  let schema;
  if (_.isString(datasource)) {
    schema = datasource;
  } else {
    schema = _.get(datasource, "schema", _.get(datasource, "source"));
  }
  return schema;
};

export const droppable = (uiNode: IUINode) => {
  // if $$children and $template, then don't dnd
  const templateKeywords = "$$template";
  const templateName = _.get(uiNode, `schema.${templateKeywords}`);

  const childrenKeywords = "$_children";
  const childrenTemplateName = _.get(uiNode, `schema.${childrenKeywords}`);
  if (childrenTemplateName || templateName) {
    _.set(uiNode, `props.ide_droppable`, 1);
  }

  if (_.get(uiNode, "parent.props.ide_droppable") !== undefined) {
    _.set(uiNode, `props.ide_droppable`, 2);
    return false;
  }

  // if (_.get(uiNode, "props.isTable") !== undefined) {
  //   _.set(uiNode, `props.ide_droppable`, 3);
  //   return false;
  // }
  return true;
};

export const fillWithKeywords = (
  node: IUINode[] | IUINode,
  keywords: string,
  value: boolean = true
) => {
  if (_.isArray(node)) {
    node.forEach((child: IUINode) => {
      fillWithKeywords(child, keywords, value);
    });
  } else if (_.isObject(node)) {
    _.set(node, keywords, value);
    if (_.has(node, "children")) {
      fillWithKeywords(node.children, keywords, value);
    }
  }
};

export const rand = (min: any, max: any) => {
  return parseInt(Math.random() * (max - min + 1) + min);
};

export const randColor = (min: number, max: number, alpha: number = 0.2) => {
  const r = rand(min, max);
  const g = rand(min, max);
  const b = rand(min, max);
  return `rgba(${r},${g}, ${b}, ${alpha})`;
};

export const getUINodeLable = (uiNode: IUINode) => {
  const dataSource = getDataSource(uiNode.schema.datasource);
  let myId = dataSource || _.get(uiNode, `schema.id`);
  return myId;
};

export const updateDepsColor = (uiNode: IUINode) => {
  const depsNodes = searchDepsNodes(uiNode);
  let nodes;
  let myId = getUINodeLable(uiNode);
  depsNodes.forEach((depNode: IUINode) => {
    nodes = _.get(depNode, `schema.${IDE_DEP_COLORS}`, {});
    nodes[myId] = uiNode.schema[IDE_COLOR];
    _.set(depNode, `schema.${IDE_DEP_COLORS}`, nodes);
  });
};

export const removeDepsSchema = (uiNode: IUINode) => {
  const depsNodes = searchDepsNodes(uiNode);
  depsNodes.forEach((depNode: IUINode) => {
    const stateSchema = _.get(depNode, "schema.state", {});
    _.forIn(stateSchema, (state: any, stateName: string) => {
      const depsSchema = _.get(state, "deps", []);
      const newDeps: any = [];
      depsSchema.forEach((depSchema: any, index: number) => {
        const depId = _.get(depSchema, "selector.id");
        if (depId !== uiNode.id) {
          newDeps.push(depSchema);
        } else {
          _.unset(depNode, `schema.${IDE_DEP_COLORS}.${depId}`);
        }
      });
      _.set(state, "deps", newDeps);
    });
    depNode.sendMessage(true);
  });

  if (!_.isEmpty(uiNode.children)) {
    uiNode.children.forEach((node: IUINode) => {
      removeDepsSchema(node);
    });
  }
};

export const getPluginTree = (plugins: any) => {
  // console.log(PluginManager.plugins);
  let results: any[] = [];
  for (let key in plugins) {
    let result: any = {};
    const plugin: { type?: any } = plugins[key];
    if (_.isObject(plugin)) {
      if (plugin.type) {
        let name = _.get(plugin, "name", plugin.type);
        result = { name: plugin.type, title: name, isTemplate: true };
      } else {
        let children: any = [];
        for (let k in plugin) {
          const p = plugin[k];
          children.push(getPluginSubTree(k, p));
        }
        result = {
          key: _.uniqueId(key),
          name: key,
          title: key,
          children,
          isTemplate: true
        };
      }
    }
    if (!_.isEmpty(result)) results.push(result);
  }
  return results;
};

const getPluginSubTree = (key: string, plugins: any) => {
  const result: any = {
    key: _.uniqueId(key),
    name: key,
    title: key,
    isTemplate: true
  };
  if (!plugins.type) {
    const children = getPluginTree(plugins);
    if (!_.isEmpty(children)) result.children = children;
  }
  return result;
};

export function loadSchemaAndUpdateLayout(path: string, isTemplate: boolean) {
  const fileLoader = FileLoader.getInstance();
  const versionControl = VersionControl.getInstance();
  versionControl.clearHistories();
  fileLoader.editingFile = path;
  const schemaPromise = fileLoader.loadFile(path, "schema", isTemplate);
  schemaPromise.then((schema: any) => {
    if (!_.isEmpty(schema)) {
      if (_.isString(schema)) {
        try {
          schema = JSON.parse(schema);
        } catch (e) {
          console.error(e);
        }
      }
      const uiNode = getActiveUINode() as IUINode;
      uiNode.schema = schema;
      uiNode.updateLayout();
      uiNode.sendMessage(true);
    }
  });
  return schemaPromise;
}

export function loadResourceAndUpdateEditor(
  path: string,
  type: EResourceType,
  isTemplate: boolean
) {
  const fileLoader = FileLoader.getInstance();
  const promise = fileLoader.loadFile(path, type, isTemplate);
  return promise;
}

/**
 * This function will adapte what you load and update editor or drawingboard depends on type
 * @param path
 * @param type
 */
export function loadFileAndRefresh(
  path: string,
  type: EResourceType,
  isTemplate: boolean
) {
  if (type === "schema") {
    return loadSchemaAndUpdateLayout(path, isTemplate);
  } else {
    return loadResourceAndUpdateEditor(path, type, isTemplate);
  }
}

/**
 * Save file status tree
 */
export function saveFileStatus(
  file: string,
  type: EResourceType,
  status: EStatus | EFullStatus
) {
  const fileStatus: Array<IFileStatusGroup> = [{ file, type, status }];
  updateFileStatus(fileStatus);
}

/**
 * Restore file status
 *
 * @param files  to update file status
 */
export function updateFileStatus(files: Array<IFileStatusGroup>) {
  let fileStatus = loadFileStatus();
  files.forEach((f: IFileStatusGroup) => {
    const { type, file, status } = f;
    if (type) {
      if (fileStatus[type] && fileStatus[type][file]) {
        // console.log(status, fileStatus);
        const s = _.get(status, "status", status);
        if (s === "dropped") {
          delete fileStatus[type][file];
        } else {
          if (
            (fileStatus[type][file] !== "new" &&
              fileStatus[type][file] !== "renamed") ||
            s === "removed" ||
            s === "renamed"
          ) {
            fileStatus[type][file] = status;
          }
        }
      } else {
        // new
        if (!fileStatus[type]) fileStatus[type] = {};
        fileStatus[type][file] = status;
      }
    }
  });

  localStorage.fileStatus = JSON.stringify(fileStatus);
}

export function loadFileStatus(type?: EResourceType, file?: string) {
  let fileStatus = {};
  if (localStorage.fileStatus) {
    fileStatus = JSON.parse(localStorage.fileStatus);
  }
  if (type) {
    const fs = fileStatus[type];
    if (file && fs) {
      const obj = fs[file];
      if (_.isString(obj)) {
        return { status: obj };
      } else {
        if (obj === undefined) return {};
        return obj;
      }
    }
    return fs;
  }
  return fileStatus || {};
}

export const getFileSuffix = (dstNode: IResourceTreeNode | EResourceType) => {
  let type = _.isString(dstNode) ? dstNode : dstNode.type;

  const jsonSuffixTypes = ["datasource", "schema"];
  const tsSuffixTypes = ["plugin", "listener"];
  const suffix =
    jsonSuffixTypes.indexOf(type) > -1
      ? ".json"
      : tsSuffixTypes.indexOf(type)
      ? ".ts"
      : ".tsx";
  return suffix;
};
