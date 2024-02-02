import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SoundMode } from "../shared/models/soundmode.enum";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { take } from "rxjs/operators";
import { ButtonFormModalComponent } from "../button-form-modal/button-form-modal.component";
let SoundboardButtonComponent = class SoundboardButtonComponent {
    constructor(soundboardService, modalService) {
        this.soundboardService = soundboardService;
        this.modalService = modalService;
        this.onButtonEdited = new EventEmitter();
        this.onButtonDeleted = new EventEmitter();
        this.isPressed = false;
        this.SoundMode = SoundMode;
        this.faTrash = faTrash;
        this.faPencilAlt = faPencilAlt;
    }
    editButton() {
        this.modalService.openModal(ButtonFormModalComponent, {
            initialState: { request: "PUT", button: this.button },
        }).content.onFormSubmitted
            .pipe(take(1))
            .subscribe((editedButton) => {
            this.onButtonEdited.emit(editedButton);
            this.modalService.bsModalRef.hide();
        });
    }
    deleteButton() {
        this.soundboardService
            .deleteButtonById(this.button.id)
            .pipe(take(1))
            .subscribe((deletedButton) => {
            this.onButtonDeleted.emit(deletedButton);
            this.modalService.bsModalRef.hide();
        });
    }
};
__decorate([
    Input()
], SoundboardButtonComponent.prototype, "button", void 0);
__decorate([
    Input()
], SoundboardButtonComponent.prototype, "onClick", void 0);
__decorate([
    Output()
], SoundboardButtonComponent.prototype, "onButtonEdited", void 0);
__decorate([
    Output()
], SoundboardButtonComponent.prototype, "onButtonDeleted", void 0);
SoundboardButtonComponent = __decorate([
    Component({
        selector: "app-soundboard-button",
        templateUrl: "./soundboard-button.component.html",
        styleUrls: ["./soundboard-button.component.scss"],
    })
], SoundboardButtonComponent);
export { SoundboardButtonComponent };
//# sourceMappingURL=soundboard-button.component.js.map