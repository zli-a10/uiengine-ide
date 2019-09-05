import React from "react";
import { Tree, Input, Icon, Dropdown, Menu } from "antd";
import { useDrag } from "react-dnd";
import { UINode } from "uiengine";
import { SchemasContext } from "../../Context";
import _ from "lodash";
import {
  getTreeRoot,
  FileLoader,
  getActiveUINode,
  DND_IDE_NODE_TYPE,
  defaultEmptyLayoutSchema,
  VersionControl
} from "../../../helpers";
import { IUINode } from "uiengine/typings";

const { TreeNode } = Tree;
let defaultExpandedKeys: any = [];
const fileLoader = FileLoader.getInstance();

export class PageTree extends React.Component<ITree, ITreeState> {
  constructor(props: ITree) {
    super(props);
    const items = props.tree.children;
    if (items && items.length) {
      defaultExpandedKeys.push(items[0].name);
    }
    this.state = {
      expandKeys: defaultExpandedKeys,
      selectedKeys: defaultExpandedKeys,
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
        newElements = props.tree.children;
      } else {
        newElements = parent.children;
      }
      // console.log(newElement);
      _.remove(newElements, (d: any) => {
        return d._key_ === dataRef._key_;
      });
    };
    // const [data, setData] = useState(dataRef);
    const onClick = (e: any) => {
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
          that.setState({
            expandKeys,
            // selectedKeys: [newItem._key_],
            autoExpandParent: true
          });

          // this.context.setSelectedKey(newItem._key_);
          this.onSelect([newItem._key_]);
        },
        Delete: () => {
          removeElement();
          fileLoader.removeFile(dataRef._path_, "schema", getTreeRoot(dataRef));
          const selectedKeys = ["root"];
          // that.setState({ selectedKeys, autoExpandParent: true });
          that.onSelect(selectedKeys);
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
          const content = fileLoader.loadFile(dataRef._path_);
          const newName = `${dataRef._path_}_${_.uniqueId("copy_")}`;
          fileLoader.saveFile(newName, content, "schema", getTreeRoot(dataRef));
          // that.rerender();
          const selectedKeys = [name];
          // that.setState({ selectedKeys, autoExpandParent: true });
          that.onSelect(selectedKeys);
        },
        Rename: () => {
          dataRef._editing_ = "rename";
          that.rerender();
        }
      };
      const actionName = e.key;

      return actionmMap[actionName].call();
    };

    const saveSchema = (e: any) => {
      const title = e.target.value;
      const oldPath = dataRef._path_;
      dataRef.title = title;
      dataRef.name = _.snakeCase(title);
      dataRef._path_ = dataRef._parent_
        ? `${dataRef._parent_._path_}/${dataRef.name}`
        : dataRef.name;

      if (dataRef._editing_ === "add") {
        //TODO: check name first
        fileLoader.saveFile(
          dataRef._path_,
          defaultEmptyLayoutSchema,
          "schema",
          getTreeRoot(dataRef)
        );
      } else if (dataRef._editing_ === "rename") {
        const content = fileLoader.loadFile(oldPath);
        fileLoader.removeFile(oldPath);
        fileLoader.saveFile(
          dataRef._path_,
          content || defaultEmptyLayoutSchema,
          "schema",
          getTreeRoot(dataRef)
        );
      }

      dataRef._editing_ = false;
      const selectedKeys = [dataRef._path_];
      that.onSelect(selectedKeys);
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

    const menu = (
      <Menu onClick={onClick}>
        <Menu.Item key="Add">
          <a>Add</a>
        </Menu.Item>
        <Menu.Item key="Delete">
          <a>Delete</a>
        </Menu.Item>
        <Menu.Item key="Clone">
          <a>Clone</a>
        </Menu.Item>
        <Menu.Item key="Rename">
          <a>Rename</a>
        </Menu.Item>
      </Menu>
    );

    // dnd
    // const schema = fileLoader.loadFile(dataRef._path_, "schema");
    const templateSchema = {
      $template: dataRef._path_ // this will be parsed on ide's template parser
    };
    let drag;
    if (!_.isEmpty(templateSchema)) {
      const uinode = new UINode(templateSchema);
      [, drag] = useDrag({
        item: {
          type: DND_IDE_NODE_TYPE,
          uinode
        }
      });
    }

    return (
      <div className="node-title" ref={drag}>
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
          <a className="ant-dropdown-link" href="#">
            {props.children}{" "}
            <Dropdown overlay={menu}>
              <Icon type="more" />
            </Dropdown>
          </a>
        )}
      </div>
    );
  };

  renderTreeNodes(data: any, parent: any = null) {
    return data
      ? data.map((item: any) => {
          const title = item.title || item.name;

          item._parent_ = parent;

          item._path_ = parent ? `${parent._path_}/${item.name}` : item.name;
          item._key_ = item.key || item._path_;
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
        })
      : null;
  }

  onExpand = (expandKeys: string[]) => {
    this.setState({
      expandKeys,
      autoExpandParent: false
    });
  };

  onSelect = async (selectedKeys: string[], treeNode?: any) => {
    if (
      selectedKeys.length &&
      !_.has(treeNode, "node.props.dataRef._editing_")
    ) {
      const path = _.last(selectedKeys);
      const versionControl = VersionControl.getInstance();
      if (path) {
        versionControl.clearHistories();
        fileLoader.editingFile = path;
        const schema = fileLoader.loadFile(path, "schema");
        if (_.isObject(schema)) {
          const uiNode = getActiveUINode() as IUINode;
          uiNode.schema = schema;
          await uiNode.updateLayout();
          uiNode.sendMessage(true);
        }

        // set current dataRef
        if (_.has(treeNode, "node.props.dataRef")) {
          this.context.setCurrentData(treeNode.node.props.dataRef);
        }
      }
      this.context.setSelectedKey(selectedKeys);
    }
  };

  render() {
    const { tree } = this.props;
    return (
      <div className="pagetree">
        <Tree
          showLine
          onExpand={this.onExpand}
          onSelect={this.onSelect}
          autoExpandParent={this.state.autoExpandParent}
          defaultExpandedKeys={defaultExpandedKeys}
          expandedKeys={this.state.expandKeys}
          selectedKeys={this.context.selectedKeys}
        >
          {this.renderTreeNodes(tree.children)}
        </Tree>
      </div>
    );
  }
}

PageTree.contextType = SchemasContext;
