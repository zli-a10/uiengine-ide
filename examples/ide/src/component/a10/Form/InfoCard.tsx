import React, { useState } from 'react'
import { Switch, Icon } from 'antd'

const InfoCardComponent = (props: any) => {
  // const { configs, tipsInfor } = props;
  const configs = (
    <code className="config">
      slb virtual-server v1 ip address 10.10.1.1 netmask 255.255.255.0
    </code>
  )

  const help = (
    <p className="help">
      Virtual Server is virtual host to deploy Server balance, use Wildcard or
      an float IP could implement hot replace
    </p>
  )

  const [isShowInfor, setIsShowInfor] = useState(true)
  // if (checkedChildren) {
  //   setIsShowInfor(true);
  // }
  const onChange = (checked: boolean) => {
    if (checked) {
      setIsShowInfor(true)
    } else {
      setIsShowInfor(false)
    }
  }

  return (
    <div className="a10-help-info-card">
      <>
        <div className="config">
          Config
          <Switch
            checkedChildren="JSON"
            unCheckedChildren="CLI"
            className="type-switcher"
            onChange={onChange}
            defaultChecked
          />
        </div>
        {isShowInfor ? <div className="margin-min-top">{configs}</div> : null}
      </>
      <>
        <div className="help">
          <Icon type="bulb" style={{ color: '#ffc800' }} />
          Tips
        </div>
        <div className="margin-min-top">{help}</div>
      </>
    </div>
  )
}

export default InfoCardComponent
