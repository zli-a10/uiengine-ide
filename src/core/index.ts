import commands from './commands';

interface ICommand {
    type: string,
    to: string, // target
    content: any
}

export function trigger(command: any): any {
  const { type, content } = command;

  return commands[type];
}

export function DragWrapper(props: any) {
  return props.children;
}

export function subscribe(type: string): any {
  return {};
}
