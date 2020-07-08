import { Component, Input } from "@angular/core";
import { SoundboardButton } from "../models/buttons.model";
import { SoundboardService } from "../soundboard.service";
import { SoundMode } from "../models/soundmode.enum";

@Component({
    selector: 'app-soundboard-button',
    templateUrl: './soundboard-button.component.html',
    styleUrls: ['./soundboard-button.component.scss'],
})
export class SoundboardButtonComponent {
    @Input() button: SoundboardButton;
    @Input() onClick: (...args: any[]) => any;

    public isPressed: boolean = false;
    public SoundMode: typeof SoundMode = SoundMode;

    constructor(public soundboardService: SoundboardService) {
    }
}