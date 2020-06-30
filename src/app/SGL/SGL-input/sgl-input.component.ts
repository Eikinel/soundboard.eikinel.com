import { Component, Input } from "@angular/core";
import { ControlContainer } from "@angular/forms";

@Component({
    selector: 'app-sgl-input',
    templateUrl: './sgl-input.component.html',
    styleUrls: ['./sgl-input.component.scss']
})
export class SglInputComponent {
    @Input() controlName: string;
    @Input() label: string;
    @Input() type: 'text' | 'file' = 'text';

    constructor(public controlContainer: ControlContainer) {
    }
}