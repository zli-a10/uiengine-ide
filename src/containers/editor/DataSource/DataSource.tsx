import React, { useCallback, useContext } from "react";
import * as _ from "lodash";
import { Tree, Input, Row, Col, Button } from "antd";
import { GlobalContext } from "../../Context";
import DataSourceTree from "./DataSourceTree";

const DataSource: React.FC<IDataSourceProps> = (props: IDataSourceProps) => {
  const { datasource } = useContext(GlobalContext);
  const [searchText, setSearchText] = React.useState("");

  const onSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  return (
    <div className="manager-datasource">
      <div className="search-bar">
        <Row>
          <Col span={20}>
            <Input.Search onSearch={onSearch} />
          </Col>
          <Col span={4}>
            <Button type="primary" icon="plus" shape="circle" />
          </Col>
        </Row>
      </div>
      <div className="datasource-tree">
        <DataSourceTree
          value={{}}
          searchText={searchText}
          datasource={datasource}
        />
      </div>
    </div>
  );
};

export default DataSource;
