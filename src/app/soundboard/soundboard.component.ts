import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { SoundboardButton, SoundboardButtonEvent } from "./shared/models/soundboard-button.model";
import { SoundboardToolbarComponent } from "./soundboard-toolbar/soundboard-toolbar.component";
import { SoundboardService } from "./soundboard.service";
import { take } from "rxjs/operators";

@Component({
    selector: 'app-soundboard',
    templateUrl: './soundboard.component.html',
    styleUrls: ['./soundboard.component.scss']
})
export class SoundboardComponent implements OnInit {
    @ViewChild('soundboardToolbar') soundboardToolbar: SoundboardToolbarComponent;

    public buttons: SoundboardButton[] = [];
    public SoundboardButtonEvent: typeof SoundboardButtonEvent = SoundboardButtonEvent;

    private readonly _soundboardEventListeners: { [event: number]: (button: SoundboardButton) => void };

    constructor(public soundboardService: SoundboardService) {
        this._soundboardEventListeners = {
            [SoundboardButtonEvent.CREATED]: (button: SoundboardButton) => this.onButtonCreated(button),
            [SoundboardButtonEvent.UPDATED]: (button: SoundboardButton) => this.onButtonUpdated(button),
            [SoundboardButtonEvent.DELETED]: (button: SoundboardButton) => this.onButtonDeleted(button),
        };
    }

    public ngOnInit(): void {
        this.soundboardService.getAllButtons()
            .pipe(take(1))
            .subscribe((buttons: SoundboardButton[]) => {
                this.buttons = buttons;
            });
    }

    public onSearch(search: string): void {
        this.buttons.map((button: SoundboardButton) => {
            button.hide = !button.name.match(new RegExp(search, 'gi'));
        });
    }

    public onButtonEvent(event: SoundboardButtonEvent, button: SoundboardButton): void {
        this._soundboardEventListeners[event]?.(button);
        this.soundboardToolbar.searchForm.updateValueAndValidity();
    }

    private onButtonCreated(button: SoundboardButton): void {
        console.log(`Button "${button.name}" created`);
        this.buttons.push(button);
    }

    private onButtonUpdated(editedButton: SoundboardButton): void {
        console.log(`Button "${editedButton.name}" edited`);
        this.buttons.splice(this.buttons.findIndex((b: SoundboardButton) => b.id === editedButton.id), 1, editedButton);
        this.soundboardToolbar.searchForm.updateValueAndValidity();
    }

    private onButtonDeleted(deletedButton: SoundboardButton): void {
        console.log(`Button "${deletedButton.name}" deleted`);
        this.buttons = this.buttons.filter((button: SoundboardButton) => button.id !== deletedButton.id);
        this.soundboardToolbar.searchForm.updateValueAndValidity();
    }

    @HostListener('click', ['$event'])
    private onClickWindow(event: Event): void {
        const target: HTMLElement = event.target as HTMLElement;
        const forbiddenClass: string[] = ['tool', 'burger-bar', 'burger-icon-container', 'dropdown-item'];

        if (!this.soundboardToolbar.burgerMenuCollapsed &&
            forbiddenClass.filter((c: string) => !target.classList.contains(c)).length === forbiddenClass.length) {
            this.soundboardToolbar.burgerMenuCollapsed = true;
        }
    }
}