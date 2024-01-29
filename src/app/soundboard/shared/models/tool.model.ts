export class Tool {
  toolKey: string;
  label: string;
  type?: string;
  customClass?: string;
  onClick?: (...args: any[]) => any;
  args?: any[];
}

export class DropdownTool extends Tool {
  list: { [label: string]: any };
}
