import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { SglInputBaseComponent } from "../components/sgl-input-base.component";
let SglColorPickerComponent = class SglColorPickerComponent extends SglInputBaseComponent {
    constructor(controlContainer) {
        super(controlContainer);
        this.controlContainer = controlContainer;
    }
    setFormColorValue(hexColor) {
        this.controlContainer.control.get(this.controlName).setValue(hexColor);
    }
};
__decorate([
    Input()
], SglColorPickerComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], SglColorPickerComponent.prototype, "label", void 0);
SglColorPickerComponent = __decorate([
    Component({
        selector: "app-sgl-color-picker",
        templateUrl: "./sgl-color-picker.component.html",
        styleUrls: ["./sgl-color-picker.component.scss", "../sgl-common.scss"],
    })
], SglColorPickerComponent);
export { SglColorPickerComponent };
//# sourceMappingURL=sgl-color-picker.component.js.map