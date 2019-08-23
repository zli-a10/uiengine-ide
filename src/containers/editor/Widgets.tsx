import React from "react";
import _ from "lodash";
import { Icon, Popover, List } from "antd";
import { useDrag } from "react-dnd";
import { UINode } from "uiengine";

import { DND_IDE_NODE_TYPE } from "../dnd";

const WidgetItem = (props: any) => {
  const {
    id,
    title,
    schema,
    url,
    library,
    version,
    preview,
    icon,
    component,
    defaultProps = {}
  } = props;

  // stimulate a ui node
  const tempSchema = {
    component,
    content: defaultProps.content,
    props: defaultProps
  };
  const uinode = new UINode(tempSchema);
  // console.log(props);
  const [, drag] = useDrag({ item: { type: DND_IDE_NODE_TYPE, uinode } });

  const data = [
    component ? <h5>component: {component}</h5> : <></>,
    preview ? (
      <img src={preview} style={{ maxWidth: "200px", minWidth: "150px" }} />
    ) : (
      <></>
    ),
    version ? <p>Version:{version}</p> : <></>,
    library ? <p>From: {library}</p> : <></>,
    url ? <a href="{url}">Official Site</a> : <></>
  ];
  const content = (
    <List dataSource={data} renderItem={item => (item ? item : null)} />
  );

  return (
    <Popover content={content} title={title} key={id} mouseEnterDelay={1}>
      <div className="component" ref={drag}>
        {icon ? (
          <Icon type={icon} style={{ fontSize: "40px" }} />
        ) : preview ? (
          <img src={preview} width="60" height="60" />
        ) : (
          <Icon type={"swap"} style={{ fontSize: "40px" }} />
        )}
        <span>{title}</span>
      </div>
    </Popover>
  );
};

export const Widgets: React.FC<IWidgets> = props => {
  const { widgets } = props;

  return (
    <div className="list">
      {widgets.map((item: any, key: number) => (
        <WidgetItem {...item} key={key} />
      ))}
    </div>
  );
};
