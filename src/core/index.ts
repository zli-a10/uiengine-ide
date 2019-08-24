import _ from "lodash";
import commands from "./commands";

export function trigger(command: any): any {
  const { type, ...rest } = command;
  if (_.isFunction(commands[type])) {
    const fn: any = commands[type];
    return fn(rest);
  }
  return commands[type];
}

export function DragWrapper(props: any) {
  return props.children;
}

export function subscribe(type: string): any {
  return {};
}
