import React, { useState } from 'react'
import { Switch, Icon } from 'antd'

const InfoCardComponent = (props: any) => {
  const { cardInfor, tipsInfor } = props

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
      {isShowInfor ? (
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
          <div className="margin-min-top">{cardInfor}</div>
        </>
      ) : null}
      <>
        <div className="help">
          <Icon type="bulb" style={{ color: '#ffc800' }} />
          Tips
        </div>
        <div className="margin-min-top">{tipsInfor}</div>
      </>
    </div>
  )
}

export default InfoCardComponent
