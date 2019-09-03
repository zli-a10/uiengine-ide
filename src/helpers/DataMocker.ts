import Mock from "mockjs";
import _ from "lodash";
import { EMPTY_DATA } from "../helpers";

export class DataMocker implements IDataMocker {
  static instance: IDataMocker;
  static getInstance() {
    if (!DataMocker.instance) {
      DataMocker.instance = new DataMocker();
    }
    return DataMocker.instance;
  }

  /**
   * Should convert data schema rules to mockjs definiation
   * @param schema data schema
   */
  schemaCoverter(schema: any, mode: string = "") {
    return schema;
  }

  enable: boolean = true;
  mode: string = "normal";
  noCache: boolean = false;
  dataCached: any = {}; // see mockjs definiation
  generate(schema: any) {
    if (this.mode === EMPTY_DATA) return;
    if (!this.enable) return;
    const templates = this.schemaCoverter(schema, this.mode);
    const key = Object.keys(templates)[0];

    if (!key) return;

    const getValue = (data: any) => {
      if (data) {
        return Object.values(data)[0];
      }
      return;
    };
    let result: any;
    if (this.noCache) {
      result = Mock.mock(templates);
      result = getValue(result);
    } else {
      if (this.dataCached[key] === undefined) {
        result = Mock.mock(templates);
        result = getValue(result);
      } else {
        result = this.dataCached[key];
      }
    }
    this.dataCached[key] = result;

    return result;
  }
}
