import React from "react";
import { Tree, Input, Icon } from "antd";
import { Context } from "./Context";
import { DropdownMenu } from "../../components/DropdownMenu";
import _ from "lodash";
import { trigger } from "../../core/index";
import commands from "../../core/messages";
import { getTreeRoot, FileLoader, getActiveUINode } from "../../helpers";
import { IUINode } from "uiengine/typings";

const { TreeNode } = Tree;
let defaultExpandedKeys: any = [];
const fileLoader = FileLoader.getInstance();

export class PageTree extends React.Component<ITree, ITreeState> {
  constructor(props: ITree) {
    super(props);
    const items = props.tree.output.children;
    if (items.length) {
      defaultExpandedKeys.push(items[0].name);
    }
    this.state = {
      expandKeys: defaultExpandedKeys,
      autoExpandParent: true,
      date: new Date().getTime()
    };
  }

  rerender() {
    this.setState({ date: new Date().getTime() });
  }

  Title = (props: any) => {
    const { dataRef, editable, parent } = props;
    const that = this;
    const removeElement = () => {
      let newElements = null;

      if (!parent) {
        newElements = props.tree.output.children;
      } else {
        newElements = parent.children;
      }
      // console.log(newElement);
      _.remove(newElements, (d: any) => {
        return d._key_ === dataRef._key_;
      });
    };
    // const [data, setData] = useState(dataRef);
    const onClick = (component: any, index: number) => {
      const actionmMap: any = {
        Add: () => {
          const newItem = _.cloneDeep(dataRef);

          delete newItem.children;
          newItem._key_ = _.uniqueId("tree-node-");
          // newItem._id_.push(newItem.key);
          newItem.name = "";
          newItem.title = "";
          newItem._editing_ = "add";
          dataRef.children = dataRef.children || [];
          dataRef.children.push(newItem);
          const expandKeys = this.state.expandKeys;

          if (expandKeys.indexOf(dataRef._key_) === -1) {
            expandKeys.push(dataRef._key_);
          }

          // that.rerender();
          that.setState({ expandKeys, autoExpandParent: true });
        },
        Delete: () => {
          removeElement();
          that.rerender();
        },
        Clone: () => {
          const newItem = _.cloneDeep(dataRef);

          delete newItem.children;
          newItem._key_ = _.uniqueId("tree-node-");
          // newItem._id_.push(newItem.key);
          newItem._editing_ = "clone";
          newItem.title = "Copy From " + newItem.title;
          dataRef._parent_.children.push(newItem);
          // console.log(expandKeys);
          that.rerender();
        },
        Rename: () => {
          dataRef._editing_ = "rename";
          that.rerender();
        }
      };
      const actionName = component.props.children;

      return actionmMap[actionName].call();
    };
    const menu = [
      <div>Add</div>,
      <div>Delete</div>,
      <div>Clone</div>,
      <div>Rename</div>
    ];

    const saveSchema = (e: any) => {
      const title = e.target.value;
      const oldPath = dataRef._path_;
      dataRef.title = title;
      dataRef.name = _.snakeCase(title);
      dataRef._path_ = dataRef._parent_
        ? `${dataRef._parent_.name}/${dataRef.name}`
        : dataRef.name;

      if (dataRef._editing_ === "add") {
        trigger({
          type: commands.add_schema,
          path: dataRef._path_,
          root: getTreeRoot(dataRef)
        });
      } else if (dataRef._editing_ === "rename") {
        trigger({
          type: commands.rename_schema,
          path: dataRef._path_,
          root: getTreeRoot(dataRef),
          oldPath
        });
      }

      dataRef._editing_ = false;
      that.rerender();
    };

    const cancelEdit = () => {
      switch (dataRef._editing_) {
        case "clone":
        case "add":
          removeElement();
          break;
      }
      dataRef._editing_ = false;
      that.rerender();
    };

    return (
      <div className="node-title">
        {editable ? (
          <>
            <Input
              size="small"
              placeholder="new-schema"
              defaultValue={props.children}
              onPressEnter={saveSchema}
            />
            <Icon type="close" onClick={cancelEdit} />
          </>
        ) : (
          // <DropdownMenu overlay={menu}>
          //   <a className="ant-dropdown-link" href="#">
          //     Hover me <Icon type="down" />
          //   </a>
          // </DropdownMenu>
          <DropdownMenu
            trigger="click"
            placement="topRight"
            arrowPointAtCenter={true}
            title={props.children}
            menu={menu}
            onClick={onClick}
          />
          // <div>{props.children}</div>
        )}
      </div>
    );
  };

  renderTreeNodes(data: any, parent: any = null) {
    return data.map((item: any) => {
      const title = item.title || item.name;

      item._parent_ = parent;

      item._path_ = parent ? `${parent.name}/${item.name}` : item.name;
      item._key_ = item._path_;
      // console.log(id);
      if (item.children) {
        return (
          <TreeNode
            title={
              <this.Title
                parent={parent}
                dataRef={item}
                editable={item._editing_}
              >
                {title}
              </this.Title>
            }
            key={item._key_}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children, item)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={
            <this.Title
              parent={parent}
              dataRef={item}
              editable={item._editing_}
            >
              {title}
            </this.Title>
          }
          key={item._key_}
          dataRef={item}
        />
      );
    });
  }

  onExpand = (expandKeys: string[]) => {
    this.setState({
      expandKeys,
      autoExpandParent: false
    });
  };

  onSelect = async (selectedKeys: string[], info: any) => {
    if (selectedKeys.length) {
      const path = _.last(selectedKeys);
      if (path) {
        const schema = fileLoader.loadFile(path, "schema");
        if (_.isObject(schema)) {
          const uiNode = getActiveUINode() as IUINode;
          uiNode.schema = schema;
          await uiNode.updateLayout();
          uiNode.sendMessage(true);
        }
      }
    }
  };

  render() {
    const { tree } = this.props;
    return (
      <Tree
        showLine
        onExpand={this.onExpand}
        onSelect={this.onSelect}
        autoExpandParent={this.state.autoExpandParent}
        defaultExpandedKeys={defaultExpandedKeys}
        expandedKeys={this.state.expandKeys}
      >
        {this.renderTreeNodes(tree.output.children)}
      </Tree>
    );
  }
}

PageTree.contextType = Context;
