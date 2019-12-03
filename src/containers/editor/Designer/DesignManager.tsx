import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Tabs, Icon } from 'antd';
import _ from 'lodash';
import classnames from 'classnames';

import { GlobalContext } from '../../Context';
import { PageTree, ResourceTree, Libraries } from '..';
import { DataSource } from './DataSource';
import { IDERegister, Resize } from '../../../helpers';
const TabPane = Tabs.TabPane;

export const DesignManager: React.FC<IDesignManager> = props => {
  const {
    componentCollapsed,
    headerCollapsed,
    toggleComponentCollapsed
  } = useContext(GlobalContext);

  // libraries fetch
  const librariesData = IDERegister.componentsLibrary;

  useEffect(() => {
    const handler = document.getElementById('drag-handler-south');
    const target: any = document.getElementById('page-list');

    if (target) {
      const targetHeight = target.offsetHeight;
      const widgetLib: any = document.getElementById('widgets-library');
      const widgetLibHeight = widgetLib.offsetHeight;
      const widdgetDatasource: any = document.getElementById(
        'widget-datasource'
      );
      const widgetDatasourceHeight = widdgetDatasource.offsetHeight;
      let designerSize = JSON.parse(localStorage.designerSize || '{}');

      new Resize('s', target, handler, (w: any) => {
        const offset = targetHeight - w.height;
        const newWidgetLibHeight = widgetLibHeight + offset;
        const newWidgetDatasourceHeight = widgetDatasourceHeight + offset;

        widgetLib.style.height = `${newWidgetLibHeight}px`;
        widdgetDatasource.style.height = `${newWidgetDatasourceHeight}px`;

        if (_.isEmpty(designerSize)) {
          designerSize = {
            offset,
            widgetLibHeight,
            filelistHeight: targetHeight
          };
        } else {
          designerSize.offset = offset;
        }
        // rememeber the resize
        localStorage.designerSize = JSON.stringify(designerSize);
      });

      if (!_.isEmpty(designerSize)) {
        const { offset, filelistHeight, widgetLibHeight } = designerSize;

        target.style.height = `${filelistHeight - offset}px`;
        widgetLib.style.height = `${widgetLibHeight + offset}px`;
      }
    }
  }, [localStorage.designerSize]);

  // mouse event
  const [isOverDesigner, setIsOverDesigner] = useState(false);
  const myMouseOver = useCallback(() => {
    setIsOverDesigner(true);
  }, [setIsOverDesigner]);
  const myMouseOut = useCallback(() => {
    setIsOverDesigner(false);
  }, [setIsOverDesigner]);

  useEffect(() => {
    // component mouse over
    const designManager: any = document.getElementById('ide-design-manager');

    designManager.style.height = `${window.screen.height - 40}px`;
    if (componentCollapsed) {
      designManager.style.top = headerCollapsed ? '40px' : '100px';
      designManager.addEventListener('mouseover', myMouseOver);
      designManager.addEventListener('mouseout', myMouseOut);
    } else {
      designManager.style.top = '100px';
      designManager.removeEventListener('mouseover', myMouseOver);
      designManager.removeEventListener('mouseout', myMouseOut);
    }
  }, [headerCollapsed, componentCollapsed, setIsOverDesigner]);

  const cls = classnames({
    manager: true,
    hidden: componentCollapsed,
    over: isOverDesigner
  });

  return (
    <>
      <div className={cls} id="ide-design-manager">
        <div className="pages" id="page-list">
          <a
            className="close-button"
            onClick={() => toggleComponentCollapsed(true)}
          >
            <Icon type="close" />
          </a>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Schemas" key="1">
              <PageTree />
            </TabPane>
            <TabPane tab="Resources" key="2">
              <ResourceTree />
            </TabPane>
          </Tabs>
        </div>
        <div className="drag-handler-south" id="drag-handler-south" />

        <div className="widgets" id="widget-datasource">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Components" key="1">
              <Libraries list={librariesData} />
            </TabPane>

            <TabPane tab="DataSources" key="DataSources">
              <DataSource />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};
