import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { SglInputBaseComponent } from "../components/sgl-input-base.component";
let SglTagsComponent = class SglTagsComponent extends SglInputBaseComponent {
    constructor(controlContainer) {
        super(controlContainer);
        this.controlContainer = controlContainer;
    }
};
__decorate([
    Input()
], SglTagsComponent.prototype, "hint", void 0);
SglTagsComponent = __decorate([
    Component({
        selector: "app-sgl-tags",
        templateUrl: "./sgl-tags.component.html",
        styleUrls: ["./sgl-tags.component.scss", "../sgl-common.scss"],
    })
], SglTagsComponent);
export { SglTagsComponent };
//# sourceMappingURL=sgl-tags.component.js.map