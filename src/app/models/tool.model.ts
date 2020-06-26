export class Tool {
    label: string;
    onClick: (...args: any[]) => any;
    args?: any[];
    value?: any;
}