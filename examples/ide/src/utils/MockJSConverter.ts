import _ from "lodash";

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

  schemaMap: any = {
    "string-rlx": stringGen,
    "ipv6-address": ipv6Gen,
    "ipv4-address": ipv4Gen,
    string: stringGen,
    flag: booleanGen,
    number: numberGen,
    "long-string-rlx": stringGen
  };

  convert(dataSchema: any) {
    const format = _.get(dataSchema, "cm-meta.format", "string");
    if (_.isFunction(this.schemaMap[format])) {
      const result = this.schemaMap[format](dataSchema);
      return result;
    }
    return {};
  }
}

const stringGen = (schema: any) => {
  const lineage = _.get(schema, "cm-lineage");
  const range = _.get(schema, "cm-meta.range", "1-100").replace("-", ",");
  const regex = `([a-z][A-Z][0-9]){${range}}`;
  return { [lineage]: new RegExp(regex) };
};

const ipv4Gen = (schema: any) => {
  const ipv4Reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  const lineage = _.get(schema, "cm-lineage");
  return { [lineage]: new RegExp(ipv4Reg) };
};

const ipv6Gen = (schema: any) => {
  const ipv6Reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  const lineage = _.get(schema, "cm-lineage");
  return { [lineage]: new RegExp(ipv6Reg) };
};

const numberGen = (schema: any) => {
  const lineage = _.get(schema, "cm-lineage");
  const range = _.get(schema, "cm-meta.range");
  const source = `${lineage}|${range}`;
  return { [source]: 1 };
};

const booleanGen = (schema: any) => {
  const lineage = _.get(schema, "cm-lineage");
  const source = `${lineage}|1`;
  return { [source]: true };
};

export function MockJSConverter(schema: any) {
  const mocker = MockDataconverter.getInstance();
  return mocker.convert(schema);
}
