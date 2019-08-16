import React from "react";
import { Collapse } from "antd";
import { PropItem } from "./PropItem";

const Panel = Collapse.Panel;

export const Props: React.FC = (props: any) => {
  function callback() {}

  return (
    <div className="ide-props-events">
      <h3>(Input)</h3>
      <Collapse onChange={callback} accordion defaultActiveKey={"1"}>
        <Panel header="Looking" key="1">
          <ul className="list">
            <PropItem />
            <PropItem />
            <PropItem />
            <PropItem />
            <PropItem />
          </ul>
        </Panel>
        <Panel header="Data Binding" key="2">
          <ul className="list">
            <PropItem />
            <PropItem />
            <PropItem />
            <PropItem />
            <PropItem />
            <PropItem />
          </ul>
        </Panel>
        <Panel header="Events" key="3">
          <ul className="list">
            <PropItem />
            <PropItem />
            <PropItem />
            <PropItem />
            <PropItem />
            <PropItem />
          </ul>
        </Panel>
      </Collapse>
    </div>
  );
};
