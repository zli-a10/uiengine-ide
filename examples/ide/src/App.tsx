import React, { Component } from "react";
import * as Immutable from "immutable";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { TreeView } from "uiengine-ide";

const styles = require("./styles.css");

const recursivelyUpdateNode = (
  node: any,
  listUpdateFunc: (list: any, parentNode: any) => any,
  nodeUpdateFunc: (node: any) => any
) => {
  const children = node.children
    ? node.children
    : { items: Immutable.List<any>() };
  const updateChildren = recursivelyUpdateList(
    children,
    node,
    listUpdateFunc,
    nodeUpdateFunc
  );
  if (updateChildren !== node.children) {
    node = Object.assign({}, node, {
      children: updateChildren
    });
  }
  return nodeUpdateFunc(node);
};

const recursivelyUpdateList = (
  list: any,
  parentNode: any,
  listUpdateFunc: (list: any, parentNode: any) => any,
  nodeUpdateFunc: (node: any) => any
) => {
  const mappedItems = list.items.map((item: any) =>
    recursivelyUpdateNode(item, listUpdateFunc, nodeUpdateFunc)
  );
  if (!Immutable.is(mappedItems, list.items)) {
    list = Object.assign({}, list, {
      items: mappedItems
    });
  }
  return listUpdateFunc(list, parentNode);
};

interface AppState {
  rootNodes: any;
}

export default class App extends Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      rootNodes: {
        items: Immutable.List<any>([
          {
            id: "A",
            title: "A",
            children: {
              items: Immutable.List<any>([
                {
                  id: "A1",
                  title: "A1"
                },
                {
                  id: "A2",
                  title: "A2"
                },
                {
                  id: "A3",
                  title: "A3"
                }
              ])
            }
          },
          {
            id: "B",
            title: "B",
            children: {
              items: Immutable.List<any>([
                {
                  id: "B1",
                  title: "B1"
                },
                {
                  id: "B2",
                  title: "B2"
                }
              ])
            }
          },
          {
            id: "C",
            title: "C",
            children: {
              items: Immutable.List<any>([
                {
                  id: "C1",
                  title: "C1",
                  children: {
                    items: Immutable.List<any>([
                      {
                        id: "C1x",
                        title: "C1x"
                      },
                      {
                        id: "C1y",
                        title: "C1y"
                      },
                      {
                        id: "C1z",
                        title: "C1z"
                      },
                      {
                        id: "C1zz",
                        title: "C1zz"
                      },
                      {
                        id: "C1zzz",
                        title: "C1zzz"
                      }
                    ])
                  }
                }
              ])
            }
          }
        ])
      }
    };
  }

  handleMoveNode = (args: any) => {
    this.setState(
      Object.assign({}, this.state, {
        rootNodes: recursivelyUpdateList(
          this.state.rootNodes,
          null,
          (list, parentNode) =>
            parentNode === args.newParentNode &&
            parentNode === args.oldParentNode
              ? Object.assign({}, list, {
                  items: list.items
                    .insert(args.newParentChildIndex, args.node as any)
                    .remove(
                      args.oldParentChildIndex +
                        (args.newParentChildIndex < args.oldParentChildIndex
                          ? 1
                          : 0)
                    )
                })
              : parentNode === args.newParentNode
              ? Object.assign({}, list, {
                  items: list.items.insert(
                    args.newParentChildIndex,
                    args.node as any
                  )
                })
              : parentNode === args.oldParentNode
              ? Object.assign({}, list, {
                  items: list.items.remove(args.oldParentChildIndex)
                })
              : list,
          item => item
        )
      })
    );
  };

  setStateWithLog = (newState: AppState) => {
    console.log("new state: ", newState);
    this.setState(newState);
  };

  handleToggleCollapse = (node: any) => {
    this.setStateWithLog(
      Object.assign({}, this.state, {
        rootNodes: recursivelyUpdateList(
          this.state.rootNodes,
          null,
          (list, parentNode) => list,
          item =>
            item === node
              ? Object.assign({}, item, {
                  isCollapsed: !item.isCollapsed
                })
              : item
        )
      })
    );
  };

  renderNode = (node: any) => (
    <div className={styles.nodeItem}>
      {!node.children || node.children.items.isEmpty() ? null : (
        <a
          style={{ fontSize: "0.5em", verticalAlign: "middle" }}
          onClick={() => this.handleToggleCollapse(node)}
        >
          {node.isCollapsed ? "⊕" : "⊖"}
        </a>
      )}
      Node: {node.title}
    </div>
  );

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <TreeView
          rootNodes={this.state.rootNodes}
          classNames={styles}
          renderNode={this.renderNode}
          onMoveNode={this.handleMoveNode}
        />
      </DndProvider>
    );
  }
}

// export const DraggableApp: React.ComponentClass<{}> = DragDropContext(
//   HTML5Backend
//   // TouchDragDropBackend({ enableMouseEvents: true })
// )(App);
