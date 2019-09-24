import React, { useState, useContext } from "react";
import { Tabs, Icon } from "antd";
import { PluginManager } from "uiengine";
import _ from "lodash";

import { GlobalContext } from "../../Context";
import { PageTree, ResourceTree, Libraries } from "..";
import { DataSource } from "../DataSource";
import { FileLoader, IDERegister, getPluginTree } from "../../../helpers";
const TabPane = Tabs.TabPane;

export const DesignManager: React.FC<IDesignManager> = props => {
  const { componentCollapsed, toggleComponentCollapsed } = useContext(
    GlobalContext
  );
  // schemas fetch
  const fileLoader = FileLoader.getInstance();
  const schemaTree = [
    {
      name: "templates",
      title: "Templates",
      children: [
        {
          name: "classic-form",
          title: "Classic Form"
        },
        {
          name: "waf-form",
          title: "WAF Form"
        },
        {
          name: "wizard",
          title: "Wizard"
        },
        {
          name: "page-list",
          title: "Page List"
        }
      ]
    },
    {
      name: "pages",
      title: "Pages",
      children: fileLoader.loadFileTree("schema")
    }
  ];
  // const [tree, setTree] = useState(treeStructure)
  const resourceTree = [
    {
      name: "Plugins",
      title: "Plugins",
      children: getPluginTree(PluginManager.getInstance().getPlugins("global"))
    },
    {
      name: "Events",
      title: "Events",
      children: []
    },
    {
      name: "Components",
      title: "Components",
      children: []
    },
    {
      name: "DataSources",
      title: "Data Sources",
      children: []
    }
  ];

  // libraries fetch
  const librariesData = IDERegister.componentsLibrary;

  return !componentCollapsed ? (
    <>
      <div className="manager">
        <div className="pages">
          <a
            className="close-button"
            onClick={() => toggleComponentCollapsed(true)}
          >
            <Icon type="close" />
          </a>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Schemas" key="1">
              <PageTree tree={schemaTree} />
            </TabPane>
            <TabPane tab="Resources" key="2">
              <ResourceTree tree={resourceTree} />
            </TabPane>
          </Tabs>
        </div>

        <div className="widgets">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Components" key="1">
              <Libraries list={librariesData} />
            </TabPane>

            <TabPane tab="DataSources" key="DataSources">
              <DataSource datasource={props.datasource} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  ) : null;
};
