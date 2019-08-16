import React, { useCallback, useState, useMemo } from "react";

// import { _ } from 'lodash';
import { Icon, Switch } from "antd";
import { Manager, PropManager, DrawingBoard } from "./";
import { Context } from "./Context";
// import { useVisibilites } from '../hooks/visibility';

import "antd/dist/antd.css";
import "./styles/index.less";

const IDEEditor: React.FC = () => {
  const [componentsCollapsed, setComponentCollapse] = useState(false);
  const [propsCollapsed, setPropsCollapse] = useState(true);
  const [headerCollapsed, setHeaderCollapse] = useState(false);

  const hideAll = useCallback(() => {
    setComponentCollapse(true);
    setPropsCollapse(true);
    setHeaderCollapse(true);
  }, [componentsCollapsed, propsCollapsed, headerCollapsed]);

  const showAll = useCallback(() => {
    setComponentCollapse(false);
    setHeaderCollapse(false);
  }, [componentsCollapsed, propsCollapsed, headerCollapsed]);

  const [preview, setPreview] = useState(false);
  const contextValue = useMemo<IIDEContext>(
    () => ({
      preview
    }),
    [preview]
  );
  const switchPreview = () => {
    setPreview(!preview);
  };

  return (
    <Context.Provider value={contextValue}>
      {headerCollapsed ? (
        <a className="ide-show" onClick={showAll}>
          <Icon type="caret-right" />
        </a>
      ) : null}
      <div className={headerCollapsed ? "ide-header hide" : "ide-header"}>
        <div className="left">
          <div className="button-close">
            <Icon type="close" onClick={hideAll} />
          </div>
          <a
            className="button-menu"
            onClick={() => setComponentCollapse(!componentsCollapsed)}
          >
            <Icon type="menu" /> Editing WAF - Template{" "}
          </a>
          <div className="page-name">
            <em>(last saved: 10:09)</em>
          </div>
        </div>
        <div className="right">
          <div className="props">
            <Switch
              checked={preview}
              checkedChildren="Preview"
              unCheckedChildren="Edit"
              onChange={switchPreview}
            />
            <a
              className="settings"
              onClick={() => setPropsCollapse(!propsCollapsed)}
            >
              <Icon type="setting" />
            </a>
            {/* <div className="more"><Icon type="more" /></div> */}
          </div>
          <div className="brand">GUI IDE</div>
        </div>
      </div>

      <div className="ide-editor">
        {componentsCollapsed ? null : (
          <Manager onClose={() => setComponentCollapse(!componentsCollapsed)} />
        )}
        <DrawingBoard />
        {propsCollapsed ? null : (
          <PropManager onClose={() => setPropsCollapse(!propsCollapsed)} />
        )}
      </div>
    </Context.Provider>
  );
};

export default IDEEditor;
