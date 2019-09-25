import * as commands from "./commands";
import { isFunction } from "lodash";

export default class Commander {
  static executeCommand(command: string) {
    try {
      const { name, options } = JSON.parse(command);
      const callback = (commands as any)[name];
      if (isFunction(callback)) {
        // client side should have same name command
        const value = callback(options);
        if (typeof value !== "string") {
          return JSON.stringify(callback(options));
        } else {
          return value;
        }
      }
    } catch (e) {
      console.log(e.message);
      return;
    }
  }
}
