export class Tool {
    label: string;
    customClass: string;
    onClick: (...args: any[]) => any;
    args?: any[];
    value?: any;
}