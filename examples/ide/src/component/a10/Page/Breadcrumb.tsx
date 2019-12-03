import React, { useCallback, useContext } from "react";
import _ from "lodash";
import { Breadcrumb, Row, Icon, Switch, Col, Select } from "antd";
import { MyContext } from "../../my/Context/Provider";

const { Option } = Select;
const { Item } = Breadcrumb;
const BreadcrumbComponent = (props: any) => {
  const { helpSwitcher = true } = props;
  const { data, dispatch } = useContext(MyContext);
  const onShowHelp = useCallback(
    (value: any) => {
      if (_.isFunction(dispatch)) {
        dispatch({ name: "set", params: { showHelp: value } });
      } else {
        console.warn(
          "dispatch not a function, please use my:Provider as your top container to pass by your Context"
        );
      }
    },
    [dispatch]
  );

  const onShowAssitant = useCallback(
    (value: any) => {
      if (_.isFunction(dispatch)) {
        const showAssitantVal = !!!data.showAssitant;
        dispatch({
          name: "set",
          params: { showAssitant: showAssitantVal }
        });
        // localStorage.a10ShowAssitant = showAssitantVal
      } else {
        console.warn(
          "dispatch not a function, please use my:Provider as your top container to pass by your Context"
        );
      }
    },
    [data, dispatch]
  );

  // useEffect(() => {
  //   if (localStorage.a10ShowAssitant) {
  //     dispatch({
  //       name: 'set',
  //       params: { showAssitant: localStorage.a10ShowAssitant }
  //     })
  //   }
  // }, [localStorage.a10ShowAssitant, dispatch])

  const list = (
    <div className="list-shortcut">
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select an Entry"
        optionFilterProp="children"
        // onChange={onChange}
        // onFocus={onFocus}
        // onBlur={onBlur}
        // onSearch={onSearch}
        // filterOption={(input, option) =>
        //   // option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        // }
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    </div>
  );

  return (
    <Row
      type="flex"
      className="a10-breadCrumb-container flex-bar"
      align="middle"
    >
      <Col span={16}>
        <Breadcrumb className="a10-breadCrumb" separator="/">
          <Item>
            {helpSwitcher ? (
              <Icon
                className="breadCrumb-Icon"
                type="menu-unfold"
                onClick={onShowAssitant}
              />
            ) : null}
          </Item>
          <Item>Applications</Item>
          <Item overlay={list}>ADC</Item>
          <Item>Create an Virtual Server</Item>
        </Breadcrumb>
      </Col>

      {helpSwitcher ? (
        <Col span={8} className="breadCrumb-switch">
          <Switch
            checkedChildren="Help"
            unCheckedChildren="Hide"
            defaultChecked
            onChange={onShowHelp}
          />
        </Col>
      ) : null}
    </Row>
  );
};

export default BreadcrumbComponent;
