import React, { useCallback } from 'react'
import * as _ from 'lodash'
import { Tree, Input } from 'antd'

import DataSourceTree from './DataSourceTree'

export interface IDataSourceProps {
  onChange?: (value: any) => void
}

const DataSource: React.FC<IDataSourceProps> = (props: IDataSourceProps) => {
  const [searchText, setSearchText] = React.useState('')

  const onSearch = useCallback((text: string) => {
    setSearchText(text)
  }, [])

  return (
    <div className="manager-datasource">
      <div className="search-bar">
        <Input.Search onSearch={onSearch} />
      </div>
      <DataSourceTree searchText={searchText} />
    </div>
  )
}

export default DataSource
