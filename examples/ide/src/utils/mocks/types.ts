import _ from "lodash";
import { MIN_DATA, MAX_DATA, SMALLER_DATA, LARGER_DATA } from "uiengine-ide";
const rangeGen = (range: any, mode: string, minium: number = 1) => {
  let [min, max] = range;
  switch (mode) {
    case SMALLER_DATA:
      if (min > minium) min--;
      max = min;
      break;
    case LARGER_DATA:
      max++;
      min = max;
      break;
    case MIN_DATA:
      max = min;
      break;
    case MAX_DATA:
      min = max;
      break;
  }
  return [min, max];
};

export const stringGen = (schema: any, mode: string) => {
  const lineage = _.get(schema, "cm-lineage");
  const range = _.get(schema, "cm-meta.range", "1-100").split("-");
  const newRange = rangeGen(range, mode, 0);
  const regex = `([a-zA-Z0-9]){${newRange}}`;
  return { [lineage]: new RegExp(regex) };
};

export const ipv4Gen = (schema: any, mode: string) => {
  let result: any = "";
  switch (mode) {
    case SMALLER_DATA:
      result = "1.0.0.-1";
      break;
    case LARGER_DATA:
      result = "256.0.0.1";
      break;
    case MIN_DATA:
      result = "0.0.0.0";
      break;
    case MAX_DATA:
      result = "255.255.255.255";
      break;
    default:
      result = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/;
  }
  const lineage = _.get(schema, "cm-lineage");

  return { [lineage]: result };
};

export const ipv6Gen = (schema: any, mode: string) => {
  let result: any = "";
  switch (mode) {
    case SMALLER_DATA:
      result = "1::-1";
      break;
    case LARGER_DATA:
      result = "GGGG:GGGG:AAAA::1111";
      break;
    case MIN_DATA:
      result = "::";
      break;
    case MAX_DATA:
      result = "FFFF::FFFF";
      break;
    default:
      // result = /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?$/;
      result = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;
  }
  const lineage = _.get(schema, "cm-lineage");

  return { [lineage]: result };
};

export const numberGen = (schema: any, mode: string) => {
  const lineage = _.get(schema, "cm-lineage");
  const range = _.get(schema, "cm-meta.range", "9-10000000").split("-");
  const newRange = rangeGen(range, mode, 0);
  let [min, max] = newRange;
  const source = `${lineage}|${min}-${max}`;
  return { [source]: 1 };
};

export const booleanGen = (schema: any, mode: string) => {
  const lineage = _.get(schema, "cm-lineage");
  const source = `${lineage}`;
  let result = false;
  if (mode === MAX_DATA || mode === LARGER_DATA) result = true;
  return { [source]: result };
};
