import { Component, Input } from "@angular/core";
import { ControlContainer } from "@angular/forms";

@Component({
    selector: 'app-sgl-color-picker',
    templateUrl: 'sgl-color-picker.component.html',
    styleUrls: ['sgl-color-picker.component.scss', '../sgl-common.scss']
})
export class SglColorPickerComponent {
    @Input() controlName: string;
    @Input() label: string;

    constructor(public controlContainer: ControlContainer) {}

    public setFormColorValue(hexColor: string): void {
        this.controlContainer.control.get(this.controlName).setValue(hexColor);
    }
}