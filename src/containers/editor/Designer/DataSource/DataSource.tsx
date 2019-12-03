import React, { useCallback, useState } from 'react';
import * as _ from 'lodash';
import { TreeSelect, Input, Row, Col, Button } from 'antd';
import DataSourceTree from './DataSourceTree';
import { useCreateFile, IDERegister, formatTitle } from '../../../../helpers';
const { TreeNode } = TreeSelect;

const DataSource: React.FC<IDataSourceProps> = (props: IDataSourceProps) => {
  // const { datasource } = useContext(GlobalContext);
  const [searchText, setSearchText] = React.useState('');

  const onSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);
  const [treeValue, selectTreeValue] = useState();
  const treeData = _.clone(IDERegister.componentsLibrary);

  treeData.unshift({
    title: '== Datasource Only ==',
    key: 'datasource-key',
    value: ''
  });
  const onTreeChange = (value: any, label: any, extra: any) => {
    if (value.indexOf('component-category-') === -1) {
      selectTreeValue(value);
    }
  };

  return (
    <div className="manager-datasource">
      <div className="search-bar">
        <Row>
          <Col span={8}>
            <TreeSelect
              dropdownClassName="cancel-drag"
              showSearch
              className={'component-select'}
              value={treeValue}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={treeData}
              treeDefaultExpandAll
              onChange={onTreeChange}
              placeholder="DnD Coms"
            />
          </Col>
          <Col span={12}>
            <Input.Search
              onSearch={onSearch}
              onBlur={(event: any) => onSearch(event.target.value)}
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              icon="plus"
              shape="circle"
              onClick={useCreateFile('component')}
            />
          </Col>
        </Row>
      </div>
      <div className="datasource-tree">
        <DataSourceTree component={treeValue} searchText={searchText} />
      </div>
    </div>
  );
};

export default DataSource;
