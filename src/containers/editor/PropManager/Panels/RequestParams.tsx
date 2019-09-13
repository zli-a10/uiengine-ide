import React, { useContext, useState } from "react";
import _ from "lodash";
import ReactJson from "react-json-view";
import { Input, Form, Button, Select, Icon, Col } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
// import { IDEEditorContext, GlobalContext } from "../../Context";
import {
  NORMAL_DATA,
  EMPTY_DATA,
  MIN_DATA,
  MAX_DATA,
  SMALLER_DATA,
  LARGER_DATA,
  DataMocker,
  getActiveUINode
} from "../../../../helpers";

const dataMocker = DataMocker.getInstance();

export const RequestParams = (props: any) => {
  const { formItemLayout, tailFormItemLayout, value } = props;
  const onRefreshData = (value: any) => {
    return async () => {
      dataMocker.mode = value;
      dataMocker.noCache = true;
      // console.log(value);
      const rootNode: any = getActiveUINode();
      await rootNode.updateLayout();
      rootNode.sendMessage(true);
    };
  };
  const [selectedValue, setValue] = useState("empty");
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
          <Select
            defaultValue="empty"
            size="small"
            onChange={(v: any) => {
              setValue(v);
            }}
          >
            <Select.Option value={EMPTY_DATA}>Empty</Select.Option>
            <Select.Option value={NORMAL_DATA}>Normal</Select.Option>
            <Select.Option value={MIN_DATA}>Minium</Select.Option>
            <Select.Option value={MAX_DATA}>Maxium</Select.Option>
            <Select.Option value={SMALLER_DATA}>Smaller</Select.Option>
            <Select.Option value={LARGER_DATA}>Larger</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <Button
            icon="reload"
            size="small"
            onClick={onRefreshData(selectedValue)}
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
      {/* <Form.Item {...tailFormItemLayout}>
        <Button type="primary" icon="play-circle">
          Send Request
        </Button>
      </Form.Item> */}
    </Form>
  );
};
