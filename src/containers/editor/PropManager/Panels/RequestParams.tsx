import React, { useContext, useState } from "react";
import _ from "lodash";
import ReactJson from "react-json-view";
import { Input, Form, Button, Select, Icon, Col } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
// import { IDEEditorContext, GlobalContext } from "../../Context";
// import { getActiveUINode } from "../../../helpers";

export const RequestParams = (props: any) => {
  const { formItemLayout, tailFormItemLayout, value } = props;
  const onViewCode = (value: any) => {
    return () => {};
  };
  const [selectedValue, setValue] = useState();
  return (
    <Form {...formItemLayout}>
      <Form.Item label="Host">
        <Input
          size={"default"}
          placeholder={"192.168.x.x"}
          addonAfter={<a>Send</a>}
        />
      </Form.Item>
      <Form.Item label="Test Data">
        <Col span={16}>
          <Select defaultValue="normal" size="small">
            <Select.Option value="normal">normal</Select.Option>
            <Select.Option value="boundary">Boundray</Select.Option>
            <Select.Option value="out">Out of Range</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <Button
            icon="reload"
            size="small"
            onClick={onViewCode(selectedValue)}
          >
            Refresh
          </Button>
        </Col>
      </Form.Item>
      {/* <Form.Item>
        <ReactJson
          indentWidth={2}
          collapsed
          src={[
            {
              "slb.virtual-server": "http://[host]/axapi/v3/slb/virtual-server/"
            }
          ]}
        />
      </Form.Item> */}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" icon="play-circle">
          Send Request
        </Button>
      </Form.Item>
    </Form>
  );
};
