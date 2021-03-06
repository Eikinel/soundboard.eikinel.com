import { Component, Input } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { generateUUID } from "../../utils/generate-uuid";
import { SglInputBaseComponent } from "../components/sgl-input-base.component";

@Component({
    selector: 'app-sgl-input',
    templateUrl: './sgl-input.component.html',
    styleUrls: ['./sgl-input.component.scss', '../sgl-common.scss']
})
export class SglInputComponent extends SglInputBaseComponent {
    @Input() controlName: string;
    @Input() label: string;
    @Input() type: 'text' | 'file' = 'text';
    @Input() customErrors: object = {};

    constructor(public controlContainer: ControlContainer) {
        super(controlContainer);
    }
}