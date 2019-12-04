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

export const ipv4PlenGen = (schema: any, mode: string) => {
  let result: any = "";
  switch (mode) {
    case SMALLER_DATA:
      result = "1.0.0.-1/24";
      break;
    case LARGER_DATA:
      result = "256.0.0.1/24";
      break;
    case MIN_DATA:
      result = "0.0.0.0/24";
      break;
    case MAX_DATA:
      result = "255.255.255.255/24";
      break;
    default:
      result = /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\/\d{0,2}/;
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

export const ipv6PlenGen = (schema: any, mode: string) => {
  let result: any = "";
  switch (mode) {
    case SMALLER_DATA:
      result = "1::-1/64";
      break;
    case LARGER_DATA:
      result = "GGGG:GGGG:AAAA::1111/64";
      break;
    case MIN_DATA:
      result = "::/64";
      break;
    case MAX_DATA:
      result = "FFFF::FFFF/64";
      break;
    default:
      // result = /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?$/;
      result = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/\d{0,3}/;
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

export const macAddrGen = (schema: any, mode: string) => {
  let result: any = "";
  switch (mode) {
    case SMALLER_DATA:
      result = "10-00-00-00-00-01";
      break;
    case LARGER_DATA:
      result = "FF-00-00-00-00-01";
      break;
    case MIN_DATA:
      result = "00-00-00-00-00-00";
      break;
    case MAX_DATA:
      result = "FF-FF-FF-FF-FF-FF";
      break;
    default:
      result = /([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}/;
  }
  const lineage = _.get(schema, "cm-lineage");

  return { [lineage]: result };
};

export const urlGen = (schema: any, mode: string) => {
  let result: any = "";
  switch (mode) {
    case SMALLER_DATA:
      result = "ftp://@";
      break;
    case LARGER_DATA:
      result = "http://xxx@192.168.1.1:/xx/xx/x";
      break;
    case MIN_DATA:
      result = "ftp://xx@:";
      break;
    case MAX_DATA:
      result = "http://xxx@192.168.1.1:/xxxxxx/xxxx/xxx";
      break;
    default:
      result = /(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?\z/;
  }
  const lineage = _.get(schema, "cm-lineage");

  return { [lineage]: result };
};

export const domainGen = (schema: any, mode: string) => {
  let result: any = "";
  switch (mode) {
    case SMALLER_DATA:
      result = "10-00-00-00-00-01";
      break;
    case LARGER_DATA:
      result = "FF-00-00-00-00-01";
      break;
    case MIN_DATA:
      result = "ftp://";
      break;
    case MAX_DATA:
      result = "FF-FF-FF-FF-FF-FF";
      break;
    default:
      result = /^([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z][a-zA-Z\\-]{0,61}[a-zA-Z]$/;
  }
  const lineage = _.get(schema, "cm-lineage");

  return { [lineage]: result };
};

export const emailGen = (schema: any, mode: string) => {
  let result: any = "";
  switch (mode) {
    case SMALLER_DATA:
      result = "@";
      break;
    case LARGER_DATA:
      result = "@.com";
      break;
    case MIN_DATA:
      result = "@@";
      break;
    case MAX_DATA:
      result = "@.com.cn";
      break;
    default:
      result = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  }
  const lineage = _.get(schema, "cm-lineage");

  return { [lineage]: result };
};

export const enumGen = (schema: any, mode: string) => {
  let result: any = "";
  switch (mode) {
    case SMALLER_DATA:
      result = "@";
      break;
    case LARGER_DATA:
      result = "@.com";
      break;
    case MIN_DATA:
      result = "@@";
      break;
    case MAX_DATA:
      result = "@.com.cn";
      break;
    default:
      // const range = _.get(schema, "cm-meta.allowed");
      // result = "syslog  Syslog Format (default) cef Common Event Format";
      result = _.get(schema, "cm-meta.allowed");
  }
  const lineage = _.get(schema, "cm-lineage");

  return { [lineage]: result };
};
