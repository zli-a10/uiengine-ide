import _ from "lodash";
import { mocks } from "./mocks";
/**
 * Convert data schema to mockjs data
 */
class MockDataconverter {
  static instance: MockDataconverter;
  static getInstance() {
    if (!MockDataconverter.instance) {
      MockDataconverter.instance = new MockDataconverter();
    }
    return MockDataconverter.instance;
  }

  schemaMap: any = mocks;

  convert(dataSchema: any, mode: string) {
    const format = _.get(dataSchema, "cm-meta.format", "string");
    if (_.isFunction(this.schemaMap[format])) {
      const result = this.schemaMap[format](dataSchema, mode);
      return result;
    }
    return {};
  }
}

export function MockJSConverter(schema: any, mode: string) {
  const mocker = MockDataconverter.getInstance();
  return mocker.convert(schema, mode);
}
