import { ILayoutSchema, IUINode } from "uiengine/typings";

declare module "*.json" {
  const value: any;
  export default value;
}

// declare module "react" {
//   interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//     // extends React's HTMLAttributes
//     custom?: string;
//   }
// }

// declare module "react" {
//   interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//     // extends React's HTMLAttributes
//     block?: string;
//   }
// }
