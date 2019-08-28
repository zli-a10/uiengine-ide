import React, { useEffect, useCallback, useState } from "react";
import * as _ from "lodash";
import { useDrag } from "react-dnd";
import { Tree } from "antd";
import { UINode } from "uiengine";

import { Context } from "../Context";
import { DND_IDE_SCHEMA_TYPE, DND_IDE_NODE_TYPE } from "../../../helpers";

export interface IDataSourceTreeProps {
  searchText?: string;
  onChange?: (value: any) => void;
}

const WidgetItem = (props: any) => {
  const { title, data } = props;
  const dataSchema = data.uiSchema || data;

  let dragObj,
    dragType = "";
  if (_.has(dataSchema, "component")) {
    dragObj = { uinode: new UINode(dataSchema) };
    dragType = DND_IDE_NODE_TYPE;
  } else {
    dragObj = { schema: dataSchema };
    dragType = DND_IDE_SCHEMA_TYPE;
  }

  const [, drag] = useDrag({
    item: { type: dragType, ...dragObj }
  });

  return (
    <span ref={drag}>
      <span>{title}</span>
    </span>
  );
};

const DataSourceTree: React.FC<IDataSourceTreeProps> = (
  props: IDataSourceTreeProps
) => {
  const {
    dataSourceProps: { getDataSource, expandDataSource } = {} as any
  } = React.useContext(Context);
  const [nodes, setNodes] = useState([] as any[]);
  const [saveSearchText, setSaveSearchText] = useState("");
  const { onChange, searchText } = props;

  const onAddFields = useCallback(
    async (dataRef: any) => {
      if (dataRef.type === "file" && !dataRef.children) {
        const path: string = dataRef.uiJsonPath;
        if (expandDataSource) {
          const source = await expandDataSource(path);
          dataRef.children = source;
          setNodes([...nodes]);
        }
      }
    },
    [nodes, expandDataSource]
  );

  const onSelectNode = useCallback(
    (selectedKeys: string[], e: any) => {
      const treeNode = e.node;
      const dataRef: any = treeNode.props.dataRef;
      if (onChange) {
        onChange(dataRef);
      }
      if (dataRef.type === "field") {
        return;
      }
      onAddFields(dataRef);
    },
    [onChange, onAddFields]
  );

  useEffect(() => {
    const initDataSource = async () => {
      if (
        (nodes.length === 0 && getDataSource) ||
        saveSearchText !== searchText
      ) {
        setNodes((await getDataSource(searchText)) || []);
        setSaveSearchText(searchText as string);
      }
    };
    initDataSource();
  }, [nodes, searchText, getDataSource, saveSearchText]);
  const renderFieldNode = useCallback((item: any) => {
    return (
      <Tree.TreeNode
        dataRef={item}
        title={
          <>
            <span className="field-bar">{item.children ? "Fs" : "F"}</span>
            <WidgetItem title={item.name} data={item} />
          </>
        }
        key={`subnode-${item.name}`}
      >
        {item.children ? renderNode(item.children) : null}
      </Tree.TreeNode>
    );
  }, []);

  const renderFileNode = useCallback((item: any) => {
    return (
      <Tree.TreeNode
        dataRef={item}
        title={
          <>
            <span className="file-bar">{_.toUpper(item.name)[0]}</span>
            <WidgetItem title={item.name} data={item} />
          </>
        }
        key={`${item.name}___${item.uiJsonPath || ""}`}
      >
        {item.children ? renderNode(item.children) : null}
      </Tree.TreeNode>
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
  return <Tree onSelect={onSelectNode}>{renderNode(nodes)}</Tree>;
};

export default DataSourceTree;
