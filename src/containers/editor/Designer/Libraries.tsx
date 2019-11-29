import React, { useState, useCallback, useEffect } from "react";
import { Input, Collapse, Row, Col, Button, TreeSelect } from "antd";
import _ from "lodash";

import { Widgets } from "..";
import { useCreateFile } from "../../../helpers";
// import { IDEEditorContext } from "../../Context";

const Panel = Collapse.Panel;
const { TreeNode } = TreeSelect;

export const Libraries: React.FC<IComponents> = props => {
  const { list } = props;
  function callback() {}

  const originComs = list;
  let components = _.cloneDeep(originComs);
  const [coms, setComs] = useState(components);
  const [selectedLib, setSelectecLib] = useState(
    {} as {
      lib: string;
      isLeaf: boolean;
    }
  );
  const [searchValue, setSearchValue] = useState("");
  const libs = _.uniq(list.map((lib: any) => lib.category) as string[]);

  useEffect(() => {
    components = _.cloneDeep(originComs);
    if (!_.isEmpty(selectedLib)) {
      if (selectedLib.isLeaf) {
        components = components.filter(
          (com: any) =>
            com.id.replace("-", "").toLowerCase() ===
            selectedLib.lib.toLowerCase()
        );
      } else if (selectedLib.lib) {
        components = components.filter(
          (com: any) => com.category === selectedLib.lib
        );
      }
    }
    if (_.trim(searchValue) !== "") {
      components = components.filter((item: any) => {
        if (item.children) {
          item.children = item.children.filter((o: any) => {
            // search sub nodes
            if (_.isArray(o.children)) {
              o.children = o.children.filter((s: any) => {
                return (
                  s.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
                );
              });
            }

            // if has subnodes, return parents
            if (!_.isEmpty(o.children)) return true;
            return (
              o.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
            );
          });
          return item.children.length > 0;
        } else {
          return false;
        }
      });
    }

    setComs(components);
  }, [searchValue, selectedLib]);

  const handleNodeChange = useCallback(
    (value: string, label: string, extra: any) => {
      const {
        triggerNode: { isLeaf }
      } = extra;
      setSelectecLib({
        lib: value,
        isLeaf: !!isLeaf && value !== "" ? isLeaf() : false
      });
    },
    []
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
    },
    [list]
  );

  // const createComponent = useCallback(() => {
  //   useCreateFile("component");
  // }, []);

  return (
    <div className="ide-libraries">
      <div className="search-bar">
        <Row>
          <Col span={8}>
            <TreeSelect
              defaultValue={selectedLib.lib || ""}
              showSearch
              style={{ width: "90%" }}
              onChange={handleNodeChange}
            >
              <TreeNode value="" title="All" key="" />
              {libs.map((lib: string) => (
                <TreeNode value={lib} title={lib} key={lib}>
                  {list
                    .filter((item: any) => item.category === lib)
                    .map((item: any) => (
                      <TreeNode
                        value={item.id}
                        title={item.title}
                        key={item.title}
                      />
                    ))}
                </TreeNode>
              ))}
            </TreeSelect>
          </Col>
          <Col span={12}>
            <Input.Search onSearch={handleSearch} />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              icon="plus"
              shape="circle"
              onClick={useCreateFile("component")}
            />
          </Col>
        </Row>
      </div>
      <div className="library-panel" id="widgets-library">
        <Collapse onChange={callback} accordion defaultActiveKey="0">
          {coms.map((item: any, key: any) => {
            return (
              <Panel header={item.title} key={key}>
                <Widgets widgets={item.children} openAll={!!searchValue} />
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
};
