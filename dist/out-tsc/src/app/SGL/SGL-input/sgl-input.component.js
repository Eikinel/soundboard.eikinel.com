import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { SglInputBaseComponent } from "../components/sgl-input-base.component";
let SglInputComponent = class SglInputComponent extends SglInputBaseComponent {
    constructor(controlContainer) {
        super(controlContainer);
        this.controlContainer = controlContainer;
        this.type = "text";
        this.customErrors = {};
    }
};
__decorate([
    Input()
], SglInputComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], SglInputComponent.prototype, "label", void 0);
__decorate([
    Input()
], SglInputComponent.prototype, "type", void 0);
__decorate([
    Input()
], SglInputComponent.prototype, "customErrors", void 0);
SglInputComponent = __decorate([
    Component({
        selector: "app-sgl-input",
        templateUrl: "./sgl-input.component.html",
        styleUrls: ["./sgl-input.component.scss", "../sgl-common.scss"],
    })
], SglInputComponent);
export { SglInputComponent };
//# sourceMappingURL=sgl-input.component.js.map