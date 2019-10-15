import websockets from "../config/websocket";
import { get, has, trim } from "lodash";
const fs = require("fs");

/**
 * Client side should use JSON format string as message
 *
 * example: {"name": "getFileList", "options":{ "type": "components" }}
 */
interface ICommandOptions {
  type: string;
  path: string;
  isTemplate?: boolean;
  options?: any;
}

function getPath(options: ICommandOptions, rootOnly: boolean = false) {
  const { type, path, isTemplate = false } = options;
  console.log("Read options: %s", options);
  let root = isTemplate ? "templates" : "paths";
  const config = websockets as any;
  const readpath = get(config, `${root}.${type}`);
  return path && !rootOnly ? `${readpath}/${path}` : readpath;
}

const walkSync = (dir: any, type: string, isTemplate: boolean = false) => {
  var fs: any = fs || require("fs"),
    files = fs.readdirSync(dir);
  let filelist: any = [];
  files.forEach((file: any) => {
    if (file.indexOf("index.") !== 0) {
      const p = dir ? `${dir}/${file}` : file;
      const node = {
        type,
        isTemplate,
        server: true,
        key: file,
        path: p,
        value: file,
        name: file,
        title: file,
        children: []
      };
      if (fs.statSync(dir + "/" + file).isDirectory()) {
        const tmpFiles = walkSync(dir + "/" + file, type);
        node.children = tmpFiles;
        // filelist.push(tmpFiles);
      }
      filelist.push(node);
    }
  });
  return filelist;
};

/**
 *
 * @param options {"name": "getFileList", "options":{ "type": "schema", "isTemplate": false}}
 */
export function getFileList(options: ICommandOptions) {
  const readpath = getPath(options);
  const type = get(options, "type");
  const isTemplate = get(options, "isTemplate");
  let result: any;
  try {
    result = walkSync(readpath, type, isTemplate);
    console.log(result);
  } catch (e) {
    console.warn(e.message);
    result = [];
  }
  return result;
}

/**
 *
 * @param options {"name": "readFile", "options":{ "type": "schema", "path": "any.json", "isTemplate": false }}
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

function rewriteIndex(type: string, newFileName: string, oldFileName?: string) {
  if (type !== "schema" && type !== "datasource") {
    // rewrite index.ts or index.tsx
  }
}

/**
 *
 * @param options {"name": "writeFile", "options":{ "type": "schema",  "path": "any.json", "options": { "data": "{}" }, "isTemplate": false  }}
 */
export function writeFile(options: ICommandOptions) {
  let result: any;
  if (has(options, "status")) {
    const readpath = getPath(options);
    try {
      const status = get(options, "status.status");
      const type = get(options, "type");
      if (status === "renamed") {
        const newName = get(options, "status.newPath");
        const newPath = `${getPath(options, true)}/${newName}`;
        // console.log("renaming", newName, newPath);
        fs.rename(readpath, newPath, function() {
          console.log("file from %s to %s was renamed", readpath, newPath);
          rewriteIndex(type, newPath, readpath);
        });
      } else if (status === "removed") {
        fs.unlink(readpath, function() {
          console.log("file %s was removed", readpath);
          rewriteIndex(type, readpath);
        });
      } else {
        let data = get(options, `data`);
        if (typeof data === "object") {
          data = JSON.stringify(data, null, "\t");
        }
        // recursive save
        const folderSegs = trim(readpath, "/").split("/");
        if (folderSegs.length > 1) folderSegs.pop();
        const folder = folderSegs.join("/");
        if (!fs.existsSync(folder)) {
          try {
            console.log("new folder %s is creating", folder);
            fs.mkdirSync(folder);
          } catch {
            console.warn("mkdir %s failed", folder);
          }
        }
        result = fs.writeFileSync(readpath, data, "utf8");
        rewriteIndex(type, readpath);
      }
    } catch (e) {
      console.warn(e.message);
      result = e.message;
    }
  }
  // has value means error
  return result;
}
