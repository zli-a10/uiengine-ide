import React from 'react';
import { Input } from 'antd';

export const PropItem: React.FC = (props: any) => {
  return (
    <li className="input-item">
      <label className="input-label">Label</label>{' '}
      <div className="input">
        <Input />
      </div>
    </li>
  );
};
