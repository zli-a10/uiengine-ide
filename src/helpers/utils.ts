import _ from "lodash";
import { NodeController, UINode } from "uiengine";
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
    }

    if (_.has(schema, "children")) {
      cleanSchema(schema.children, exporting);
    }
  }
  return schema;
}

export function getActiveUINode(
  schemaOnly: boolean = false,
  returnOrigin: boolean = false
) {
  const nodeController = NodeController.getInstance();
  const uiNode = nodeController.getUINode(nodeController.activeLayout, true);
  if (schemaOnly) {
    let result = (uiNode as IUINode).schema;
    if (!returnOrigin) {
      // if don't clone the schema, once the schema has $$template or $$children
      // that area will be removed when refresh other target parent
      result = _.cloneDeep(result);
    }
    return cleanSchema(result);
  }
  return uiNode;
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
  const words = _.words(wording).map(word => _.upperFirst(word));
  return words.join(" ");
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
        result = { name: plugin.type, title: name };
      } else {
        let children: any = [];
        for (let k in plugin) {
          const p = plugin[k];
          children.push(getPluginSubTree(k, p));
        }
        result = { key: _.uniqueId(key), name: key, title: key, children };
      }
    }
    if (!_.isEmpty(result)) results.push(result);
  }
  return results;
};

const getPluginSubTree = (key: string, plugins: any) => {
  const result: any = { key: _.uniqueId(key), name: key, title: key };
  if (!plugins.type) {
    const children = getPluginTree(plugins);
    if (!_.isEmpty(children)) result.children = children;
  }
  return result;
};

export function loadSchemaAndUpdateLayout(path: string) {
  const fileLoader = FileLoader.getInstance();
  const versionControl = VersionControl.getInstance();
  versionControl.clearHistories();
  fileLoader.editingFile = path;
  const schemaPromise = fileLoader.loadFile(path, "schema");
  schemaPromise.then((schema: any) => {
    if (_.isObject(schema) && !_.isEmpty(schema)) {
      const uiNode = getActiveUINode() as IUINode;
      uiNode.schema = schema;
      uiNode.updateLayout();
      uiNode.sendMessage(true);
    }
  });
  return schemaPromise;
}

export function loadResourceAndUpdateEditor(path: string) {}

/**
 * This function will adapte what you load and update editor or drawingboard depends on type
 * @param path
 * @param type
 */
export function loadFileAndRefresh(path: string, type: string) {
  if (type === "schema") {
    return loadSchemaAndUpdateLayout(path);
  } else {
    return loadResourceAndUpdateEditor(path);
  }
}
