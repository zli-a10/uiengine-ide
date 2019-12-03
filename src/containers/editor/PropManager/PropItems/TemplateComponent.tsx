import React, { useState, useCallback, useEffect } from 'react';
import _ from 'lodash';
import { Form, Modal, Button } from 'antd';
import ReactJson from 'react-json-view';
import { formatTitle } from '../../../../helpers';

export const TemplateComponent = (props: any) => {
  const { schema, data, name, uinode, onChange } = props;

  // change ui tree schema
  const onChangeTreeSchema = useCallback(async (d: any) => {}, []);

  const onAddTreeSchema = useCallback(async (d: any) => {}, []);

  const onDeleteTreeSchema = useCallback(async (d: any) => {}, []);

  // modal
  const handleOk = useCallback((e: any) => {
    changeVisible(false);
  }, []);

  const handleCancel = useCallback((e: any) => {
    changeVisible(false);
  }, []);

  const [visible, changeVisible] = useState(false);
  const [schemas, changeSchemas] = useState(_.get(schema, 'template'));
  const onViewCode = useCallback(() => {
    changeVisible(true);
  }, [schemas]);

  return (
    <Form.Item label={formatTitle(name)} colon={false}>
      <Button onClick={onViewCode} size="small">
        Edit...
      </Button>
      <Modal
        title="Edit Template Based Schema"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="cancel-drag"
      >
        <div className="template-json">
          <ReactJson
            indentWidth={2}
            src={schemas}
            onEdit={onChangeTreeSchema}
            onAdd={onAddTreeSchema}
            onDelete={onDeleteTreeSchema}
            displayDataTypes={false}
            collapsed={2}
            collapseStringsAfterLength={50}
          />
        </div>
      </Modal>
    </Form.Item>
  );
};
