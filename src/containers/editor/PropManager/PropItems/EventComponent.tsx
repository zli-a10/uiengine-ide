import React, { useCallback, useState } from "react";
import _ from "lodash";
import { Select, Form, Col, Icon, Modal } from "antd";
import ReactJson from "react-json-view";
import { formatTitle } from "../../../../helpers";

const Option = Select.Option;
export const EventComponent = (props: any) => {
  const { options, value, onChange, disabled, data } = props;
  if (!_.isArray(options)) return null;
  let v = value;
  if (_.isObject(v)) {
    v = _.get(v, "action", "");
  }

  const [visible, changeVisible] = useState(false);
  const handleOk = useCallback((e: any) => {
    changeVisible(false);
  }, []);

  const handleCancel = useCallback((e: any) => {
    changeVisible(false);
  }, []);

  // to remove
  let json = {
    method: "POST",
    params: {},
    target: "slb.virtual-server:"
  };

  return (
    <Form.Item label={formatTitle(props.name)}>
      <Col span={21}>
        <Select value={v} onChange={onChange} disabled={disabled}>
          {options.map((option: any, index: number) => (
            <Option value={option} key={index}>
              {option}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={2} style={{ marginLeft: "10px" }}>
        <Icon type="setting" onClick={() => changeVisible(!visible)} />
      </Col>
      <Modal
        title="Edit Event Options"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ReactJson indentWidth={2} collapsed src={json} />
      </Modal>
    </Form.Item>
  );
};
