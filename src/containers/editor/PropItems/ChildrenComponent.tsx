import React, { useState, useCallback, useMemo } from "react";
import _ from "lodash";
import { FileLoader, formatTree } from "../../../helpers";
// import { UIEngine } from "uiengine";
import ReactJson from "react-json-view";
import { TreeSelect, Form, Icon, Modal } from "antd";
import { ILayoutSchema } from "uiengine/typings";
const { TreeNode } = TreeSelect;
// schemas fetch
const fileLoader = FileLoader.getInstance();
const formatDataSource = (children: ILayoutSchema[]) => {
  children.forEach((child: ILayoutSchema) => {
    if (child.datasource) {
      let source = "";
      if (_.isString(child.datasource)) {
        source = child.datasource;
      } else {
        if (child.datasource.source) {
          source = child.datasource.source;
        }
      }
      if (source && source.indexOf("$") === -1) {
        let sources = source.split(".");
        sources = sources.splice(sources.length - 2, 0, "$");
        if (_.isString(child.datasource)) {
          child.datasource = sources.join(".");
        } else {
          child.datasource.source = sources.join(".");
        }
      }
    }
    // recursive
    if (child.children) formatDataSource(child.children);
  });
  return children;
};

export const ChildrenComponent = (props: any) => {
  const [visible, changeVisible] = useState(false);

  const handleOk = useCallback((e: any) => {
    changeVisible(false);
  }, []);

  const handleCancel = useCallback((e: any) => {
    changeVisible(false);
  }, []);

  const mock = {};
  const [schemas, changeSchemas] = useState(mock);
  const onViewCode = useCallback(
    (path: string) => {
      return (e: any) => {
        e.stopPropagation();
        // console.log(path, " is clicked");
        const schema = fileLoader.loadFile(path, "schema");
        changeSchemas(schema);
        changeVisible(true);
        return false;
      };
    },
    [schemas]
  );
  const tree = fileLoader.loadFileTree("schema");
  const memoTree = useMemo(() => [formatTree(_.cloneDeep(tree))], [tree]);

  const [selectedValue, selectItem] = useState(props.value);
  const onTreeChange = useCallback((value: any) => {
    // console.log(value);
    if (!value) return;
    selectItem(value);
    const schema = fileLoader.loadFile(value, "schema");
    if (!schema.children || schema.children.length === 0) return;
    // format datasource
    const returnSchema = {
      $$children: value,
      $children: formatDataSource(schema.children)
    };
    console.log("choosed path", returnSchema);
    props.onChange(returnSchema);
  }, []);

  // console.log(memoTree, selectedValue);
  return (
    <div className="children-setting">
      <Form.Item label="Template">
        <TreeSelect
          showSearch
          style={{ height: 22 }}
          value={selectedValue}
          size="small"
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select"
          treeDefaultExpandAll
          suffixIcon={() => (
            <Icon
              type="eye"
              style={{ color: "#3570bd" }}
              onClick={onViewCode(selectedValue)}
            />
          )}
          onChange={onTreeChange}
          treeData={memoTree}
        />
      </Form.Item>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ReactJson indentWidth={2} collapsed src={schemas} />
        {/* <UIEngine layouts={[mock]} config={props.config} /> */}
      </Modal>
    </div>
  );
};
