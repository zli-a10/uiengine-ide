import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;
class FooterComponent extends React.Component<any, any> {
  render() {
    return (
      <Footer className="a10-footer  flex-bar">
        Released by A10networks onbox GUI team
      </Footer>
    );
  }
}

export default FooterComponent;
