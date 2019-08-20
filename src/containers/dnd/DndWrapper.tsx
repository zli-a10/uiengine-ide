import React, { useState, useRef, useContext } from "react";
import { Context } from "../editor/Context";
import _ from "lodash";
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import DndNodeManager from "./DndNodeManager";
const dndNodeManager = new DndNodeManager();

export const TYPE = "uiengine-wrapper";

// DragSource & Target
function getStyle(backgroundColor: string): React.CSSProperties {
  return {
    border: "1px dashed rgba(100, 100, 100, 0.8)",
    backgroundColor,
    padding: "5px",
    margin: "5px",
    overflow: "hidden"
  };
}

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

  // define drop
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: TYPE,
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
      dndNodeManager.selectNode(draggingNode, hoverNode);
      dndNodeManager.insert();
    },

    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  // change over background
  let backgroundColor = "rgba(200, 200, 200, 0.5)";
  if (isOverCurrent) {
    backgroundColor = "#3570bd";
  }

  drag(drop(ref));
  return (
    <div ref={ref} style={getStyle(backgroundColor)}>
      {children}
    </div>
  );
};

export { UIEngineDndProvider, UIEngineDndWrapper };
