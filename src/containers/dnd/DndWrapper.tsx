import React, { useState, useRef, useContext, useCallback } from "react";
import { Context } from "../editor/Context";
import _ from "lodash";
import { Icon } from "antd";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import { DND_IDE_NODE_TYPE, DND_IDE_SCHEMA_TYPE } from "./DndTypes";

import DndNodeManager from "./DndNodeManager";
import RegionDetector from "./RegionDetector";
import ActionMenu from "./ActionMenu";
import "./styles/index.less";
import { IDataSource } from "uiengine/typings";

const dndNodeManager = DndNodeManager.getInstance();
const regionDetector = RegionDetector.getInstance();

const getDataSource = (
  datasource: IDataSource | string,
  full: boolean = false
) => {
  if (!datasource) return "";
  let source = "";
  if (_.isObject(datasource)) {
    source = datasource.source;
  } else {
    source = datasource;
  }
  if (full) {
    return source;
  }
  return _.last(source.replace(":", ".").split("."));
};

export const UIEngineDndWrapper = (props: any) => {
  const { preview } = useContext(Context);
  const { children, uinode } = props;
  if (preview) return children;

  const ref = useRef<HTMLDivElement>(null);
  // define drag source
  const [, drag] = useDrag({ item: { type: DND_IDE_NODE_TYPE, uinode } });

  // active style
  const [border, setBorder] = useState({});

  // define drop
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: [DND_IDE_NODE_TYPE, DND_IDE_SCHEMA_TYPE],
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

      let regionStyles;
      switch (item.type) {
        case DND_IDE_NODE_TYPE:
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
          break;
        case DND_IDE_SCHEMA_TYPE:
          regionStyles = {
            border: "3px solid #80c35f",
            backgroundColor: "#def9d1"
          };
          setBorder(regionStyles);
          break;
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

      switch (item.type) {
        case DND_IDE_NODE_TYPE:
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
          break;
        case DND_IDE_SCHEMA_TYPE:
          if (_.isObject(item.schema)) {
            dndNodeManager.useSchema(hoverNode, item.schema);
          }
          break;
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
  const mouseEnter = useCallback((e: any) => {
    e.stopPropagation();
    setHoverStyle({
      container: {
        border: "1px solid #0779e2",
        background: "#0779e2",
        color: "#fff",
        boxShadow: "#0779e2 0px 3px 10px"
      },
      band: {
        border: "1px solid #0779e2",
        background: "#0a386b",
        color: "#fff",
        zIndex: 201
      }
    });
  }, []);

  const mouseLeave = useCallback(
    (e: any) => {
      e.stopPropagation();
      setHoverStyle(defaultHoverStyle);
    },
    [defaultHoverStyle]
  );

  const dataSource = getDataSource(uinode.schema.datasource);
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
          title={dataSource}
        >
          {uinode.schema.component}
          {dataSource ? `(${dataSource})` : ""}
          <Icon type="more" />
        </div>
      </ActionMenu>
      {children}
    </div>
  );
};
