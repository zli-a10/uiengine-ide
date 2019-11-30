import React from "react";
import { Layout } from "antd";
// import {
//   CLIInfoComponent,
//   SwitcherComponent,
//   ConfigBlockComponent,
//   TabsComponent,
//   SubmitComponent
// } from "./Form";
// import _ from 'lodash'
const { Content } = Layout;
// export class ContentComponent extends React.Component<any, any> {
//   render() {
//     return (
//       <Content className="GUI-content  flex-bar">
//         <Row>
//           <Col style={{ width: "20%" }} className="float-left margin-right">
//             <CLIInfoComponent />
//           </Col>
//           <Col style={{ width: "39%" }} className="float-left margin-right">
//             <Row>
//               <SwitcherComponent />
//             </Row>
//             <Row>
//               <ConfigBlockComponent />
//             </Row>
//           </Col>
//           <Col style={{ width: "39%" }} className="float-left ">
//             <TabsComponent />
//           </Col>
//         </Row>
//         <Row className="margin-top float-right">
//           <SubmitComponent />
//         </Row>
//       </Content>
//     );
//   }
// }

const ContentComponent = (props: any) => {
  const { children } = props;
  return (
    <Content className="a10-content">
      <div className="flex-bar">{children}</div>
    </Content>
  );
};

export default ContentComponent;
