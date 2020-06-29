import { Component, Input } from "@angular/core";
import { ControlContainer } from "@angular/forms";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent {
    @Input() controlName: string;
    @Input() label: string;
    @Input() type: 'text' | 'file' = 'text';

    constructor(public controlContainer: ControlContainer) {
    }
}