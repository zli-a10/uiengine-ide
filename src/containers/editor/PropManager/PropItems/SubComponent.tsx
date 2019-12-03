import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { Form, Switch } from 'antd';
import { PropItem } from '../PropItem';
import { formatTitle } from '../../../../helpers';

export const SubComponent = (props: any) => {
  const {
    typeSchema,
    data,
    name,
    dataRef,
    uinode,
    onChange,
    section = 'prop'
  } = props;
  const [showSub, setShowSub] = useState(!_.isEmpty(data));
  const onChangeSub = (value: any) => {
    setShowSub(value);
    if (!value) onChange({});
  };

  useEffect(() => {
    setShowSub(!_.isEmpty(data));
  }, [uinode, data]);

  return (
    <>
      <Form.Item label={formatTitle(name)} colon={false}>
        <Switch defaultChecked={showSub} onChange={onChangeSub} />
      </Form.Item>
      {showSub ? (
        <div className="sub-options">
          {typeSchema['sub'].map((restSchema: any) =>
            Object.entries(restSchema).map((entry: any) => {
              return (
                <PropItem
                  section={section}
                  isSubOptions={true}
                  dataRef={dataRef}
                  name={`${name}.${entry[0]}`}
                  schema={entry[1]}
                  key={`key-${entry[0]}`}
                  uinode={uinode}
                  data={_.get(uinode, `schema.props.${name}.${entry[0]}`)}
                />
              );
            })
          )}
        </div>
      ) : null}
    </>
  );
};
