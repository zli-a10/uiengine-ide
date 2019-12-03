import { ICommandOptions } from "./file";
import { get } from "lodash";
const fs = require("fs");
const config = require("../../src/config/host.js");
// console.log(result);
/**
 * Used for Debugger
 * @param options {"name": "changeApiHost", "options":{ host: "192.168.x.x" }}
 */
export function changeApiHost(options: ICommandOptions) {
  try {
    const hostConfigPath = "./src/config/host.js";
    // const result = require(hostConfigPath);
    config.apiServer = get(options, "host");
    const exportStr = `module.exports = ${JSON.stringify(config)}`;
    fs.writeFileSync(hostConfigPath, exportStr, "utf8");
    console.log("set host success", exportStr);
  } catch (e) {
    console.log(e.message);
    return [];
  }
}

/**
 * Used for Debugger
 * @param options {"name": "getApiHost", "options":{ }}
 */
export function getApiHost(options: ICommandOptions) {
  try {
    // const hostConfigPath = "./src/config/host.js";
    // const result = require(hostConfigPath);
    return get(config, "apiServer");
  } catch (e) {
    console.log(e.message);
    return [];
  }
}
