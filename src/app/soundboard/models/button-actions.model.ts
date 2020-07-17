export interface ButtonAction {
    icon: string;
    onClick: (...args: any) => any;
}

export enum ButtonActionEnum {
    EDIT,
    DELETE,
    // SOUNDMODE
}