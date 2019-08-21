import React, { useState, useRef, useContext } from "react";
import { Context } from "../editor/Context";
import _ from "lodash";
import { Icon } from "antd";
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";

import HTML5Backend from "react-dnd-html5-backend";
import DndNodeManager from "./DndNodeManager";
import RegionDetector from "./RegionDetector";
import ActionMenu from "./ActionMenu";
import "./styles/index.less";

export const TYPE = "uiengine-wrapper";
const dndNodeManager = new DndNodeManager();
const regionDetector = new RegionDetector();

// Provider
const UIEngineDndProvider = (props: any) => {
  return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
};

const UIEngineDndWrapper = (props: any) => {
  const { preview } = useContext(Context);
  const { children, uinode } = props;
  if (preview) return children;

  const ref = useRef<HTMLDivElement>(null);
  // define drag source
  const [, drag] = useDrag({ item: { type: TYPE, uinode } });

  // active style
  const [border, setBorder] = useState({});

  // define drop
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: TYPE,
    hover: async (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const draggingNode = item.uinode;
      const hoverNode = uinode;

      // Don't replace items with themselves
      if (draggingNode === hoverNode || !isOverCurrent) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // detect update region style
      const regionName = regionDetector.detectCurrentRegion(
        clientOffset as XYCoord,
        hoverBoundingRect
      );

      if (regionName) {
        let regionStyles;
        if (regionName === "center") {
          regionStyles = {
            border: "3px solid #f00"
          };
        } else {
          const styleName = `border${_.upperFirst(regionName)}`;
          regionStyles = {
            [styleName]: "3px solid #f00"
          };
        }

        setBorder(regionStyles);
      }
    },
    drop: async (item: DragItem, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const draggingNode = item.uinode;
      const hoverNode = uinode;

      // Don't replace items with themselves
      if (draggingNode === hoverNode || !isOverCurrent) {
        return;
      }

      // TODO: need judge which place we have dragged
      dndNodeManager.replace(draggingNode, hoverNode);
    },

    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  // change over background
  let backgroundColor = "rgba(200, 200, 200, 0.5)";
  let borderStyle = {};
  if (isOverCurrent) {
    backgroundColor = "#3570bd";
    borderStyle = border;
  }

  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{ backgroundColor, ...borderStyle }}
      className="wrapper"
    >
      <ActionMenu>
        <div className="component-action">
          {uinode.schema.component}
          <Icon type="more" />
        </div>
      </ActionMenu>
      {children}
    </div>
  );
};

export { UIEngineDndProvider, UIEngineDndWrapper };
