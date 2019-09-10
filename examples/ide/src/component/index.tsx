import { IDERegister } from "uiengine-ide";
import { myInfo, antdInfo } from "./schemas";
import "antd/dist/antd.css";
import * as antd from "antd";
import * as my from "./my";
import "./schemas";

export * from "./ProductWrapper";

IDERegister.registerComponentsInfo(myInfo);
IDERegister.registerComponentsInfo(antdInfo);

export default {
  antd,
  my
};
