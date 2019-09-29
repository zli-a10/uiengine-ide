import React, { useState } from "react";
import { Radio } from "antd";
import _ from "lodash";

export class RadioGroup extends React.Component<any, any> {

  render() {
    const {
      name,
      defaultValue,
      value,
      onChange,
      radioOptions
    } = this.props;
    let radioOptionList: object[] = [];
    if (radioOptions) {
      let radioOption = radioOptions.split(",");
      radioOption.map((data: any) => {
        let optionSplit = data.split(':');
        radioOptionList.push({ label: optionSplit[0], value: optionSplit[1] })
      })
    }

    return (
      <Radio.Group name={name} defaultValue={defaultValue} onChange={onChange} value={value}>
        {radioOptionList &&
          radioOptionList.map((data: any) => {
            return (
              <Radio value={_.get(data, 'value')} >
                {_.get(data, 'label')}
              </Radio>
            );
          })}
      </Radio.Group>
    );
  }
};
