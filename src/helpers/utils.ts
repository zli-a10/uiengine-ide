import _ from "lodash";
import { NodeController, UINode } from "uiengine";
import { IUINode, IDataSource } from "uiengine/typings";
import { DndNodeManager, FileLoader } from ".";
import { IDE_ID } from "../helpers/consts";

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
        standardSchema["sub"] = fieldSchema;
        standardSchema["type"] = "sub";
      } else {
        standardSchema["options"] = fieldSchema;
        standardSchema["type"] = "enum";
      }
    }
  } else if (_.isString(fieldSchema)) {
    standardSchema["type"] = fieldSchema;
  } else if (_.isObject(fieldSchema)) {
    standardSchema = fieldSchema;
    if (!_.has(fieldSchema, "type")) {
      if (_.has(fieldSchema, "options")) {
        standardSchema["type"] = "enum";
      } else if (_.has(fieldSchema, "range")) {
        standardSchema["type"] = "range";
      }
    }
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
  const copiedNode = new UINode(clonedSchema, sourceNode.request);
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
