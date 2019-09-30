import React, { useContext, useCallback } from "react";
import _ from "lodash";

import classnames from "classnames";
import { Input, Icon, Dropdown } from "antd";
import { useDrag } from "react-dnd";
import { DND_IDE_NODE_TYPE, resourceActions } from "../../../../helpers";
// import { SchemasContext } from "../../../Context";
import { ActionMenu } from "./ActionMenu";

export const Title = (props: any) => {
  const { dataRef, children, type, onSelect, ...rest } = props;
  const classNames = classnames({
    "node-title": true,
    "node-modifed": dataRef._status_ === "changed"
  });

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

  const title = children.replace(/\.\w+$/, "");
  const cancelEdit = useCallback(() => {
    switch (dataRef._editing_) {
      case "clone":
      case "add":
        _.remove(dataRef._parent_, (d: any) => {
          return d._key_ === dataRef._key_;
        });
        break;
    }
    dataRef._editing_ = false;
    // that.rerender();???
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

  return (
    <div className={classNames} ref={drag}>
      {dataRef._editing_ ? (
        <>
          <Input
            size="small"
            placeholder="new-schema"
            defaultValue={title}
            onPressEnter={saveSchema}
          />
          <Icon type="close" onClick={cancelEdit} />
        </>
      ) : (
        <a className="ant-dropdown-link" href="#">
          {title}
          {dataRef.isTemplate || dataRef.nodeType === "category" ? null : (
            <Dropdown
              overlay={
                <ActionMenu onSelect={onSelect} dataRef={dataRef} {...rest} />
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
