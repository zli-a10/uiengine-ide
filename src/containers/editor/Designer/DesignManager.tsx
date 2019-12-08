import React, { useContext, useEffect, useState, useCallback } from "react";
import { Tabs, Icon } from "antd";
import _ from "lodash";
import classnames from "classnames";

import { GlobalContext } from "../../Context";
import { PageTree, ResourceTree, Libraries } from "..";
import { DataSource } from "./DataSource";
import { IDERegister, Resize } from "../../../helpers";
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
    const handler = document.getElementById("drag-handler-south");
    const target: any = document.getElementById("page-list");
    const offsetPatch = componentCollapsed
      ? headerCollapsed
        ? 46
        : 36
      : headerCollapsed
      ? 6
      : 26;
    if (target) {
      const widgetFrame: any = document.getElementById("libary-frame");
      let designerSize = JSON.parse(localStorage.designerSize || "{}");

      new Resize(
        "s",
        target,
        handler,
        (w: any) => {
          const offsetHeight = w.height;
          const newWidgetFrameHeight = `calc(100% - ${offsetHeight +
            offsetPatch}px)`; //widgetFrameHeight + offset;
          widgetFrame.style.height = newWidgetFrameHeight;
          designerSize = {
            filelistHeight: offsetHeight
          };
          localStorage.designerSize = JSON.stringify(designerSize);
        },
        document.body.offsetHeight - 100
      );

      if (!_.isEmpty(designerSize)) {
        const { filelistHeight } = designerSize;
        target.style.height = `${filelistHeight}px`;
        const newWidgetFrameHeight = `calc(100% - ${filelistHeight +
          offsetPatch}px)`;
        widgetFrame.style.height = `${newWidgetFrameHeight}`;
      }
    }
  }, [localStorage.designerSize, headerCollapsed, componentCollapsed]);

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
    const designManager: any = document.getElementById("ide-design-manager");

    designManager.style.height = `${document.body.offsetHeight -
      (headerCollapsed ? 0 : 40)}px`;
    if (componentCollapsed) {
      designManager.style.top = headerCollapsed ? "40px" : "100px";
      designManager.addEventListener("mouseover", myMouseOver);
      designManager.addEventListener("mouseout", myMouseOut);
    } else {
      designManager.style.top = "100px";
      designManager.removeEventListener("mouseover", myMouseOver);
      designManager.removeEventListener("mouseout", myMouseOut);
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

        <div className="widgets" id="libary-frame">
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
