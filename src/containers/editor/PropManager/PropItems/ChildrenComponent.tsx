import React, { useState, useCallback, useMemo, useEffect } from "react";
import _ from "lodash";
import { FileLoader, formatTree } from "../../../../helpers";
// import { UIEngine } from "uiengine";
import ReactJson from "react-json-view";
import { TreeSelect, Form, Icon, Modal, Row, Col, Button } from "antd";
import { ILayoutSchema } from "uiengine/typings";

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
  const { remoteTree = false } = props;
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
        const schemaProsmise = fileLoader.loadFile(path, "schema");
        schemaProsmise.then((schema: any) => {
          changeSchemas(schema);
          changeVisible(true);
        });
        return false;
      };
    },
    [schemas]
  );
  // const treePromise = fileLoader.loadFileTree("schema");
  const [memoTree, setMemoTree] = useState([]);
  // treePromise.then((tree: any) => {
  //   let fileTreeJson = localStorage[`file_tree.schema`];
  //   if (fileTreeJson) {
  //     try {
  //       fileTreeJson = JSON.parse(fileTreeJson);
  //     } catch (e) {
  //       fileTreeJson = [];
  //     }
  //   }
  //   const formattedTree = formatTree(_.cloneDeep(fileTreeJson));
  //   setMemoTree(formattedTree);
  // });
  // const memoTree = useMemo(() => [formatTree(_.cloneDeep(tree))], [tree]);

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
    const loadTree = async () => {
      // should also load from fileLoader
      let fileTreeJson;
      if (remoteTree) {
        fileTreeJson = await fileLoader.loadFileTree("schema", false, true);
        console.log(fileTreeJson);
      } else {
        fileTreeJson = localStorage[`file_tree.schema`];
      }
      if (fileTreeJson && _.isString(fileTreeJson)) {
        try {
          fileTreeJson = JSON.parse(fileTreeJson);
        } catch (e) {
          fileTreeJson = [];
        }
      }
      const formattedTree = formatTree(_.cloneDeep(fileTreeJson));
      setMemoTree(formattedTree);
    };
    loadTree();
  }, [value, uinode]);

  return (
    <div className="children-setting">
      <Form.Item label={_.get(props, "name", "Template")}>
        <Row gutter={12}>
          <Col span={20}>
            <TreeSelect
              showSearch
              dropdownClassName="cancel-drag"
              style={{ height: 22 }}
              value={selectedValue}
              size="small"
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Please select"
              treeDefaultExpandAll
              allowClear
              onChange={onTreeChange}
              treeData={memoTree}
            />
          </Col>
          {selectedValue ? (
            <Col span={4}>
              <Button
                type="primary"
                size="small"
                icon="eye"
                onClick={onViewCode(selectedValue)}
              />
            </Col>
          ) : null}
        </Row>
      </Form.Item>
      <Modal
        title="View UI Schema"
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
