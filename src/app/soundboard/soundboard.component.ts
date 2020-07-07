import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { SoundboardButton } from "./models/buttons.model";
import { SoundboardToolbarComponent } from "./soundboard-toolbar/soundboard-toolbar.component";
import { SoundboardService } from "./soundboard.service";
import { take } from "rxjs/operators";
import { BreakpointService } from "../services/breakpoint.service";

@Component({
    selector: 'app-soundboard',
    templateUrl: './soundboard.component.html',
    styleUrls: ['./soundboard.component.scss']
})
export class SoundboardComponent implements OnInit {
    @ViewChild('soundboardToolbar') soundboardToolbar: SoundboardToolbarComponent;

    public buttons: SoundboardButton[] = [];

    constructor(public soundboardService: SoundboardService) {}

    public ngOnInit(): void {
        this.soundboardService.getAllButtons()
            .pipe(take(1))
            .subscribe((buttons: SoundboardButton[]) => this.buttons = buttons);
    }

    public onButtonCreated(button: SoundboardButton): void {
        this.buttons.push(button);
    }

    @HostListener('click', ['$event'])
    private onClickWindow(event: Event): void {
        const target: HTMLElement = event.target as HTMLElement;
        const forbiddenClass: string[] = ['tool', 'burger-bar', 'burger-icon-container', 'dropdown-item'];

        console.log(forbiddenClass.filter((c: string) => !target.classList.contains(c)));
        if (!this.soundboardToolbar.burgerMenuCollapsed &&
            forbiddenClass.filter((c: string) => !target.classList.contains(c)).length === forbiddenClass.length) {
            this.soundboardToolbar.burgerMenuCollapsed = true;
        }
    }
}