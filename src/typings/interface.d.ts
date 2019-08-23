import { ILayoutSchema, IUINode } from "uiengine/typings";

declare module "*.json" {
  const value: any;
  export default value;
}
