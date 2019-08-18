import React from 'react';
import { Slider, Icon, Button } from 'antd';

export const LayoutManager: React.FC<ILayoutManager> = props => {
  return (
    <div className="ide-editor-layouts">
      <div className="ide-editor-categories">
        <label>Choose a container type to start?</label>
        <select>
          <option>Page</option>
          <option>Table</option>
          <option>Dashboard</option>
          <option>Form</option>
          <option>Work Flow</option>
        </select>

        <Button style={{ float: 'right' }}>Create a Blank Layout</Button>
      </div>
      <div className="ide-editor-list">
        <div className="ide-editor-list-item">
          <div className="ide-editor-list-item-icon">
            <Icon type="login" />
          </div>
          <label htmlFor="" className="ide-editor-list-item-title">
            2 Rows 1Column
          </label>
        </div>
        <div className="ide-editor-list-item">
          <div className="ide-editor-list-item-icon">
            <Icon type="logout" />
          </div>
          <label htmlFor="" className="ide-editor-list-item-title">
            1 Row 2 Columns
          </label>
        </div>
        <div className="ide-editor-list-item">
          <div className="ide-editor-list-item-icon">
            <Icon type="menu-fold" />
          </div>
          <label htmlFor="" className="ide-editor-list-item-title">
            Tabs Form
          </label>
        </div>
        <div className="ide-editor-list-item">
          <div className="ide-editor-list-item-icon">
            <Icon type="menu-unfold" />
          </div>
          <label htmlFor="" className="ide-editor-list-item-title">
            Vertical Tabs
          </label>
        </div>
      </div>
      <div className="ide-editor-list-slider">
        <Slider />
      </div>
    </div>
  );
};
