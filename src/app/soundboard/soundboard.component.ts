import { Component, OnInit } from "@angular/core";
import { Buttons } from "../models/buttons.model";
import buttonsList from "src/assets/buttons.json";

@Component({
    selector: 'app-soundboard',
    templateUrl: './soundboard.component.html',
    styleUrls: ['./soundboard.component.scss']
})
export class SoundboardComponent {
    public buttons: Buttons[] = buttonsList;
    public audioByButtonId: { [buttonId: number]: HTMLAudioElement } = {};
    public pushedButtons: { [index: number]: boolean } = {};

    public playAudio(buttonId: number, filename: string): void {
        const useAudioCache: boolean = Boolean(JSON.parse(localStorage.getItem('useAudioCache') || 'true'));

        if (!this.audioByButtonId[buttonId] || !useAudioCache) {
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