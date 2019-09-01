import _ from "lodash";
import { NodeController, UINode } from "uiengine";
import { IUINode } from "uiengine/typings";
import { DndNodeManager } from ".";

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

export function getActiveUINode(schemaOnly: boolean = false) {
  const nodeController = NodeController.getInstance();
  const uiNode = nodeController.getUINode(nodeController.activeLayout, true);
  if (schemaOnly) {
    return (uiNode as IUINode).schema;
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
      standardSchema["options"] = fieldSchema;
      standardSchema["type"] = "enum";
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
    data.value = parent ? `${parent.name}/${data.name}` : data.name;
    data.key = _.uniqueId(`key-of-${data.path}`);
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
  _.forIn(schema, (s: any, k: string) => {
    if (k === "_id" || k === "id") {
      delete schema[k];
    }
  });
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
