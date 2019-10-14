import React, { useCallback, useState } from "react";
import _ from "lodash";

import { Input, Icon, Dropdown } from "antd";
import { useDrag } from "react-dnd";
import {
  DND_IDE_NODE_TYPE,
  resourceActions,
  loadFileStatus
} from "../../../../helpers";
// import { SchemasContext } from "../../../Context";
import { ActionMenu } from "./ActionMenu";

export const Title = (props: any) => {
  const { dataRef, children, type, onSelect, onRefresh, ...rest } = props;
  let statusObj: any = {};
  if (dataRef.type && dataRef._path_) {
    statusObj = loadFileStatus(dataRef.type, dataRef._path_);
  }
  let status = "normal",
    newPath = "";
  let title = dataRef.title.replace(/\.\w+$/, "");
  let newTitle = title;
  if (!_.isEmpty(statusObj)) {
    if (!_.isString(statusObj)) {
      status = statusObj.status;
      newPath = statusObj.newPath.replace(/\.\w+$/, "");
      newTitle = `${title} -> ${newPath}`;
      title = newPath;
    } else {
      status = statusObj;
    }
  }
  // dnd
  let drag;
  if (!_.isEmpty(dataRef._path_)) {
    const templateSchema = {
      $template: dataRef._path_, // this will be parsed on ide's template parser
      isSysTemplate: dataRef.isTemplate //system preserved template path
    };
    const uinode = { schema: templateSchema };
    [, drag] = useDrag({
      item: {
        type: DND_IDE_NODE_TYPE,
        uinode
      }
    });
  }

  const cancelEdit = useCallback(() => {
    switch (dataRef._editing_) {
      case "clone":
      case "add":
        _.remove(dataRef._parent_.children, (d: any) => {
          return d._key_ === dataRef._key_;
        });
        break;
    }
    dataRef._editing_ = false;
    onRefresh();
  }, [dataRef]);

  const saveSchema = useCallback(
    (e: any) => {
      const title = e.target.value;
      const path = resourceActions.save(dataRef, title);
      // select on tree
      onSelect([path]);
    },
    [dataRef]
  );

  const keyDown = useCallback(
    (e: any) => {
      if (e.keyCode === 27) {
        cancelEdit();
      }
    },
    [dataRef]
  );

  return (
    <div ref={drag}>
      {dataRef._editing_ ? (
        <>
          <Input
            size="small"
            placeholder="new-schema"
            defaultValue={title}
            onPressEnter={saveSchema}
            onKeyDown={keyDown}
          />
          <Icon type="close" onClick={cancelEdit} />
        </>
      ) : (
        <a
          className={`ant-dropdown-link node-title node-modified-${status}`}
          href="#"
        >
          {newTitle}
          {dataRef.isTemplate || dataRef.nodeType === "category" ? null : (
            <Dropdown
              overlay={
                <ActionMenu
                  onSelect={onSelect}
                  dataRef={dataRef}
                  onRefresh={onRefresh}
                  {...rest}
                  status={status}
                />
              }
            >
              <Icon type="more" />
            </Dropdown>
          )}
        </a>
      )}
    </div>
  );
};
