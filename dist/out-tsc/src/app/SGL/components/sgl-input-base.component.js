import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { generateUUID } from "../../utils/generate-uuid";
let SglInputBaseComponent = class SglInputBaseComponent {
    constructor(controlContainer) {
        this.controlContainer = controlContainer;
        this.uuid = generateUUID();
    }
};
__decorate([
    Input()
], SglInputBaseComponent.prototype, "controlName", void 0);
__decorate([
    Input()
], SglInputBaseComponent.prototype, "label", void 0);
SglInputBaseComponent = __decorate([
    Component({
        template: "",
    })
], SglInputBaseComponent);
export { SglInputBaseComponent };
//# sourceMappingURL=sgl-input-base.component.js.map