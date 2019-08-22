import React, { useState, useRef, useContext } from "react";
import { Context } from "../editor/Context";
import _ from "lodash";
import { Icon } from "antd";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";

import DndNodeManager from "./DndNodeManager";
import RegionDetector from "./RegionDetector";
import ActionMenu from "./ActionMenu";
import "./styles/index.less";

export const DND_IDE_TYPE = "uiengine-wrapper";
const dndNodeManager = DndNodeManager.getInstance();
const regionDetector = RegionDetector.getInstance();

export const UIEngineDndWrapper = (props: any) => {
  const { preview } = useContext(Context);
  const { children, uinode } = props;
  if (preview) return children;

  const ref = useRef<HTMLDivElement>(null);
  // define drag source
  const [, drag] = useDrag({ item: { type: DND_IDE_TYPE, uinode } });

  // active style
  const [border, setBorder] = useState({});

  // define drop
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: DND_IDE_TYPE,
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
          const borderName = `border${_.upperFirst(regionName)}`;
          regionStyles = {
            [borderName]: "3px solid #f00"
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

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // detect update region style
      const regionName = regionDetector.detectCurrentRegion(
        clientOffset as XYCoord,
        hoverBoundingRect
      );

      const insertMethodName = `insert${_.upperFirst(regionName)}`;
      if (dndNodeManager[insertMethodName]) {
        dndNodeManager[insertMethodName](draggingNode, hoverNode);
      }
    },

    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  // change over background
  let backgroundColor = "rgba(255, 255, 255)";
  let borderStyle = {};
  let elementLabelStyle = {};
  if (isOverCurrent) {
    // backgroundColor = "rgba(24, 144, 255, 0.2)";
    borderStyle = border;
    elementLabelStyle = { background: "#f00", color: "#fff" };
  }

  drag(drop(ref));

  // callbacks to add hoverstyle
  const defaultHoverStyle = { container: {}, band: {} };
  const [hoverStyle, setHoverStyle] = useState(defaultHoverStyle);
  const mouseEnter = (e: any) => {
    e.stopPropagation();
    setHoverStyle({
      container: {
        border: "1px solid #0779e2",
        background: "#0779e2",
        color: "#fff"
      },
      band: {
        border: "1px solid #0779e2",
        background: "#0a386b",
        color: "#fff",
        zIndex: 201
      }
    });
  };

  const mouseLeave = (e: any) => {
    e.stopPropagation();
    setHoverStyle(defaultHoverStyle);
  };

  return (
    <div
      ref={ref}
      onMouseOver={mouseEnter}
      onMouseOut={mouseLeave}
      style={{ backgroundColor, ...borderStyle, ...hoverStyle.container }}
      className="wrapper"
    >
      <ActionMenu uinode={uinode}>
        <div
          className="component-action"
          style={{ ...elementLabelStyle, ...hoverStyle.band }}
        >
          {uinode.schema.component}
          <Icon type="more" />
        </div>
      </ActionMenu>
      {children}
    </div>
  );
};
