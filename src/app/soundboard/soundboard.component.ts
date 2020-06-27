import { Component, ElementRef, ViewChild } from "@angular/core";
import { SoundboardButton } from "../models/buttons.model";
import buttonsList from "src/assets/buttons.json";
import { SoundboardToolbarComponent } from "./soundboard-toolbar/soundboard-toolbar.component";
import { SoundboardService } from "./soundboard.service";
import { take } from "rxjs/operators";

@Component({
    selector: 'app-soundboard',
    templateUrl: './soundboard.component.html',
    styleUrls: ['./soundboard.component.scss']
})
export class SoundboardComponent {
    @ViewChild('soundboardToolbar') soundboardToolbarComponent: SoundboardToolbarComponent;
    @ViewChild('soundboardToolbar', { read: ElementRef }) soundboardToolbarElementRef: ElementRef<HTMLElement>;

    public buttons: SoundboardButton[] = buttonsList;

    constructor(public soundboardService: SoundboardService) {
        this.soundboardService.sayHello()
            .pipe(take(1))
            .subscribe((hello: string) => console.log(hello));
    }
}