import * as commands from "./commands";
import { isFunction } from "lodash";

export default class Commander {
  static executeCommand(command: string) {
    try {
      const { name, options } = JSON.parse(command);
      const callback = (commands as any)[name];
      if (isFunction(callback)) return callback(options);
    } catch (e) {
      console.log(e.message);
      return;
    }
  }
}
