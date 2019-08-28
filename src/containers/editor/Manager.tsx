import React, { useState, useContext } from "react";
import { Tabs, Icon } from "antd";
import { PageTree, Libraries } from "./";
import { DataSource } from "./DataSource";
import { FileLoader, IDERegister } from "./../../helpers";
const TabPane = Tabs.TabPane;
const fileLoader = FileLoader.getInstance();

export const Manager: React.FC<IManager> = props => {
  // schemas fetch
  const treeStructure = {
    name: "root",
    title: "Start Up",
    children: [fileLoader.loadFileTree("schema")]
  };
  // const [tree, setTree] = useState(treeStructure)

  // libraries fetch
  const librariesData = IDERegister.componentsLibrary;
  // const [libraries, setLibraries] = useState(librariesData)

  const { onClose } = props;

  return (
    <div className="manager">
      <div className="pages">
        <a className="close-button" onClick={onClose}>
          <Icon type="close" />
        </a>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Schemas" key="1">
            <PageTree tree={treeStructure} />
          </TabPane>
          <TabPane tab="Plugins" key="2">
            <PageTree tree={treeStructure} />
          </TabPane>
        </Tabs>
      </div>

      <div className="widgets">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Components" key="1">
            <Libraries list={librariesData} />
          </TabPane>
          {/* <TabPane tab="DataSources" key="2">
            <Libraries list={layouts} />
          </TabPane> */}
          <TabPane tab="DataSources" key="DataSources">
            <DataSource />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
