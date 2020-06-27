import { Component, Input, OnInit } from "@angular/core";
import { SoundboardButton } from "../../models/buttons.model";
import { SoundboardService } from "../soundboard.service";

@Component({
    selector: 'app-soundboard-button',
    templateUrl: './soundboard-button.component.html',
    styleUrls: ['./soundboard-button.component.scss'],
})
export class SoundboardButtonComponent implements OnInit {
    @Input() button: SoundboardButton;
    @Input() onClick: (...args: any[]) => any;

    public isPressed: boolean = false;

    public ngOnInit(): void {
    }
}