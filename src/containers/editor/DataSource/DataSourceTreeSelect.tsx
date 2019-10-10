import React, { useEffect, useCallback, useState, useContext } from "react";
import * as _ from "lodash";
import { TreeSelect, Icon, Input, Col, Button } from "antd";
import { convertNodes } from "../../../helpers";
import { GlobalContext } from "../../Context";

const DataSourceTreeSelector: React.FC<IDataSourceTreeProps> = (
  props: IDataSourceTreeProps
) => {
  const { onChange, searchText, value, disabled } = props;
  const { datasource: { getDataSource } = {} as any } = useContext(
    GlobalContext
  );

  const [nodes, setNodes] = useState([] as any[]);
  const [saveSearchText, setSaveSearchText] = useState("");

  // const onAddFields = useCallback(
  //   async (dataRef: any) => {
  //     if (dataRef.type === "file" && !dataRef.children) {
  //       const path: string = dataRef.uiJsonPath;
  //       if (expandDataSource) {
  //         const source = await expandDataSource(path);
  //         dataRef.children = source;
  //         setNodes([...covertNodes(nodes)]);
  //       }
  //     }
  //   },
  //   [nodes, expandDataSource]
  // );

  // const getExpandNode = useCallback(
  //   (expandedKeys: string[] = []) => {
  //     const getSelectedNode = (nodeList: any[], key: string) => {
  //       const selectedNode = nodeList.filter((node: any) => {
  //         return node.key === key;
  //       });
  //       return _.first(selectedNode);
  //     };
  //     let checknodes = nodes;
  //     let selectNode = undefined;
  //     expandedKeys.map((key: string) => {
  //       const node = getSelectedNode(checknodes, key);
  //       if (node) {
  //         if (node.children) {
  //           checknodes = node.children;
  //         }
  //         selectNode = node;
  //       }
  //     });
  //     return selectNode;
  //   },
  //   [nodes]
  // );

  // const onExpandNode = useCallback(
  //   (expandedKeys: string[]) => {
  //     const dataRef = getExpandNode(expandedKeys) || ({} as any);
  //     if (onChange) {
  //       onChange(dataRef);
  //     }
  //     if (dataRef.type === "field") {
  //       return;
  //     }
  //     onAddFields(dataRef);
  //   },
  //   [onChange, onAddFields, getExpandNode]
  // );

  const onSelect = useCallback(
    (value: string) => {
      if (onChange) {
        if (!value) value = "";
        onChange(value);
      }
    },
    [onChange]
  );

  const [showInput, setShowInput] = useState(false);
  const switchEdit = useCallback(() => {
    setShowInput(!showInput);
  }, [showInput]);

  useEffect(() => {
    const initDataSource = async () => {
      if (
        (nodes.length === 0 && getDataSource) ||
        saveSearchText !== searchText
      ) {
        let newNodes = (await getDataSource(searchText)) || [];

        newNodes = convertNodes(newNodes);
        setNodes(newNodes);
        setSaveSearchText(searchText as string);
      }
    };
    initDataSource();
  }, [nodes, searchText, getDataSource, saveSearchText]);
  const renderFieldNode = useCallback((item: any) => {
    return (
      <TreeSelect.TreeNode
        // dataRef={item}
        title={
          <div className="datasource-select">
            <span className="field-bar">{item.children ? "Fs" : "F"}</span>
            {item.name}
          </div>
        }
        value={item.value}
        key={item.key}
      >
        {item.children ? renderNode(item.children) : null}
      </TreeSelect.TreeNode>
    );
  }, []);

  const renderFileNode = useCallback((item: any) => {
    return (
      <TreeSelect.TreeNode
        // dataRef={item}
        title={
          <div className="datasource-select">
            <span className="file-bar">{_.toUpper(item.name)[0]}</span>
            {item.name}
          </div>
        }
        value={item.value}
        key={item.key}
      >
        {item.children ? (
          renderNode(item.children)
        ) : (
          <TreeSelect.TreeNode
            title="Loading ..."
            value={_.uniqueId("loading")}
            key={_.uniqueId("loading")}
          />
        )}
      </TreeSelect.TreeNode>
    );
  }, []);
  const renderNode = useCallback((data: any[]) => {
    return data.map((item: any) => {
      if (item.type === "file") {
        return renderFileNode(item);
      }
      if (item.type === "field") {
        return renderFieldNode(item);
      }
      return null;
    });
  }, []);
  // onTreeExpand={onExpandNode}

  return (
    <div className="datasource-select">
      <Col span={20}>
        {showInput ? (
          <Input
            {...(value ? { value } : {})}
            disabled={disabled}
            onChange={(e: any) => {
              onChange && onChange(e.target.value);
            }}
          />
        ) : (
          <TreeSelect
            dropdownClassName="cancel-drag"
            disabled={disabled}
            allowClear
            {...(value ? { value } : {})}
            onSelect={onSelect}
            showSearch
            size="small"
            onChange={onSelect}
          >
            {renderNode(nodes)}
          </TreeSelect>
        )}
      </Col>
      <Col span={4}>
        <Button
          type="primary"
          size="small"
          icon={showInput ? "search" : "edit"}
          onClick={switchEdit}
        />
      </Col>
    </div>
  );
};

export default DataSourceTreeSelector;
