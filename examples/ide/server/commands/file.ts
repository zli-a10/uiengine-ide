import websockets from "../../src/config/websocket";
import { get, has } from "lodash";
const fs = require("fs");

/**
 * Client side should use JSON format string as message
 *
 * example: {"name": "getFileList", "options":{ "type": "components" }}
 */
interface ICommandOptions {
  type: string;
  path: string;
  options?: any;
}

function getPath(options: ICommandOptions) {
  const { type, path } = options;
  console.log(type, path, "..........");
  const config = websockets as any;
  const readpath = get(config, `paths.${type}`);
  return path ? `${readpath}/${path}` : readpath;
}

const walkSync = (dir: any) => {
  var fs: any = fs || require("fs"),
    files = fs.readdirSync(dir);
  let filelist: any = [];
  files.forEach((file: any) => {
    const p = dir ? `${dir}/${file}` : file;
    const node = {
      server: true,
      key: file,
      path: p,
      value: file,
      name: file,
      title: file,
      children: []
    };
    if (fs.statSync(dir + "/" + file).isDirectory()) {
      const tmpFiles = walkSync(dir + "/" + file);
      node.children = tmpFiles;
      // filelist.push(tmpFiles);
    }
    filelist.push(node);
  });
  return filelist;
};

/**
 *
 * @param options {"name": "getFileList", "options":{ "type": "schemas"}}
 */
export function getFileList(options: ICommandOptions) {
  const readpath = getPath(options);
  let result: any;
  try {
    result = walkSync(readpath);
  } catch (e) {
    console.warn(e.message);
    result = [];
  }
  return result;
}

/**
 *
 * @param options {"name": "readFile", "options":{ "type": "schemas", "path": "any.json" }}
 */
export function readFile(options: ICommandOptions) {
  const readpath = getPath(options);
  let result: any;
  try {
    result = readpath ? fs.readFileSync(readpath, { encoding: "utf8" }) : "";
  } catch (e) {
    console.warn(e.message);
    result = "";
  }
  return result;
}

/**
 *
 * @param options {"name": "writeFile", "options":{ "type": "schemas",  "path": "any.json", "options": { "data": "{}" }  }}
 */
export function writeFile(options: ICommandOptions) {
  const readpath = getPath(options);
  let result: any;
  if (has(options, "options.data")) {
    try {
      result = fs.writeFileSync(readpath, get(options, `options.data`), "utf8");
    } catch (e) {
      console.warn(e.message);
      result = e.message;
    }
  }
  // has value means error
  return result;
}
