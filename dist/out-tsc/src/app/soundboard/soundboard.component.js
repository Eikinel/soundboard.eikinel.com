import { __decorate } from "tslib";
import { Component, HostListener, ViewChild } from "@angular/core";
import { take } from "rxjs/operators";
import { SoundboardButtonEvent, } from "./shared/models/soundboard-button.model";
let SoundboardComponent = class SoundboardComponent {
    constructor(soundboardService) {
        this.soundboardService = soundboardService;
        this.buttons = [];
        this.loading = true;
        this.SoundboardButtonEvent = SoundboardButtonEvent;
        this._soundboardEventListeners = {
            [SoundboardButtonEvent.CREATED]: (button) => this.onButtonCreated(button),
            [SoundboardButtonEvent.UPDATED]: (button) => this.onButtonUpdated(button),
            [SoundboardButtonEvent.DELETED]: (button) => this.onButtonDeleted(button),
        };
    }
    ngOnInit() {
        this.soundboardService
            .getAllButtons()
            .pipe(take(1))
            .subscribe((buttons) => {
            this.buttons = buttons;
            this.loading = false;
        });
    }
    onSearch(search) {
        this.buttons.map((button) => {
            button.hide = !button.name.match(new RegExp(search, "gi"));
        });
    }
    onButtonEvent(event, button) {
        this._soundboardEventListeners[event]?.(button);
    }
    onButtonCreated(button) {
        console.log(`Button "${button.name}" created`);
        this.buttons.push(button);
    }
    onButtonUpdated(editedButton) {
        console.log(`Button "${editedButton.name}" edited`);
        this.buttons.splice(this.buttons.findIndex((b) => b.id === editedButton.id), 1, editedButton);
    }
    onButtonDeleted(deletedButton) {
        console.log(`Button "${deletedButton.name}" deleted`);
        this.buttons = this.buttons.filter((button) => button.id !== deletedButton.id);
    }
    onClickWindow(event) {
        const target = event.target;
        const forbiddenClass = [
            "tool",
            "burger-bar",
            "burger-icon-container",
            "dropdown-item",
        ];
        if (!this.soundboardToolbar.burgerMenuCollapsed &&
            forbiddenClass.filter((c) => !target.classList.contains(c))
                .length === forbiddenClass.length) {
            this.soundboardToolbar.burgerMenuCollapsed = true;
        }
    }
};
__decorate([
    ViewChild("soundboardToolbar")
], SoundboardComponent.prototype, "soundboardToolbar", void 0);
__decorate([
    HostListener("click", ["$event"])
], SoundboardComponent.prototype, "onClickWindow", null);
SoundboardComponent = __decorate([
    Component({
        selector: "app-soundboard",
        templateUrl: "./soundboard.component.html",
        styleUrls: ["./soundboard.component.scss"],
    })
], SoundboardComponent);
export { SoundboardComponent };
//# sourceMappingURL=soundboard.component.js.map