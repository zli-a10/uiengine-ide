import _ from "lodash";
import { DndNodeManager } from "./DndNodeManager";
import { IUINode, IUISchema } from "uiengine/typings";
import * as schemaGenerators from "./schemaGenerators";

export class SchemaPropManager implements ISchemaPropManager {
  static instance: ISchemaPropManager;
  static getInstance() {
    if (!SchemaPropManager.instance) {
      SchemaPropManager.instance = new SchemaPropManager();
    }
    return SchemaPropManager.instance;
  }

  errors?: IError;

  private dndNodeManager: IDndNodeManager = DndNodeManager.getInstance();

  private validateSchemaValue(componentPropSchema: any, value: any) {
    return true;
  }

  /**
   * Generate uiengine layout schema
   *
   * @param type
   * @param componentPropSchema  {entryName1: IComponentInfo, entryName2:IComponentInfo }
   * @param value
   */
  generateSchema(
    type: string,
    componentPropSchema: any,
    value: any,
    extraInfo?: any
  ) {
    if (!type) type = "root";
    const errors = this.validateSchemaValue(componentPropSchema, value);
    if (errors !== true) return false;
    const schemaEntries = Object.entries(componentPropSchema);
    let result = {};
    if (schemaEntries.length) {
      schemaEntries.forEach((schema: any) => {
        const [name, info] = schema;
        let generator = schemaGenerators[type] || schemaGenerators["root"];
        if (generator) {
          const finalSchema = generator(name, info, value, extraInfo);
          result = _.merge(result, finalSchema);
        }
      });
    }
    return result;
  }

  async applySchema(
    type: string,
    componentPropSchema: any,
    value: any,
    uiNode: IUINode,
    extraInfo?: any
  ) {
    const schema: IUISchema = this.generateSchema(
      type,
      componentPropSchema,
      value,
      extraInfo
    );
    await this.dndNodeManager.useSchema(uiNode, schema);
  }
}
