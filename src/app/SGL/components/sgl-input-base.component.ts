import { Input } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { generateUUID } from "../../utils/generate-uuid";

export abstract class SglInputBaseComponent {
    @Input() controlName: string;
    @Input() label: string;

    public uuid: string = generateUUID();

    protected constructor(public controlContainer: ControlContainer) {}
}