import { Component, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SoundboardButton } from "./shared/models/buttons.model";
import { SoundboardToolbarComponent } from "./soundboard-toolbar/soundboard-toolbar.component";
import { SoundboardService } from "./soundboard.service";
import { take, takeUntil } from "rxjs/operators";
import { BehaviorSubject, Subject } from "rxjs";

@Component({
    selector: 'app-soundboard',
    templateUrl: './soundboard.component.html',
    styleUrls: ['./soundboard.component.scss']
})
export class SoundboardComponent implements OnInit, OnDestroy {
    @ViewChild('soundboardToolbar') soundboardToolbar: SoundboardToolbarComponent;

    public buttons: SoundboardButton[] = [];

    private _destroyed: Subject<void> = new Subject<void>();
    private _cachedButtons$: BehaviorSubject<SoundboardButton[]> = new BehaviorSubject<SoundboardButton[]>([]);

    constructor(public soundboardService: SoundboardService) {}

    public ngOnInit(): void {
        this.soundboardService.getAllButtons()
            .pipe(take(1))
            .subscribe((buttons: SoundboardButton[]) => {
                this.buttons = buttons;
                this._cachedButtons$.next(buttons);
            });

        this._cachedButtons$
            .pipe(takeUntil(this._destroyed))
            .subscribe((buttons: SoundboardButton[]) => {
               this.buttons = buttons;
            });
    }

    public ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    public onButtonCreated(button: SoundboardButton): void {
        console.log(`Button "${button.name}" created`);
        this.buttons.push(button);
    }

    public onButtonEdited(editedButton: SoundboardButton): void {
        console.log(`Button "${editedButton.name}" updated`);
        this._cachedButtons$.value.some((button: SoundboardButton, index: number) => {
            if (button.id === editedButton.id) {
                this._cachedButtons$.next(this._cachedButtons$.value.splice(index, 1, editedButton));
                return true;
            }
        });
    }

    public onButtonDeleted(deletedButton: SoundboardButton): void {
        console.log(`Button "${deletedButton.name}" deleted`);
        this._cachedButtons$.next(this._cachedButtons$.value.filter((button: SoundboardButton) => button.id !== deletedButton.id));
    }

    public onSearch(search: string): void {
        this.buttons = this._cachedButtons$.value.filter((button: SoundboardButton) => button.name.match(new RegExp(search, 'gi')));
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