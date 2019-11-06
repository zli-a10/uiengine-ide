import React, { useCallback, useState, useEffect } from "react";
import _ from "lodash";

import { Input, Icon, Dropdown, message } from "antd";
import { useDrag } from "react-dnd";
import {
  DND_IDE_NODE_TYPE,
  resourceActions,
  loadFileStatus,
  FileLoader,
  checkDuplicateTreeLeaf
} from "../../../../helpers";
// import { SchemasContext } from "../../../Context";
import { ActionMenu } from "./ActionMenu";

export const Title = (props: any) => {
  const {
    dataRef,
    children,
    type,
    onSelect,
    onRefresh,
    onRefreshChildren,
    ...rest
  } = props;
  let statusObj: any = {};
  if (dataRef.type && dataRef.name) {
    statusObj = loadFileStatus(dataRef.type, dataRef.key);
  }
  let status = "normal",
    newPath = "";
  let title = dataRef.title
  if (dataRef.type !== 'plugin') {
    title = dataRef.title.replace(/\.\w+$/, "");
  }
  let newTitle = title;
  if (!_.isEmpty(statusObj)) {
    if (!_.isString(statusObj)) {
      status = statusObj.status;
      if (statusObj.newPath) {
        newPath = statusObj.newPath.replace(/\.\w+$/, "");
        newTitle = `${title} -> ${newPath}`;
        title = newPath;
      }
    } else {
      status = statusObj;
    }
  }

  // console.log(status, newTitle, title);
  // dnd
  let drag;
  if (!_.isEmpty(dataRef.name)) {
    const templateSchema = {
      $template: dataRef.name, // this will be parsed on ide's template parser
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
          return d.key === dataRef.key;
        });
        break;
    }
    dataRef._editing_ = false;
    onRefresh();
  }, [dataRef]);

  const saveSchema = useCallback(
    (e: any) => {
      const title = e.target.value;
      if (_.trim(title)) {
        if (!checkDuplicateTreeLeaf(dataRef, title)) {
          const path = resourceActions.save(dataRef, title);
          // select on treeS
          // activeTab(path, dataRef.type)
          onSelect([path], dataRef);
          onRefresh();
        } else {
          message.error('Duplicate name');
        }
      }
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

  useEffect(() => {
    if (dataRef._editing_) {
      const newList = document.querySelectorAll('.newSchemaClass');
      if (newList.length) {
        const focusNode = newList[newList.length - 1] as HTMLInputElement
        focusNode.focus();
      }
    }
  }, [dataRef]);

  return (
    <div ref={drag}>
      {dataRef._editing_ ? (
        <>
          <Input
            className='newSchemaClass'
            size="small"
            placeholder="new-schema"
            defaultValue={title}
            onPressEnter={saveSchema}
            onKeyDown={keyDown}
            onBlur={saveSchema}
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
