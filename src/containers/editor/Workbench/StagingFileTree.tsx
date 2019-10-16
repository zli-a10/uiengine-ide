import React, { useCallback, useState, useMemo, useEffect } from "react";
import _ from "lodash";
import { Tree } from "antd";
import { loadFileStatus } from "../../../helpers";

const { TreeNode } = Tree;

export const StagingFileTree = (props: any) => {
  const { onChange } = props;

  const onCheck = useCallback((checkedKeys: any, info: any) => {
    const keys: any = [];
    info.checkedNodes.forEach((node: any) => {
      if (_.has(node, `props.dataRef`)) {
        const [path, status] = _.get(node, `props.dataRef`);
        console.log(path, status, "..................... were checked");
        if (
          _.isString(status) ||
          (_.isObject(status) && _.has(status, "status"))
        ) {
          let finalStatus = status;
          if (_.isString(status)) {
            finalStatus = { status };
          }
          const type = _.get(node, `props.type`);
          keys.push({ path, status: finalStatus, type });
        }
      }
    });
    onChange(keys);
    setCheckedKeys(checkedKeys);
  }, []);

  const treeData = useMemo(() => {
    const files = loadFileStatus();
    return files;
  }, [localStorage.fileStatus]);

  const [checkedKeys, setCheckedKeys] = useState([]);
  useEffect(() => {
    setCheckedKeys([]);
  }, [localStorage.fileStatus]);

  return (
    <Tree checkable onCheck={onCheck} checkedKeys={checkedKeys}>
      {Object.entries(treeData).map((entry: any) => {
        const [type, files] = entry;
        return (
          <TreeNode title={type} key={type} dataRef={entry}>
            {Object.entries(files).map((f: any) => {
              const [file, statusObj] = f;
              if (statusObj === "normal") return null;
              const status = _.get(statusObj, "status", statusObj);
              const newPath = _.get(statusObj, "newPath", "");
              return (
                <TreeNode
                  title={
                    <a>
                      {file}
                      {newPath ? " -> " : " "}
                      {newPath}
                      <i className={`node-modified-${status}`}> {status}</i>
                    </a>
                  }
                  key={`${type}/${file}`}
                  type={type}
                  dataRef={f}
                ></TreeNode>
              );
            })}
          </TreeNode>
        );
      })}
    </Tree>
  );
};
