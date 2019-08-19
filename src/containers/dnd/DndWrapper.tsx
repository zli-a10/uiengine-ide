import React, { useState, useRef } from "react";
import _ from "lodash";
import { DndProvider, useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

export const TYPE = "uiengine-wrapper";

// DragSource & Target
function getStyle(backgroundColor: string): React.CSSProperties {
  return {
    border: "1px solid rgba(0,0,0,0.2)",
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
  const ref = useRef<HTMLDivElement>(null);
  const { children, uinode } = props;
  // define drag source
  const [, drag] = useDrag({ item: { type: TYPE, uinode } });

  // define drop
  // const [hasDropped, setHasDropped] = useState(false);
  // const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  const greedy = false;
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

      // Don't move top node
      const draggingParent = draggingNode.parent;
      if (!draggingParent) return;
      let draggingIndex = draggingParent.children.indexOf(draggingNode);

      // Time to actually perform the action
      let hoverParent = hoverNode.parent;
      let hoverIndex = -1;
      if (hoverParent) {
        hoverIndex = hoverParent.children.indexOf(hoverNode);
        if (hoverIndex === -1) return;

        let hoverParentSchema = hoverParent.schema;
        let hoverParentChildrenSchema: any = _.get(
          hoverParentSchema,
          "children",
          []
        );

        if (!hoverParentChildrenSchema.length) {
          hoverParentChildrenSchema.push(draggingNode.schema);
          hoverParentSchema.children = hoverParentChildrenSchema;
        } else {
          if (hoverParent === draggingParent) {
            hoverParentChildrenSchema.splice(draggingIndex, 1);
          } else {
            let dragParentSchema = draggingParent.schema;
            let dragParentChildrenSchema: any = _.get(
              dragParentSchema,
              "children",
              []
            );
            dragParentChildrenSchema.splice(draggingIndex, 1);
            // TODO: should we remove the dragging parent if empty left
            await draggingParent.replaceLayout(dragParentSchema);
            draggingParent.sendMessage(true); // force refresh
          }
          // console.log(hoverIndex, draggingIndex);
          hoverParentChildrenSchema.splice(hoverIndex, 0, draggingNode.schema);
        }
        await hoverParent.replaceLayout(hoverParentSchema);
        hoverParent.sendMessage(true); // force refresh
      }
    },

    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });

  let backgroundColor = "rgba(172, 197, 204, 0.5)";

  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = "darkgreen";
  }

  drag(drop(ref));
  return (
    <div ref={ref} style={getStyle(backgroundColor)}>
      {children}
    </div>
  );
};

export { UIEngineDndProvider, UIEngineDndWrapper };
