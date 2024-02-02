import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from "@angular/core";
import { ButtonFormModalComponent } from "../button-form-modal/button-form-modal.component";
import { take, takeUntil } from "rxjs/operators";
import { SoundMode } from "../shared/models/soundmode.enum";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
let SoundboardToolbarComponent = class SoundboardToolbarComponent {
    constructor(modalService, breakpointService, soundboardService) {
        this.modalService = modalService;
        this.breakpointService = breakpointService;
        this.soundboardService = soundboardService;
        this.createdButtonEvent = new EventEmitter();
        this.search = new EventEmitter();
        this.tools = [];
        this.burgerMenuCollapsed = true;
        this.isSmallScreen = false;
        this.soundModeLabels = {
            [SoundMode.OVERRIDE]: "Override",
            [SoundMode.PARALLELIZE]: "Parallelize",
            [SoundMode.QUEUE]: "Queue",
            [SoundMode.LOOP]: "Loop",
        };
        this._destroyed = new Subject();
    }
    ngOnInit() {
        this.tools = [
            {
                toolKey: "createButton",
                type: "button",
                label: "Create new button",
                customClass: "font-weight-bold btn btn-success",
                onClick: () => {
                    this.modalService.openModal(ButtonFormModalComponent)
                        .content.onFormSubmitted
                        .pipe(take(1))
                        .subscribe((createdButton) => {
                        this.createdButtonEvent.emit(createdButton);
                    });
                },
            },
            {
                toolKey: "changeSoundMode",
                type: "dropdown",
                list: this._invert(this.soundModeLabels),
                label: `Sound mode: ${this.soundModeLabels[this.soundboardService.soundMode]}`,
                onClick: (soundMode) => {
                    this.soundboardService.soundMode = soundMode;
                    localStorage.setItem("soundMode", soundMode.toString());
                    this.getToolByToolKey("changeSoundMode").label =
                        `Sound mode: ${this.soundModeLabels[soundMode]}`;
                },
            },
        ];
        this.breakpointService.innerWidth$.subscribe((innerWidth) => {
            this.isSmallScreen = innerWidth < this.breakpointService.widthBreakpoint;
            if (!this.isSmallScreen)
                this.burgerMenuCollapsed = true;
        });
        this.searchForm = new FormControl();
        this.searchForm.valueChanges
            .pipe(takeUntil(this._destroyed))
            .subscribe((search) => {
            this.search.emit(search);
        });
    }
    getToolByToolKey(toolKey) {
        return this.tools.find((tool) => tool.toolKey === toolKey);
    }
    _invert(object) {
        return Object.entries(object).reduce((ret, entry) => {
            const [key, value] = entry;
            ret[value] = isNaN(key) ? key : Number(key);
            return ret;
        }, {});
    }
};
__decorate([
    Output()
], SoundboardToolbarComponent.prototype, "createdButtonEvent", void 0);
__decorate([
    Output()
], SoundboardToolbarComponent.prototype, "search", void 0);
SoundboardToolbarComponent = __decorate([
    Component({
        selector: "app-soundboard-toolbar",
        templateUrl: "./soundboard-toolbar.component.html",
        styleUrls: ["./soundboard-toolbar.component.scss"],
    })
], SoundboardToolbarComponent);
export { SoundboardToolbarComponent };
//# sourceMappingURL=soundboard-toolbar.component.js.map