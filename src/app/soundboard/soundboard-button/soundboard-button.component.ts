import { Component, Input } from "@angular/core";
import { SoundboardButton } from "../models/buttons.model";

@Component({
    selector: 'app-soundboard-button',
    templateUrl: './soundboard-button.component.html',
    styleUrls: ['./soundboard-button.component.scss'],
})
export class SoundboardButtonComponent {
    @Input() button: SoundboardButton;
    @Input() onClick: (...args: any[]) => any;

    public isPressed: boolean = false;
}