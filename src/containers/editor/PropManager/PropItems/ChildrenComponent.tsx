import React, { useState, useCallback, useMemo, useEffect } from "react";
import _ from "lodash";
import { FileLoader, formatTree } from "../../../../helpers";
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

  const { onChange, value, uinode, disabled } = props;
  // onchange tree item
  const [selectedValue, selectItem] = useState(value);
  const onTreeChange = useCallback((value: any) => {
    // if (!value) return;
    selectItem(value);
    onChange(value);
  }, []);

  // listen editNode
  useEffect(() => {
    selectItem(value);
  }, [value, uinode]);

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
          allowClear
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
