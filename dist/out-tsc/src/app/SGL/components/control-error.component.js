import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input, } from "@angular/core";
let ControlErrorComponent = class ControlErrorComponent {
    set text(value) {
        if (value !== this.error) {
            this.error = value;
            this.hide = !value;
            this.cdr.detectChanges();
        }
    }
    constructor(cdr) {
        this.cdr = cdr;
        this.hide = true;
    }
};
__decorate([
    Input()
], ControlErrorComponent.prototype, "text", null);
ControlErrorComponent = __decorate([
    Component({
        template: `<p class="text-danger mt-1 mb-0" [class.d-none]="hide">
    {{ error }}
  </p>`,
        styles: [
            `
      p {
        font-size: 12px;
      }
    `,
        ],
        changeDetection: ChangeDetectionStrategy.OnPush,
    })
], ControlErrorComponent);
export { ControlErrorComponent };
//# sourceMappingURL=control-error.component.js.map