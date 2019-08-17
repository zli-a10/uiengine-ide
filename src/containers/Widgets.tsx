import React from 'react';
import { Icon } from 'antd';

const WidgetItem = (props: any) => {
  const { title, category } = props;

  return (
    <div className="component">
      <Icon type="swap" style={{ fontSize: '40px' }} />
      <span>{title}</span>
    </div>
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
