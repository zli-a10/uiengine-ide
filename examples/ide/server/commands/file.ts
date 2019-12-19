import websockets from '../config/websocket'
import { get, has, trim } from 'lodash'
const fs = require('fs')

/**
 * Client side should use JSON format string as message
 *
 * example: {"name": "getFileList", "options":{ "type": "components" }}
 */
export interface ICommandOptions {
  type: string
  path: string
  isTemplate?: boolean
  options?: any
  [name: string]: any
}

export function getPath(options: ICommandOptions, rootOnly: boolean = false) {
  const { type, path, isTemplate = false } = options
  // console.log("Read options: %s", options);
  let root = isTemplate ? 'templates' : 'paths'
  const config = websockets as any
  const readpath = get(config, `${root}.${type}`)
  return path && !rootOnly ? `${readpath}/${path}` : readpath
}

const walkSync = (
  dir: any,
  type: string,
  isTemplate: boolean = false,
  folderOnly: boolean = false
) => {
  let root = isTemplate ? 'templates' : 'paths'
  const config = websockets as any
  const readpath = get(config, `${root}.${type}`) + '/'
  var fs: any = fs || require('fs'),
    files = fs.readdirSync(dir)
  let filelist: any = []
  files.forEach((file: any) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      const tmpFiles = walkSync(dir + '/' + file, type, isTemplate, folderOnly)
      const p = dir ? `${dir}/${file}` : file
      const key = p.replace(readpath, '')
      // console.log(key)
      const node = {
        type,
        isTemplate,
        server: true,
        key,
        path: key,
        value: key,
        name: key,
        title: file,
        nodeType: 'folder',
        children: tmpFiles
      }
      filelist.push(node)
    } else if (!folderOnly) {
      const p = dir ? `${dir}/${file}` : file
      const key = p.replace(readpath, '')
      // console.log(key)
      const node = {
        type,
        isTemplate,
        server: true,
        key,
        path: key,
        value: key,
        name: key,
        title: file,
        nodeType: 'file',
        children: []
      }
      filelist.push(node)
    }
  })
  return filelist
}

/**
 *
 * @param options {"name": "getFileList", "options":{ "type": "schema", "isTemplate": false}}
 */
export function getFileList(options: ICommandOptions) {
  const readpath = getPath(options)
  const type = get(options, 'type')
  const isTemplate = get(options, 'isTemplate')
  const folderOnly = get(options, 'folderOnly')
  let result: any
  try {
    result = walkSync(readpath, type, isTemplate, folderOnly)
  } catch (e) {
    console.warn(e.message)
    result = []
  }
  return result
}

/**
 *
 * @param options {"name": "readFile", "options":{ "type": "schema", "path": "any.json", "isTemplate": false }}
 */
export function readFile(options: ICommandOptions) {
  const readpath = getPath(options)
  let result: any
  try {
    result = readpath ? fs.readFileSync(readpath, { encoding: 'utf8' }) : ''
  } catch (e) {
    console.warn(e.message)
    result = ''
  }
  return result
}

function rewriteIndex(type: string, newFileName: string, oldFileName?: string) {
  if (type !== 'schema' && type !== 'datasource') {
    // rewrite index.ts or index.tsx
  }
}

function deleteFolderRecursive(path: string) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file: any, index: any) {
      var curPath = path + '/' + file
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

/**
 *
 * @param options {"name": "writeFile", "options":{ "type": "schema",  "path": "any.json", "options": { "data": "{}" }, "isTemplate": false  }}
 */
export function writeFile(options: ICommandOptions) {
  let result: any
  if (has(options, 'status')) {
    const readpath = getPath(options)
    try {
      const status = get(options, 'status.status')
      const type = get(options, 'type')
      const nodeType = get(options, 'status.nodeType')
      if (status === 'renamed') {
        const newName = get(options, 'status.newPath')
        const newPath = `${getPath(options, true)}/${newName}`
        // console.log("renaming", newName, newPath);
        fs.rename(readpath, newPath, function () {
          console.log('file from %s to %s was renamed', readpath, newPath)
          rewriteIndex(type, newPath, readpath)
        })
      } else if (status === 'removed') {
        if (nodeType === 'file') {
          fs.unlinkSync(readpath)
          rewriteIndex(type, readpath)
        } else {
          // fs.rmdirSync(readpath, { recursive: true });
          deleteFolderRecursive(readpath)
        }
        console.log('%s %s was removed', nodeType, readpath)
      } else {
        let data = get(options, `data`)
        if (typeof data === 'object') {
          data = JSON.stringify(data, null, '\t')
        }
        // recursive save
        let folder = readpath
        if (nodeType === 'file') {
          const folderSegs = trim(readpath, '/').split('/')
          if (folderSegs.length > 1) folderSegs.pop()
          folder = folderSegs.join('/')
        }

        if (!fs.existsSync(folder)) {
          try {
            console.log('new folder %s is creating', folder)
            fs.mkdirSync(folder, { recursive: true })
          } catch {
            console.warn('mkdir %s failed', folder)
          }
        }

        if (nodeType === 'file') {
          result = fs.writeFileSync(readpath, data, 'utf8')
          rewriteIndex(type, readpath)
        }
      }
    } catch (e) {
      console.warn(e.message)
      result = e.message
    }
  }
  // has value means error
  return result
}
