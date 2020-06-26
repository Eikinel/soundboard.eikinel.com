import { Component, OnInit } from "@angular/core";
import { Buttons } from "../models/buttons.model";
import buttonsList from "src/assets/buttons.json";

@Component({
    templateUrl: './soundboard.component.html',
    styleUrls: ['./soundboard.component.scss']
})
export class SoundboardComponent implements OnInit {
    public buttons: Buttons[] = buttonsList;
    public audioByButtonId: { [buttonId: number]: HTMLAudioElement } = {};
    public pushedButtons: { [index: number]: boolean } = {};
    public useCache: boolean = true;

    public ngOnInit(): void {
        console.log(this.buttons);
    }

    public playAudio(buttonId: number, filename: string): void {
        if (!this.audioByButtonId[buttonId] || !this.useCache) {
            console.log(`Created audio for file ${filename}`);
            this.audioByButtonId[buttonId] = new Audio(`assets/sounds/${filename}`);
            this.audioByButtonId[buttonId].load();
        } else {
            console.log(`Using cached audio for file ${filename}`);
        }

        this.audioByButtonId[buttonId].play()
            .then(() => console.log(`Played button with id ${buttonId}`))
            .catch((error: string) => console.error(error));
    }
}