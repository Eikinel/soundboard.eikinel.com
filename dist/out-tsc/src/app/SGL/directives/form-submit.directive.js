import { __decorate } from "tslib";
import { Directive } from "@angular/core";
import { fromEvent } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
let FormSubmitDirective = class FormSubmitDirective {
    get element() {
        return this._host.nativeElement;
    }
    constructor(_host) {
        this._host = _host;
        this.submit$ = fromEvent(this.element, "submit").pipe(tap(() => {
            if (this.element.classList.contains("submitted") === false) {
                this.element.classList.add("submitted");
            }
        }), shareReplay(1));
    }
};
FormSubmitDirective = __decorate([
    Directive({
        selector: "[appFormSubmit]",
    })
], FormSubmitDirective);
export { FormSubmitDirective };
//# sourceMappingURL=form-submit.directive.js.map