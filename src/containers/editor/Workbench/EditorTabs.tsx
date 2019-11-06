import React, { useState, useCallback, useEffect, useContext } from "react";
import * as _ from "lodash";
import {
  Tabs,
  Icon,
  Row,
  Col,
  Menu,
  Dropdown,
  Modal,
  Form,
  Input,
  TreeSelect,
  message
} from "antd";
import { DrawingBoard, CodeEditor } from "./../";
import { IDEEditorContext, GlobalContext } from "../../Context";
import {
  loadFileStatus,
  getFileSuffix,
  FileLoader,
  saveFileStatus,
  getActiveUINode
} from "../../../helpers";
const { TabPane } = Tabs;

const WindowSizeDown = (props: any) => {
  const {
    onSplitWindow,
    onMenuClick,
    onSave,
    activeKey,
    type = "schema"
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [fileName, setFileName] = useState(activeKey);
  const [folder, setFolder] = useState();
  const handleOk = useCallback(() => {
    const fileSuffix = getFileSuffix(type);
    let file = fileName;
    if (fileName.indexOf(fileSuffix) === -1) {
      file = `${fileName}${fileSuffix}`;
    }
    onSave(folder, file, type);
    setModalVisible(false);
  }, [activeKey, folder, fileName, type]);

  const handleCancel = useCallback((e: any) => {
    setModalVisible(false);
  }, []);

  const showModal = useCallback((e: any) => {
    setModalVisible(true);
  }, []);

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="12:12">1:1</Menu.Item>
      <Menu.Item key="8:16">1:2</Menu.Item>
      <Menu.Item key="6:18">1:3</Menu.Item>
      <Menu.Item key="16:8">2:1</Menu.Item>
      <Menu.Item key="18:6">3:1</Menu.Item>
    </Menu>
  );

  const [treeData, setTreeData] = useState();
  useEffect(() => {
    setFileName(activeKey);
    const loadTreeData = async () => {
      const fileLoader = FileLoader.getInstance();
      const data = await fileLoader.loadFileTree(type, false, false, true);

      const tree = [
        {
          title: type,
          value: `root_${type}`,
          key: type,
          children: data
        }
      ];
      return tree;
    };

    if (type) {
      const treePromise = loadTreeData();
      treePromise.then((tree: any) => {
        setTreeData(tree);
        setFolder(`root_${type}`);
      });
    }
  }, [activeKey, type]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  return (
    <div className="tab-action">
      <Icon
        type="save"
        style={{ marginRight: "20px" }}
        onClick={showModal}
        className="splitter"
      />
      <Dropdown overlay={menu}>
        <Icon
          type="layout"
          style={{ marginRight: "20px" }}
          onClick={onSplitWindow}
          className="splitter"
        />
      </Dropdown>
      <Modal
        title="Save File"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="FileName">
            <Input
              defaultValue={activeKey}
              value={fileName}
              onChange={(e: any) => {
                setFileName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Folder">
            <TreeSelect
              style={{ width: 300 }}
              value={folder}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              treeData={treeData}
              placeholder="Please select"
              treeDefaultExpandAll
              onChange={(value: any) => setFolder(value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export const EditorTabs = (props: any) => {
  const { tabs } = props;
  const propActiveKey = props['activeKey']
  const { activeTab, removeTab, content, setContent, activeTabName } = useContext(IDEEditorContext);
  const { resourceTree, setResourceTree } = useContext(GlobalContext);
  let activeKey = propActiveKey
  if (propActiveKey.indexOf('drawingboard') !== -1) {
    const segs = propActiveKey.split(':')
    if (segs[1]) activeKey = segs[1]
  }
  const [leftSpan, setLeftSpan] = useState(12);
  const [rightSpan, setRightSpan] = useState(12);

  // split window
  const [splitted, setSpitted] = useState(false);
  const onSplitWindow = useCallback(() => {
    setSpitted(!splitted);
    if (!splitted) {
      localStorage["drawingBoardLayout"] = "12:12";
      activeTab(`drawingboard:${activeTabName}`, 'schema');
    } else {
      localStorage["drawingBoardLayout"] = "";
      activeTab(`drawingboard:${activeKey}`, 'schema');
    }
  }, [splitted, activeTab, activeKey, activeTabName]);

  const onMenuClick = useCallback((e: any) => {
    const { key } = e;
    const [left, right] = key.split(":");
    setLeftSpan(left);
    setRightSpan(right);
    setSpitted(true);
    localStorage["drawingBoardLayout"] = key;
  }, []);

  const searchNode = useCallback((folder: string, nodes: Array<any>): any => {
    let node;
    if (nodes && _.isArray(nodes)) {
      for (let key in nodes) {
        node = nodes[key];
        if (node.key === folder) {
          break;
        } else if (node.children) {
          node = searchNode(folder, node.children);
        }
      }
    }
    return node;
  }, []);

  // value getter for code editor
  // const [getter, setGetter] = useState();
  // const onSetGetter = useCallback((getter:any) => {
  //   setGetter(getter);
  // }, []);

  const onSave = useCallback(
    (folder: string, fileName: string, type: EResourceType) => {
      // save nwe
      const isRoot = folder.indexOf("root_") !== -1;
      let data: any;
      if (type === "schema") {
        data = _.get(resourceTree, `${type}[1]`);
      } else {
        data = _.get(resourceTree, type);
      }

      let targetNode;
      if (isRoot) {
        targetNode = data;
      } else {
        targetNode = searchNode(folder, data);
        if (!targetNode.children) {
          targetNode.children = [];
        }
        targetNode = targetNode.children;
      }

      if (_.isArray(targetNode)) {
        const file = `${isRoot ? "" : folder + "/"}${fileName}`;
        const newNode = {
          isTemplate: false,
          key: file,
          name: file,
          nodeType: "file",
          path: file,
          server: true,
          title: fileName,
          type,
          value: file
        };
        targetNode.push(newNode);
        // console.log("file: %s path: %s type: %s", file, folder, type);
        const fileLoader = FileLoader.getInstance();
        const text = _.find(content, { file: activeKey });
        const changedTypeObject = _.get(resourceTree, type);
        if (text) {
          fileLoader.saveFile(file, text.content, type, changedTypeObject);
          text.file = fileName;
          saveFileStatus(file, type, "new");
          activeTab(file, type, activeKey);
          setResourceTree({ [type]: changedTypeObject });
        }
      }
    },
    [splitted, resourceTree, activeTab, setResourceTree, activeKey]
  );

  const onTabClick = useCallback(
    (activeKey: any) => {
      activeTab(`drawingboard:${activeKey}`, 'schema');
      const text = _.find(content, { file: activeKey });
      if (text) {
        if (_.isString(text.content)) {
          try {
            const schema = JSON.parse(text.content);
            const uiNode = getActiveUINode();
            uiNode.schema = schema;
            uiNode.updateLayout();
            uiNode.sendMessage(true);
          } catch (e) {
            console.error(e);
          }
        }
      }

    },
    [activeKey]
  );

  const onEdit = useCallback(
    (targetKey: any, action: string) => {
      if (action === "remove") {
        if (targetKey === 'drawingboard') {
          message.warning('drawingboard can not be closed!');
        }
        else if (tabs.length === 1) {
          message.warning('At least one tab is open so drawingboard could display its content!');
        } else {
          removeTab(targetKey);
        }
      }
    },
    [removeTab, tabs]
  );

  // const [data, setData] = useState({});
  const onChange = useCallback(
    (activeKey: any) => {
      activeTab(activeKey);
      // search conten
    },
    [activeTab]
  );

  useEffect(() => {
    if (localStorage["drawingBoardLayout"]) {
      onMenuClick({ key: localStorage["drawingBoardLayout"] });
    }
    if (tabs.length) {
      setSpitted(!!localStorage["drawingBoardLayout"]);
    } else {
      setSpitted(false);
    }
  }, [tabs]);

  useEffect(() => {
    const initTab = async () => {
      const tabIndex: any = _.findIndex(tabs, { tab: 'simple.json' })
      if (tabIndex === -1) {
        const fileLoader = FileLoader.getInstance();
        const data = await fileLoader.loadFile('simple.json', 'schema');
        setContent({ content: JSON.stringify(data, null, '\t'), file: 'simple.json', type: 'schema' })
        activeTab('simple.json', 'schema');
      }
    }
    initTab()
  }, [])

  const createTabTitle = useCallback(
    (tabObject: any) => {
      const { tab, language } = tabObject;
      const status = loadFileStatus(language, tab);
      const suffix = getFileSuffix(language);
      let tabTitle: any;
      // this is not the final solution
      const isNew = tab.indexOf(suffix) === -1;
      if (_.has(status, "status") || isNew) {
        const s = _.get(status, "status", isNew ? "new" : "normal");
        tabTitle = <span className={`node-modified-${s}`}>*{tab}</span>;
      } else {
        tabTitle = <span>{tab}</span>;
      }
      return tabTitle;
    },
    [localStorage.fileStatus]
  );

  // load active key type
  const tab = _.find(tabs, { tab: activeKey });
  let type = "";
  if (tab) type = _.get(tab, "language");

  return !splitted ? (
    <Tabs
      defaultActiveKey="drawingboard"
      activeKey={activeKey}
      onChange={onChange}
      hideAdd
      type="editable-card"
      onEdit={onEdit}
      onTabClick={onTabClick}
      tabBarExtraContent={
        tabs && tabs.length ? (
          <WindowSizeDown
            onMenuClick={onMenuClick}
            onSplitWindow={onSplitWindow}
            onSave={onSave}
            activeKey={activeKey}
            type={type}
          />
        ) : null
      }
    >
      <TabPane tab="Drawing Board" key="drawingboard">
        <DrawingBoard {...props} />
      </TabPane>

      {tabs.map((tab: any) => {
        return (
          <TabPane tab={createTabTitle(tab)} key={tab.tab}>
            <CodeEditor data={tab} />
          </TabPane>
        );
      })}
    </Tabs>
  ) : (
      <Row>
        <Col span={leftSpan}>
          <Tabs defaultActiveKey="drawingboard">
            <TabPane tab="Drawing Board" key="drawingboard">
              <DrawingBoard {...props} />
            </TabPane>
          </Tabs>
        </Col>
        <Col span={rightSpan}>
          <Tabs
            onEdit={onEdit}
            onTabClick={onTabClick}
            hideAdd
            type="editable-card"
            defaultActiveKey={activeKey}
            activeKey={activeKey}

            tabBarExtraContent={
              tabs && tabs.length ? (
                <WindowSizeDown
                  onMenuClick={onMenuClick}
                  onSplitWindow={onSplitWindow}
                  onSave={onSave}
                  activeKey={activeKey}
                  type={type}
                />
              ) : null
            }
          >
            {tabs.map((tab: any) => (
              <TabPane tab={createTabTitle(tab)} key={tab.tab}>
                <CodeEditor data={tab} />
              </TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
    );
};
