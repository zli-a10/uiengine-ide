import React, { useState, useEffect, useContext } from "react";
// import { Tabs, Icon } from 'antd';
// import { LayoutManager } from "./LayoutManager";
import _ from "lodash";
import { UIEngine } from "uiengine";
import { UIEngineDndWrapper } from "../dnd";
import { VersionControl } from "../../helpers";
import { Context } from "../editor/Context";
// import { FileLoader } from "../../helpers";

function getScroll() {
  return {
    left:
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft ||
      0,
    top:
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
  };
}

// const fileLoader = FileLoader.getInstance();
export const DrawingBoard: React.FC = (props: any) => {
  const { preview, updateInfo } = useContext(Context);
  const { layouts, config = {} } = props;
  let schemas = layouts;

  _.set(config, `widgetConfig.componentWrapper`, UIEngineDndWrapper);
  if (!preview) {
    _.set(config, `ideMode`, true);
  } else {
    _.set(config, `ideMode`, false);
  }
  // _.set(config, `widgetConfig.uiengineWrapper`, UIEngineDndProvider);
  const historyAction = async (e: any) => {
    e.stopPropagation();
    const versionControl = VersionControl.getInstance();
    if (e.ctrlKey && e.code === "KeyZ") {
      const schema = await versionControl.undo();
      updateInfo({ schema });
    }

    if (e.ctrlKey && e.shiftKey && e.code === "KeyZ") {
      const schema = await versionControl.redo();
      updateInfo({ schema });
    }
  };
  useEffect(() => {
    // Update the document title using the browser API
    document.body.onkeypress = historyAction;
    const drawingboard = document.getElementById("drawingboard");
    const propManager = document.getElementById("prop-manager");
    let originTop = 30;
    window.onscroll = _.debounce(() => {
      const scroll = getScroll();
      if (drawingboard && drawingboard.children[1] && scroll.top > 0) {
        if (scroll.top > _.get(drawingboard.children[1], "offsetHeight", 0)) {
          originTop = scroll.top;
        } else {
          originTop = 20;
        }
        drawingboard.style.paddingTop = `${originTop}px`;
      }

      if (propManager) {
        if (scroll.top > 0) {
          originTop = scroll.top;
        } else {
          originTop = 50;
        }
        propManager.style.top = `${originTop}px`;
      }
    }, 10);
  });
  return (
    <div className="editor" id="drawingboard">
      {/* <LayoutManager layout={layout} /> */}
      <UIEngine layouts={schemas} config={config} />
    </div>
  );
};
