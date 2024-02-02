import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
let TagComponent = class TagComponent {
    constructor() {
        this.onDelete = new EventEmitter();
        this.faTimes = faTimes;
    }
};
__decorate([
    Input()
], TagComponent.prototype, "name", void 0);
__decorate([
    Output()
], TagComponent.prototype, "onDelete", void 0);
TagComponent = __decorate([
    Component({
        templateUrl: "./tag.component.html",
        styleUrls: ["./tag.component.scss"],
    })
], TagComponent);
export { TagComponent };
//# sourceMappingURL=tag.component.js.map