import { message } from "antd";
import { ProductWrapper } from "../component";

const widgetsConfig = {
  messager: (props: any) => {
    if (props.status > 0) {
      message.error(props.code);
    } else {
      message.success(props.code);
    }
    return null;
  },
  componentWrapper: ProductWrapper
};

export default widgetsConfig;
