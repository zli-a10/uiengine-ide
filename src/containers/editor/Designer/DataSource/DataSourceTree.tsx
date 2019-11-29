import React, { useEffect, useCallback, useState, useContext } from "react";
import * as _ from "lodash";
import { useDrag } from "react-dnd";
import { Tree } from "antd";
import { GlobalContext } from "../../../Context";
import { getDatasourceFields, analysisDataSource } from "../../../../helpers";

// schemas fetch
import {
  DND_IDE_NODE_TYPE,
  DND_IDE_DATASOURCE_TYPE
} from "../../../../helpers";

const getChildrenUiSchema = (data: any) => {
  const { type, children = [] } = data;
  if (type !== "file") {
    return [];
  }
  return children.map((child: any) => {
    const { type, ...uiSchema } = child;
    if (type === "field") {
      return uiSchema;
    }
    if (type === "file") {
      const { component, props, datasource } = child;
      return {
        component,
        props,
        datasource,
        children: getChildrenUiSchema(child)
      };
    }
  });
};

const WidgetItem = (props: any) => {
  const { title, data, component } = props;
  // const dataSchema = data.uiSchema || data
  let dragObj, dragType;
  if (!component) {
    dragType = DND_IDE_DATASOURCE_TYPE;
    dragObj = {
      schema: { datasource: _.get(data, "datasource") || _.get(data, "value") }
    };
  } else {
    dragType = DND_IDE_NODE_TYPE;
    if (data.type === "file") {
      const { component, props } = data;
      dragObj = {
        uinode: {
          schema: {
            component,
            props,
            children: getChildrenUiSchema(data)
          }
        }
      };
    } else {
      dragObj = {
        uinode: { schema: data }
      };
    }
  }

  // console.log(dragType, component, dragObj);
  const [, drag] = useDrag({
    item: { type: dragType, ...dragObj }
  });

  return (
    <span ref={drag}>
      <span>{title}</span>
    </span>
  );
};

export const renderNode = (data: any, component?: string) => {
  const renderFieldNode = (item: any) => {
    return (
      <Tree.TreeNode
        dataRef={item}
        isLeaf={true}
        title={
          <>
            <span className="field-bar">{_.toUpper(item.title)[0]}</span>
            <WidgetItem title={item.title} data={item} component={component} />
          </>
        }
        key={item.id}
      >
        {item.children ? renderNode(item.children, component) : null}
      </Tree.TreeNode>
    );
  };

  const renderFileNode = (item: any) => {
    return (
      <Tree.TreeNode
        dataRef={item}
        title={
          <>
            <span className="file-bar">{_.toUpper(item.title)[0]}</span>
            <WidgetItem title={item.title} data={item} component={component} />
          </>
        }
        key={item.id}
      >
        {item.children ? renderNode(item.children, component) : null}
      </Tree.TreeNode>
    );
  };

  return data.map((item: any) => {
    if (item.type === "file") {
      return renderFileNode(item);
    }
    if (item.type === "field") {
      return renderFieldNode(item);
    }
    return null;
  });
};

const DataSourceTree: React.FC<IDataSourceTreeProps> = (
  props: IDataSourceTreeProps
) => {
  const data = useContext(GlobalContext);
  const { resourceTree: { datasource = [] } = {} } = data;

  const [nodes, setNodes] = useState([] as any[]);
  const [saveSearchText, setSaveSearchText] = useState("");
  const { searchText, component } = props;

  const onLoadData: any = useCallback(
    (treeNode: any) => {
      const fileName: any = _.get(treeNode, `props.dataRef.file`);
      if (fileName) {
        const fieldsPromise = getDatasourceFields(fileName, component);
        fieldsPromise.then((data: any) => {
          let children = _.get(treeNode, `props.dataRef.children`);
          if (children && _.isArray(data)) {
            children = _.concat(children, data);
          } else {
            children = data;
          }
          _.set(treeNode, `props.dataRef.children`, children);
          const newNodes = _.clone(nodes);
          setNodes(newNodes);
        });
        return fieldsPromise;
      }
      return new Promise((resolve: any) => {
        resolve();
      });
    },
    [nodes, component]
  );

  useEffect(() => {
    const initDataSource = async () => {
      if (
        (nodes.length === 0 || saveSearchText !== searchText) &&
        datasource.length !== 0
      ) {
        setNodes((await analysisDataSource(datasource)) || []);
        setSaveSearchText(searchText as string);
      }
    };
    initDataSource();
  }, [nodes, searchText, saveSearchText, datasource, component]);

  return <Tree loadData={onLoadData}>{renderNode(nodes, component)}</Tree>;
};

export default DataSourceTree;
