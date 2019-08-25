import React, { useState } from "react";
import { Tabs, Icon } from "antd";
import { PageTree, Libraries } from "./";
import DataSource from "./DataSource";

const TabPane = Tabs.TabPane;

import { trigger } from "../../core/index";
import commands from "../../core/messages";

export const Manager: React.FC<IManager> = props => {
  // schemas fetch
  const treeStructure = trigger({
    type: commands.get_schemas,
    content: {
      // type: 'page'
    }
  });
  const [tree, setTree] = useState(treeStructure);

  // outline fetch
  const outlineStructure = trigger({
    type: commands.get_schema_outline,
    content: {
      // type: 'page'
    }
  });
  const [outline, setOutline] = useState(outlineStructure);

  // libraries fetch
  const librariesData = trigger({
    type: commands.get_components,
    content: {
      // type: 'page'
    }
  });
  const [libraries, setLibraries] = useState(librariesData);

  // layouts fetch
  const layoutsData = trigger({
    type: commands.get_layouts,
    content: {
      // type: 'page'
    }
  });
  const [layouts, setLayouts] = useState(layoutsData);

  const { onClose, getDataSource, expandDataSource } = props;

  return (
    <div className="manager">
      <div className="pages">
        <a className="close-button" onClick={onClose}>
          <Icon type="close" />
        </a>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Schemas" key="1">
            <PageTree tree={tree} />
          </TabPane>
          <TabPane tab="Plugins" key="2">
            <PageTree tree={outline} />
          </TabPane>
        </Tabs>
      </div>

      <div className="widgets">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Components" key="1">
            <Libraries list={libraries} />
          </TabPane>
          {/* <TabPane tab="DataSources" key="2">
            <Libraries list={layouts} />
          </TabPane> */}
          <TabPane tab="DataSources" key="DataSources">
            <DataSource
              getDataSource={getDataSource}
              expandDataSource={expandDataSource}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
