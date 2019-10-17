import React, { useState, useCallback, useContext } from "react";
import { Input, Collapse, Row, Col, Button } from "antd";
import _ from "lodash";

import { Widgets } from "..";
import { useCreateFile } from "../../../helpers";
// import { IDEEditorContext } from "../../Context";

const Panel = Collapse.Panel;

export const Libraries: React.FC<IComponents> = props => {
  // const { activeTab } = useContext(IDEEditorContext);

  const { list } = props;

  function callback() {}

  const originComs = list;
  let components = _.cloneDeep(originComs);
  const [coms, setComs] = useState(components);
  const [date, setDate] = useState(new Date().getTime());

  const search = (value: any) => {
    if (_.trim(value) === "") {
      setComs(originComs);
      setDate(new Date().getTime());
    } else {
      _.forEach(components, (item: any, index: number) => {
        if (item.children) {
          _.remove(item.children, (o: any, i: number) => {
            return o.title.toLowerCase().indexOf(value.toLowerCase()) === -1;
          });
        }
        if (item.children.length === 0) {
          delete components[index];
        }
      });
      setComs(components);
      setDate(new Date().getTime());
    }
  };

  // const createComponent = useCallback(() => {
  //   useCreateFile("component");
  // }, []);

  return (
    <div className="ide-libraries">
      <div className="search-bar">
        <Row>
          <Col span={20}>
            <Input.Search onSearch={search} />
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
      <div className="library-panel">
        <Collapse onChange={callback} accordion defaultActiveKey={"1"}>
          {coms.map((item: any, key: any) => {
            return (
              <Panel header={item.title} key={key}>
                <Widgets widgets={item.children} />
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
};
