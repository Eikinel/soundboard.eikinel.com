import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Validators, } from "@angular/forms";
import { switchMap, take } from "rxjs/operators";
var ButtonFormKeys;
(function (ButtonFormKeys) {
    ButtonFormKeys["ID"] = "id";
    ButtonFormKeys["NAME"] = "name";
    ButtonFormKeys["DESCRIPTION"] = "description";
    ButtonFormKeys["TAGS"] = "tags";
    ButtonFormKeys["COLOR"] = "color";
    ButtonFormKeys["FILE"] = "file";
})(ButtonFormKeys || (ButtonFormKeys = {}));
let ButtonFormModalComponent = class ButtonFormModalComponent {
    constructor(modalService, _soundboardService, _formBuilder) {
        this.modalService = modalService;
        this._soundboardService = _soundboardService;
        this._formBuilder = _formBuilder;
        this.request = "POST";
        this.button = {};
        this.onFormSubmitted = new EventEmitter();
        this.fileCustomErrors = {
            pattern: "This file type is not accepted. The accepted ones are : .mp3, .wav, .ogg, .flac, .wma, .m4a",
        };
    }
    ngOnInit() {
        this.isCreation = this.request === "POST";
        this.buttonFormGroup = this._formBuilder.group({
            [ButtonFormKeys.ID]: this._formBuilder.control(this.button.id),
            [ButtonFormKeys.NAME]: this._formBuilder.control(this.button.name, [
                Validators.required,
            ]),
            [ButtonFormKeys.DESCRIPTION]: this._formBuilder.control(this.button.description, [Validators.required]),
            [ButtonFormKeys.TAGS]: this._formBuilder.array(this.button.tags || []),
            [ButtonFormKeys.COLOR]: this._formBuilder.control(this.button.color || "#FFF", [Validators.required]),
            [ButtonFormKeys.FILE]: this._formBuilder.control(null, this.isCreation ? [Validators.required] : []),
        });
    }
    onFileSelect(event) {
        this._fileToUpload = event.target.files.item(0);
    }
    submit() {
        if (!this.buttonFormGroup.valid)
            return;
        // Disable all falsy values
        Object.keys(this.buttonFormGroup.value).forEach((key) => {
            !this.buttonFormGroup.value[key] &&
                this.buttonFormGroup.get(key).disable();
        });
        const tagsFormArray = this.buttonFormGroup.get(ButtonFormKeys.TAGS);
        this._soundboardService
            .createTags(tagsFormArray.value)
            .pipe(take(1), switchMap(() => this._soundboardService.getTagsByNames(tagsFormArray.value.map((tag) => tag.name))), switchMap((tags) => {
            const method = this.isCreation
                ? this._soundboardService.createButton
                : this._soundboardService.updateButton;
            // Fill new tags with id from API
            tagsFormArray.patchValue(tags);
            return method.bind(this._soundboardService)(this.buttonFormGroup.value, this._fileToUpload);
        }))
            .subscribe((button) => {
            this.onFormSubmitted.emit(button);
            this.modalService.bsModalRef.hide();
        });
    }
};
__decorate([
    Input()
], ButtonFormModalComponent.prototype, "request", void 0);
__decorate([
    Input()
], ButtonFormModalComponent.prototype, "button", void 0);
__decorate([
    Output()
], ButtonFormModalComponent.prototype, "onFormSubmitted", void 0);
ButtonFormModalComponent = __decorate([
    Component({
        selector: "app-button-form-modal",
        templateUrl: "./button-form-modal.component.html",
        styleUrls: ["./button-form-modal.component.scss"],
    })
], ButtonFormModalComponent);
export { ButtonFormModalComponent };
//# sourceMappingURL=button-form-modal.component.js.map