import React, { useState, useContext } from 'react'
import { Switch, Icon } from 'antd'
import { MyContext } from '../../my/Context/Provider'

const InfoCardComponent = (props: any) => {
  const { style } = props
  const { data } = useContext(MyContext)

  const [showJSON, setShowJSON] = useState(true)
  // if (checkedChildren) {
  //   setIsShowInfor(true);
  // }
  const onChange = (checked: boolean) => {
    if (checked) {
      setShowJSON(true)
    } else {
      setShowJSON(false)
    }
  }

  const config = showJSON
    ? `{
    'slb': {
      'virtual-server': {
        'name': 'v1',
        'ipv4': '10.10.1.1',
        'netmask': '255.255.255.0'
      }
    }
  }`
    : `slb virtual-server v1 ip address 10.10.1.1 netmask 255.255.255.0`
  const configs = <code className="config">{config}</code>

  const help = (
    <p className="help">
      Virtual Server is virtual host to deploy Server balance, use Wildcard or
      an float IP could implement hot replace
    </p>
  )

  return data.showAssitant ? (
    <div className="a10-help-info-card" style={style}>
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
        <div className="margin-min-top">{configs}</div>
      </>
      <>
        <div className="help">
          <Icon type="bulb" style={{ color: '#ffc800' }} />
          Tips
        </div>
        <div className="margin-min-top">{help}</div>
      </>
    </div>
  ) : null
}

export default InfoCardComponent
