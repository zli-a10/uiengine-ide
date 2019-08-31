import React, { useState, useContext } from "react";
import { Tabs, Icon } from "antd";
import { PluginManager } from "uiengine";
import _ from "lodash";

import { GlobalContext } from "../Context";
import { PageTree, PluginTree, Libraries } from ".";
import { DataSource } from "./DataSource";
import { FileLoader, IDERegister } from "../../helpers";
const TabPane = Tabs.TabPane;

const getPluginTree = (plugins: any) => {
  // console.log(PluginManager.plugins);
  let results: any[] = [];
  for (let key in plugins) {
    let result: any = {};
    const plugin: { type?: any } = plugins[key];
    if (_.isObject(plugin)) {
      if (plugin.type) {
        let name = _.get(plugin, "name", plugin.type);
        result = { name: plugin.type, title: name };
      } else {
        let children: any = [];
        for (let k in plugin) {
          const p = plugin[k];
          children.push(getPluginSubTree(k, p));
        }
        result = { key: _.uniqueId(key), name: key, title: key, children };
      }
    }
    if (!_.isEmpty(result)) results.push(result);
  }
  return results;
};

const getPluginSubTree = (key: string, plugins: any) => {
  const result: any = { key: _.uniqueId(key), name: key, title: key };
  if (!plugins.type) {
    const children = getPluginTree(plugins);
    if (!_.isEmpty(children)) result.children = children;
  }
  return result;
};

export const DesignManager: React.FC<IDesignManager> = props => {
  // schemas fetch
  const fileLoader = FileLoader.getInstance();
  const schemaTree = {
    name: "root",
    title: "Start Up",
    children: [fileLoader.loadFileTree("schema")]
  };
  // const [tree, setTree] = useState(treeStructure)
  const pluginTree = {
    name: "root",
    title: "Start Up",
    children: getPluginTree(PluginManager.plugins)
  };

  // libraries fetch
  const librariesData = IDERegister.componentsLibrary;

  return (
    <GlobalContext.Consumer>
      {({ componentCollapsed, toggleComponentCollapsed }) =>
        componentCollapsed ? (
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
                  <TabPane tab="Plugins" key="2">
                    <PluginTree tree={pluginTree} />
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
        ) : null
      }
    </GlobalContext.Consumer>
  );
};
