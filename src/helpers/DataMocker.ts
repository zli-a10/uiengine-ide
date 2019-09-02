import Mock from "mockjs";
import _ from "lodash";
// import { UIEngineRegister } from "uiengine";
// import * as plugins from "./plugins";
// UIEngineRegister.registerPlugins(plugins);

export class DataMocker implements IDataMocker {
  static instance: IDataMocker;
  static getInstance() {
    if (!DataMocker.instance) {
      DataMocker.instance = new DataMocker();
    }
    return DataMocker.instance;
  }

  schemaCoverter(schema: any) {
    return schema;
  }

  enable: boolean = true;
  mockTemplates: any; // see mockjs definiation
  generate(schema: any) {
    if (!this.enable) return {};
    const templates = this.schemaCoverter(schema);

    if (templates)
      this.mockTemplates = Object.assign(this.mockTemplates, templates);
    const result = {};
    _.forIn(this.mockTemplates, (tpl: any, key: string) => {
      const data = Mock.mock(tpl);
      console.log(data, "was mocked");
      result[key] = data;
    });

    return result;
  }
}
