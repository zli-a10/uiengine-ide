import React, { useContext, useState, useCallback, useEffect } from "react";
import _ from "lodash";
// import ReactJson from "react-json-view";
import { Input, Form, Button, Select, Icon, Col } from "antd";
// import ButtonGroup from "antd/lib/button/button-group";
// import { IDEEditorContext, GlobalContext } from "../../Context";
import {
  NORMAL_DATA,
  EMPTY_DATA,
  MIN_DATA,
  MAX_DATA,
  SMALLER_DATA,
  LARGER_DATA,
  DataMocker,
  getActiveUINode,
  changeApiHost
} from "../../../../helpers";

const dataMocker = DataMocker.getInstance();

export const TestToolkits = (props: any) => {
  const { formItemLayout, tailFormItemLayout, value } = props;
  const rootNode: any = getActiveUINode(false);

  const onRefreshData = useCallback(
    (value: any) => {
      return async () => {
        dataMocker.mode = value;
        dataMocker.noCache = true;
        // console.log(value);
        await rootNode.refreshLayout();
        rootNode.sendMessage(true);
        dataMocker.noCache = false;
      };
    },
    [dataMocker]
  );

  const [selectedValue, setValue] = useState("empty");
  const [host, setHost] = useState();

  const onSetHost = useCallback(() => {
    _.set(rootNode, `request.config.baseURL`, host);
  }, [host]);

  const onChangeHost = useCallback(
    (e: any) => {
      let host = _.get(e, "target.value");
      if (_.trimEnd(host).indexOf("http") !== 0) {
        host = `http://${host}/`;
      }
      setHost(host);
    },
    [host]
  );

  const [apiHost, setApiHost] = useState();
  const onChangeApiHost = useCallback(
    (e: any) => {
      let host = _.get(e, "target.value");
      setApiHost(host);
    },
    [apiHost]
  );
  const onSetApiHost = useCallback(async () => {
    console.log(apiHost, "apiHost");
    await changeApiHost(apiHost);
  }, [apiHost]);

  useEffect(() => {
    const host = _.get(rootNode, `request.config.baseURL`);
    setHost(host);
    const apiHost = _.get(rootNode, `request.config.apiServer`);
    setApiHost(apiHost);
  }, [rootNode, setHost, setApiHost]);

  return (
    <Form {...formItemLayout}>
      <Form.Item label="Local Host">
        <Input
          value={host}
          placeholder={"http://localhost:3000/"}
          onChange={onChangeHost}
          addonAfter={<a onClick={onSetHost}>Set</a>}
        />
      </Form.Item>
      <Form.Item label="API Host">
        <Input
          value={apiHost}
          placeholder={"192.168.x.x"}
          onChange={onChangeApiHost}
          addonAfter={<a onClick={onSetApiHost}>Set</a>}
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
